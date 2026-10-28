const { createPixCharge } = require('./_xpay');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const result = await createPixCharge({
            phone: body.phone,
            cpf: body.cpf,
            value: body.value || body.amount,
            name: body.name,
            email: body.email,
            tracking: body.tracking
        });
        return res.status(200).json(result);
    } catch (error) {
        console.error('[XPay /api/pix Error]:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message || 'Erro ao gerar cobrança PIX na XPay Brasil.'
        });
    }
};
