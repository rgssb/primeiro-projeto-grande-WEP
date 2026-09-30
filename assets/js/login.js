document.getElementById("login").addEventListener("submit", realizarLogin);

function mostrarMensagem(mensagem, sucesso) {
    const feedback = document.getElementById("form-message");
    feedback.textContent = mensagem;
    feedback.classList.toggle("is-success", sucesso);
}

async function realizarLogin(evento) {
    evento.preventDefault();

    const dados = new URLSearchParams({
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
    });

    try {
        const resposta = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: dados,
            credentials: "same-origin",
        });

        if (!resposta.ok) {
            const erro = await resposta.json().catch(() => ({}));
            throw new Error(erro.erro || "E-mail ou senha incorretos.");
        }

        window.OrbyMascot.success();
        window.location.assign("/home");
    } catch (erro) {
        window.OrbyMascot.error();
        mostrarMensagem(erro.message, false);
    }
}
