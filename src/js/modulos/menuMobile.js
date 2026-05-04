export function initMenuMobile() {
    const navLinks = document.querySelectorAll('nav a, header a, footer a');
    
    // Navegação suave
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const btnMobileToggle = document.getElementById('btnMobileToggle');
    const btnMobileClose = document.getElementById('btnMobileClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMenu() {
        if (!mobileMenuOverlay) return;
        mobileMenuOverlay.classList.remove('hidden');
        mobileMenuOverlay.classList.add('flex');
        
        // Usar setTimeout para garantir que a transição de opacidade funcione após a remoção do display:none
        setTimeout(() => {
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuOverlay.classList.add('opacity-100');
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Bloqueia scroll inferior
    }

    function closeMenu() {
        if (!mobileMenuOverlay) return;
        mobileMenuOverlay.classList.remove('opacity-100');
        mobileMenuOverlay.classList.add('opacity-0');
        
        // Aguarda a transição terminar antes de ocultar no DOM
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
            mobileMenuOverlay.classList.remove('flex');
        }, 300); // Equivale a duration-300 no Tailwind
        
        document.body.style.overflow = ''; // Restaura scroll inferior
    }

    if (btnMobileToggle) {
        btnMobileToggle.addEventListener('click', openMenu);
    }

    if (btnMobileClose) {
        btnMobileClose.addEventListener('click', closeMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}
