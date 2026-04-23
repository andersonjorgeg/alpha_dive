import '../css/style.css';
import { initMenuMobile } from './modulos/menuMobile.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa funções globais e componentes da UI
    initMenuMobile();
    
    console.log('Aplicação iniciada com sucesso (SOLID One-Page)');
});
