import fetching from "./fetching";
import { getWeatherImage } from "./getWeatherImg";

export default function createWeatherApi() {
    const VITE_OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

    //Contenedor principal
    const container = document.createElement('div');
    container.className = 'weather-app';

    //CACHE
    let cache = new Map();
    const savedData = localStorage.getItem('weatherData');
    if(savedData){
        cache = new Map(JSON.parse(savedData));
    }
    
    /**
     * Esta función se encarga de guardar datos en el localStorage
     */
    const saveCache = () => localStorage.setItem('weatherData', JSON.stringify([...cache]));

    //FAVORITOS
    let favourites = [];
    const savedFavourites = localStorage.getItem('favouriteCities');
    if(savedFavourites){
        favourites = JSON.parse(savedFavourites);
    }

    /**
     * Esta función se encarga de guardar favoritos en el localStorage
     */
    const saveFavourites = () => localStorage.setItem('favouriteCities', JSON.stringify(favourites));

    //Header
    const headerContainer = document.createElement('header');
    const headerTitle = document.createElement('h1');
    headerTitle.textContent = 'Weather API';
    const headerImg = document.createElement('img');
    headerImg.src = "./public/img/logoApiWeather.png";
    headerImg.alt = "Logo Weather API";
    headerContainer.appendChild(headerTitle);
    headerContainer.appendChild(headerImg);

    //Main
    const mainContainer = document.createElement('main');

    //========== SEARCH CARD ==========
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-card';
    
    const titleSearcher = document.createElement('h2');
    titleSearcher.textContent = 'Buscar ciudad';
    
    const form = document.createElement('form');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar ciudad...';
    input.autocomplete = 'off';
    input.className = 'search-input';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Buscar';
    button.className = 'search-button';

    form.appendChild(input);
    form.appendChild(button);
    searchContainer.appendChild(titleSearcher);
    searchContainer.appendChild(form);

    //========== WEATHER CARD ==========
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'weather-card';
    
    const weatherTitle = document.createElement('h2');
    weatherTitle.textContent = 'Clima Actual';
    weatherContainer.appendChild(weatherTitle);

    const weatherContent = document.createElement('div');
    weatherContent.className = 'weather-content';
    weatherContent.innerHTML = '<p class="placeholder">Busca una ciudad para ver el clima</p>';
    weatherContainer.appendChild(weatherContent);

    //========== FAVOURITE CARD ==========
    const favouriteContainer = document.createElement('div');
    favouriteContainer.className = 'favourite-card';
    
    const favouriteTitle = document.createElement('h2');
    favouriteTitle.textContent = 'Ciudades Favoritas';
    favouriteContainer.appendChild(favouriteTitle);

    const favouriteList = document.createElement('ul');
    favouriteList.className = 'favourite-list';
    favouriteContainer.appendChild(favouriteList);

    //========== FUNCIONES ==========
    
    /**
     * Variable para guardar la ciudad actual
     */
    let currentCity = null;

    /**
     * Función para renderizar la ciudad en la tarjeta de clima
     */
    const renderCity = (city) => {
        weatherContent.innerHTML = '';
        
        if(!city){
            const noResults = document.createElement('p');
            noResults.className = 'placeholder';
            noResults.textContent = 'No se han encontrado resultados';
            weatherContent.appendChild(noResults);
            currentCity = null;
            return;
        }

        currentCity = city;

        const cityCard = document.createElement('div');
        cityCard.className = 'city-info';
        
        const cityName = document.createElement('h3');
        cityName.textContent = city.name;
        
        const cityImg = document.createElement('img');
        cityImg.src = getWeatherImage(city);
        cityImg.alt = "Weather image";
        cityImg.className = 'weather-icon';
        
        const cityWeather = document.createElement('p');
        cityWeather.className = 'description';
        cityWeather.textContent = city.weather[0].description;
        
        const temperature = document.createElement('p');
        temperature.className = 'temperature';
        temperature.textContent = `${Math.round(city.main.temp)}°C`;

        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'weather-details';

        const cityMinTemperature = document.createElement('p');
        cityMinTemperature.textContent = `Min: ${Math.round(city.main.temp_min)}°C`;
        
        const cityMaxTemperature = document.createElement('p');
        cityMaxTemperature.textContent = `Max: ${Math.round(city.main.temp_max)}°C`;

        const humidity = document.createElement('p');
        humidity.textContent = `Humedad: ${city.main.humidity}%`;

        detailsContainer.appendChild(cityMinTemperature);
        detailsContainer.appendChild(cityMaxTemperature);
        detailsContainer.appendChild(humidity);

        const hint = document.createElement('p');
        hint.className = 'hint';
        hint.textContent = '💡 Doble click para añadir a favoritos';

        cityCard.appendChild(cityName);
        cityCard.appendChild(cityImg);
        cityCard.appendChild(temperature);
        cityCard.appendChild(cityWeather);
        cityCard.appendChild(detailsContainer);
        cityCard.appendChild(hint);
        
        weatherContent.appendChild(cityCard);
    };

    /**
     * Función de búsqueda 
     */
    const search = async (query) => {
        const cleanQuery = query.toLowerCase().trim();
        
        if(!cleanQuery){
            weatherContent.innerHTML = '<p class="placeholder">Introduce el nombre de una ciudad</p>';
            return;
        }

        weatherContent.innerHTML = '<p class="placeholder">Buscando...</p>';

        if(cache.has(cleanQuery)){
            renderCity(cache.get(cleanQuery));
            console.log(`✅ Se ha usado la cache para buscar la ciudad ${query}`);
            return;
        }
        
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${VITE_OPEN_WEATHER_API_KEY}&units=metric&lang=es`;
            const data = await fetching(url); 
            
            if (!data || data.cod !== 200) {
                renderCity(null);
                return;
            }

            cache.set(cleanQuery, data);
            saveCache();
            renderCity(data);
            
        } catch(error){
            console.error('❌ Error al buscar ciudad:', error);
            weatherContent.innerHTML = '<p class="placeholder error">Error al buscar la ciudad</p>';
        }
    };

    /**
     * Actualizar lista de favoritos
     */
    const updateFavouritesList = () => {
        favouriteList.innerHTML = '';
        
        if(favourites.length === 0){
            const empty = document.createElement('li');
            empty.className = 'empty-message';
            empty.textContent = 'No hay ciudades favoritas';
            favouriteList.appendChild(empty);
            return;
        }

        favourites.forEach(cityName => {
            const item = document.createElement('li');
            item.className = 'favourite-item';
            item.textContent = `📍 ${cityName}`;

            item.addEventListener('click', () => {
                console.log('🔍 Buscando favorito:', cityName);
                search(cityName);
            });

            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if(confirm(`¿Eliminar ${cityName} de favoritos?`)){
                    removeFromFavourites(cityName);
                }
            });

            favouriteList.appendChild(item);
        });
    };

    /**
     * Añadir ciudad a favoritos
     */
    const addToFavourites = (cityName) => {
        if(!favourites.includes(cityName)){
            favourites.push(cityName);
            saveFavourites();
            updateFavouritesList();
            return true;
        }
        return false;
    };

    /**
     * Eliminar ciudad de favoritos
     */
    const removeFromFavourites = (cityName) => {
        const index = favourites.indexOf(cityName);
        if(index > -1){
            favourites.splice(index, 1);
            saveFavourites();
            updateFavouritesList();
            return true;
        }
        return false;
    };

    // Cargar favoritos iniciales
    updateFavouritesList();

    //========== ENSAMBLAR MAIN ==========
    mainContainer.appendChild(searchContainer);
    mainContainer.appendChild(weatherContainer);
    mainContainer.appendChild(favouriteContainer);

    //========== FOOTER ==========
    const footerContainer = document.createElement('footer');
    const copy = document.createElement('p');
    copy.textContent = '© 2025 Mario Valiente. Todos los derechos reservados.';

    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/MarioValiente-Giraldo';
    githubLink.target = '_blank';
    githubLink.setAttribute('aria-label', 'Mi GitHub');
    githubLink.textContent = 'GitHub';

    const linkedinLink = document.createElement('a');
    linkedinLink.href = 'https://www.linkedin.com/in/mario-valiente-1239521a3/';
    linkedinLink.target = '_blank';
    linkedinLink.setAttribute('aria-label', 'Conécta conmigo por LinkedIn');
    linkedinLink.textContent = 'LinkedIn';
    
    footerContainer.appendChild(copy);
    footerContainer.appendChild(githubLink);
    footerContainer.appendChild(linkedinLink);

    //========== EVENTOS ==========
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        search(input.value);
        input.value = '';
    });

    weatherContainer.addEventListener('dblclick', () => {
        if(currentCity){
            const added = addToFavourites(currentCity.name);
            if(added){
                alert(`✅ ${currentCity.name} añadida a favoritos!`);
            } else {
                alert(`ℹ️ ${currentCity.name} ya está en favoritos`);
            }
        }
    });

    //========== ENSAMBLAR TODO ==========
    container.appendChild(headerContainer);
    container.appendChild(mainContainer);   
    container.appendChild(footerContainer);

    return container;
}