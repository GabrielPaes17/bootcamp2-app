const { validarEntrada, formatarNome } = require("./validacao");

test("rejeita entrada vazia", () => {
  expect(validarEntrada("")).toBe(false);
});

test("aceita entrada valida", () => {
  expect(validarEntrada("pikachu")).toBe(true);
});

test("formata nome com inicial maiuscula", () => {
  expect(formatarNome("pikachu")).toBe("Pikachu");
});
