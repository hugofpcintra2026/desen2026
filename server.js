const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { createPixCharge, getChargeStatus, markChargePaid } = require('./api/_xpay');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Webhook-Signature'
    });
    res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
    return new Promise((resolve) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
            if (data.length > 10 * 1024 * 1024) req.destroy();
        });
        req.on('end', () => {
            try {
                resolve(data ? JSON.parse(data) : {});
            } catch (e) {
                resolve({});
            }
        });
        req.on('error', () => resolve({}));
    });
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    if (req.method === 'OPTIONS') {
        return sendJson(res, 200, { ok: true });
    }

    // 1. POST /api/pix (gerar cobrança PIX na XPay Brasil)
    if (pathname === '/api/pix' && req.method === 'POST') {
        try {
            const body = await readJsonBody(req);
            const result = await createPixCharge({
                phone: body.phone,
                cpf: body.cpf,
                value: body.value || body.amount,
                name: body.name,
                email: body.email
            });
            return sendJson(res, 200, result);
        } catch (error) {
            console.error('[XPay /api/pix Error]:', error.message);
            return sendJson(res, 500, {
                success: false,
                message: error.message || 'Erro ao gerar PIX na XPay Brasil.'
            });
        }
    }

    // 2. GET /api/status/:id (consultar status da cobrança na XPay Brasil)
    if (pathname.startsWith('/api/status/') && req.method === 'GET') {
        const id = pathname.replace('/api/status/', '').split('/')[0];
        try {
            const result = await getChargeStatus(id);
            return sendJson(res, 200, result);
        } catch (error) {
            return sendJson(res, 200, {
                success: false,
                status: 'PENDING',
                data: { status: 'PENDING' }
            });
        }
    }

    // 3. GET /api/check_status (compatibilidade transitions.js)
    if (pathname === '/api/check_status' && req.method === 'GET') {
        const id = parsedUrl.searchParams.get('id') || parsedUrl.searchParams.get('transaction_id') || '';
        try {
            const result = await getChargeStatus(id);
            return sendJson(res, 200, {
                ...result,
                status: result.status === 'PAID' ? 'approved' : result.status.toLowerCase()
            });
        } catch (error) {
            return sendJson(res, 200, { status: 'pending' });
        }
    }

    // 4. POST /api/upload-comprovante
    if (pathname === '/api/upload-comprovante' && req.method === 'POST') {
        req.on('data', () => {});
        req.on('end', () => {
            sendJson(res, 200, {
                success: true,
                message: 'Comprovante enviado com sucesso!'
            });
        });
        return;
    }

    // 5. POST /api/webhook (receber notificações XPay Brasil)
    if (pathname === '/api/webhook' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const event = body.event || body.type || '';
        const charge = body.data || body.charge || body;
        const chargeId = charge?.id || charge?.chargeId;
        if (
            event === 'charge.paid' ||
            event === 'charge.received' ||
            String(charge?.paymentStatus || '').toUpperCase() === 'PAID' ||
            String(charge?.paymentStatus || '').toUpperCase() === 'RECIEVED' ||
            String(charge?.status || '').toUpperCase() === 'COMPLETED'
        ) {
            markChargePaid(chargeId, body);
        }
        return sendJson(res, 200, { received: true });
    }

    // Arquivos estáticos
    let filePath = path.join(ROOT_DIR, pathname);
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/html; charset=utf-8';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            return res.end('Internal Server Error');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`🔑 Gate XPay Brasil configurada e ativa!`);
});
