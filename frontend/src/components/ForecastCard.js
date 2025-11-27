import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CloudRain, Sun, Cloud } from 'lucide-react';

const ForecastCard = ({ forecast, loading, cityName }) => {
  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-pink-100/30 backdrop-blur-sm rounded-3xl p-5 shadow-lg border border-white/50 flex items-center justify-center">
        <div className="text-purple-600 text-lg">Cargando...</div>
      </div>
    );
  }

  if (!forecast || !forecast.list) return null;

  // Obtener pronóstico para 3 días (mediodía de cada día)
  const threeDayForecast = forecast.list.filter((item, index) => {
    return index === 4 || index === 12 || index === 20;
  });

  const getWeatherIcon = (weatherCode) => {
    const code = weatherCode.toString();

    if (code.startsWith('2')) return CloudRain;
    if (code.startsWith('3') || code.startsWith('5')) return CloudRain;
    if (code === '800') return Sun;
    if (code.startsWith('8')) return Cloud;

    return Cloud;
  };

  const getIconColor = (weatherCode) => {
    const code = weatherCode.toString();

    if (code.startsWith('2') || code.startsWith('3') || code.startsWith('5')) return 'text-blue-400';
    if (code === '800') return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getDayName = (timestamp, index) => {
    const date = new Date(timestamp * 1000);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = days[date.getDay()];

    if (index === 0) return 'Mañana';
    return dayName;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-pink-100/30 backdrop-blur-sm rounded-3xl p-5 shadow-lg border border-white/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-blue-200/40 rounded-2xl">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h3 className="text-purple-900 font-semibold">Pronóstico de 3 días</h3>
          <div className="text-purple-400 text-sm">{cityName}</div>
        </div>
      </div>

      <div className="space-y-2.5">
        {threeDayForecast.map((day, index) => {
          const Icon = getWeatherIcon(day.weather[0].id);
          const iconColor = getIconColor(day.weather[0].id);
          const dayName = getDayName(day.dt, index);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="bg-white/40 rounded-2xl p-3 flex items-center justify-between border border-white/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </motion.div>
                <div>
                  <div className="text-purple-900 font-medium">{dayName}</div>
                  <div className="text-purple-400 text-sm capitalize">{day.weather[0].description}</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-900">{Math.round(day.main.temp)}°</div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ForecastCard;