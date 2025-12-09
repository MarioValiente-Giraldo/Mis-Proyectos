# 🌤️ Weather API - Aplicación del Clima

Una aplicación web moderna y completamente funcional para consultar el clima de cualquier ciudad del mundo en tiempo real, con sistema de favoritos y caché inteligente.

## 📋 Descripción

Weather API es una aplicación web interactiva que permite a los usuarios buscar información meteorológica actualizada de cualquier ciudad del mundo. La aplicación cuenta con un diseño moderno y responsive, sistema de caché para optimizar las búsquedas y una funcionalidad de favoritos para acceder rápidamente a las ciudades más consultadas.

## ✨ Características

- 🔍 **Búsqueda en tiempo real** - Consulta el clima de cualquier ciudad del mundo
- 💾 **Sistema de caché** - Almacenamiento local para consultas más rápidas
- ⭐ **Gestión de favoritos** - Guarda tus ciudades favoritas para acceso rápido
- 🎨 **Diseño moderno** - Interface atractiva con gradientes morados y animaciones suaves
- 📱 **Totalmente responsive** - Adaptado para móviles, tablets y escritorio
- 🌡️ **Información completa** - Temperatura actual, mínima, máxima y humedad
- 🖼️ **Iconos dinámicos** - Imágenes que cambian según las condiciones climáticas
- 🌐 **Multiidioma** - Descripciones del clima en español

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y animaciones
- **JavaScript (ES6+)** - Lógica de la aplicación
- **OpenWeatherMap API** - Datos meteorológicos en tiempo real
- **LocalStorage** - Persistencia de datos
- **Vite** - Herramienta de construcción y desarrollo

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Clave API de OpenWeatherMap

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/MarioValiente-Giraldo/proyecto-weatherApi.git
cd proyecto-weatherApi
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura tu API Key**

Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_OPEN_WEATHER_API_KEY=tu_clave_api_aqui
```

Para obtener tu API Key gratuita:
- Visita [OpenWeatherMap](https://openweathermap.org/api)
- Regístrate o inicia sesión
- Genera tu API Key en la sección "API Keys"

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

5. **Abre tu navegador**

Navega a `http://localhost:5173` (o el puerto que Vite indique)

## 📂 Estructura del Proyecto

```
proyecto-weatherApi/
├── 📁 public/
│   └── 📁 img/                    # Imágenes de iconos del clima
│       ├── logoApiWeather.png
│       ├── sol.png
│       ├── lluvia.png
│       ├── nieve.png
│       └── ...
├── 📁 src/
│   ├── 📁 utils/
│   │   ├── weatherApi.js          # Lógica principal de la app
│   │   ├── fetching.js            # Función para peticiones HTTP
│   │   └── getWeatherImg.js       # Mapeo de iconos climáticos
│   ├── App.js                     # Componente principal
│   ├── main.js                    # Punto de entrada
│   └── style.css                  # Estilos globales
├── .env                           # Variables de entorno (no incluido)
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## 🎯 Funcionalidades Detalladas

### Búsqueda de Ciudades
- Escribe el nombre de cualquier ciudad
- Presiona "Buscar" o Enter
- Visualiza información detallada del clima

### Sistema de Favoritos
- **Añadir**: Haz doble clic sobre la tarjeta del clima
- **Acceder**: Clic simple en cualquier ciudad favorita
- **Eliminar**: Clic derecho sobre una ciudad favorita

### Caché Inteligente
- Las búsquedas se guardan automáticamente
- Consultas repetidas cargan instantáneamente
- Reducción de llamadas a la API

## 🎨 Personalización de Estilos

La aplicación utiliza variables CSS para facilitar la personalización:

```css
:root {
    --primary: #8b5cf6;         /* Color principal */
    --primary-dark: #7c3aed;    /* Color oscuro */
    --primary-light: #a78bfa;   /* Color claro */
    --bg-main: #faf5ff;         /* Fondo principal */
    --text-dark: #1f2937;       /* Texto oscuro */
}
```

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (< 480px)
- 📱 Tablets (481px - 768px)
- 💻 Escritorio (> 768px)

## 🌍 Condiciones Climáticas Soportadas

La aplicación muestra iconos específicos para:
- ☀️ Despejado
- ⛅ Parcialmente nublado
- ☁️ Nublado
- 🌧️ Lluvia (ligera, moderada, fuerte)
- ⛈️ Tormenta eléctrica
- ❄️ Nieve
- 🌫️ Niebla
- 💨 Viento fuerte
- Y más...

## 🔧 Scripts Disponibles

```bash
npm run dev        # Inicia el servidor de desarrollo
npm run build      # Construye la aplicación para producción
npm run preview    # Previsualiza la build de producción
```

## 🎓 Aprendizajes Clave

Este proyecto me permitió desarrollar habilidades en:
- Integración con APIs REST externas
- Manejo del DOM con JavaScript vanilla
- Sistema de caché con LocalStorage
- Diseño responsive con CSS Grid y Flexbox
- Animaciones y transiciones CSS
- Gestión de variables de entorno
- Modularización de código JavaScript

## 👨‍💻 Autor

**Mario Valiente**

- 📧 Email: mariovaliente0@gmail.com
- 💼 LinkedIn: [Mario Valiente](https://www.linkedin.com/in/mario-valiente-1239521a3/)
- 🐙 GitHub: [@MarioValiente-Giraldo](https://github.com/MarioValiente-Giraldo)


---

⭐ **Si este proyecto te ha sido útil, una estrella en el repositorio se agradece mucho!**
