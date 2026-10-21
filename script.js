// ===== Pokédex Interativa - PokeAPI + Supabase =====

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Conexao com o banco Supabase
const supabase = createClient(
  "https://fotturdcuhnrishjiehy.supabase.co",
  "sb_publishable_QG-o-bWzrZ5YRclzE8OKsg_spvzVx3r"
);

const API_URL = 'https://pokeapi.co/api/v2/';
const MAX_POKEMON = 898;

// Elementos da pagina
const searchInput = document.getElementById('search-input');
const btnSearch = document.getElementById('btn-search');
const btnRandom = document.getElementById('btn-random');
const resultArea = document.getElementById('result-area');
const teamList = document.getElementById('team-list');

// Guarda o Pokemon exibido no momento (para o botao Favoritar)
let pokemonAtual = null;

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
  if (query) buscarPorNome(query);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnSearch.click();
});

btnRandom.addEventListener('click', () => buscarAleatorio());

// ===== BUSCAR POKEMON POR NOME OU ID (PokeAPI) =====
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

// ===== BUSCAR POKEMON ALEATORIO =====
function buscarAleatorio() {
  const id = Math.floor(Math.random() * MAX_POKEMON) + 1;
  buscarPorNome(String(id));
}

// ===== MOSTRAR DADOS DO POKEMON =====
function mostrarPokemon(p) {
  pokemonAtual = { nome: p.name, numero: p.id };

  const img = p.sprites.other['official-artwork'].front_default || p.sprites.front_default;
  const tipos = p.types.map(t => t.type.name);
  const altura = (p.height / 10).toFixed(1);
  const peso = (p.weight / 10).toFixed(1);

  const badgesHTML = tipos.map(tipo =>
    '<span class="type-badge type-' + tipo + '">' + tipo + '</span>'
  ).join('');

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

  resultArea.innerHTML =
    '<div class="pokemon-detail">' +
      '<img src="' + img + '" alt="' + p.name + '">' +
      '<h2>' + p.name + '</h2>' +
      '<p class="pokemon-id">#' + String(p.id).padStart(3, '0') + '</p>' +
      '<div class="type-badges">' + badgesHTML + '</div>' +
      '<div class="physical-info">' +
        '<span>📏 ' + altura + ' m</span>' +
        '<span>⚖️ ' + peso + ' kg</span>' +
      '</div>' +
      '<button class="btn btn-fav" id="btn-fav">⭐ Adicionar ao meu time</button>' +
      '<div class="stats">' +
        '<h3 style="text-align:center;margin:0.8rem 0 0.5rem;color:#ffcb05;">Base Stats</h3>' +
        statsHTML +
      '</div>' +
    '</div>';

  document.getElementById('btn-fav').addEventListener('click', () => {
    salvarFavorito(pokemonAtual.nome, pokemonAtual.numero);
  });
}

// ===== FORMATAR NOME DO STAT =====
function formatarStat(nome) {
  const nomes = {
    'hp': 'HP', 'attack': 'ATK', 'defense': 'DEF',
    'special-attack': 'SP.ATK', 'special-defense': 'SP.DEF', 'speed': 'SPD'
  };
  return nomes[nome] || nome.toUpperCase();
}

// ===================================================
// ===== PERSISTENCIA COM SUPABASE (CRUD do time) ====
// ===================================================

// CREATE - salvar um Pokemon no time
async function salvarFavorito(nome, numero) {
  const { error } = await supabase
    .from('time_pokemon')
    .insert({ nome_pokemon: nome, numero: numero });

  if (error) {
    alert('Erro ao salvar: ' + error.message);
    console.error(error);
  } else {
    listarFavoritos();
  }
}

// READ - listar o time salvo
async function listarFavoritos() {
  const { data, error } = await supabase
    .from('time_pokemon')
    .select('*')
    .order('created_at');

  if (error) {
    teamList.innerHTML = '<p class="error-msg">Erro ao carregar o time.</p>';
    console.error(error);
    return;
  }
  renderizarLista(data);
}

// DELETE - remover um Pokemon do time
async function removerFavorito(id) {
  const { error } = await supabase
    .from('time_pokemon')
    .delete()
    .eq('id', id);

  if (error) {
    alert('Erro ao remover: ' + error.message);
    console.error(error);
  } else {
    listarFavoritos();
  }
}

// Desenha a lista do time na tela
function renderizarLista(lista) {
  if (!lista || lista.length === 0) {
    teamList.innerHTML = '<p class="team-empty">Seu time está vazio. Busque um Pokémon e clique em “⭐ Adicionar ao meu time”.</p>';
    return;
  }

  teamList.innerHTML = lista.map(item => {
    const sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + item.numero + '.png';
    return '<div class="team-card">' +
      '<img src="' + sprite + '" alt="' + item.nome_pokemon + '">' +
      '<p class="team-name">' + item.nome_pokemon + '</p>' +
      '<p class="team-num">#' + String(item.numero).padStart(3, '0') + '</p>' +
      '<button class="btn-remove" data-id="' + item.id + '">🗑️ Remover</button>' +
    '</div>';
  }).join('');

  // Liga os botoes de remover
  teamList.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removerFavorito(btn.getAttribute('data-id'));
    });
  });
}

// Carrega o time assim que a pagina abre
listarFavoritos();

// Expoe a funcao de busca para uso global (ex.: clicar em evolucoes)
window.buscarPorNome = buscarPorNome;
