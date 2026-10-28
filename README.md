cat > README.md << 'FIM'
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
- Jest + GitHub Actions (testes automáticos / CI)

## 💾 Persistência (Etapa 02 - Parte A)

O "Meu Time" de Pokémon é salvo no **Supabase**, na tabela `time_pokemon` (campos: `id`, `created_at`, `nome_pokemon`, `numero`). O app faz **CRUD** via `@supabase/supabase-js`, usando a Publishable key. As políticas de RLS estão abertas por ser projeto acadêmico.

## 🐳 Como rodar com Docker (Etapa 02 - Parte B)

    docker run -d -p 8080:80 gabriel0paes17/bootcamp2-app:latest

Depois acesse: http://localhost:8080

Build local (opcional):

    docker build -t bootcamp2-app .
    docker run -d -p 8080:80 bootcamp2-app

## 🧪 Testes (Etapa 03)

    npm install
    npm test

Os testes rodam automaticamente no GitHub Actions a cada push/PR na branch main (workflow em `.github/workflows/ci.yml`).

## 🏅 Sidequests

- **SQ2 — Tags:** imagem publicada com as tags `1.0`, `1.1` e `latest`.
- **SQ3 — Overview:** repositório público e com descrição no Docker Hub.
- **SQ4 — Múltiplos containers:** dois containers da mesma imagem nas portas `8080` e `8081`. Evidência: `evidencia-sq4.txt` (saída do `docker ps`) e `evidencia-sq4.png`.

## 👤 Autor

Gabriel da Conceição Paes — GabrielPaes17
FIM
