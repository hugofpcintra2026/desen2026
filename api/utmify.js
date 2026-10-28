const UTMIFY_API_URL = 'https://api.utmify.com.br/api-credentials/orders';
const UTMIFY_TOKEN = process.env.UTMIFY_TOKEN || 'C6V4hBgSwBgTWYterwiwShqluMgKFyqMJ9QK';

function formatUtmifyDate(date) {
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  return (
    date.getUTCFullYear() +
    '-' +
    pad(date.getUTCMonth() + 1) +
    '-' +
    pad(date.getUTCDate()) +
    ' ' +
    pad(date.getUTCHours()) +
    ':' +
    pad(date.getUTCMinutes()) +
    ':' +
    pad(date.getUTCSeconds())
  );
}

async function notificarUtmifyServer(body, clientIp = '127.0.0.1') {
  const {
    status,
    orderId,
    amountCents,
    customer,
    trackingParameters,
    productName,
    productId
  } = body || {};

  if (!orderId || !status) {
    return { error: 'orderId and status required', statusCode: 400 };
  }

  const now = formatUtmifyDate(new Date());
  const isPaid = status === 'paid' || status === 'approved';
  const utmStatus = isPaid ? 'paid' : 'waiting_payment';
  const approvedDate = isPaid ? now : null;
  const priceInCents = Number(amountCents) || 2000;
  const gatewayFeeInCents = Math.round(priceInCents * 0.04);
  const userCommissionInCents = Math.max(1, priceInCents - gatewayFeeInCents);

  const payload = {
    orderId: String(orderId),
    platform: 'RecargaTIM',
    paymentMethod: 'pix',
    status: utmStatus,
    createdAt: now,
    approvedDate: approvedDate,
    refundedAt: null,
    customer: {
      name: customer?.name || 'Cliente',
      email: customer?.email || 'cliente@email.com',
      phone: (customer?.phone || '').replace(/\D/g, '') || null,
      document: (customer?.document || customer?.cpf || '').replace(/\D/g, '') || null,
      country: 'BR',
      ip: clientIp
    },
    products: [
      {
        id: productId || 'prod_recarga_tim',
        name: productName || 'Recarga TIM',
        planId: null,
        planName: null,
        quantity: 1,
        priceInCents: priceInCents
      }
    ],
    trackingParameters: {
      src: trackingParameters?.src || null,
      sck: trackingParameters?.sck || null,
      utm_source: trackingParameters?.utm_source || null,
      utm_campaign: trackingParameters?.utm_campaign || null,
      utm_medium: trackingParameters?.utm_medium || null,
      utm_content: trackingParameters?.utm_content || null,
      utm_term: trackingParameters?.utm_term || null
    },
    commission: {
      totalPriceInCents: priceInCents,
      gatewayFeeInCents: gatewayFeeInCents,
      userCommissionInCents: userCommissionInCents
    },
    isTest: false
  };

  const response = await fetch(UTMIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-token': UTMIFY_TOKEN
    },
    body: JSON.stringify(payload)
  });

  const respText = await response.text();
  return { ok: response.ok, status: response.status, response: respText };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const clientIp =
      (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      req.headers['x-real-ip'] ||
      '127.0.0.1';

    const result = await notificarUtmifyServer(body, clientIp);
    if (result.error) {
      return res.status(result.statusCode || 400).json({ error: result.error });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.notificarUtmifyServer = notificarUtmifyServer;
