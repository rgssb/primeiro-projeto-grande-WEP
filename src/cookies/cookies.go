package cookies

import (
	"net/http"
	"webapp/src/config"

	"github.com/gorilla/securecookie"
)

var s *securecookie.SecureCookie

//Configurar utiliza as variaveis de ambiente paraa criacao de SecureCookie
func Configurar() {
	s = securecookie.New(config.HashKey, config.BlockKey)
}

//Salvar registra as informacoes de autenticacao
func Salvar(w http.ResponseWriter, ID, token string) error {
	
}