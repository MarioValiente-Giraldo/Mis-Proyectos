
export function getWeatherImage(city) {
    // Validación: asegurarse que city y weather existen
    if (!city || !city.weather || !city.weather[0] || !city.weather[0].id) {
        console.warn('⚠️ Datos de ciudad no válidos:', city);
        return './public/img/sol.png'; // Imagen por defecto
    }

    const id = city.weather[0].id; 
    let imageName;
    
    switch (true) {
        // Tormenta eléctrica (200-232)
        case (id >= 200 && id < 300):
            imageName = 'tormenta-electrica.png';
            break;
        
        // Llovizna/Lluvia ligera (300-321, 500)
        case (id >= 300 && id < 400):
        case (id === 500):
            imageName = 'lluvia-ligera.png';
            break;
        
        // Lluvia moderada (501)
        case (id === 501):
            imageName = 'lluvia.png';
            break;
        
        // Lluvia muy fuerte (502-504)
        case (id >= 502 && id <= 504):
            imageName = 'lluvia-muy-fuerte.png';
            break;
        
        // Lluvia con tormenta (520-531)
        case (id >= 520 && id <= 531):
            imageName = 'lluvia-tormenta.png';
            break;
        
        // Nieve ligera (600, 620)
        case (id === 600):
        case (id === 620):
            imageName = 'nieve-ligera.png';
            break;
        
        // Nieve (601-621)
        case (id >= 601 && id < 602):
        case (id >= 603 && id < 620):
        case (id === 621):
            imageName = 'nieve.png';
            break;
        
        // Nieve fuerte (602, 622)
        case (id === 602):
        case (id === 622):
            imageName = 'nieve-fuerte.png';
            break;
        
        // Niebla (701, 741)
        case (id === 701):
        case (id === 741):
            imageName = 'niebla.png';
            break;
        
        // Arena/Polvo (751, 761)
        case (id === 751):
        case (id === 761):
            imageName = 'arena.png';
            break;
        
        // Viento fuerte (771, 781, 905)
        case (id === 771):
        case (id === 781):
        case (id === 905):
            imageName = 'viento-fuerte.png';
            break;
        
        // Aguanieve (611-613)
        case (id >= 611 && id <= 613):
            imageName = 'aguanieve.png';
            break;
        
        // Despejado (800)
        case (id === 800):
            imageName = 'sol.png';
            break;
        
        // Pocas nubes (801)
        case (id === 801):
            imageName = 'sol-nublado.png';
            break;
        
        // Nublado (802-804)
        case (id >= 802 && id <= 804):
            imageName = 'nublado.png';
            break;
        
        // Por defecto
        default:
            console.warn(`⚠️ ID de clima no reconocido: ${id}`);
            imageName = 'sol.png';
            break;
    }
    
    return `./public/img/${imageName}`;
}

export default getWeatherImage;