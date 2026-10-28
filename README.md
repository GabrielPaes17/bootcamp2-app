cat > README.md << 'EOF'
# ⚡ Pokédex Interativa — Bootcamp II

Aplicação web interativa que consome a **PokeAPI** para buscar informações de Pokémon, com um "Meu Time" persistido em banco de dados real (**Supabase**) e empacotada com **Docker**.

## 🔗 Links

- **Repositório (GitHub):** https://github.com/GabrielPaes17/bootcamp2-app
- **GitHub Pages:** https://gabrielpaes17.github.io/bootcamp2-app/
- **Docker Hub:** https://hub.docker.com/r/gabriel0paes17/bootcamp2-app

## 🧩 Tecnologias

- HTML5, CSS3, JavaScript (ES6+)
- PokeAPI (REST)
- Supabase (persistência em banco de dados)
- Docker + Nginx (nginx:alpine)

## 💾 Persistência (Etapa 02 - Parte A)

O "Meu Time" de Pokémon é salvo em um banco de dados real no **Supabase**, na tabela `time_pokemon` (campos: `id`, `created_at`, `nome_pokemon`, `numero`). O app faz **CRUD** (criar, listar e remover) via `@supabase/supabase-js`, usando a Publishable key (chave pública). As políticas de RLS estão abertas por se tratar de um projeto acadêmico.

## 🐳 Como rodar com Docker (Etapa 02 - Parte B)

Puxar a imagem e rodar:

    docker run -d -p 8080:80 gabriel0paes17/bootcamp2-app:latest

Depois acesse: http://localhost:8080

Build local (opcional):

    docker build -t bootcamp2-app .
    docker run -d -p 8080:80 bootcamp2-app

## 🏅 Sidequests

- **SQ2 — Tags:** imagem publicada com as tags `1.0`, `1.1` e `latest`.
- **SQ3 — Overview:** repositório público e com descrição no Docker Hub.
- **SQ4 — Múltiplos containers:** dois containers da mesma imagem rodando ao mesmo tempo nas portas `8080` e `8081`. Evidência: arquivo `evidencia-sq4.txt` (saída do `docker ps`) e imagem `evidencia-sq4.png`.

## 👤 Autor

Gabriel da Conceição Paes — GabrielPaes17
