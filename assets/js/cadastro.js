
document.getElementById("form-cadastro").addEventListener("submit", criarUsuario);

async function criarUsuario(evento) {
    evento.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas precisam ser iguais");
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

        alert("Usuário cadastrado.");
    } catch (erro) {
        alert(erro.message);
    }
}