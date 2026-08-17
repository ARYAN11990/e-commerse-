import { Star, Users, DollarSign } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const MarketingKpiCards = () => {
  const { data: kpis, loading, error, fetchData } = useApi('/marketing/kpis');

  const kpiList = [
    { 
      label: 'Avg. Client Rating', 
      key: 'avg_client_rating', 
      icon: <Star className="text-[#3C50E0] w-6 h-6" /> 
    },
    { 
      label: 'Instagram Followers', 
      key: 'instagram_followers', 
      icon: <Users className="text-[#3C50E0] w-6 h-6" /> 
    },
    { 
      label: 'Total Revenue', 
      key: 'total_revenue', 
      icon: <DollarSign className="text-[#3C50E0] w-6 h-6" /> 
    },
  ];

  return (
    <DataState 
      loading={loading} 
      error={error} 
      onRetry={fetchData} 
      isEmpty={!kpis} 
      skeleton={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex flex-col justify-between h-[160px]">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-12 w-12 mb-4"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="flex justify-between items-end"><div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
            </div>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        {kpis && kpiList.map((item) => {
          const data = kpis?.[item.key];
          if (!data) return null;
          const trend = data.trend;

          return (
            <div key={item.key} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex flex-col justify-between h-[160px]">
              <div className="flex items-center gap-3">
                <div className="bg-[#F1F5F9] dark:bg-[#1A222C] rounded-full p-3 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              
              <div className="mt-4">
                <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.label}</span>
                <div className="flex items-end justify-between mt-1">
                  <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none">
                    {data.value}
                  </h4>
                  <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : trend === 'down' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#64748B]/10 text-[#64748B] dark:bg-[#8A99AF]/10 dark:text-[#8A99AF]'}`}>
                      {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{data.rate}
                    </span>
                    <span className="text-gray-400">Vs last month</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DataState>
  );
};

export default MarketingKpiCards;
