import { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const SalesByCountry = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/sales/country')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[400px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse h-full" />;

  const getFlag = (code) => {
    switch (code) {
      case 'US': return '🇺🇸';
      case 'FR': return '🇫🇷';
      case 'JP': return '🇯🇵';
      case 'DE': return '🇩🇪';
      default: return '🏳️';
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Sales by Country</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Country-wise sales overview</span>
        </div>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* World Map Static Image Graphic */}
      <div className="w-full flex justify-center mb-8 h-40 object-contain">
        {/* We use an embedded SVG representing a world map styled exactly like the screenshot */}
        <svg viewBox="0 0 1008 650" className="w-full h-full fill-[#E2E8F0]">
           {/* North America */}
           <path d="M185 150 Q 220 120, 270 140 T 320 200 T 260 250 T 170 200 Z" className="fill-[#3C50E0]" />
           {/* South America */}
           <path d="M250 350 Q 280 320, 310 380 T 270 500 T 240 450 Z" />
           {/* Europe/Africa */}
           <path d="M450 160 Q 520 140, 580 180 T 500 240 T 420 200 Z" className="fill-[#6577F3] opacity-60" />
           <path d="M450 260 Q 500 240, 550 300 T 520 450 T 430 360 Z" />
           {/* Asia */}
           <path d="M600 130 Q 750 100, 850 180 T 700 300 T 580 200 Z" className="fill-[#8FD0EF]" />
           {/* Australia */}
           <path d="M780 400 Q 820 380, 880 420 T 800 480 Z" />
        </svg>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        {data.countries.map((country, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3 w-1/3">
              <span className="text-lg leading-none">{getFlag(country.code)}</span>
              <span className="text-sm font-medium text-[#1C2434] dark:text-white">{country.name}</span>
            </div>
            <div className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] w-1/3 text-center">
              {country.revenue}
            </div>
            <div className="text-sm font-medium text-[#1C2434] dark:text-white w-1/3 text-right">
              {country.percentage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesByCountry;
