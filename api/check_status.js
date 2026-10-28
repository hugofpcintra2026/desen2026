const { getChargeStatus } = require('./_xpay');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const id = req.query?.id || req.query?.transaction_id || '';
        const result = await getChargeStatus(id);
        return res.status(200).json({
            ...result,
            status: result.status === 'PAID' ? 'approved' : result.status.toLowerCase()
        });
    } catch (error) {
        return res.status(200).json({ status: 'pending' });
    }
};
