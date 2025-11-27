const WeatherCard = ({ weather }) => {
    // Si no hay datos, no renderizar nada
    if (!weather) return null;

    // Construir URL del ícono del clima desde OpenWeather
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <div className="weather-card">
            {/* Nombre de la ciudad y código del país */}
            <h2>{weather.name}, {weather.sys.country}</h2>

            {/* Ícono del clima */}
            <img src={iconUrl} alt={weather.weather[0].description} />

            {/* Temperatura principal redondeada */}
            <h1>{Math.round(weather.main.temp)}°C</h1>

            {/* Descripción del clima (ej: "cielo claro") */}
            <p className="description">{weather.weather[0].description}</p>

            {/* Información adicional del clima */}
            <div className="details">
                <div className="detail-item">
                    <span>💧 Humedad</span>
                    <strong>{weather.main.humidity}%</strong>
                </div>
                <div className="detail-item">
                    <span>💨 Viento</span>
                    <strong>{weather.wind.speed} m/s</strong>
                </div>
                <div className="detail-item">
                    <span>🌡️ Sensación</span>
                    <strong>{Math.round(weather.main.feels_like)}°C</strong>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;