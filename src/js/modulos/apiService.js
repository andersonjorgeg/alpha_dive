/**
 * Módulo para comunicações externas e processamento de dados.
 */

export class ApiService {
  /**
   * Simula o envio de um formulário de contato.
   * @param {Object} dados - Dados do formulário sanitizados.
   * @returns {Promise<Object>} - Resposta simulada.
   */
  async enviarContato(dados) {
    console.log('Enviando dados para API:', dados);
    
    // Simulação de delay de rede
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sucesso: true,
          mensagem: 'Contato enviado com sucesso!'
        });
      }, 1500);
    });
  }
}
