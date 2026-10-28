const XPAY_API_KEY = process.env.XPAY_API_KEY || 'cpk_live_ex84lopcp2xexagmazz6za11';
const XPAY_BASE_URL = process.env.XPAY_BASE_URL || 'https://api.xpaybrasil.com/v1';

const paidCache = new Map();

function markChargePaid(chargeId, payload) {
    if (chargeId) {
        paidCache.set(String(chargeId), {
            status: 'PAID',
            updatedAt: Date.now(),
            payload
        });
    }
}

function isValidCpf(cpf) {
    const clean = String(cpf || '').replace(/\D/g, '');
    if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(clean.charAt(i), 10) * (10 - i);
    let d1 = sum % 11;
    d1 = d1 < 2 ? 0 : 11 - d1;
    if (parseInt(clean.charAt(9), 10) !== d1) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(clean.charAt(i), 10) * (11 - i);
    let d2 = sum % 11;
    d2 = d2 < 2 ? 0 : 11 - d2;
    return parseInt(clean.charAt(10), 10) === d2;
}

function generateValidCpf() {
    const rnd = () => Math.floor(Math.random() * 9);
    const n = Array.from({ length: 9 }, rnd);
    let d1 = n.reduce((acc, val, idx) => acc + val * (10 - idx), 0) % 11;
    d1 = d1 < 2 ? 0 : 11 - d1;
    n.push(d1);
    let d2 = n.reduce((acc, val, idx) => acc + val * (11 - idx), 0) % 11;
    d2 = d2 < 2 ? 0 : 11 - d2;
    n.push(d2);
    return n.join('');
}

function normalizePhone(phone) {
    let digits = String(phone || '').replace(/\D/g, '');
    if (digits.startsWith('55') && digits.length >= 12) {
        digits = digits.slice(2);
    }
    if (digits.length === 10 || digits.length === 11) {
        return digits;
    }
    return '11999999999';
}

function parseAmountToCents(value) {
    if (typeof value === 'number') {
        const cents = value < 500 ? Math.round(value * 100) : Math.round(value);
        return Math.max(500, cents);
    }
    const raw = String(value || '20,00')
        .replace(/[^\d.,]/g, '')
        .trim();
    if (!raw) return 2000;

    let normalized = raw;
    if (raw.includes(',')) {
        normalized = raw.replace(/\./g, '').replace(',', '.');
    }
    const floatVal = parseFloat(normalized);
    if (isNaN(floatVal) || floatVal <= 0) return 2000;
    const cents = Math.round(floatVal * 100);
    return Math.max(500, cents);
}

async function createPixCharge({ phone, cpf, value, name, email, tracking } = {}) {
    const amount = parseAmountToCents(value);
    const cleanPhone = normalizePhone(phone);
    const cleanCpf = String(cpf || '').replace(/\D/g, '');
    const taxId = isValidCpf(cleanCpf) ? cleanCpf : generateValidCpf();
    const customerName = (name && String(name).trim()) || 'Cliente Recarga TIM';
    const customerEmail = (email && String(email).trim()) || `cliente.${cleanPhone}@recargatim.com.br`;

    const payload = {
        amount,
        expiresIn: 900,
        externalId: `tim_${cleanPhone}_${Date.now()}`,
        customer: {
            name: customerName,
            email: customerEmail,
            phone: cleanPhone,
            taxId
        },
        metadata: tracking && typeof tracking === 'object' ? tracking : undefined
    };

    const response = await fetch(`${XPAY_BASE_URL}/charge/pix`, {
        method: 'POST',
        headers: {
            'X-API-KEY': XPAY_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const text = await response.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        throw new Error(`Resposta inválida da XPay Brasil (${response.status}): ${text}`);
    }

    if (!response.ok) {
        const errMsg = json?.errors?.[0]?.description || json?.message || `Erro HTTP ${response.status}`;
        throw new Error(errMsg);
    }

    const charge = json.data || json;
    const transactionId = charge.id;
    const brCode = charge.brCode || '';
    const brCodeBase64 = charge.brCodeBase64 || '';

    return {
        success: true,
        data: {
            id: transactionId,
            transactionId,
            amount: charge.amount || amount,
            status: charge.status || 'PROCESSING',
            paymentData: {
                transactionId,
                copyPaste: brCode,
                qrCode: brCode,
                qrCodeBase64: brCodeBase64,
                qrCodeUrl: charge.url || ''
            }
        }
    };
}

async function getChargeStatus(transactionId) {
    if (!transactionId) {
        return { success: false, status: 'PENDING', message: 'ID da transação ausente' };
    }

    if (paidCache.has(String(transactionId))) {
        return {
            success: true,
            status: 'PAID',
            data: {
                id: transactionId,
                status: 'PAID',
                paymentStatus: 'PAID',
                chargeStatus: 'COMPLETED'
            }
        };
    }

    const response = await fetch(`${XPAY_BASE_URL}/charge/${encodeURIComponent(transactionId)}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': XPAY_API_KEY,
            'Content-Type': 'application/json'
        }
    });

    const text = await response.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        throw new Error(`Resposta inválida da XPay Brasil (${response.status})`);
    }

    if (!response.ok) {
        return {
            success: false,
            status: 'PENDING',
            data: { id: transactionId, status: 'PENDING' }
        };
    }

    const charge = json.data || json;
    const paymentStatus = String(charge.paymentStatus || '').toUpperCase();
    const chargeStatus = String(charge.status || '').toUpperCase();

    const isPaid =
        paymentStatus === 'PAID' ||
        paymentStatus === 'RECIEVED' ||
        paymentStatus === 'RECEIVED' ||
        paymentStatus === 'APPROVED' ||
        chargeStatus === 'COMPLETED' ||
        chargeStatus === 'PAID';

    const isExpired =
        paymentStatus === 'EXPIRED' ||
        chargeStatus === 'EXPIRED' ||
        chargeStatus === 'CANCELED';

    const normalizedStatus = isPaid ? 'PAID' : isExpired ? 'EXPIRED' : 'PENDING';

    if (isPaid) {
        markChargePaid(transactionId, charge);
    }

    return {
        success: true,
        status: normalizedStatus,
        data: {
            id: charge.id || transactionId,
            status: normalizedStatus,
            paymentStatus: charge.paymentStatus || 'PROCESSING',
            chargeStatus: charge.status || 'OPEN',
            total: charge.total || charge.amount || 0
        }
    };
}

exports.handler = async function (event) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
        };
    }

    try {
        let body = {};
        if (event.body) {
            body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body;
        }
        const result = await createPixCharge({
            phone: body.phone,
            cpf: body.cpf,
            value: body.value || body.amount,
            name: body.name,
            email: body.email,
            tracking: body.tracking
        });
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: error.message || 'Erro ao gerar PIX na XPay Brasil'
            })
        };
    }
};

exports.getChargeStatus = getChargeStatus;
exports.markChargePaid = markChargePaid;
