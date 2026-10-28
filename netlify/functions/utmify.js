const UTMIFY_TOKEN = process.env.UTMIFY_TOKEN || 'C6V4hBgSwBgTWYterwiwShqluMgKFyqMJ9QK';
const UTMIFY_ENDPOINT = 'https://api.utmify.com.br/api-credentials/orders';

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const orderId = String(body.orderId || body.transactionId || 'ord_' + Date.now());
    const isPaid = body.status === 'paid' || body.status === 'approved';
    const status = isPaid ? 'paid' : 'waiting_payment';
    const amountInCents = Number(body.amountInCents || body.amount || 0);
    const customer = body.customer || {};
    const tracking = body.tracking || {};
    const productName = body.productName || 'Recarga TIM';

    const cleanCpf = String(customer.cpf || customer.taxId || customer.document || '').replace(/\D/g, '') || null;
    const cleanPhone = String(customer.phone || '').replace(/\D/g, '') || null;
    const cleanName = String(customer.name || 'Cliente Recarga TIM').trim();
    const cleanEmail = String(customer.email || (cleanPhone ? `cliente.${cleanPhone}@recargatim.com.br` : (cleanCpf ? `cliente_${cleanCpf}@pixrecebimento.com` : 'cliente@pagamento.com'))).trim();

    const utmifyPayload = {
      orderId: orderId,
      platform: 'XPay',
      paymentMethod: 'pix',
      status: status,
      createdAt: body.createdAt || nowStr,
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
        id: String(body.productId || 'prod_recarga'),
        name: productName,
        planId: 'plan_1',
        planName: productName,
        quantity: 1,
        priceInCents: amountInCents
      }],
      trackingParameters: {
        src: tracking.src || null,
        sck: tracking.sck || null,
        utm_source: tracking.utm_source || null,
        utm_campaign: tracking.utm_campaign || null,
        utm_medium: tracking.utm_medium || null,
        utm_content: tracking.utm_content || null,
        utm_term: tracking.utm_term || null,
        gclid: tracking.gclid || null
      },
      commission: {
        totalPriceInCents: amountInCents,
        gatewayFeeInCents: 0,
        userCommissionInCents: amountInCents
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
      statusCode: utmRes.status,
      headers,
      body: JSON.stringify({ success: utmRes.ok, utmify: resData })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
