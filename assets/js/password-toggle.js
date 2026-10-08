document.querySelectorAll("[data-password-toggle]").forEach((botao) => {
    const campoSenha = document.getElementById(botao.getAttribute("aria-controls"));

    botao.addEventListener("click", () => {
        const mostrarSenha = campoSenha.type === "password";
        campoSenha.type = mostrarSenha ? "text" : "password";
        botao.setAttribute("aria-pressed", String(mostrarSenha));
        botao.setAttribute("aria-label", mostrarSenha ? "Ocultar senha" : "Mostrar senha");
    });
});
