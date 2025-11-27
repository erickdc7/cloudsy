import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudDrizzle, Wind, Droplets } from 'lucide-react';

const MainWeatherCard = ({ weather, loading }) => {
  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-purple-100/40 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-xl border border-white/50 flex items-center justify-center">
        <div className="text-purple-600 text-xl">Cargando...</div>
      </div>
    );
  }

  if (!weather) return null;

  // Función para obtener el ícono según el código del clima
  const getWeatherIcon = (weatherCode) => {
    const code = weatherCode.toString();

    if (code.startsWith('2')) return <CloudRain className="w-24 h-24 text-blue-300" />;
    if (code.startsWith('3') || code.startsWith('5')) return <CloudRain className="w-24 h-24 text-blue-300" />;
    if (code.startsWith('6')) return <CloudDrizzle className="w-24 h-24 text-slate-300" />;
    if (code === '800') return <Sun className="w-24 h-24 text-yellow-300" />;
    if (code.startsWith('8')) return <Cloud className="w-24 h-24 text-gray-300" />;

    return <Cloud className="w-24 h-24 text-gray-300" />;
  };

  // Obtener nombre del país completo 
const getCountryName = (code) => {
    const countries = {
      // América del Norte
      'US': 'United States', 'CA': 'Canada', 'MX': 'Mexico', 
      
      // América Central
      'GT': 'Guatemala', 'BZ': 'Belize', 'SV': 'El Salvador', 'HN': 'Honduras',
      'NI': 'Nicaragua', 'CR': 'Costa Rica', 'PA': 'Panama',
      
      // Caribe
      'CU': 'Cuba', 'JM': 'Jamaica', 'HT': 'Haiti', 'DO': 'Dominican Republic',
      'PR': 'Puerto Rico', 'TT': 'Trinidad and Tobago', 'BS': 'Bahamas',
      'BB': 'Barbados', 'LC': 'Saint Lucia', 'GD': 'Grenada', 'VC': 'Saint Vincent',
      'AG': 'Antigua and Barbuda', 'DM': 'Dominica', 'KN': 'Saint Kitts and Nevis',
      
      // América del Sur
      'CO': 'Colombia', 'VE': 'Venezuela', 'GY': 'Guyana', 'SR': 'Suriname',
      'GF': 'French Guiana', 'BR': 'Brazil', 'EC': 'Ecuador', 'PE': 'Peru',
      'BO': 'Bolivia', 'CL': 'Chile', 'AR': 'Argentina', 'UY': 'Uruguay',
      'PY': 'Paraguay',
      
      // Europa Occidental
      'GB': 'United Kingdom', 'IE': 'Ireland', 'FR': 'France', 'ES': 'Spain',
      'PT': 'Portugal', 'AD': 'Andorra', 'MC': 'Monaco', 'BE': 'Belgium',
      'NL': 'Netherlands', 'LU': 'Luxembourg', 'DE': 'Germany', 'CH': 'Switzerland',
      'AT': 'Austria', 'LI': 'Liechtenstein', 'IT': 'Italy', 'SM': 'San Marino',
      'VA': 'Vatican City', 'MT': 'Malta',
      
      // Europa del Norte
      'IS': 'Iceland', 'NO': 'Norway', 'SE': 'Sweden', 'FI': 'Finland',
      'DK': 'Denmark', 'EE': 'Estonia', 'LV': 'Latvia', 'LT': 'Lithuania',
      
      // Europa Central
      'PL': 'Poland', 'CZ': 'Czech Republic', 'SK': 'Slovakia', 'HU': 'Hungary',
      'SI': 'Slovenia', 'HR': 'Croatia', 'BA': 'Bosnia and Herzegovina',
      'RS': 'Serbia', 'ME': 'Montenegro', 'XK': 'Kosovo', 'MK': 'North Macedonia',
      'AL': 'Albania',
      
      // Europa del Este
      'RU': 'Russia', 'UA': 'Ukraine', 'BY': 'Belarus', 'MD': 'Moldova',
      'RO': 'Romania', 'BG': 'Bulgaria',
      
      // Asia Oriental
      'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'KP': 'North Korea',
      'MN': 'Mongolia', 'TW': 'Taiwan', 'HK': 'Hong Kong', 'MO': 'Macau',
      
      // Sudeste Asiático
      'TH': 'Thailand', 'VN': 'Vietnam', 'LA': 'Laos', 'KH': 'Cambodia',
      'MM': 'Myanmar', 'MY': 'Malaysia', 'SG': 'Singapore', 'ID': 'Indonesia',
      'BN': 'Brunei', 'PH': 'Philippines', 'TL': 'East Timor',
      
      // Asia del Sur
      'IN': 'India', 'PK': 'Pakistan', 'BD': 'Bangladesh', 'LK': 'Sri Lanka',
      'NP': 'Nepal', 'BT': 'Bhutan', 'MV': 'Maldives', 'AF': 'Afghanistan',
      
      // Medio Oriente
      'TR': 'Turkey', 'CY': 'Cyprus', 'SY': 'Syria', 'LB': 'Lebanon',
      'IL': 'Israel', 'PS': 'Palestine', 'JO': 'Jordan', 'IQ': 'Iraq',
      'SA': 'Saudi Arabia', 'YE': 'Yemen', 'OM': 'Oman', 'AE': 'United Arab Emirates',
      'QA': 'Qatar', 'BH': 'Bahrain', 'KW': 'Kuwait', 'IR': 'Iran',
      'GE': 'Georgia', 'AM': 'Armenia', 'AZ': 'Azerbaijan',
      
      // Asia Central
      'KZ': 'Kazakhstan', 'UZ': 'Uzbekistan', 'TM': 'Turkmenistan',
      'KG': 'Kyrgyzstan', 'TJ': 'Tajikistan',
      
      // África del Norte
      'MA': 'Morocco', 'DZ': 'Algeria', 'TN': 'Tunisia', 'LY': 'Libya',
      'EG': 'Egypt', 'SD': 'Sudan', 'SS': 'South Sudan',
      
      // África Occidental
      'MR': 'Mauritania', 'ML': 'Mali', 'NE': 'Niger', 'TD': 'Chad',
      'SN': 'Senegal', 'GM': 'Gambia', 'GW': 'Guinea-Bissau', 'GN': 'Guinea',
      'SL': 'Sierra Leone', 'LR': 'Liberia', 'CI': 'Ivory Coast', 'BF': 'Burkina Faso',
      'GH': 'Ghana', 'TG': 'Togo', 'BJ': 'Benin', 'NG': 'Nigeria', 'CM': 'Cameroon',
      
      // África Central
      'CF': 'Central African Republic', 'GQ': 'Equatorial Guinea', 'GA': 'Gabon',
      'CG': 'Republic of the Congo', 'CD': 'Democratic Republic of the Congo',
      'AO': 'Angola',
      
      // África Oriental
      'ER': 'Eritrea', 'ET': 'Ethiopia', 'DJ': 'Djibouti', 'SO': 'Somalia',
      'KE': 'Kenya', 'UG': 'Uganda', 'RW': 'Rwanda', 'BI': 'Burundi',
      'TZ': 'Tanzania', 'MZ': 'Mozambique', 'MW': 'Malawi', 'ZM': 'Zambia',
      'ZW': 'Zimbabwe', 'MG': 'Madagascar', 'MU': 'Mauritius', 'SC': 'Seychelles',
      'KM': 'Comoros',
      
      // África del Sur
      'NA': 'Namibia', 'BW': 'Botswana', 'ZA': 'South Africa', 'SZ': 'Eswatini',
      'LS': 'Lesotho',
      
      // Oceanía
      'AU': 'Australia', 'NZ': 'New Zealand', 'PG': 'Papua New Guinea',
      'FJ': 'Fiji', 'SB': 'Solomon Islands', 'VU': 'Vanuatu', 'NC': 'New Caledonia',
      'WS': 'Samoa', 'TO': 'Tonga', 'KI': 'Kiribati', 'FM': 'Micronesia',
      'MH': 'Marshall Islands', 'PW': 'Palau', 'NR': 'Nauru', 'TV': 'Tuvalu',
      'CK': 'Cook Islands', 'PF': 'French Polynesia', 'GU': 'Guam'
    };
    return countries[code] || code;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-purple-100/40 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-xl border border-white/50 flex flex-col justify-between"
    >
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-purple-400/60 mb-1 text-sm"
        >
          {getCountryName(weather.sys.country)}
        </motion.div>
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-purple-900 mb-4"
        >
          {weather.name}
        </motion.h1>
      </div>

      <div className="flex items-center justify-center my-4">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getWeatherIcon(weather.weather[0].id)}
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex items-end gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-6xl md:text-7xl font-bold text-purple-900"
          >
            {Math.round(weather.main.temp)}°
          </motion.div>
          <div className="text-purple-700 mb-3 text-lg">Celsius</div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-purple-600 text-lg capitalize"
        >
          {weather.weather[0].description}
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-purple-200/50">
          <div className="flex items-center gap-3 text-purple-700">
            <Droplets className="w-5 h-5 text-blue-300" />
            <div>
              <div className="text-purple-400/70 text-sm">Humedad</div>
              <div className="font-semibold">{weather.main.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-purple-700">
            <Wind className="w-5 h-5 text-purple-300" />
            <div>
              <div className="text-purple-400/70 text-sm">Viento</div>
              <div className="font-semibold">{weather.wind.speed} m/s</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainWeatherCard;