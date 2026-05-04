export function initContato() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Coletar dados
        const formData = new FormData(form);

        // 2. Modificar UI (Status de Loading)
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
        submitText.textContent = "Enviando...";
        submitSpinner.classList.remove('hidden');

        try {
            // 3. Fazer requisição POST
            const response = await fetch('/backend/send_email.php', {
                method: 'POST',
                body: formData
            });

            // 4. Analisar resposta
            const baseResult = await response.text();
            let result;
            try {
                result = JSON.parse(baseResult);
            } catch (err) {
                console.error("Resposta do servidor não é JSON: ", baseResult);
                throw new Error("Erro interno no servidor ao enviar e-mail.");
            }

            if (response.ok && result.status === 'success') {
                // Alerta Sucesso
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        title: 'Mensagem Enviada!',
                        text: 'Recebemos suas informações. Em breve nossa equipe entrará em contato.',
                        icon: 'success',
                        confirmButtonColor: '#002347',
                        confirmButtonText: 'Fechar'
                    });
                } else {
                    alert('Sua mensagem foi enviada com sucesso!');
                }
                form.reset();
            } else {
                throw new Error(result.message || "Erro desconhecido ao enviar formulário.");
            }
        } catch (error) {
            // Alerta Erro
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: 'Ops! Algo deu errado.',
                    text: error.message || 'Não foi possível enviar sua mensagem no momento. Confira sua conexão e tente novamente.',
                    icon: 'error',
                    confirmButtonColor: '#ba1a1a',
                    confirmButtonText: 'Tentar Novamente'
                });
            } else {
                alert('Erro ao enviar mensagem: ' + error.message);
            }
        } finally {
            // 5. Restaurar UI
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            submitText.textContent = "Enviar Mensagem";
            submitSpinner.classList.add('hidden');
        }
    });
}
