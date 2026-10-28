# ⚡ Pokédex Interativa — Bootcamp II

Aplicação web interativa que consome a **PokeAPI** para buscar informações de Pokémon, com um "Meu Time" persistido em banco de dados real (**Supabase**) e empacotada com **Docker**.

## 🔗 Links

- **Repositório (GitHub):** https://github.com/GabrielPaes17/bootcamp2-app
- **GitHub Pages (site publicado):** https://gabrielpaes17.github.io/bootcamp2-app/
- **Imagem no Docker Hub:** https://hub.docker.com/r/gabriel0paes17/bootcamp2-app

## 🧩 Tecnologias

- HTML5, CSS3, JavaScript (ES6+)
- PokeAPI (REST)
- Supabase (persistência em banco de dados)
- Docker + Nginx (nginx:alpine)

## 💾 Persistência (Etapa 02 - Parte A)

O "Meu Time" de Pokémon é salvo em um banco de dados real no **Supabase**, usando a tabela `time_pokemon` com os campos `id`, `created_at`, `nome_pokemon` e `numero`. O app faz operações de **CRUD** (criar, listar e remover) via `@supabase/supabase-js`, usando a *Publishable key* (chave pública). As políticas de RLS estão abertas por se tratar de um projeto acadêmico.

## 🐳 Como rodar com Docker (Etapa 02 - Parte B)

Puxar a imagem e rodar:

```bash
docker run -d -p 8080:80 gabriel0paes17/bootcamp2-app:latest

## 👤 Autor

Gabriel Paes — 22610131
