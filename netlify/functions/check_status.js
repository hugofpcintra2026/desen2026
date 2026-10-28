const { getChargeStatus } = require('./pix');

exports.handler = async function (event) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const id = (event.queryStringParameters && event.queryStringParameters.id) || '';
        const result = await getChargeStatus(id);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: result.success,
                status: result.status === 'PAID' ? 'approved' : 'pending',
                rawStatus: result.status,
                data: result.data
            })
        };
    } catch (error) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ status: 'pending' })
        };
    }
};
