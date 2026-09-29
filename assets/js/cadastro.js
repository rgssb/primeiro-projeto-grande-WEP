
document.getElementById("form-cadastro").addEventListener("submit", criarUsuario);

function mostrarMensagem(mensagem, sucesso) {
    const feedback = document.getElementById("form-message");
    feedback.textContent = mensagem;
    feedback.classList.toggle("is-success", sucesso);
}

async function criarUsuario(evento) {
    evento.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {
        window.OrbyMascot.error();
        mostrarMensagem("As senhas precisam ser iguais.", false);
        return;
    }

    const dados = new URLSearchParams({
        nome: document.getElementById("nome").value,
        senha: senha,
        email: document.getElementById("email").value,
        nick: document.getElementById("nick").value,
    });

    try {
        const resposta = await fetch("/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: dados,
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível cadastrar o usuário.");
        }

        window.OrbyMascot.success();
        mostrarMensagem("Usuário cadastrado com sucesso.", true);
    } catch (erro) {
        window.OrbyMascot.error();
        mostrarMensagem(erro.message, false);
    }
}