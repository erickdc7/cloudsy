import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BentoGrid from './components/BentoGrid';
import {
  getWeatherByCity,
  getMultipleCitiesWeather,
  getForecastByCity
} from './services/weatherApi';
import { getRandomCitiesFromContinent } from './data/citiesByContinent';

function App() {
  const [mainWeather, setMainWeather] = useState(null);
  const [cities, setCities] = useState([null, null]);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState({
    main: true,
    cities: true,
    forecast: true
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const limaWeather = await getWeatherByCity('Lima,PE');
      setMainWeather(limaWeather);
      setLoading(prev => ({ ...prev, main: false }));

      const limaForecast = await getForecastByCity('Lima,PE');
      setForecast(limaForecast);
      setLoading(prev => ({ ...prev, forecast: false }));

      const randomCities = getRandomCitiesFromContinent('PE');
      const cityNames = randomCities.map(c => c.city);

      const citiesData = await getMultipleCitiesWeather(cityNames);
      setCities(citiesData);
      setLoading(prev => ({ ...prev, cities: false }));

    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
      setLoading({ main: false, cities: false, forecast: false });
    }
  };

  const handleSearch = async (cityData) => {
    try {
      setLoading(prev => ({ ...prev, main: true, forecast: true, cities: true }));

      let weatherData;
      let forecastData;

      if (typeof cityData === 'string') {
        weatherData = await getWeatherByCity(cityData);
        forecastData = await getForecastByCity(cityData);
      } else if (cityData.name && cityData.country) {

        // Preparar diferentes formatos de búsqueda
        const queries = [];

        // Formato principal: "Ciudad,CódigoPaís"
        queries.push(`${cityData.name},${cityData.country}`);

        // Formato con estado si existe
        if (cityData.state && cityData.state !== cityData.name) {
          queries.push(`${cityData.name},${cityData.state},${cityData.country}`);
        }

        let found = false;

        // Probar cada formato hasta encontrar el país correcto
        for (const query of queries) {
          try {
            const result = await getWeatherByCity(query);

            // Verificar que el país coincida
            if (result.sys.country === cityData.country) {
              weatherData = result;
              forecastData = await getForecastByCity(query);
              found = true;
              break;
            }
          } catch (error) {
            continue;
          }
        }

        if (!found) {
          throw new Error(`No se encontró ${cityData.name} en ${cityData.country}`);
        }

      } else {
        throw new Error('Formato de ciudad inválido');
      }

      setMainWeather(weatherData);
      setLoading(prev => ({ ...prev, main: false }));

      setForecast(forecastData);
      setLoading(prev => ({ ...prev, forecast: false }));

      const countryCode = weatherData.sys.country;
      const randomCities = getRandomCitiesFromContinent(countryCode);
      const cityNames = randomCities.map(c => c.city);

      const citiesData = await getMultipleCitiesWeather(cityNames);
      setCities(citiesData);
      setLoading(prev => ({ ...prev, cities: false }));

    } catch (error) {
      console.error('Error:', error);
      alert('Ciudad no encontrada. Intenta con otra.');
      setLoading(prev => ({ ...prev, main: false, forecast: false, cities: false }));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-3 md:p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-[1600px] mx-auto h-full"
      >
        <BentoGrid
          mainWeather={mainWeather}
          cities={cities}
          forecast={forecast}
          loading={loading}
          onSearch={handleSearch}
        />
      </motion.div>
    </div>
  );
}

export default App;