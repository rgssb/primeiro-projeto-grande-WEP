package middlewares

import (
	"log"
	"net/http"
	"strings"
	"webapp/src/cookies"
)

// Logger escreve as informacoes no terminal
func Logger(proximaFuncao http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("\n %s %s %s", r.Method, r.RequestURI, r.Host)
		proximaFuncao(w, r)
	}
}

// Autenticar verifica a existencia de cookies
func Autenticar(proximaFuncao http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		valores, erro := cookies.Ler(r)
		if erro != nil ||
			strings.TrimSpace(valores["id"]) == "" ||
			strings.TrimSpace(valores["token"]) == "" {
			http.Redirect(w, r, "/login", http.StatusFound)
			return
		}

		proximaFuncao(w, r)
	}
}
