import '../css/style.css';
import { initMenuMobile } from './modulos/menuMobile.js';
import { initContadores } from './modulos/contadores.js';
import { initContato } from './modulos/contato.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa funções globais e componentes da UI
    initMenuMobile();
    initContadores();
    initContato();
    
    console.log('Aplicação iniciada com sucesso (SOLID One-Page)');
});
