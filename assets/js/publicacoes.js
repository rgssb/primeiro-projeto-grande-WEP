$('#nova-publicacao').on('submit', criarpublicacao);


function criarpublicacao(evento) {
    evento.preventDefault();
    
    $.ajax({
        url: "/publicacoes",
        method: "POST",
        data: {
            titulo: $('#titulo-publicacao').val(),
            conteudo: $('#conteudo-publicacao').val()
        }
    }).done(function() {
        window.location = "/home";
    }).fail(function() {
        alert("Erro ao criar publicação!");
    });

}