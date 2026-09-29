package controllers

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

// RealizarLogin encaminha as credenciais para a API.
func RealizarLogin(w http.ResponseWriter, r *http.Request) {
	credenciais, erro := json.Marshal(map[string]string{
		"email": r.FormValue("email"),
		"senha": r.FormValue("senha"),
	})
	if erro != nil {
		http.Error(w, "Nao foi possivel preparar os dados do login.", http.StatusInternalServerError)
		return
	}

	resposta, erro := http.Post(apiURL+"/login", "application/json", bytes.NewBuffer(credenciais))
	if erro != nil {
		http.Error(w, "Nao foi possivel conectar com a API.", http.StatusBadGateway)
		return
	}
	defer resposta.Body.Close()

	w.Header().Set("Content-Type", resposta.Header.Get("Content-Type"))
	w.WriteHeader(resposta.StatusCode)
	if _, erro = io.Copy(w, resposta.Body); erro != nil {
		log.Printf("erro ao copiar a resposta da API: %v", erro)
	}
}
