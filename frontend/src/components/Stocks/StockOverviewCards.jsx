import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const StockOverviewCards = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    api.get('/stocks/overview')
      .then((data) => setStocks(data))
      .catch((err) => console.error(err));
  }, []);

  const getLogo = (logoName) => {
    switch (logoName) {
      case 'apple': return <div className="w-10 h-10 rounded-full bg-[#1C2434] flex items-center justify-center text-white font-bold"></div>;
      case 'paypal': return <div className="w-10 h-10 rounded-full bg-[#3C50E0] flex items-center justify-center text-white font-bold italic">P</div>;
      case 'tesla': return <div className="w-10 h-10 rounded-full bg-[#EF4444] flex items-center justify-center text-white font-bold">T</div>;
      case 'amazon': return <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-white font-bold">a</div>;
      default: return <div className="w-10 h-10 rounded-full bg-gray-200"></div>;
    }
  };

  if (!stocks.length) return <div className="animate-pulse h-[140px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] mb-4 md:mb-6 2xl:mb-7.5" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
      {stocks.map((stock, index) => {
        const trend = stock.trend;

        return (
          <div key={index} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-[140px] flex flex-col justify-between">
            <div className="flex items-center gap-4">
              {getLogo(stock.logo)}
              <div>
                <h4 className="text-lg font-bold text-[#1C2434] dark:text-white">{stock.symbol}</h4>
                <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{stock.name}</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between mt-4">
              <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[24px]">
                {stock.price}
              </h4>
              <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium flex items-center gap-1 ${trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : trend === 'down' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#64748B]/10 text-[#64748B] dark:bg-[#8A99AF]/10 dark:text-[#8A99AF]'}`}>
                  {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {stock.percentage}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StockOverviewCards;
