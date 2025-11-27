const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ========== MIDDLEWARE ==========
app.use(cors({
  origin: [
    'http://localhost:3000',
    /\.vercel\.app$/ // Permite todos los subdominios de Vercel
  ],
  credentials: true
}));
app.use(express.json());

// ========== CONFIGURACIÓN DE API ==========
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ========== RUTAS ==========

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API del Clima funcionando correctamente',
    status: 'OK',
    apiKeyLoaded: !!API_KEY
  });
});

// ========== IMPORTANTE: Rutas específicas ANTES de rutas con parámetros ==========

// Buscar ciudades por nombre (Geocoding) - PRIMERO
// Buscar ciudades por nombre (Geocoding) - PRIMERO
// Buscar ciudades por nombre (Geocoding) - PRIMERO
// Buscar ciudades por nombre (Geocoding) - PRIMERO
app.get('/api/cities/search', async (req, res) => {
  const { query } = req.query;

  if (!query || query.length < 2) {
    return res.json([]);
  }

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=15&appid=${API_KEY}`
    );

    let cities = response.data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state || '',
      lat: city.lat,
      lon: city.lon,
      displayName: city.state
        ? `${city.name}, ${city.state}, ${city.country}`
        : `${city.name}, ${city.country}`
    }));

    // Ordenar primero
    const queryLower = query.toLowerCase();

    cities.sort((a, b) => {
      const aNameLower = a.name.toLowerCase();
      const bNameLower = b.name.toLowerCase();

      const aExact = aNameLower === queryLower;
      const bExact = bNameLower === queryLower;

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = aNameLower.startsWith(queryLower);
      const bStarts = bNameLower.startsWith(queryLower);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      const aNoState = !a.state || a.state === a.name;
      const bNoState = !b.state || b.state === b.name;

      if (aNoState && !bNoState) return -1;
      if (!aNoState && bNoState) return 1;

      return 0;
    });

    // Eliminar duplicados más agresivamente
    const uniqueCities = [];
    const seen = new Set();

    for (const city of cities) {
      // Crear clave única basada en nombre, estado y país
      // Ignorar coordenadas para detectar duplicados
      const key = `${city.name.toLowerCase()}-${city.state.toLowerCase()}-${city.country}`;

      if (!seen.has(key)) {
        seen.add(key);
        uniqueCities.push(city);
      }
    }

    res.json(uniqueCities.slice(0, 5));
  } catch (error) {
    console.error('Error buscando ciudades:', error);
    res.status(500).json({ error: 'Error al buscar ciudades' });
  }
});

// Obtener clima por coordenadas - ANTES del endpoint con :city
app.get('/api/weather/coords', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Se requieren latitud y longitud' });
  }

  if (!API_KEY) {
    return res.status(500).json({
      error: 'API Key no configurada'
    });
  }

  try {
    const url = `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
    console.log('Solicitando clima por coordenadas:', url.replace(API_KEY, 'API_KEY'));
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error en clima por coordenadas:', error.response?.data || error.message);
    if (error.response) {
      res.status(error.response.status).json({
        error: 'Error al obtener datos del clima',
        details: error.response.data
      });
    } else {
      res.status(500).json({ error: 'Error de conexión' });
    }
  }
});

// Obtener pronóstico por coordenadas - ANTES del endpoint con :city
app.get('/api/forecast/coords', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Se requieren latitud y longitud' });
  }

  if (!API_KEY) {
    return res.status(500).json({
      error: 'API Key no configurada'
    });
  }

  try {
    const url = `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
    console.log('Solicitando pronóstico por coordenadas:', url.replace(API_KEY, 'API_KEY'));
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error en pronóstico por coordenadas:', error.response?.data || error.message);
    if (error.response) {
      res.status(error.response.status).json({
        error: 'Error al obtener pronóstico',
        details: error.response.data
      });
    } else {
      res.status(500).json({ error: 'Error de conexión' });
    }
  }
});

// Obtener clima de múltiples ciudades
app.post('/api/weather/multiple', async (req, res) => {
  const { cities } = req.body;

  if (!API_KEY) {
    return res.status(500).json({
      error: 'API Key no configurada'
    });
  }

  if (!cities || !Array.isArray(cities)) {
    return res.status(400).json({
      error: 'Debes enviar un array de ciudades'
    });
  }

  try {
    const promises = cities.map(city =>
      axios.get(`${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`)
    );

    const responses = await Promise.all(promises);
    const weatherData = responses.map(response => response.data);

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener datos de las ciudades',
      details: error.message
    });
  }
});

// ========== Rutas con parámetros AL FINAL ==========

// Obtener clima por nombre de ciudad
app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;

  if (!API_KEY) {
    return res.status(500).json({
      error: 'API Key no configurada. Revisa tu archivo .env'
    });
  }

  try {
    const url = `${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        res.status(404).json({ error: 'Ciudad no encontrada' });
      } else if (error.response.status === 401) {
        res.status(401).json({
          error: 'API Key inválida o no activa',
          details: error.response.data
        });
      } else {
        res.status(error.response.status).json({
          error: 'Error al obtener datos del clima',
          details: error.response.data
        });
      }
    } else {
      res.status(500).json({ error: 'Error de conexión' });
    }
  }
});

// Obtener pronóstico por nombre de ciudad
app.get('/api/forecast/:city', async (req, res) => {
  const { city } = req.params;

  if (!API_KEY) {
    return res.status(500).json({
      error: 'API Key no configurada'
    });
  }

  try {
    const response = await axios.get(
      `${OPENWEATHER_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Ciudad no encontrada' });
    } else if (error.response && error.response.status === 401) {
      res.status(401).json({
        error: 'API Key inválida o no activa',
        details: error.response.data
      });
    } else {
      res.status(500).json({ error: 'Error al obtener pronóstico' });
    }
  }
});

// ========== INICIAR SERVIDOR ==========
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});