package rotas

import "net/http"
import "webapp/src/controllers"

var rotasUsuarios = []Rota{
	{
	URI: "/criar-usuario",
	Metodo: http.MethodGet,
	Funcao: controllers.CarregarPaginaDeCadastroDeUsuario,
	RequerAutenticacao: false,
	},
}