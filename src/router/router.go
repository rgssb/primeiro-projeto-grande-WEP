package router

import "github.com/gorilla/mux"

//Gerar retorna um router com todas as rotas configuradas.
func Gerar() *mux.Route {
	return mux.NewRouter()
}