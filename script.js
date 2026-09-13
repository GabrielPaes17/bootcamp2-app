// ===== Explorador de Países — script.js =====

const API_BASE = "https://restcountries.com/v3.1";

const campoBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("botao-buscar");
const resultado = document.getElementById("resultado");
const loadingOverlay = document.getElementById("loading-overlay");
const filterBtns = document.querySelectorAll(".filter-btn");
const suggestionBtns = document.querySelectorAll(".suggestion-btn");

let regiaoAtiva = "all";

function formatarNumero(n) {
  if (n == null) return "—";
  return n.toLocaleString("pt-BR");
}

function nomeNativo(nativeName) {
  if (!nativeName) return "";
  const chaves = Object.keys(nativeName);
  if (chaves.length === 0) return "";
  return nativeName[chaves[0]].official || nativeName[chaves[0]].common || "";
}

function listaIdiomas(languages) {
  if (!languages) return ["—"];
  return Object.values(languages);
}

function listaMoedas(currencies) {
  if (!currencies) return ["—"];
  return Object.entries(currencies).map(([codigo, info]) =>
    `${info.name} (${codigo}${info.symbol ? ", " + info.symbol : ""})`
  );
}

function mostrarLoading() { loadingOverlay.classList.remove("hidden"); }
function esconderLoading() { loadingOverlay.classList.add("hidden"); }

function renderizarErro(titulo, mensagem) {
  resultado.innerHTML = `
    <div class="error-message">
      <div class="error-icon">😕</div>
      <h2>${titulo}</h2>
      <p>${mensagem}</p>
    </div>
  `;
}

function renderizarVazio() {
  resultado.innerHTML = `
    <div class="empty-message">
      <div class="empty-icon">🔍</div>
      <h2>Nenhum país encontrado</h2>
      <p>Tente outro nome ou selecione uma região diferente.</p>
    </div>
  `;
}

function renderizarCard(pais) {
  const nome = pais.name?.common || "Desconhecido";
  const nativo = nomeNativo(pais.name?.nativeName);
  const bandeira = pais.flags?.svg || pais.flags?.png || "";
  const capital = pais.capital?.join(", ") || "—";
  const populacao = formatarNumero(pais.population);
  const area = formatarNumero(pais.area);
  const idiomas = listaIdiomas(pais.languages).join(", ");
  const moedas = listaMoedas(pais.currencies).join(", ");
  const regiao = pais.region || "—";
  const subregiao = pais.subregion || "";
  const fuso = pais.timezones?.join(", ") || "—";

  return `
    <article class="country-card" style="animation-delay: ${Math.random() * 0.2}s">
      <img class="card-flag" src="${bandeira}" alt="Bandeira de ${nome}" loading="lazy">
      <div class="card-body">
        <h2>${nome}</h2>
        ${nativo && nativo !== nome ? `<p class="card-native-name">${nativo}</p>` : ""}
        <div class="card-info">
          <div class="info-item">
            <span class="info-label">🏛️ Capital</span>
            <span class="info-value">${capital}</span>
          </div>
          <div class="info-item">
            <span class="info-label">👥 População</span>
            <span class="info-value">${populacao}</span>
          </div>
          <div class="info-item">
            <span class="info-label">📐 Área</span>
            <span class="info-value">${area} km²</span>
          </div>
          <div class="info-item">
            <span class="info-label">🗣️ Idiomas</span>
            <span class="info-value languages">${idiomas}</span>
          </div>
          <div class="info-item">
            <span class="info-label">💰 Moeda(s)</span>
            <span class="info-value">${moedas}</span>
          </div>
          <div class="info-item">
            <span class="info-label">🕐 Fuso</span>
            <span class="info-value">${fuso}</span>
          </div>
        </div>
        <div class="card-tags">
          ${regiao !== "—" ? `<span class="tag region">${regiao}</span>` : ""}
          ${subregiao ? `<span class="tag subregion">${subregiao}</span>` : ""}
          ${capital !== "—" ? `<span class="tag capital">🏙️ ${capital}</span>` : ""}
        </div>
      </div>
    </article>
  `;
}

function renderizarPaises(paises) {
  if (!paises || paises.length === 0) { renderizarVazio(); return; }
  resultado.innerHTML = `<div class="countries-grid">${paises.map(renderizarCard).join("")}</div>`;
}

async function buscarPorNome(nome) {
  mostrarLoading();
  try {
    const resposta = await fetch(`${API_BASE}/name/${encodeURIComponent(nome)}`);
    if (!resposta.ok) {
      if (resposta.status === 404) {
        renderizarErro("País não encontrado", `Não encontramos nenhum país com o nome "${nome}". Verifique a grafia ou tente em inglês.`);
      } else {
        renderizarErro("Erro na consulta", `A API retornou o código ${resposta.status}. Tente novamente em alguns instantes.`);
      }
      return;
    }
    const dados = await resposta.json();
    renderizarPaises(dados);
  } catch (erro) {
    console.error("Erro ao buscar país:", erro);
    renderizarErro("Erro de conexão", "Não foi possível acessar a API. Verifique sua conexão com a internet e tente novamente.");
  } finally {
    esconderLoading();
  }
}

async function buscarPorRegiao(regiao) {
  mostrarLoading();
  try {
    const url = regiao === "all" ? `${API_BASE}/all` : `${API_BASE}/region/${encodeURIComponent(regiao)}`;
    const resposta = await fetch(url);
    if (!resposta.ok) {
      renderizarErro("Erro na consulta", `A API retornou o código ${resposta.status}. Tente novamente.`);
      return;
    }
    const dados = await resposta.json();
    renderizarPaises(dados);
  } catch (erro) {
    console.error("Erro ao buscar região:", erro);
    renderizarErro("Erro de conexão", "Não foi possível acessar a API. Verifique sua conexão com a internet.");
  } finally {
    esconderLoading();
  }
}

botaoBuscar.addEventListener("click", () => {
  const termo = campoBusca.value.trim();
  if (termo) {
    filterBtns.forEach(b => b.classList.remove("active"));
    document.querySelector('[data-region="all"]').classList.add("active");
    regiaoAtiva = "all";
    buscarPorNome(termo);
  }
});

campoBusca.addEventListener("keydown", (e) => {
  if (e.key === "Enter") botaoBuscar.click();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    regiaoAtiva = btn.dataset.region;
    campoBusca.value = "";
    buscarPorRegiao(regiaoAtiva);
  });
});

suggestionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const termo = btn.dataset.term;
    campoBusca.value = termo;
    filterBtns.forEach(b => b.classList.remove("active"));
    document.querySelector('[data-region="all"]').classList.add("active");
    regiaoAtiva = "all";
    buscarPorNome(termo);
  });
});
