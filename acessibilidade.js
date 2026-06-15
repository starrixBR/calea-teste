/* ══════════════════════════════════════════
   ACESSIBILIDADE — Aumentar Fonte e Modos Daltônicos
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    const btnAcessibilidade = document.getElementById('btn-acessibilidade');
    const painelAcessibilidade = document.getElementById('painel-acessibilidade');
    const btnFecharPainel = document.getElementById('btn-fechar-painel');
    
    // ── ABRIR/FECHAR PAINEL ──
    btnAcessibilidade.addEventListener('click', () => {
        painelAcessibilidade.removeAttribute('hidden');
    });
    
    btnFecharPainel.addEventListener('click', () => {
        painelAcessibilidade.setAttribute('hidden', '');
    });
    
    // Fechar ao clicar fora
    painelAcessibilidade.addEventListener('click', (e) => {
        if (e.target === painelAcessibilidade) {
            painelAcessibilidade.setAttribute('hidden', '');
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
            modoBtns.forEach(b => b.classList.remove('ativo'));
            
            // Adicionar nova classe
            if (novoModo !== 'normal') {
                document.body.classList.add(`modo-${novoModo}`);
            }
            btn.classList.add('ativo');
            currentMode = novoModo;
            
            // Salvar preferência
            localStorage.setItem('modo-cores', novoModo);
        });
    });

    // Restaurar preferência salva
    const savedMode = localStorage.getItem('modo-cores') || 'normal';
    if (savedMode !== 'normal') {
        const btnMode = document.querySelector(`[data-modo="${savedMode}"]`);
        if (btnMode) {
            btnMode.click();
        }
    }

    // ── INJETAR FILTROS SVG PARA DALTONISMO ──
    function injetarFiltrosDaltonismo() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('style', 'display: none;');
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
