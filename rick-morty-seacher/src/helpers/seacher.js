import { fetching } from "../utils/fetching.js";

export default function createSearcher() {
    const container = document.createElement("div");
    container.className = "searcher-container";

    // -----------------------------
    // CACHE + persistencia
    // -----------------------------
    let cache = new Map();
    const savedCache = localStorage.getItem('rmCache');
    if(savedCache){
        cache = new Map(JSON.parse(savedCache));
    }
    const saveCache = () => localStorage.setItem('rmCache', JSON.stringify([...cache]));

    // -----------------------------
    // Crear elementos del buscador
    // -----------------------------
    const title = document.createElement("h1");
    title.textContent = '👽 Buscador de personajes de Rick & Morty 👽';

    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar personaje...';
    input.autocomplete = 'off';

    const button = document.createElement('button');
    button.textContent = 'Buscar';

    const results = document.createElement("div");
    results.className = "grid";

    form.appendChild(input);
    form.appendChild(button);

    container.appendChild(title);
    container.appendChild(form);
    container.appendChild(results);

    // -----------------------------
    // Renderizar los personajes
    // -----------------------------
    function renderCharacters(characterArray) {
        results.innerHTML = "";

        if (!characterArray || characterArray.length === 0) {
            const noResults = document.createElement("p");
            noResults.textContent = 'No hay resultados';
            results.appendChild(noResults);
            return;
        }

        characterArray.forEach(character => {
            const card = document.createElement('div');
            card.className = "card";

            const characterImage = document.createElement('img');
            characterImage.src = character.image;
            characterImage.alt = character.name;

            const characterName = document.createElement('h4');
            characterName.textContent = character.name;

            const characterSpecies = document.createElement('p');
            characterSpecies.textContent = `Especie: ${character.species}`;

            card.appendChild(characterName);
            card.appendChild(characterImage);
            card.appendChild(characterSpecies);

            results.appendChild(card);
        });
    }

    // -----------------------------
    // Función de búsqueda
    // -----------------------------
    async function search(query) {
        const cleanQuery = query.toLowerCase().trim();
        if (!cleanQuery) {
            results.innerHTML = "No hay argumentos para buscar";
            return;
        }

        if (cache.has(cleanQuery)) {
            renderCharacters(cache.get(cleanQuery));
            console.log('Se ha usado la cache del localStorage');
            return;
        }

        try {
            const data = await fetching(cleanQuery);
            if (!data || data.error) {
                renderCharacters([]);
                return;
            }

            cache.set(cleanQuery, data.results);
            saveCache();
            renderCharacters(data.results);
        } catch (err) {
            console.error(err);
            const errorMsg = document.createElement("p");
            errorMsg.textContent = "Ocurrió un error al buscar los personajes.";
            results.appendChild(errorMsg);
        }
    }

    // -----------------------------
    // Eventos
    // -----------------------------
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        search(input.value);
    });

    input.addEventListener("input", () => {
        if (input.value.trim() === "") results.innerHTML = "";
    });

    return container;
}




