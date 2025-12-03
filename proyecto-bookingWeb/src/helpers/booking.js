import doFetch from "./doFetch";

export default async function createBooking() {
    const container = document.createElement("div");
    container.className = "booking-container";

    //===============  
    //Persistencia de datos
    //===============
    let filtros = {
        ciudad: '',
        checkIn: '',
        checkOut: '',
        huespedes: 1
    }

    const filtrosGuardados = localStorage.getItem('filtrosBooking');
    if (filtrosGuardados) {
        filtros = JSON.parse(filtrosGuardados);
    }

    function guardarFiltros() {
        localStorage.setItem('filtrosBooking', JSON.stringify(filtros));
    }

    const cities = await doFetch('http://localhost:3000/hoteles');
    const uniqueCities = new Set();
    const uniqueTotalPersons = new Set();
    cities.forEach(city => {
        uniqueCities.add(city.ciudad);
        uniqueTotalPersons.add(city.personasPorHabitacion);
    });

    //=============================
    // Header
    //=============================
    const headerContainer = document.createElement('header');
    headerContainer.className = 'booking-header';

    const titleHeader = document.createElement('h1');
    titleHeader.className = 'booking-title';
    titleHeader.textContent = "Booking Costa del Sol";

    const logoHeader = document.createElement('img');
    logoHeader.className = 'booking-logo';
    logoHeader.src = './public/img/bookingLogo.png';
    logoHeader.alt = 'Logo de la empresa';

    headerContainer.appendChild(titleHeader);
    headerContainer.appendChild(logoHeader);

    //=============================
    // Main
    //=============================
    const mainContainer = document.createElement('main');
    mainContainer.className = 'booking-main';

    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';

    const form = document.createElement('form');
    form.className = 'booking-form';

    const bookingContainer = document.createElement('div');
    bookingContainer.className = 'booking-inputs';

    // Menú de ciudades
    const cityLabel = document.createElement('label');
    cityLabel.className = 'form-label';
    cityLabel.htmlFor = 'citySelect';
    cityLabel.textContent = 'Seleccione una ciudad';

    const citySelect = document.createElement('select');
    citySelect.className = 'form-select';
    citySelect.id = 'citySelect';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una ubicación';
    citySelect.appendChild(defaultOption);

    uniqueCities.forEach(city => {
        const cityOption = document.createElement('option');
        cityOption.value = city;
        cityOption.textContent = city;
        citySelect.appendChild(cityOption);
    });

    if (filtros.ciudad) citySelect.value = filtros.ciudad;

    // CheckIn
    const checkInContainer = document.createElement('div');
    checkInContainer.className = 'form-group';

    const checkInLabel = document.createElement('label');
    checkInLabel.className = 'form-label';
    checkInLabel.textContent = 'Fecha de Check-In: ';

    const checkInInput = document.createElement('input');
    checkInInput.className = 'form-input';
    checkInInput.type = 'date';

    if (filtros.checkIn) checkInInput.value = filtros.checkIn;

    checkInContainer.appendChild(checkInLabel);
    checkInContainer.appendChild(checkInInput);

    // CheckOut
    const checkOutContainer = document.createElement('div');
    checkOutContainer.className = 'form-group';

    const checkOutLabel = document.createElement('label');
    checkOutLabel.className = 'form-label';
    checkOutLabel.textContent = 'Fecha de Check-Out: ';

    const checkOutInput = document.createElement('input');
    checkOutInput.className = 'form-input';
    checkOutInput.type = 'date';

    if (filtros.checkOut) checkOutInput.value = filtros.checkOut;

    checkOutContainer.appendChild(checkOutLabel);
    checkOutContainer.appendChild(checkOutInput);

    // Menú de total de huéspedes por habitación
    const huespedContainer = document.createElement('div');
    huespedContainer.className = 'form-group';

    const huespedLabel = document.createElement('label');
    huespedLabel.className = 'form-label';
    huespedLabel.htmlFor = 'huespedSelect';
    huespedLabel.textContent = 'Número de huéspedes';

    const huespedSelect = document.createElement('select');
    huespedSelect.className = 'form-select';
    huespedSelect.id = 'huespedSelect';

    const huespedDefaultOption = document.createElement('option');
    huespedDefaultOption.textContent = '¿Cuántas personas os vais a hospedar?';
    huespedDefaultOption.value = '';
    huespedSelect.appendChild(huespedDefaultOption);

    uniqueTotalPersons.forEach(person => {
        const huespedOption = document.createElement('option');
        huespedOption.textContent = person;
        huespedOption.value = person;
        huespedSelect.appendChild(huespedOption);
    });

    if (filtros.huespedes) huespedSelect.value = filtros.huespedes;

    // Botón de búsqueda
    const button = document.createElement('button');
    button.className = 'btn-search';
    button.type = 'submit';
    button.textContent = '🏨 Buscar hotel';

    huespedContainer.appendChild(huespedLabel);
    huespedContainer.appendChild(huespedSelect);
    bookingContainer.appendChild(cityLabel);
    bookingContainer.appendChild(citySelect);
    form.appendChild(bookingContainer);
    form.appendChild(checkInContainer);
    form.appendChild(checkOutContainer);
    form.appendChild(huespedContainer);
    form.appendChild(button);
    formContainer.appendChild(form);

    //=============================
    // EVENTOS PARA LA PERSISTENCIA
    //=============================
    citySelect.addEventListener('change', (e) => {
        filtros.ciudad = e.target.value;
        guardarFiltros();
    });

    checkInInput.addEventListener('change', (e) => {
        filtros.checkIn = e.target.value;
        guardarFiltros();
    });

    checkOutInput.addEventListener('change', (e) => {
        filtros.checkOut = e.target.value;
        guardarFiltros();
    });

    huespedSelect.addEventListener('change', (e) => {
        filtros.huespedes = parseInt(e.target.value) || 1;
        guardarFiltros();
    });

    //=============================
    // Función para renderizar hoteles
    //=============================
    function renderHotels() {
        const hotelesFiltrados = cities.filter(hotel => {
            if (filtros.ciudad && hotel.ciudad !== filtros.ciudad) return false;
            if (filtros.huespedes && hotel.personasPorHabitacion < filtros.huespedes) return false;

            if (filtros.checkIn && filtros.checkOut) {
                const checkInDate = new Date(filtros.checkIn);
                const checkOutDate = new Date(filtros.checkOut);
                const hotelStartDate = new Date(hotel.disponibilidad.desde);
                const hotelEndDate = new Date(hotel.disponibilidad.hasta);
                if (checkInDate < hotelStartDate || checkOutDate > hotelEndDate) return false;
            }

            return true;
        });

        let resultsContainer = mainContainer.querySelector('.hotels-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'hotels-results';
            mainContainer.appendChild(resultsContainer);
        }
        resultsContainer.innerHTML = '';

        if (hotelesFiltrados.length === 0) {
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = 'No se encontraron hoteles con los criterios seleccionados.';
            resultsContainer.appendChild(noResults);
            return;
        }

        const resultsTitle = document.createElement('h2');
        resultsTitle.className = 'results-title';
        resultsTitle.textContent = `Hoteles encontrados: ${hotelesFiltrados.length}`;
        resultsContainer.appendChild(resultsTitle);

        hotelesFiltrados.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';

            const hotelName = document.createElement('h3');
            hotelName.className = 'hotel-name';
            hotelName.textContent = hotel.nombre;

            const hotelCity = document.createElement('p');
            hotelCity.className = 'hotel-city';
            hotelCity.textContent = `📍 ${hotel.ciudad}`;

            const hotelCapacity = document.createElement('p');
            hotelCapacity.className = 'hotel-capacity';
            hotelCapacity.textContent = `👥 Capacidad: ${hotel.personasPorHabitacion} personas`;

            const hotelPrice = document.createElement('p');
            hotelPrice.className = 'hotel-price';
            hotelPrice.textContent = `💰 ${hotel.precioPorPersona}€ por persona`;

            // Cálculo del total de la reserva
            let totalReserva = '';
            if (filtros.checkIn && filtros.checkOut) {
                const checkInDate = new Date(filtros.checkIn);
                const checkOutDate = new Date(filtros.checkOut);
                //Esta línea está calculando la cantidad de noches entre dos fechas
                //y usa multiplicaciones para convertir la diferencia de milisegundos a días. 
                const noches = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
                totalReserva = noches * filtros.huespedes * hotel.precioPorPersona;
                
            }

            const hotelTotal = document.createElement('p');
            hotelTotal.className = 'hotel-total';
            hotelTotal.textContent = totalReserva ? `💵 Total estimado: ${totalReserva}€` : '';

            hotelCard.appendChild(hotelName);
            hotelCard.appendChild(hotelCity);
            hotelCard.appendChild(hotelCapacity);
            hotelCard.appendChild(hotelPrice);
            hotelCard.appendChild(hotelTotal);

            const bookButton = document.createElement('button');
            bookButton.className = 'btn-book';
            bookButton.textContent = 'Reservar';
            bookButton.type = 'button';
            bookButton.addEventListener('click', () => {
                alert(`¡Reserva confirmada para ${hotel.nombre}! Total: ${totalReserva}€`);
                localStorage.removeItem('filtrosBooking');
                window.location.reload();
            });

            hotelCard.appendChild(bookButton);
            resultsContainer.appendChild(hotelCard);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        renderHotels();
    });

    mainContainer.appendChild(formContainer);

    //=============================
    // Footer
    //=============================
    const footerContainer = document.createElement('footer');
    footerContainer.className = 'booking-footer';

    const copy = document.createElement('p');
    copy.className = 'footer-copy';
    copy.textContent = '© 2025 Mario Valiente. Todos los derechos reservados.';

    const linksContainer = document.createElement('div');
    linksContainer.className = 'footer-links';

    const githubLink = document.createElement('a');
    githubLink.className = 'footer-link';
    githubLink.href = 'https://github.com/MarioValiente-Giraldo';
    githubLink.target = '_blank';
    githubLink.setAttribute('aria-label', 'Mi GitHub');
    githubLink.textContent = 'GitHub';

    const linkedinLink = document.createElement('a');
    linkedinLink.className = 'footer-link';
    linkedinLink.href = 'https://www.linkedin.com/in/mario-valiente-1239521a3/';
    linkedinLink.target = '_blank';
    linkedinLink.setAttribute('aria-label', 'Conécta conmigo por LinkedIn');
    linkedinLink.textContent = 'LinkedIn';

    linksContainer.appendChild(githubLink);
    linksContainer.appendChild(linkedinLink);

    footerContainer.appendChild(copy);
    footerContainer.appendChild(linksContainer);

    container.appendChild(headerContainer);
    container.appendChild(mainContainer);
    container.appendChild(footerContainer);

    return container;
}
