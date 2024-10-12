document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const mensagemDiv = document.getElementById('mensagem');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário

        // Capturar os dados do formulário
        const formData = {
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!result.erro) {
                mensagemDiv.style.color = 'green';
                mensagemDiv.textContent = result.mensagem;
                form.reset(); // Limpar o formulário

                // Redirecionar para a tela de catálogo após 2 segundos
                setTimeout(() => {
                    window.location.href = "/catalog";
                }, 2000);
            } else {
                mensagemDiv.style.color = 'red';
                mensagemDiv.textContent = result.mensagem;
            }
        } catch (error) {
            console.error('Erro:', error);
            mensagemDiv.style.color = 'red';
            mensagemDiv.textContent = 'Ocorreu um erro ao efetuar o login.';
        }
    });
});


