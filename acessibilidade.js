/* ══════════════════════════════════════════
   ACESSIBILIDADE — Aumentar Fonte e Modos Daltônicos
   WCAG 2.1 AA/AAA Compliant
   ══════════════════════════════════════════ */

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
