// ===== Pokédex Interativa - PokeAPI =====

const API_URL = 'https://pokeapi.co/api/v2/';
const MAX_POKEMON = 898;

// Elementos da página
const searchInput = document.getElementById('search-input');
const btnSearch = document.getElementById('btn-search');
const btnRandom = document.getElementById('btn-random');
const resultArea = document.getElementById('result-area');

// Cores das barras de stat
const statColors = {
  hp: '#ff5959',
  attack: '#f5ac78',
  defense: '#78c850',
  'special-attack': '#9b7ebd',
  'special-defense': '#7bc8a8',
  speed: '#6dabd4'
};

// ===== EVENTOS =====
btnSearch.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    buscarPorNome(query);
  }
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btnSearch.click();
  }
});

btnRandom.addEventListener('click', () => {
  buscarAleatorio();
});

// ===== BUSCAR POKÉMON POR NOME OU ID =====
async function buscarPorNome(nomeOuId) {
  resultArea.innerHTML = '<div class="loading">Carregando</div>';

  try {
    const res = await fetch(API_URL + 'pokemon/' + nomeOuId);
    if (!res.ok) throw new Error('Pokémon não encontrado');
    const data = await res.json();
    mostrarPokemon(data);
  } catch (err) {
    resultArea.innerHTML = '<div class="error-msg">⚠️ ' + err.message + '. Tente outro nome ou número.</div>';
  }
}

// ===== BUSCAR POKÉMON ALEATÓRIO =====
function buscarAleatorio() {
  const id = Math.floor(Math.random() * MAX_POKEMON) + 1;
  buscarPorNome(String(id));
}

// ===== MOSTRAR DADOS DO POKÉMON =====
function mostrarPokemon(p) {
  const nome = p.name;
  const id = p.id;
  const img = p.sprites.other['official-artwork'].front_default || p.sprites.front_default;
  const tipos = p.types.map(t => t.type.name);
  const altura = (p.height / 10).toFixed(1);
  const peso = (p.weight / 10).toFixed(1);

  // Montar badges de tipo
  const badgesHTML = tipos.map(tipo => {
    return '<span class="type-badge type-' + tipo + '">' + tipo + '</span>';
  }).join('');

  // Montar barras de stats
  const statsHTML = p.stats.map(s => {
    const nomeStat = s.stat.name;
    const valor = s.base_stat;
    const cor = statColors[nomeStat] || '#ccc';
    const largura = Math.min((valor / 255) * 100, 100);
    return '<div class="stat-row">' +
      '<span class="stat-name">' + formatarStat(nomeStat) + '</span>' +
      '<div class="stat-bar"><div class="stat-fill" style="width:' + largura + '%;background:' + cor + '"></div></div>' +
      '<span class="stat-value">' + valor + '</span>' +
      '</div>';
  }).join('');

  // Montar habilidades
  const habilidadesHTML = p.abilities.map(a => {
    const nome = a.ability.name.replace('-', ' ');
    return '<span style="background:rgba(255,255,255,0.1);padding:0.2rem 0.6rem;border-radius:12px;font-size:0.8rem;margin:0.2rem;display:inline-block;">' + nome + '</span>';
  }).join('');

  resultArea.innerHTML =
    '<div class="pokemon-detail">' +
      '<img src="' + img + '" alt="' + nome + '">' +
      '<h2>' + nome + '</h2>' +
      '<p class="pokemon-id">#' + String(id).padStart(3, '0') + '</p>' +
      '<div class="type-badges">' + badgesHTML + '</div>' +
      '<div class="physical-info">' +
        '<span>📏 ' + altura + ' m</span>' +
        '<span>⚖️ ' + peso + ' kg</span>' +
      '</div>' +
      '<div style="margin-top:1rem;"><strong style="color:#ccc;font-size:0.85rem;">Habilidades:</strong><br>' + habilidadesHTML + '</div>' +
      '<div class="stats">' +
        '<h3 style="text-align:center;margin-bottom:0.5rem;color:#ffcb05;">Base Stats</h3>' +
        statsHTML +
      '</div>' +
    '</div>';

  // Buscar cadeia de evolução
  buscarEvolucao(p.species.url);
}

// ===== BUSCAR CADEIA DE EVOLUÇÃO =====
async function buscarEvolucao(speciesUrl) {
  try {
    const resSpecies = await fetch(speciesUrl);
    const dataSpecies = await resSpecies.json();

    const resEvo = await fetch(dataSpecies.evolution_chain.url);
    const dataEvo = await resEvo.json();

    const evolucoes = [];
    let evo = dataEvo.chain;

    while (evo) {
      const nomeEvo = evo.species.name;
      const urlEvo = evo.species.url;
      // Extrair ID do Pokémon da URL da espécie
      const parts = urlEvo.split('/');
      const idEvo = parts[parts.length - 2];
      evolucoes.push({ name: nomeEvo, id: idEvo });

      // Pular para próxima evolução
      if (evo.evolves_to.length > 0) {
        evo = evo.evolves_to[0];
        // Se tem mais de uma evolução (ex: Eevee), pegar todas
        if (evo.evolves_to && evo.evolves_to.length > 1) {
          for (let i = 1; i < evo.evolves_to.length; i++) {
            const altEvo = evo.evolves_to[i];
            const altNome = altEvo.species.name;
            const altUrl = altEvo.species.url;
            const altParts = altUrl.split('/');
            const altId = altParts[altParts.length - 2];
            evolucoes.push({ name: altNome, id: altId });
          }
        }
      } else {
        evo = null;
      }
    }

    mostrarEvolucoes(evolucoes);
  } catch (err) {
    // Se não conseguir buscar evoluções, não mostra a seção
    }
}

// ===== MOSTRAR EVOLUÇÕES =====
function mostrarEvolucoes(evolucoes) {
  if (evolucoes.length <= 1) return;

  const cardsHTML = evolucoes.map(evo => {
    const imgEvo = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + evo.id + '.png';
    return '<div class="pokemon-mini-card" onclick="buscarPorNome(\'' + evo.name + '\')">' +
      '<img src="' + imgEvo + '" alt="' + evo.name + '">' +
      '<p>' + evo.name + '</p>' +
    '</div>';
  }).join('');

  const evoArea = document.createElement('div');
  evoArea.className = 'evolution-area';
  evoArea.innerHTML = '<h3>Evolução</h3><div class="evolution-list">' + cardsHTML + '</div>';

  resultArea.appendChild(evoArea);
}

// ===== FORMATAR NOME DO STAT =====
function formatarStat(nome) {
  const nomes = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed': 'SPD'
  };
  return nomes[nome] || nome.toUpperCase();
}
