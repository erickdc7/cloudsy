import React from 'react';
import { motion } from 'framer-motion';
import HeaderCard from './HeaderCard';
import MainWeatherCard from './MainWeatherCard';
import SearchCard from './SearchCard';
import CityCard from './CityCard';
import ForecastCard from './ForecastCard';
import FactsCard from './FactsCard';

const BentoGrid = ({
  mainWeather,
  cities,
  forecast,
  loading,
  onSearch
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4 auto-rows-auto">

      {/* 1. Main Weather Card - Large */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="md:col-span-4 md:row-span-3"
      >
        <MainWeatherCard weather={mainWeather} loading={loading.main} />
      </motion.div>

      {/* 2. Search Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="md:col-span-2 relative z-50"
      >
        <SearchCard onSearch={onSearch} />
      </motion.div>

      {/* 3. City Card 1 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="md:col-span-1 md:row-span-2"
      >
        <CityCard
          weather={cities[0]}
          loading={loading.cities}
        />
      </motion.div>

      {/* 4. City Card 2 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="md:col-span-1 md:row-span-2"
      >
        <CityCard
          weather={cities[1]}
          loading={loading.cities}
        />
      </motion.div>

      {/* 5. Weather Facts Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="md:col-span-3 md:row-span-2"
      >
        <FactsCard countryCode={mainWeather?.sys?.country} />
      </motion.div>

      {/* 6. Forecast Card - 3 days */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="md:col-span-2 md:row-span-2"
      >
        <ForecastCard
          forecast={forecast}
          loading={loading.forecast}
          cityName={mainWeather?.name || 'Tokyo'}
        />
      </motion.div>

      {/* 7. Branding Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="md:col-span-1 md:row-span-2"
      >
        <HeaderCard />
      </motion.div>

    </div>
  );
};

export default BentoGrid;