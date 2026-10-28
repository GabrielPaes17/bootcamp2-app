// Teste quebrado DE PROPOSITO para o "teste de fogo".
// Ele deve FALHAR, deixar o CI vermelho e bloquear o merge do PR.
test('este teste deve falhar de proposito', () => {
  expect(1 + 1).toBe(3);
});
