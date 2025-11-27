import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { searchCities } from '../services/weatherApi';

const SearchCard = ({ onSearch }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            if (input.length >= 2) {
                fetchCitySuggestions(input);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(delayTimer);
    }, [input]);

    const fetchCitySuggestions = async (query) => {
        setLoading(true);
        try {
            const cities = await searchCities(query);
            setSuggestions(cities);
            setShowSuggestions(cities.length > 0);
        } catch (error) {
            console.error('Error obteniendo sugerencias:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (value) => {
        setInput(value);
    };

    const handleSelectCity = (city) => {
        onSearch(city);
        setShowSuggestions(false);
        setInput('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            if (suggestions.length > 0) {
                onSearch(suggestions[0]);
            } else {
                onSearch({ name: input });
            }
            setShowSuggestions(false);
            setInput('');
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-br from-pink-200/30 via-purple-100/30 to-blue-100/30 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-xl border border-white/50 relative"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-purple-200/40 rounded-2xl">
                    <Search className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-purple-900 font-semibold text-lg">Encuentra una ciudad</h3>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Busca una ciudad (ej: Lima, Buenos Aires)..."
                        className="w-full px-4 py-3 bg-white/60 border-2 border-purple-200/50 rounded-2xl text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-300 focus:bg-white/80 transition-all"
                    />

                    {loading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>


                <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200/50 overflow-hidden z-50 max-h-60 overflow-y-auto"
                        >
                            {suggestions.map((city, index) => {
                                const uniqueKey = `${city.name}-${city.country}-${city.state || 'no-state'}-${city.lat.toFixed(4)}-${city.lon.toFixed(4)}`;

                                return (
                                    <motion.button
                                        key={uniqueKey}
                                        type="button"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleSelectCity(city)}
                                        className="w-full px-5 py-3 text-left hover:bg-purple-100/50 transition-colors text-purple-900 flex items-center gap-3 border-b border-purple-100/30 last:border-b-0"
                                    >
                                        <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                        <div className="flex flex-col flex-1">
                                            <span className="font-medium">{city.name}</span>
                                            <span className="text-xs text-purple-400">
                                                {city.state ? `${city.state}, ${city.country}` : city.country}
                                            </span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-3 text-purple-400 text-sm">
                    Empieza a escribir para ver sugerencias
                </div>
            </form>
        </motion.div>
    );
};

export default SearchCard;