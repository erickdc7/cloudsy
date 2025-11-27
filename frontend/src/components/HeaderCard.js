import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sparkles, Heart } from 'lucide-react';

const HeaderCard = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-purple-100/40 backdrop-blur-sm rounded-3xl p-5 shadow-lg border border-white/50 flex flex-col justify-between relative overflow-hidden"
        >
            {/* Animated background elements */}
            <motion.div
                animate={{
                    x: [0, 10, 0],
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-4 right-4 opacity-20"
            >
                <Cloud className="w-12 h-12 text-purple-300" />
            </motion.div>
            <motion.div
                animate={{
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-4 left-4 opacity-20"
            >
                <Sparkles className="w-10 h-10 text-pink-300" />
            </motion.div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Header con iconos */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                        </motion.div>
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-purple-400" />
                        </motion.div>
                    </div>

                    <h2 className="text-xl font-bold text-purple-900 mb-1">Cloudsy</h2>
                    <h3 className="text-md text-purple-700 mb-3">Dashboard</h3>
                </div>

                {/* Descripción al final de la card */}
                <div className="mt-auto">
                    <div className="text-purple-400 leading-relaxed text-sm text-center">
                        Bento Grid · Modern UI · Real Weather Data
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HeaderCard;