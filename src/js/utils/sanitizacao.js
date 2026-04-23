/**
 * Funções de segurança e sanitização das entradas do usuário
 */

export function sanitizarTexto(input) {
    if (!input) return '';
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input; 
    return tempDiv.innerHTML;
}

export function prevenirXss(formulario) {
    if (!formulario) return;
    formulario.addEventListener('submit', (e) => {
        // Validação padrão, pode ser estendida pelo módulo do formulário
        const inputs = formulario.querySelectorAll('input, textarea');
        inputs.forEach(el => {
            el.value = sanitizarTexto(el.value);
        });
    });
}
