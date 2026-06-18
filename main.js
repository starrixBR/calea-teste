/* ══════════════════════════════════════════
   CALEA — Script Principal Unificado
   Consolida: Menu Hamburguer + Acessibilidade
   ══════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════
// PARTE 1: MENU HAMBURGUER RESPONSIVO
// ═══════════════════════════════════════════════════════════
(function () {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Pega apenas os <a> filhos diretos do nav
    const links = Array.from(nav.children).filter(el => el.tagName === 'A');
    if (links.length === 0) return;

    // Cria o botão hamburguer
    const toggle = document.createElement('button');
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'Abrir menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-links');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    // Envolve os links numa div
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    navLinks.id = 'nav-links';
    links.forEach(a => navLinks.appendChild(a));

    nav.appendChild(toggle);
    nav.appendChild(navLinks);

    // Toggle do menu
    toggle.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha ao clicar num link
    navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
        });
    });

    // Fecha ao pressionar Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
            toggle.focus();
        }
    });

    // Fecha ao clicar fora do nav
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
        }
    });

    // ESC para fechar o menu (compatibilidade com comunidade.html)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            window.location.hash = '';
        }
    });
})();

// ═══════════════════════════════════════════════════════════
// PARTE 2: ACESSIBILIDADE — Aumentar Fonte e Modos Daltônicos
// WCAG 2.1 AA/AAA Compliant
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    const btnAcessibilidade = document.getElementById('btn-acessibilidade');
    const painelAcessibilidade = document.getElementById('painel-acessibilidade');
    const btnFecharPainel = document.getElementById('btn-fechar-painel');
    
    // ── ABRIR/FECHAR PAINEL ──
    btnAcessibilidade.addEventListener('click', () => {
        painelAcessibilidade.removeAttribute('hidden');
        // Focar no primeiro elemento interativo do painel
        setTimeout(() => btnFecharPainel.focus(), 100);
    });
    
    btnFecharPainel.addEventListener('click', () => {
        painelAcessibilidade.setAttribute('hidden', '');
        btnAcessibilidade.focus();
    });
    
    // Fechar ao clicar fora (WCAG 2.5.2 Pointer Cancellation)
    painelAcessibilidade.addEventListener('click', (e) => {
        if (e.target === painelAcessibilidade) {
            painelAcessibilidade.setAttribute('hidden', '');
            btnAcessibilidade.focus();
        }
    });
    
    // Fechar ao pressionar ESC (WCAG 2.1.1 Keyboard)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !painelAcessibilidade.hasAttribute('hidden')) {
            painelAcessibilidade.setAttribute('hidden', '');
            btnAcessibilidade.focus();
        }
    });

    // ── CONTROLE DE TAMANHO DE FONTE ──
    const btnFontMaior = document.getElementById('btn-font-maior');
    const btnFontMenor = document.getElementById('btn-font-menor');
    const btnFontReset = document.getElementById('btn-font-reset');
    const fontAtual = document.getElementById('font-atual');
    let currentFontSize = 100; // em percentual

    function updateFontSize(percentage) {
        currentFontSize = Math.max(80, Math.min(150, percentage)); // Limita entre 80% e 150%
        document.body.style.fontSize = (16 * currentFontSize / 100) + 'px';
        fontAtual.textContent = currentFontSize + '%';
        
        // Anunciar mudança para leitores de tela (WCAG 4.1.3 Status Messages)
        announcerFontChange(currentFontSize);
        
        // Salvar preferência
        localStorage.setItem('font-size', currentFontSize);
    }

    btnFontMaior.addEventListener('click', () => {
        updateFontSize(currentFontSize + 10);
    });

    btnFontMenor.addEventListener('click', () => {
        updateFontSize(currentFontSize - 10);
    });

    btnFontReset.addEventListener('click', () => {
        updateFontSize(100);
        localStorage.removeItem('font-size');
    });
    
    // Suporte a teclado para botões de fonte
    [btnFontMaior, btnFontMenor, btnFontReset].forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Restaurar preferência salva
    const savedFontSize = localStorage.getItem('font-size');
    if (savedFontSize) {
        updateFontSize(parseInt(savedFontSize));
    }

    // ── MODOS DE CORES PARA DALTÔNICOS ──
    const modoBtns = document.querySelectorAll('.modo-btn');
    let currentMode = 'normal';

    // Injetar filtros SVG para daltonismo
    injetarFiltrosDaltonismo();

    modoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const novoModo = btn.dataset.modo;
            
            // Remover classe ativo anterior
            document.body.classList.remove(`modo-${currentMode}`);
            modoBtns.forEach(b => {
                b.classList.remove('ativo');
                b.setAttribute('aria-pressed', 'false');
            });
            
            // Adicionar nova classe
            if (novoModo !== 'normal' && novoModo !== 'Padrão') {
                document.body.classList.add(`modo-${novoModo}`);
            }
            btn.classList.add('ativo');
            btn.setAttribute('aria-pressed', 'true');
            currentMode = novoModo;
            
            // Anunciar para leitores de tela
            announcerModeChange(novoModo);
            
            // Salvar preferência
            localStorage.setItem('modo-cores', novoModo);
        });
        
        // Suporte a teclado
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Restaurar preferência salva
    const savedMode = localStorage.getItem('modo-cores') || 'normal';
    if (savedMode !== 'normal' && savedMode !== 'Padrão') {
        const btnMode = document.querySelector(`[data-modo="${savedMode}"]`);
        if (btnMode) {
            btnMode.click();
        }
    }

    // ── LEITOR DE TELA (WCAG 4.1.3 Status Messages) ──
    function announcerFontChange(size) {
        announceMessage(`Tamanho da fonte alterado para ${size}%`);
    }
    
    function announcerModeChange(mode) {
        const labels = {
            'normal': 'Padrão',
            'Padrão': 'Padrão',
            'protanopia': 'Modo Protanopia',
            'deuteranopia': 'Modo Deuteranopia',
            'tritanopia': 'Modo Tritanopia'
        };
        announceMessage(`Modo de cores alterado para ${labels[mode] || mode}`);
    }
    
    function announceMessage(message) {
        // Criar div aria-live para anúncios
        let announcer = document.getElementById('aria-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'aria-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
        // Limpar após 2 segundos
        setTimeout(() => {
            announcer.textContent = '';
        }, 2000);
    }

    // ── INJETAR FILTROS SVG PARA DALTONISMO ──
    function injetarFiltrosDaltonismo() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('style', 'display: none;');
        svg.setAttribute('role', 'presentation');
        svg.setAttribute('aria-hidden', 'true');
        svg.innerHTML = `
            <defs>
                <!-- Protanopia (Daltonismo Vermelho-Verde) -->
                <filter id="protanopia-filter">
                    <feColorMatrix type="matrix" values="
                        0.567,0.433,0,0,0
                        0.558,0.442,0,0,0
                        0,0.242,0.758,0,0
                        0,0,0,1,0"
                    />
                </filter>
                
                <!-- Deuteranopia (Daltonismo Vermelho-Verde) -->
                <filter id="deuteranopia-filter">
                    <feColorMatrix type="matrix" values="
                        0.625,0.375,0,0,0
                        0.7,0.3,0,0,0
                        0,0.3,0.7,0,0
                        0,0,0,1,0"
                    />
                </filter>
                
                <!-- Tritanopia (Daltonismo Azul-Amarelo) -->
                <filter id="tritanopia-filter">
                    <feColorMatrix type="matrix" values="
                        0.95,0.05,0,0,0
                        0,0.433,0.567,0,0
                        0,0.475,0.525,0,0
                        0,0,0,1,0"
                    />
                </filter>
            </defs>
        `;
        document.body.appendChild(svg);
    }
});

// ── MODO ESCURO ──
    const btnDarkMode = document.getElementById('btn-darkmode');

    if (btnDarkMode) {
        function aplicarModoEscuro(ativo) {
            document.body.classList.toggle('dark-mode', ativo);
            btnDarkMode.setAttribute('aria-pressed', String(ativo));
            btnDarkMode.textContent = ativo ? 'Modo Claro' : 'Modo Escuro';
        }

        btnDarkMode.addEventListener('click', () => {
            const novoEstado = !document.body.classList.contains('dark-mode');
            aplicarModoEscuro(novoEstado);
            announceMessage(novoEstado ? 'Modo escuro ativado' : 'Modo escuro desativado');
            localStorage.setItem('modo-escuro', novoEstado ? '1' : '0');
        });

        btnDarkMode.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btnDarkMode.click();
            }
        });

        // Restaurar preferência salva
        aplicarModoEscuro(localStorage.getItem('modo-escuro') === '1');
    }