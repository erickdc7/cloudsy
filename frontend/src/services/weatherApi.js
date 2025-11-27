import axios from 'axios';

// Usar variable de entorno en producción
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/weather/${city}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWeatherByCoordinates = async (lat, lon) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/weather/coords`, {
            params: { lat, lon }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMultipleCitiesWeather = async (cities) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/weather/multiple`, { cities });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getForecastByCity = async (city) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/forecast/${city}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getForecastByCoordinates = async (lat, lon) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/forecast/coords`, {
            params: { lat, lon }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchCities = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cities/search`, {
            params: { query }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};