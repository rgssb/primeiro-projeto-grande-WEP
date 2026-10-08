package modelos

import "time"

// Publicacao representa uma publicação feita por um usuário.
type Publicacao struct {
	ID       uint   `json:"id,omitempty"`
	Titulo   string `json:"titulo,omitempty"`
	Conteudo string `json:"conteudo,omitempty"`
	AutorID  uint   `json:"autor_id,omitempty"`
	AutorNick string `json:"autor_nick,omitempty"`
	Curtidas  uint   `json:"curtidas"`
	CriadaEm time.Time `json:"criada_em,omitempty"`
}
