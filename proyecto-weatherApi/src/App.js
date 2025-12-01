import createWeatherApi from "./utils/weatherApi";

export default function createApp() {
    const app = document.getElementById("app"); 
    const apiWeather = createWeatherApi();
    app.appendChild(apiWeather);
}
