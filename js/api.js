// Claves de la API
const publicKey = '7fb4e3c79cb57790960a037b1b1d4e82';
const privateKey = 'b7689a5af8adc50023fc7f108583b426194ad05c';

// Variables para la paginación
let currentPage = 1;
const limit = 25; // Tarjetas por página
let totalCharacters = 0;

// Generar hash MD5
function generateHash(ts, privateKey, publicKey) {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}

// Mostrar placeholders mientras cargan los datos
function showPlaceholders() {
  const container = document.getElementById('characters');
  container.innerHTML = '';
  for (let i = 0; i < limit; i++) {
      const placeholder = document.createElement('div');
      placeholder.classList.add('col-md-4');
      placeholder.innerHTML = `
          <div class="card" aria-hidden="true">
              <img src="https://via.placeholder.com/200x200" class="card-img-top" alt="Placeholder">
              <div class="card-body">
                  <h5 class="card-title placeholder-glow">
                      <span class="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                      <span class="placeholder col-7"></span>
                      <span class="placeholder col-4"></span>
                      <span class="placeholder col-4"></span>
                      <span class="placeholder col-6"></span>
                      <span class="placeholder col-8"></span>
                  </p>
                  <a class="btn btn-primary disabled placeholder" aria-disabled="true"></a>
              </div>
          </div>
      `;
      container.appendChild(placeholder);
  }
}

// Obtener personajes de la API
async function fetchCharacters() {
    const ts = Date.now().toString();
    const hash = generateHash(ts, privateKey, publicKey);
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        renderCharacters(data.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Renderizar personajes en tarjetas
function renderCharacters(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');

        card.innerHTML = `
            <div class="card">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <a href="${character.urls[0]?.url || '#'}" class="btn btn-primary" target="_blank">More Info</a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// Configurar búsqueda
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchQuery = event.target.value.trim();
    currentPage = 1;
    fetchCharacters(0, searchQuery);
});

// Cargar personajes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
});