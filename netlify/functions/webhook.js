const { markChargePaid } = require('./pix');

const UTMIFY_TOKEN = process.env.UTMIFY_TOKEN || 'C6V4hBgSwBgTWYterwiwShqluMgKFyqMJ9QK';
const UTMIFY_ENDPOINT = 'https://api.utmify.com.br/api-credentials/orders';

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Webhook-Signature',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, headers, body: JSON.stringify({ status: 'ok', msg: 'Aguardando POST da XPay' }) };
  }

  try {
    let payload = {};
    try {
      payload = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
    } catch (_) {}

    const evtName = String(payload.event || payload.type || '');
    const data = payload.data || payload.charge || payload;
    const txId = String(data.id || data.transactionId || data.chargeId || '');

    if (!txId) {
      return { statusCode: 200, headers, body: JSON.stringify({ received: true, note: 'Sem transaction ID' }) };
    }

    const statusRaw = String(data.status || data.paymentStatus || evtName).toLowerCase();
    const isPaid = ['paid', 'approved', 'completed', 'charge.paid', 'charge.received', 'payment.approved', 'confirmed', 'recieved', 'received'].some(s => statusRaw.includes(s));

    if (isPaid) {
      try { markChargePaid(txId, payload); } catch (_) {}
    }

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const amountCents = Number(data.amount || data.total || 0);
    const customer = data.customer || {};

    const cleanCpf = String(customer.taxId || customer.cpf || customer.document || '').replace(/\D/g, '') || null;
    const cleanPhone = String(customer.phone || customer.telefone || '').replace(/\D/g, '') || null;
    const cleanName = String(customer.name || customer.nome || 'Cliente Recarga TIM').trim();
    const cleanEmail = String(customer.email || (cleanPhone ? `cliente.${cleanPhone}@recargatim.com.br` : (cleanCpf ? `cliente_${cleanCpf}@pixrecebimento.com` : 'cliente@pagamento.com'))).trim();
    const prodName = data.description || (amountCents === 1390 ? 'Taxa de Ativação' : 'Recarga TIM');

    const utmifyPayload = {
      orderId: txId,
      platform: 'XPay',
      paymentMethod: 'pix',
      status: isPaid ? 'paid' : 'waiting_payment',
      createdAt: data.createdAt || nowStr,
      approvedDate: isPaid ? nowStr : null,
      refundedAt: null,
      customer: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        document: cleanCpf,
        country: 'BR'
      },
      products: [{
        id: amountCents === 1390 ? 'prod_taxa' : 'prod_recarga',
        name: prodName,
        planId: 'plan_1',
        planName: prodName,
        quantity: 1,
        priceInCents: amountCents
      }],
      trackingParameters: {
        src: data.metadata?.src || null,
        sck: data.metadata?.sck || null,
        utm_source: data.metadata?.utm_source || null,
        utm_campaign: data.metadata?.utm_campaign || null,
        utm_medium: data.metadata?.utm_medium || null,
        utm_content: data.metadata?.utm_content || null,
        utm_term: data.metadata?.utm_term || null,
        gclid: data.metadata?.gclid || null
      },
      commission: {
        totalPriceInCents: amountCents,
        gatewayFeeInCents: 0,
        userCommissionInCents: amountCents
      },
      isTest: false
    };

    const utmRes = await fetch(UTMIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': UTMIFY_TOKEN
      },
      body: JSON.stringify(utmifyPayload)
    });

    const resData = await utmRes.json().catch(() => ({}));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, txId, status: isPaid ? 'paid' : 'waiting_payment', utmify: resData })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
