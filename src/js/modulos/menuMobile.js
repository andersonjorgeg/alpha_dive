/**
 * Inicializa os eventos da navbar, navegação suave e destaque.
 */
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

    // Toggle menu mobile (botão hamburger, se houver)
    const btnMobile = document.querySelector('nav button.md\\:hidden');
    const menuContainer = document.querySelector('nav .hidden.md\\:flex');

    if (btnMobile && menuContainer) {
        btnMobile.addEventListener('click', () => {
            menuContainer.classList.toggle('hidden');
            menuContainer.classList.toggle('flex');
            menuContainer.classList.toggle('flex-col');
            menuContainer.classList.toggle('absolute');
            menuContainer.classList.toggle('top-full');
            menuContainer.classList.toggle('left-0');
            menuContainer.classList.toggle('w-full');
            menuContainer.classList.toggle('bg-white');
            menuContainer.classList.toggle('dark:bg-slate-950');
            menuContainer.classList.toggle('p-8');
            menuContainer.classList.toggle('shadow-xl');
        });
    }
}
