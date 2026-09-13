# ⚡ Pokédex Interativa

## Autor
Gabriel Paes — Matrícula 22610131

## Descrição
Aplicação web que permite pesquisar qualquer Pokémon pelo nome ou número e ver seus dados detalhados — tipo, altura, peso, estatísticas de batalha, habilidades e experiência base. Também é possível explorar Pokémon por tipo.

## API utilizada
- **PokéAPI** — https://pokeapi.co/
- Endpoint(s) consumido(s):
  - `GET /api/v2/pokemon/{nome ou id}` — busca dados de um Pokémon específico
  - `GET /api/v2/type/{tipo}` — lista Pokémon de um determinado tipo

## Funcionalidades
- 🔍 Busca de Pokémon pelo nome ou número
- 🏷️ Filtragem por tipo (Fire, Water, Grass, Electric, Psychic, Dragon, Ghost, Fighting)
- 📊 Exibição de 6+ informações: tipos, altura, peso, estatísticas de batalha, experiência base e habilidades
- 🎨 Artwork oficial do Pokémon em destaque
- 📈 Barras visuais de progresso para cada stat
- ✨ Indicação de habilidades ocultas
- 💡 Sugestões rápidas para busca (Pokémon populares)
- ⚠️ Tratamento de erros amigável (Pokémon não encontrado, erro de conexão)
- 📱 Design responsivo (funciona em celular, tablet e desktop)
- ⏳ Indicador de carregamento durante consultas
- ⌨️ Suporte a busca com tecla Enter

## Como executar localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielPaes17/bootcamp2-app.git