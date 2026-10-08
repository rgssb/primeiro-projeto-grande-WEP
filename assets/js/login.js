const formularioLogin = document.getElementById("login");
formularioLogin.addEventListener("submit", realizarLogin);

function mostrarMensagem(mensagem, sucesso) {
    const feedback = document.getElementById("form-message");
    feedback.textContent = mensagem;
    feedback.hidden = !mensagem;
    feedback.classList.toggle("alert-success", sucesso);
    feedback.classList.toggle("alert-danger", !sucesso);
}

async function realizarLogin(evento) {
    evento.preventDefault();

    formularioLogin.classList.add("was-validated");
    if (!formularioLogin.checkValidity()) {
        window.OrbyMascot.error();
        formularioLogin.querySelector(":invalid").focus();
        return;
    }

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
