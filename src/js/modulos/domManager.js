/**
 * Módulo para manipulação do DOM e interações de UI.
 * Implementa o princípio de Responsabilidade Única (S do SOLID).
 */

export class DomManager {
  constructor() {
    this.menuMobile = document.getElementById('menu-mobile');
    this.btnAbrirMenu = document.getElementById('abrir-menu');
    this.btnFecharMenu = document.getElementById('fechar-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
  }

  /**
   * Inicializa os ouvintes de eventos da UI.
   */
  init() {
    if (this.btnAbrirMenu && this.btnFecharMenu) {
      this.btnAbrirMenu.addEventListener('click', () => this.toggleMenu(true));
      this.btnFecharMenu.addEventListener('click', () => this.toggleMenu(false));
    }

    // Fechar menu ao clicar em links (navegação ancorada)
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.toggleMenu(false));
    });

    // Header fixo ao rolar
    window.addEventListener('scroll', () => this.handleScroll());
  }

  /**
   * Abre ou fecha o menu mobile.
   * @param {boolean} aberto 
   */
  toggleMenu(aberto) {
    if (this.menuMobile) {
      if (aberto) {
        this.menuMobile.classList.replace('hidden', 'flex');
        document.body.classList.add('overflow-hidden');
      } else {
        this.menuMobile.classList.replace('flex', 'hidden');
        document.body.classList.remove('overflow-hidden');
      }
    }
  }

  /**
   * Controla a aparência do header durante a rolagem.
   */
  handleScroll() {
    const header = document.getElementById('main-header');
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
}
