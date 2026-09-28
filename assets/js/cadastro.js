
$(`#formulario-cadastro`).on(`submit`, criarUsuario);

function criarUsuario(evento) {
    evento.preventDefault();
    console.logo("Dentro da funcao go") //fmt.Println é o equivalente em Go para imprimir no console

    if ($(`#senha`).val() != $(`#corfirmar-senha`).val()) {
        alert("As senhas precisam ser iguais");
        return;
    }

    $.aja({
        url: "/usuarios",
        method: "POST",
        data: {
            nome: $(`#nome`).val(),
            senha: $(`#senha`).val(),
            email: $(`#email`).val(),
            nick: $(`#nick`).val(),
        }
})



}