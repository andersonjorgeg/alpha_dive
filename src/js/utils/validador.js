/**
 * Utilitários para validação e segurança de dados.
 */

/**
 * Sanitiza uma string para evitar ataques XSS.
 * @param {string} texto - O texto a ser sanitizado.
 * @returns {string} - O texto limpo.
 */
export function sanitizarTexto(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

/**
 * Valida se um e-mail é válido.
 * @param {string} email - O e-mail a ser validado.
 * @returns {boolean} - Verdadeiro se for válido.
 */
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
