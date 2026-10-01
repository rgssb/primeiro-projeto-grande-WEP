package controllers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"time"
	"webapp/src/respostas"
)

// RealizarLogin utiliza o email e a senha para autenticar a aplicacao
func RealizarLogin(w http.ResponseWriter, r *http.Request) {
	usuario, erro := json.Marshal(map[string]string{
		"email": r.FormValue("email"),
		"senha": r.FormValue("senha"),
	})
	if erro != nil {
		respostas.JSON(w, http.StatusBadRequest, respostas.ErroAPI{Erro: erro.Error()})
		return
	}

	response, erro := http.Post(apiURL+"/login", "application/json", bytes.NewBuffer(usuario))
	if erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroAPI{Erro: erro.Error()})
		return
	}
	defer response.Body.Close()

	if response.StatusCode >= http.StatusBadRequest {
		respostas.TratarStatusCodeDeErro(w, response)
		return
	}

	token, erro := io.ReadAll(response.Body)
	if erro != nil {
		respostas.JSON(w, http.StatusBadGateway, respostas.ErroAPI{Erro: "Não foi possível ler a resposta da API."})
		return
	}

	if strings.TrimSpace(string(token)) == "" {
		respostas.JSON(w, http.StatusBadGateway, respostas.ErroAPI{Erro: "A API não retornou um token de autenticação."})
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    string(token),
		Path:     "/",
		Expires:  time.Now().Add(12 * time.Hour),
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Secure:   r.TLS != nil,
	})
	w.WriteHeader(http.StatusNoContent)
}
