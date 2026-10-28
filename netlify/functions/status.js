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
        let id = (event.queryStringParameters && event.queryStringParameters.id) || '';
        if (!id && event.path) {
            const parts = event.path.split('/').filter(Boolean);
            const last = parts[parts.length - 1];
            if (last && last !== 'status' && last !== 'check_status') {
                id = decodeURIComponent(last);
            }
        }
        const result = await getChargeStatus(id);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ...result,
                status: result.status === 'PAID' ? 'PAID' : result.status,
                approved: result.status === 'PAID'
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                status: 'PENDING',
                message: error.message || 'Erro ao consultar status'
            })
        };
    }
};
