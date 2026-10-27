const UTMIFY_TOKEN = 'C6V4hBgSwBgTWYterwiwShqluMgKFyqMJ9QK';
const UTMIFY_ENDPOINT = 'https://api.utmify.com.br/api-credentials/orders';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok', msg: 'Aguardando POST da XPay' });
  }

  try {
    let payload = {};
    try {
      if (typeof req.body === 'string') {
        payload = JSON.parse(req.body);
      } else if (req.body && typeof req.body === 'object') {
        payload = req.body;
      }
    } catch (_) {
      payload = req.body || {};
    }
    const event = String(payload.event || payload.type || '');
    const data = payload.data || payload;

    const txId = String(data.id || data.transactionId || data.chargeId || '');
    if (!txId) {
      return res.status(200).json({ received: true, note: 'Sem transaction ID' });
    }

    const statusRaw = String(data.status || data.paymentStatus || event).toLowerCase();
    const isPaid = ['paid', 'approved', 'completed', 'charge.paid', 'payment.approved', 'confirmed'].some(s => statusRaw.includes(s));
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const amountCents = Number(data.amount || data.total || 0);
    const customer = data.customer || {};

    const cleanCpf = String(customer.taxId || customer.cpf || customer.document || '').replace(/\D/g, '') || null;
    const cleanPhone = String(customer.phone || customer.telefone || '').replace(/\D/g, '') || null;
    const cleanName = String(customer.name || customer.nome || 'Cliente').trim();
    const cleanEmail = String(customer.email || (cleanCpf ? `cliente_${cleanCpf}@pixrecebimento.com` : 'cliente@pagamento.com')).trim();

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
        id: 'prod_taxa',
        name: data.description || 'Taxa de Liberação',
        planId: 'plan_1',
        planName: data.description || 'Taxa de Liberação',
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

    let resData = {};
    try {
      const text = await utmRes.text();
      resData = JSON.parse(text);
    } catch (_) {}

    return res.status(200).json({ success: true, txId, status: isPaid ? 'paid' : 'waiting_payment', utmify: resData });
  } catch (err) {
    return res.status(200).json({ error: err.message, stack: err.stack });
  }
};
