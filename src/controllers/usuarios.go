package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"webapp/src/respostas"
)

const apiURL = "http://localhost:8081"

// CriarUsuario chama a API para cadastrar um usuario no banco de dados.
func CriarUsuario(w http.ResponseWriter, r *http.Request) {
	usuario, erro := json.Marshal(map[string]string{
		"nome":  r.FormValue("nome"),
		"senha": r.FormValue("senha"),
		"email": r.FormValue("email"),
		"nick":  r.FormValue("nick"),
	})

	if erro != nil {
		respostas.JSON(w, http.StatusBadRequest, respostas.ErroAPI{Erro: erro.Error() })
		return
	}

	response, erro := http.Post("http://localhost:8081/usuarios", "application/json", bytes.NewBuffer(usuario))
	if erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroAPI{Erro: erro.Error() })
		return
	}
	defer response.Body.Close()

	if response.StatusCode >= http.StatusBadRequest {
		respostas.TratarStatusCodeDeErro(w, response)
		return
	}

	respostas.JSON(w, response.StatusCode, nil)
}
