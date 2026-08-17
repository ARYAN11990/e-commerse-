import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const TrendingStocks = () => {
  const scrollContainerRef = useRef(null);
  const { data: trending = [], loading, error, fetchData } = useApi('/stocks/trending-stocks');

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const getLogo = (logoName) => {
    switch (logoName) {
      case 'tesla': return <div className="w-10 h-10 rounded-full bg-[#EF4444] flex items-center justify-center text-white font-bold">T</div>;
      case 'apple': return <div className="w-10 h-10 rounded-full bg-[#1C2434] flex items-center justify-center text-white font-bold"></div>;
      case 'spotify': return <div className="w-10 h-10 rounded-full bg-[#1ED760] flex items-center justify-center text-white font-bold">S</div>;
      case 'amazon': return <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-white font-bold">a</div>;
      default: return <div className="w-10 h-10 rounded-full bg-gray-200"></div>;
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Trending Stocks</h4>
        <div className="flex gap-2">
          <button 
            onClick={scrollLeft}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-stroke dark:border-[#2E3A47] text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-stroke dark:border-[#2E3A47] text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!trending || trending.length === 0} 
        skeleton={
          <div className="flex gap-4 md:gap-6 overflow-hidden">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[280px] rounded-xl border border-stroke dark:border-[#2E3A47] p-5 shrink-0 animate-pulse">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {(trending || []).map((stock, index) => {
            const trend = stock.trend;
            return (
              <div key={index} className="min-w-[280px] rounded-xl border border-stroke dark:border-[#2E3A47] p-5 shrink-0">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    {getLogo(stock.logo)}
                    <div>
                      <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{stock.symbol}</h5>
                      <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{stock.price}</h5>
                    <span className={`text-xs font-medium flex items-center justify-end gap-1 ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                      {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {stock.percentage}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 rounded-md border border-stroke dark:border-[#2E3A47] py-2.5 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
                    Short Stock
                  </button>
                  <button className="flex-1 rounded-md bg-[#3C50E0] py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition">
                    Buy Stock
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </DataState>
    </div>
  );
};

export default TrendingStocks;
