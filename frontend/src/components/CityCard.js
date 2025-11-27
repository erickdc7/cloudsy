import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Cloud, Sun, CloudRain, CloudDrizzle } from 'lucide-react';

const CityCard = ({ weather, loading }) => {
  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/30 backdrop-blur-sm rounded-3xl p-4 shadow-lg border border-white/50 flex items-center justify-center">
        <div className="text-purple-600">...</div>
      </div>
    );
  }

  if (!weather) return null;

  const getSmallWeatherIcon = (weatherCode) => {
    const code = weatherCode.toString();

    if (code.startsWith('2')) return <CloudRain className="w-10 h-10 text-blue-300" />;
    if (code.startsWith('3') || code.startsWith('5')) return <CloudRain className="w-10 h-10 text-blue-300" />;
    if (code.startsWith('6')) return <CloudDrizzle className="w-10 h-10 text-slate-300" />;
    if (code === '800') return <Sun className="w-10 h-10 text-yellow-300" />;
    if (code.startsWith('8')) return <Cloud className="w-10 h-10 text-gray-300" />;

    return <Cloud className="w-10 h-10 text-gray-300" />;
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
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/30 backdrop-blur-sm rounded-3xl p-4 shadow-lg border border-white/50 cursor-pointer flex flex-col justify-between"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 text-purple-600">
          <MapPin className="w-3.5 h-3.5" />
          <div className="text-purple-400 text-sm">{getCountryName(weather.sys.country)}</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getSmallWeatherIcon(weather.weather[0].id)}
        </motion.div>
      </div>

      <div>
        <h3 className="text-purple-900 font-semibold mb-1 text-lg">{weather.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-purple-900">{Math.round(weather.main.temp)}°</span>
          <span className="text-purple-600 text-sm capitalize">{weather.weather[0].description}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CityCard;