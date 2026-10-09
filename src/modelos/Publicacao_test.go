package modelos

import (
	"encoding/json"
	"testing"
)

func TestPublicacaoDecodificaAutorIDDaAPI(t *testing.T) {
	const resposta = `{"id":12,"titulo":"Teste","conteudo":"Conteúdo","autorId":7,"autorNick":"orby","curtidas":0}`

	var publicacao Publicacao
	if erro := json.Unmarshal([]byte(resposta), &publicacao); erro != nil {
		t.Fatalf("não foi possível decodificar a publicação: %v", erro)
	}

	if publicacao.AutorID != 7 {
		t.Fatalf("AutorID = %d; esperado 7", publicacao.AutorID)
	}
}
