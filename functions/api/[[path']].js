// ============================================================
// PROXY /api/* — Cloudflare Pages Function
// Substitui as regras de proxy do Netlify (_redirects com 200).
// Nada no front-end precisa mudar: as URLs /api/<gateway>/*
// continuam exatamente as mesmas.
// ============================================================

const UPSTREAMS = {
  xpay:      'https://api.xpaybrasil.com/v1',
  aven:      'https://api.avenpayments.com',
  techbynet: 'https://api-gateway.techbynet.com',
  activepay: 'https://api.activepay.com.br',
  ironpay:   'https://api.ironpayapp.com.br',
  unipay:    'https://api.fastsoftbrasil.com',
  paguex:    'https://api.paguex.online',
  moonfy:    'https://api.moooonfy.com.br',
  mangofy:   'https://checkout.mangofy.com.br',
  otimize:   'https://api.otimizepagamentos.com',
  sigilopay: 'https://app.sigilopay.com.br/api/v1',
  blackcat:  'https://api.blackcatpayments.com/api',
  cpf:       'https://api.amnesiatecnologia.lat',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS },
  });
}

export async function onRequest(context) {
  const { request } = context;

  // Pre-flight CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const url = new URL(request.url);

  // Caminho: /api/<gateway>/<resto...>
  const segments = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean);
  const gateway = (segments.shift() || '').toLowerCase();
  const base = UPSTREAMS[gateway];

  if (!base) {
    return jsonResponse({ error: 'Rota de API desconhecida', gateway }, 404);
  }

  // Monta a URL de destino (path + query string preservados)
  const target = base + (segments.length ? '/' + segments.join('/') : '/') + url.search;

  // Encaminha os headers do cliente, removendo os que quebram o proxy
  const headers = new Headers(request.headers);
  [
    'host', 'origin', 'referer', 'cookie', 'content-length',
    'cf-connecting-ip', 'cf-ipcountry', 'cf-ray', 'cf-visitor',
    'x-forwarded-for', 'x-forwarded-proto', 'x-real-ip',
  ].forEach((h) => headers.delete(h));

  if (gateway === 'techbynet') {
    headers.set('User-Agent', 'AtivoB2B/1.0');
  }

  const init = { method: request.method, headers, redirect: 'follow' };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  let upstream;
  try {
    upstream = await fetch(target, init);
  } catch (err) {
    return jsonResponse({ error: 'Falha ao contatar o gateway', detail: String(err) }, 502);
  }

  // Repassa a resposta do gateway, ajustando headers problemáticos
  const respHeaders = new Headers(upstream.headers);
  [
    'content-encoding', 'content-length', 'transfer-encoding',
    'connection', 'set-cookie', 'access-control-allow-origin',
  ].forEach((h) => respHeaders.delete(h));
  Object.entries(CORS_HEADERS).forEach(([k, v]) => respHeaders.set(k, v));

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: respHeaders,
  });
}