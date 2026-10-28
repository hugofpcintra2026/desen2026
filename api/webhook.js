const { markChargePaid } = require('./_xpay');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Signature');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
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

        return res.status(200).json({ received: true });
    } catch (error) {
        return res.status(200).json({ received: true });
    }
};
