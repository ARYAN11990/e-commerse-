import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const MyWatchlist = () => {
  const { data: watchlist = [], loading, error, fetchData } = useApi('/stocks/watchlist');

  const getLogo = (logoName) => {
    switch (logoName) {
      case 'apple': return <div className="w-10 h-10 rounded-full bg-[#1C2434] flex items-center justify-center text-white font-bold"></div>;
      case 'spotify': return <div className="w-10 h-10 rounded-full bg-[#1ED760] flex items-center justify-center text-white font-bold">S</div>;
      case 'airbnb': return <div className="w-10 h-10 rounded-full bg-[#FF5A5F] flex items-center justify-center text-white font-bold">A</div>;
      case 'envato': return <div className="w-10 h-10 rounded-full bg-[#81B441] flex items-center justify-center text-white font-bold">E</div>;
      case 'qiwi': return <div className="w-10 h-10 rounded-full bg-[#FF8C00] flex items-center justify-center text-white font-bold">Q</div>;
      default: return <div className="w-10 h-10 rounded-full bg-gray-200"></div>;
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 h-[420px] overflow-hidden flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">My Watchlist</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!watchlist || watchlist.length === 0} 
        skeleton={
          <div className="flex flex-col flex-1 pb-4 animate-pulse pt-2 gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center justify-between border-b border-stroke dark:border-[#2E3A47] py-3 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar pb-4">
          {(watchlist || []).map((item, index) => {
            const trend = item.trend;
            return (
              <div key={index} className="flex items-center justify-between border-b border-stroke dark:border-[#2E3A47] py-3 last:border-b-0">
                <div className="flex items-center gap-3">
                  {getLogo(item.logo)}
                  <div>
                    <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{item.symbol}</h5>
                    <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{item.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{item.price}</h5>
                  <span className={`text-xs font-medium flex items-center justify-end gap-1 ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {item.percentage}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </DataState>
    </div>
  );
};

export default MyWatchlist;
