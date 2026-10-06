package middlewares

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAutenticarRedirecionaQuandoCookieEstaAusente(t *testing.T) {
	proximaFuncaoExecutada := false
	handler := Autenticar(func(http.ResponseWriter, *http.Request) {
		proximaFuncaoExecutada = true
	})

	requisicao := httptest.NewRequest(http.MethodGet, "/home", nil)
	resposta := httptest.NewRecorder()
	handler.ServeHTTP(resposta, requisicao)

	if resposta.Code != http.StatusFound {
		t.Fatalf("status = %d, esperado %d", resposta.Code, http.StatusFound)
	}
	if local := resposta.Header().Get("Location"); local != "/login" {
		t.Fatalf("Location = %q, esperado %q", local, "/login")
	}
	if proximaFuncaoExecutada {
		t.Fatal("a próxima função não deveria executar sem cookie")
	}
}
