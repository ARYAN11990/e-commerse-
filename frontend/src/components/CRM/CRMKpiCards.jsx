import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const CRMKpiCards = () => {
  const { data: kpis, loading, error, fetchData } = useApi('/crm/kpis');

  const kpiList = [
    { label: 'Active Deal', key: 'active_deal' },
    { label: 'Revenue Total', key: 'revenue_total' },
    { label: 'Closed Deals', key: 'closed_deals' },
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
            <div key={i} className="animate-pulse rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex flex-col justify-center h-[140px]">
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between items-center"><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
            </div>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        {kpiList.map((item) => {
          const data = kpis?.[item.key];
          if (!data) return null;
          const trend = data.trend;

          return (
            <div key={item.key} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex flex-col justify-center h-[140px]">
              <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[32px] leading-none mb-4">
                {data.value}
              </h4>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.label}</span>
                <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : trend === 'down' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#64748B]/10 text-[#64748B] dark:bg-[#8A99AF]/10 dark:text-[#8A99AF]'}`}>
                    {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{data.rate}
                  </span>
                  <span className="text-gray-400">From last month</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </DataState>
  );
};

export default CRMKpiCards;
