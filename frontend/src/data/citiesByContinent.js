// Ciudades principales por continente y país
export const citiesByContinent = {
    America: {
        countries: [
            { country: 'US', city: 'New York', name: 'United States' },
            { country: 'CA', city: 'Toronto', name: 'Canada' },
            { country: 'MX', city: 'Mexico City', name: 'Mexico' },
            { country: 'BR', city: 'São Paulo', name: 'Brazil' },
            { country: 'AR', city: 'Buenos Aires', name: 'Argentina' },
            { country: 'CL', city: 'Santiago', name: 'Chile' },
            { country: 'CO', city: 'Bogotá', name: 'Colombia' },
            { country: 'PE', city: 'Lima', name: 'Peru' },
            { country: 'VE', city: 'Caracas', name: 'Venezuela' },
            { country: 'EC', city: 'Quito', name: 'Ecuador' },
            { country: 'CR', city: 'San José', name: 'Costa Rica' },
            { country: 'PA', city: 'Panama City', name: 'Panama' },
            { country: 'UY', city: 'Montevideo', name: 'Uruguay' },
            { country: 'PY', city: 'Asunción', name: 'Paraguay' },
            { country: 'BO', city: 'La Paz', name: 'Bolivia' },
        ]
    },
    Europe: {
        countries: [
            { country: 'GB', city: 'London', name: 'United Kingdom' },
            { country: 'FR', city: 'Paris', name: 'France' },
            { country: 'DE', city: 'Berlin', name: 'Germany' },
            { country: 'IT', city: 'Rome', name: 'Italy' },
            { country: 'ES', city: 'Madrid', name: 'Spain' },
            { country: 'PT', city: 'Lisbon', name: 'Portugal' },
            { country: 'NL', city: 'Amsterdam', name: 'Netherlands' },
            { country: 'BE', city: 'Brussels', name: 'Belgium' },
            { country: 'CH', city: 'Zurich', name: 'Switzerland' },
            { country: 'AT', city: 'Vienna', name: 'Austria' },
            { country: 'PL', city: 'Warsaw', name: 'Poland' },
            { country: 'GR', city: 'Athens', name: 'Greece' },
            { country: 'SE', city: 'Stockholm', name: 'Sweden' },
            { country: 'NO', city: 'Oslo', name: 'Norway' },
            { country: 'DK', city: 'Copenhagen', name: 'Denmark' },
        ]
    },
    Asia: {
        countries: [
            { country: 'JP', city: 'Tokyo', name: 'Japan' },
            { country: 'CN', city: 'Beijing', name: 'China' },
            { country: 'KR', city: 'Seoul', name: 'South Korea' },
            { country: 'IN', city: 'Mumbai', name: 'India' },
            { country: 'TH', city: 'Bangkok', name: 'Thailand' },
            { country: 'VN', city: 'Ho Chi Minh City', name: 'Vietnam' },
            { country: 'PH', city: 'Manila', name: 'Philippines' },
            { country: 'ID', city: 'Jakarta', name: 'Indonesia' },
            { country: 'MY', city: 'Kuala Lumpur', name: 'Malaysia' },
            { country: 'SG', city: 'Singapore', name: 'Singapore' },
            { country: 'SA', city: 'Riyadh', name: 'Saudi Arabia' },
            { country: 'AE', city: 'Dubai', name: 'United Arab Emirates' },
            { country: 'IL', city: 'Tel Aviv', name: 'Israel' },
            { country: 'TR', city: 'Istanbul', name: 'Turkey' },
        ]
    },
    Africa: {
        countries: [
            { country: 'EG', city: 'Cairo', name: 'Egypt' },
            { country: 'ZA', city: 'Cape Town', name: 'South Africa' },
            { country: 'NG', city: 'Lagos', name: 'Nigeria' },
            { country: 'KE', city: 'Nairobi', name: 'Kenya' },
            { country: 'MA', city: 'Casablanca', name: 'Morocco' },
            { country: 'DZ', city: 'Algiers', name: 'Algeria' },
            { country: 'TN', city: 'Tunis', name: 'Tunisia' },
            { country: 'ET', city: 'Addis Ababa', name: 'Ethiopia' },
            { country: 'GH', city: 'Accra', name: 'Ghana' },
            { country: 'TZ', city: 'Dar es Salaam', name: 'Tanzania' },
        ]
    },
    Oceania: {
        countries: [
            { country: 'AU', city: 'Sydney', name: 'Australia' },
            { country: 'NZ', city: 'Auckland', name: 'New Zealand' },
            { country: 'FJ', city: 'Suva', name: 'Fiji' },
            { country: 'PG', city: 'Port Moresby', name: 'Papua New Guinea' },
        ]
    }
};

// Función para obtener 2 ciudades aleatorias del mismo continente (excluyendo el país actual)
export const getRandomCitiesFromContinent = (countryCode) => {
    // Importar la función para obtener el continente
    const { getContinent } = require('./continents');
    const continent = getContinent(countryCode);

    const continentData = citiesByContinent[continent];

    if (!continentData) {
        // Si no hay datos, devolver ciudades por defecto
        return [
            { country: 'JP', city: 'Tokyo', name: 'Japan' },
            { country: 'FR', city: 'Paris', name: 'France' }
        ];
    }

    // Filtrar para excluir el país actual
    const availableCities = continentData.countries.filter(
        item => item.country !== countryCode
    );

    // Si hay menos de 2 ciudades disponibles, usar todas las del continente
    if (availableCities.length < 2) {
        return continentData.countries.slice(0, 2);
    }

    // Mezclar y tomar 2 ciudades aleatorias
    const shuffled = [...availableCities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
};