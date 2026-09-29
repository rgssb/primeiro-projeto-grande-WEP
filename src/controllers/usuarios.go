package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"

	"log"
	"net/http"
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
		log.Fatal(erro)
}

	response, erro := http.Post("http://localhost:8081/usuarios", "aplication/json", bytes.NewBuffer(usuario))
	if erro != nil {
		log.Fatal(erro)
	}
	
	defer response.Body.Close()
	
	fmt.Println(response.Body)





}