package main

import (
	"fmt"
	"log"
	"net/http"
	"webapp/src/config"
	"webapp/src/router"
	"webapp/src/utils"
)

func main() {
	config.Carregar()
	utils.CarregarTemplates()
	r := router.Gerar()

	fmt.Printf("Rodando na Porta %s\n", config.Porta)
	log.Fatal(http.ListenAndServe(":"+config.Porta, r))
}
