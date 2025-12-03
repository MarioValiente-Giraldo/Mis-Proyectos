import { fetching } from "../utils/fetching";

export default function createSearcherWithDebounce() {
    const container = document.createElement("div");
    container.className = "searcher-container";

    const CACHE_KEY = 'rickMortyCache';

    const state = {
        cache: new Map(),
        isLoading: false,
        currentCharacters: []
    }

    // Cargar cache desde localStorage al inicio
    const loadCache = () => {
        try {
            const savedCache = localStorage.getItem(CACHE_KEY);
            if (savedCache) {
                const cacheArray = JSON.parse(savedCache);
                state.cache = new Map(cacheArray);
                console.log('Cache cargada desde localStorage:', state.cache.size, 'entradas');
            }
        } catch (err) {
            console.error('Error al cargar cache:', err);
        }
    }

    // Guardar cache en localStorage
    const saveCache = () => {
        try {
            const cacheArray = Array.from(state.cache.entries());
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheArray));
            console.log('Cache guardada en localStorage');
        } catch (err) {
            console.error('Error al guardar cache:', err);
        }
    }


    // Cargar cache al inicializar
    loadCache();

    // Crear elementos del buscador
    const title = document.createElement("h1");
    title.textContent = '👽 Buscador de personajes de Rick & Morty 👽';

    const form = document.createElement('form');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar personaje...';
    input.autocomplete = 'off';

    const results = document.createElement("div");
    results.className = "grid";



    form.appendChild(input);
    
    container.appendChild(title);
    container.appendChild(form);
    container.appendChild(results);

    // Debounce de 5 segundos
    const debounce = (fn, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        }
    }

    // Simular delay de carga
    const simulateLoadingDelay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Mostrar spinner
    const displayLoading = () => {
        results.innerHTML = "";
        const spinnerContainer = document.createElement("div");
        spinnerContainer.className = "spinner-container";
        
        spinnerContainer.innerHTML = `
            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="#66ff66">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="3">
                        <circle stroke-opacity=".3" cx="24" cy="24" r="24"/>
                        <path d="M48 24c0-13.255-10.745-24-24-24">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 24 24"
                                to="360 24 24"
                                dur="1s"
                                repeatCount="indefinite"/>
                        </path>
                    </g>
                </g>
            </svg>
        `;
        
        results.appendChild(spinnerContainer);
    }

    // Mostrar personajes
    const displayCharacters = (charactersArray) => {
        results.innerHTML = "";

        if (!charactersArray || charactersArray.length === 0) {
            const noResults = document.createElement("p");
            noResults.className = "no-results";
            noResults.textContent = '🔍 No se encontraron personajes';
            results.appendChild(noResults);
            return;
        }

        charactersArray.forEach(character => {
            const card = document.createElement('div');
            card.className = "card";

            const characterImage = document.createElement('img');
            characterImage.src = character.image;
            characterImage.alt = character.name;

            const characterName = document.createElement('h4');
            characterName.textContent = character.name;

            const characterSpecies = document.createElement('p');
            characterSpecies.textContent = `Especie: ${character.species}`;

            card.appendChild(characterImage);
            card.appendChild(characterName);
            card.appendChild(characterSpecies);

            results.appendChild(card);
        });
    }

    // Renderizar según estado
    const render = () => {
        if (state.isLoading) {
            displayLoading();
        } else {
            displayCharacters(state.currentCharacters);
        }
    }

    // Función de búsqueda
    async function search(query) {
        const cleanQuery = query.toLowerCase().trim();
        
        if (!cleanQuery) {
            state.currentCharacters = [];
            state.isLoading = false;
            render();
            return;
        }

        // Revisar cache
        if (state.cache.has(cleanQuery)) {
            state.isLoading = true;
            render();
            
            await simulateLoadingDelay(500);
            
            state.currentCharacters = state.cache.get(cleanQuery);
            state.isLoading = false;
            render();
            console.log('✅ Búsqueda obtenida desde cache persistente');
            return;
        }

        // Mostrar loading
        state.isLoading = true;
        render();

        try {
            await simulateLoadingDelay(2000);
            
            const data = await fetching(cleanQuery);
            
            if (!data || data.error) {
                state.currentCharacters = [];
                state.isLoading = false;
                render();
                return;
            }

            // Guardar en cache y localStorage
            state.cache.set(cleanQuery, data.results);
            saveCache(); 
            
            state.currentCharacters = data.results;
            state.isLoading = false;
            render();
            
        } catch (err) {
            console.error(err);
            state.isLoading = false;
            results.innerHTML = "";
            const errorMsg = document.createElement("p");
            errorMsg.className = "error-message";
            errorMsg.textContent = "❌ Ocurrió un error al buscar los personajes.";
            results.appendChild(errorMsg);
        }
    }

    // Debounce de 5 segundos
    const debouncedSearch = debounce(search, 5000);

    // Event listener para búsqueda en tiempo real
    input.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    // Prevenir submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    return container;
}
