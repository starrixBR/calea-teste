// CALEA — Menu hamburguer responsivo
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
