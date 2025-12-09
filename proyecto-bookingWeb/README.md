# 🏨 Booking Costa del Sol

Una aplicación web moderna y completamente funcional para buscar y reservar hoteles en la Costa del Sol, con sistema de filtros inteligentes y persistencia de búsquedas.

## 📋 Descripción

Booking Costa del Sol es una aplicación web interactiva que permite a los usuarios buscar hoteles según ciudad, fechas de estancia y número de huéspedes. La aplicación cuenta con un diseño atractivo inspirado en atardeceres mediterráneos, sistema de persistencia de filtros y cálculo automático del coste total de la reserva.

## ✨ Características

- 🔍 **Búsqueda avanzada** - Filtra hoteles por ciudad, fechas y capacidad
- 💾 **Persistencia de filtros** - Tus búsquedas se guardan automáticamente
- 💰 **Cálculo automático** - Precio total según noches y huéspedes
- 🎨 **Diseño atractivo** - Interfaz moderna con gradientes naranjas y azules
- 📱 **Totalmente responsive** - Adaptado para móviles, tablets y escritorio
- ✅ **Validación de disponibilidad** - Solo muestra hoteles disponibles en tus fechas
- 🏷️ **Información completa** - Nombre, ciudad, capacidad y precio por persona
- ⚡ **Renderizado dinámico** - Resultados instantáneos sin recargar la página

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y animaciones
- **JavaScript (ES6+)** - Lógica de la aplicación con módulos
- **LocalStorage** - Persistencia de filtros de búsqueda
- **Vite** - Herramienta de construcción y desarrollo
- **JSON Server** - API REST local para datos de hoteles

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/MarioValiente-Giraldo/booking-costa-del-sol.git
   cd booking-costa-del-sol
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura el servidor JSON**
   
   Asegúrate de tener un archivo `db.json` en la raíz del proyecto con la estructura de hoteles:
   ```json
   {
     "hoteles": [
       {
         "id": 1,
         "nombre": "Hotel Costa Bella",
         "ciudad": "Marbella",
         "personasPorHabitacion": 2,
         "precioPorPersona": 75,
         "disponibilidad": {
           "desde": "2025-01-01",
           "hasta": "2025-12-31"
         }
       }
     ]
   }
   ```

4. **Inicia el servidor JSON** (en una terminal)
   ```bash
   npx json-server --watch db.json --port 3000
   ```

5. **Inicia el servidor de desarrollo** (en otra terminal)
   ```bash
   npm run dev
   ```

6. **Abre tu navegador**
   
   Navega a `http://localhost:5173` (o el puerto que Vite indique)

## 📂 Estructura del Proyecto

```
booking-costa-del-sol/
├── 📁 public/
│   └── 📁 img/
│       └── bookingLogo.png          # Logo de la aplicación
├── 📁 src/
│   ├── 📁 helpers/
│   │   ├── booking.js               # Componente principal de reservas
│   │   └── doFetch.js               # Función para peticiones HTTP
│   ├── App.js                       # Inicializador de la app
│   ├── main.js                      # Punto de entrada
│   └── style.css                    # Estilos globales
├── db.json                          # Base de datos JSON
├── index.html                       # HTML principal
├── package.json                     # Dependencias
└── README.md                        # Este archivo
```

## 🎯 Funcionalidades Detalladas

### Búsqueda de Hoteles

1. **Selecciona una ciudad** - Elige entre las ciudades disponibles
2. **Define fechas** - Check-in y Check-out
3. **Número de huéspedes** - Selecciona cuántas personas se hospedarán
4. **Buscar** - Presiona el botón para ver resultados

### Sistema de Filtros

- **Filtro por ciudad**: Solo muestra hoteles de la ciudad seleccionada
- **Filtro por capacidad**: Excluye hoteles que no tengan suficiente capacidad
- **Filtro por disponibilidad**: Verifica que las fechas estén dentro del rango disponible

### Persistencia de Datos

- Los filtros se guardan automáticamente en LocalStorage
- Al recargar la página, los filtros previos se mantienen
- Se limpian al completar una reserva

### Cálculo de Precio

La aplicación calcula automáticamente:
- Número de noches entre check-in y check-out
- Coste total: `noches × huéspedes × precio por persona`

## 🎨 Personalización de Estilos

La aplicación utiliza variables CSS para facilitar la personalización:

```css
:root {
    --naranja-puesta: #FF9933;      /* Color principal */
    --azul-profundo: #3A3B6F;       /* Fondo oscuro */
    --azul-marino: #006699;         /* Detalles */
    --naranja-oscuro: #FF6600;      /* Acentos */
    --amarillo-anaranjado: #FFCC66; /* Highlights */
}
```

## 🔧 Scripts Disponibles

```bash
npm run dev        # Inicia el servidor de desarrollo
npm run build      # Construye la aplicación para producción
npm run preview    # Previsualiza la build de producción
```

## 💡 Ejemplo de Uso

1. Selecciona "Málaga" como ciudad
2. Check-in: 15/01/2025
3. Check-out: 18/01/2025 (3 noches)
4. Huéspedes: 2 personas
5. La aplicación muestra hoteles disponibles con el precio total calculado

## 🎓 Aprendizajes Clave

Este proyecto me permitió desarrollar habilidades en:

- Manipulación avanzada del DOM con JavaScript vanilla
- Sistema de filtrado y búsqueda en tiempo real
- Persistencia de datos con LocalStorage
- Consumo de APIs REST locales
- Diseño responsive con CSS Grid y Flexbox
- Modularización de código JavaScript
- Cálculos de fechas y operaciones matemáticas
- Manejo de eventos y formularios

## 👨‍💻 Autor

**Mario Valiente**

- 📧 Email: mariovaliente0@gmail.com
- 💼 LinkedIn: [Mario Valiente](https://www.linkedin.com/in/mario-valiente-1239521a3/)
- 🐙 GitHub: [@MarioValiente-Giraldo](https://github.com/MarioValiente-Giraldo)

## 📄 Licencia

© 2025 Mario Valiente. Todos los derechos reservados.

---

⭐ **Si este proyecto te ha sido útil, una estrella en el repositorio se agradece mucho!**
