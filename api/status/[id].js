const { getChargeStatus } = require('../_xpay');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const id = req.query?.id || (req.url || '').split('?')[0].split('/').filter(Boolean).pop();
        const result = await getChargeStatus(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error('[XPay /api/status/:id Error]:', error.message);
        return res.status(200).json({
            success: false,
            status: 'PENDING',
            data: { status: 'PENDING' }
        });
    }
};
