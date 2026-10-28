const { markChargePaid } = require('../_xpay');

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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      webhook: 'active',
      endpoint: '/api/webhook/xpay'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const event = String(body.event || '').toLowerCase();
    const charge = body.data || body.charge || body;

    const orderId = charge.id || charge.transactionId || body.id;
    if (!orderId) {
      return res.status(200).json({ received: true, ignored: 'no orderId' });
    }

    const paymentStatus = String(charge.paymentStatus || '').toUpperCase();
    const chargeStatus = String(charge.status || '').toUpperCase();

    const isPaid =
      event === 'charge.paid' ||
      event === 'charge.received' ||
      paymentStatus === 'PAID' ||
      paymentStatus === 'RECEIVED' ||
      paymentStatus === 'RECIEVED' ||
      paymentStatus === 'APPROVED' ||
      chargeStatus === 'COMPLETED' ||
      chargeStatus === 'PAID';

    const isPending =
      event === 'charge.pending' ||
      event === 'charge.created' ||
      paymentStatus === 'PROCESSING' ||
      paymentStatus === 'PENDING';

    if (isPaid) {
      markChargePaid(orderId, charge);
    }

    if (!isPaid && !isPending) {
      return res.status(200).json({ received: true, event, status: paymentStatus || chargeStatus });
    }

    const now = formatUtmifyDate(new Date());
    const createdAt = charge.createdAt ? formatUtmifyDate(new Date(charge.createdAt)) : now;
    const approvedDate = isPaid ? now : null;
    const utmStatus = isPaid ? 'paid' : 'waiting_payment';

    const priceInCents = Number(charge.amount || charge.total) || 2000;
    const gatewayFeeInCents = Math.round(priceInCents * 0.04);
    const userCommissionInCents = Math.max(1, priceInCents - gatewayFeeInCents);

    const customer = charge.customer || {};
    const metadata = charge.metadata || {};

    const isTaxa = priceInCents === 1390;
    const productName = isTaxa
      ? 'Taxa de Ativação'
      : `Recarga TIM R$ ${(priceInCents / 100).toFixed(2).replace('.', ',')}`;
    const productId = isTaxa ? 'prod_taxa' : 'prod_recarga';

    const payload = {
      orderId: String(orderId),
      platform: 'RecargaTIM',
      paymentMethod: 'pix',
      status: utmStatus,
      createdAt: createdAt,
      approvedDate: approvedDate,
      refundedAt: null,
      customer: {
        name: customer.name || 'Cliente Recarga TIM',
        email: customer.email || 'cliente@recargatim.com.br',
        phone: (customer.phone || '').replace(/\D/g, '') || null,
        document: (customer.taxId || customer.document || customer.cpf || '').replace(/\D/g, '') || null,
        country: 'BR',
        ip: (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || '127.0.0.1'
      },
      products: [
        {
          id: productId,
          name: productName,
          planId: null,
          planName: null,
          quantity: 1,
          priceInCents: priceInCents
        }
      ],
      trackingParameters: {
        src: metadata.src || null,
        sck: metadata.sck || null,
        utm_source: metadata.utm_source || null,
        utm_campaign: metadata.utm_campaign || null,
        utm_medium: metadata.utm_medium || null,
        utm_content: metadata.utm_content || null,
        utm_term: metadata.utm_term || null
      },
      commission: {
        totalPriceInCents: priceInCents,
        gatewayFeeInCents: gatewayFeeInCents,
        userCommissionInCents: userCommissionInCents
      },
      isTest: false
    };

    const utmResp = await fetch(UTMIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': UTMIFY_TOKEN
      },
      body: JSON.stringify(payload)
    });

    const respText = await utmResp.text();
    return res.status(200).json({
      received: true,
      orderId,
      utmStatus,
      utmifyOk: utmResp.ok,
      utmifyResponse: respText
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
