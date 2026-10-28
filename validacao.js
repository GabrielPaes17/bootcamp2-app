// Funções utilitárias testadas pelo CI

function validarEntrada(texto) {
  return typeof texto === "string" && texto.trim().length > 0;
}

function formatarNome(nome) {
  if (!validarEntrada(nome)) return "";
  return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

module.exports = { validarEntrada, formatarNome };
