// ============================================================
// Utmify Order Dispatcher — Cloudflare Pages Function
// Envia pedidos gerados e pagos para a API oficial da Utmify
// Token: C6V4hBgSwBgTWYterwiwShqluMgKFyqMJ9QK
// ============================================================

const UTMIFY_TOKEN = 'C6V4hBgSwBgTWYterwiwShqluMgKFyqMJ9QK';
const UTMIFY_ENDPOINT = 'https://api.utmify.com.br/api-credentials/orders';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
};

export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
    });
  }

  try {
    const body = await request.json();
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const orderId = String(body.orderId || body.transactionId || 'ord_' + Date.now());
    const isPaid = body.status === 'paid' || body.status === 'approved';
    const status = isPaid ? 'paid' : 'waiting_payment';
    const amountInCents = Number(body.amountInCents || body.amount || 0);
    const customer = body.customer || {};
    const tracking = body.tracking || {};
    const productName = body.productName || 'Taxa de Liberação';

    const cleanCpf = String(customer.cpf || customer.document || '').replace(/\D/g, '') || null;
    const cleanPhone = String(customer.phone || '').replace(/\D/g, '') || null;
    const cleanName = String(customer.name || 'Cliente').trim();
    const cleanEmail = String(customer.email || (cleanCpf ? `cliente_${cleanCpf}@pixrecebimento.com` : 'cliente@pagamento.com')).trim();

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
        id: String(body.productId || 'prod_1'),
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

    const res = await fetch(UTMIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': UTMIFY_TOKEN
      },
      body: JSON.stringify(utmifyPayload)
    });

    const resData = await res.json().catch(() => ({}));
    return new Response(JSON.stringify({ success: res.ok, status: res.status, utmify: resData }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS }
    });
  }
}
