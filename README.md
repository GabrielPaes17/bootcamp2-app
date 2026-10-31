# Pokédex — Bootcamp II (Etapa 03)

Aplicação web de uma **Pokédex** feita com HTML, CSS e JavaScript, que consome a **PokeAPI** para exibir os Pokémon e usa o **Supabase** (PostgreSQL) para persistir um "Meu Time" em um banco real. O projeto é conteinerizado com **Docker** e conta com **testes automatizados (Jest)** e **Integração Contínua (GitHub Actions)**.

---

## 👥 Integrantes

| Nome | Usuário GitHub | Função |
|------|----------------|--------|
| Gabriel Paes | [@GabrielPaes17](https://github.com/GabrielPaes17) | Desenvolvimento completo |

---

## 🔗 Links do projeto

- **Repositório (GitHub):** https://github.com/GabrielPaes17/bootcamp2-app
- **Site publicado (GitHub Pages):** https://gabrielpaes17.github.io/bootcamp2-app/
- **Imagem no Docker Hub:** https://hub.docker.com/r/gabriel0paes17/bootcamp2-app

---

## 📌 Sobre a aplicação

A Pokédex permite:

- Listar e visualizar Pokémon com seus dados (nome, imagem, tipos etc.);
- Salvar Pokémon no "Meu Time" em um banco de dados real;
- Listar e remover os Pokémon salvos (CRUD: criar / listar / excluir).

### API utilizada — PokeAPI

Os dados dos Pokémon são obtidos em tempo real da [PokeAPI](https://pokeapi.co/), uma API pública e gratuita, via requisições HTTP (fetch).

### Banco de dados — Supabase (PostgreSQL)

A persistência é feita no **Supabase** (PostgreSQL), na tabela `time_pokemon`. A aplicação se conecta via `@supabase/supabase-js@2` usando a **chave pública (Publishable / anon)**.

**CRUD implementado:** criar, listar e excluir.

> ⚠️ **Limitação conhecida:** o acesso usa a chave pública (anon) com **RLS (Row Level Security) aberto**, por ser um projeto acadêmico. A chave usada é sempre a **pública**, nunca a secreta.

---

## 🛠️ Tecnologias

- **Front-end:** HTML, CSS, JavaScript
- **API:** PokeAPI
- **Banco de dados:** Supabase (PostgreSQL)
- **Conteinização:** Docker (imagem base `nginx:alpine`)
- **Testes:** Jest
- **CI/CD:** GitHub Actions

---

## ▶️ Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielPaes17/bootcamp2-app.git
   cd bootcamp2-app
   ```
2. Suba um servidor local simples:
   ```bash
   python3 -m http.server 8080
   ```
3. Acesse: `http://localhost:8080`

---

## 🐳 Como rodar com Docker

```bash
docker run -p 8080:80 gabriel0paes17/bootcamp2-app:latest
```

Depois acesse: `http://localhost:8080`

**Tags disponíveis:** `1.0`, `1.1`, `latest`

---

## 🧪 Como rodar os testes

```bash
npm install
npm test
```

Os testes validam as funções de `validacao.js` (`validarEntrada` e `formatarNome`).

---

## ⚙️ CI e proteção da branch

O repositór
