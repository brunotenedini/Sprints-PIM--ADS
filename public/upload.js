// upload.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const mensagemDiv = document.getElementById('mensagem');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário

        // Capturar os dados do formulário
        const formData = new FormData(form);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!result.erro) {
                mensagemDiv.style.color = 'green';
                mensagemDiv.textContent = result.mensagem;
                form.reset(); // Limpar o formulário
            } else {
                mensagemDiv.style.color = 'red';
                mensagemDiv.textContent = result.mensagem;
            }
        } catch (error) {
            console.error('Erro:', error);
            mensagemDiv.style.color = 'red';
            mensagemDiv.textContent = 'Ocorreu um erro ao enviar o curso.';
        }
    });
});
