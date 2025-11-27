import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles } from 'lucide-react';
import weatherFactsByContinent from '../data/weatherFacts.json';
import { getContinent } from '../data/continents';

const FactsCard = ({ countryCode }) => {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    if (countryCode) {
      const continent = getContinent(countryCode);
      const continentFacts = weatherFactsByContinent[continent] || weatherFactsByContinent['World'];

      // Seleccionar 2 hechos aleatorios
      const shuffled = [...continentFacts].sort(() => 0.5 - Math.random());
      setFacts(shuffled.slice(0, 2));
    } else {
      // Por defecto mostrar hechos generales
      const worldFacts = weatherFactsByContinent['World'];
      const shuffled = [...worldFacts].sort(() => 0.5 - Math.random());
      setFacts(shuffled.slice(0, 2));
    }
  }, [countryCode]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countryCode) {
        const continent = getContinent(countryCode);
        const continentFacts = weatherFactsByContinent[continent] || weatherFactsByContinent['World'];
        const shuffled = [...continentFacts].sort(() => 0.5 - Math.random());
        setFacts(shuffled.slice(0, 2));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [countryCode]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-gradient-to-br from-blue-100/40 via-pink-100/30 to-purple-100/40 backdrop-blur-sm rounded-3xl p-5 shadow-lg border border-white/50 relative overflow-hidden"
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-200/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-6 -left-6 w-20 h-20 bg-pink-200/20 rounded-full blur-xl"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="p-2.5 bg-yellow-200/40 rounded-2xl"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Lightbulb className="w-4 h-4 text-yellow-600" />
          </motion.div>
          <h3 className="text-purple-900 font-semibold">¿Sabías que...?</h3>
        </div>

        <div className="space-y-3">
          {facts.map((fact, idx) => (
            <div key={fact.id} className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-purple-700 leading-relaxed text-sm"
                >
                  {fact.fact}
                </motion.p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-purple-400 text-sm"
          >
            Curiosidades del clima
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FactsCard;