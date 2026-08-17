import { Package, Truck, CheckSquare } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const LogisticsKpiCards = () => {
  const { data: kpis = [], loading, error, fetchData } = useApi('/logistics/kpis');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'box': return <Package className="w-6 h-6 text-[#1C2434] dark:text-white" />;
      case 'truck': return <Truck className="w-6 h-6 text-[#1C2434] dark:text-white" />;
      case 'box_check': return <CheckSquare className="w-6 h-6 text-[#1C2434] dark:text-white" />;
      default: return <Package className="w-6 h-6 text-[#1C2434] dark:text-white" />;
    }
  };

  return (
    <DataState 
      loading={loading} 
      error={error} 
      onRetry={fetchData} 
      isEmpty={!kpis || kpis.length === 0} 
      skeleton={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-[140px] flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0"></div>
              <div className="flex-1">
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        {kpis.map((kpi) => {
          const trend = kpi.trend;

          return (
            <div key={kpi.id} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-[140px] flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-[#F1F5F9] dark:bg-[#1A222C] flex items-center justify-center shrink-0">
                {getIcon(kpi.icon)}
              </div>
              <div className="flex-1">
                <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none mb-1">
                  {kpi.value}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{kpi.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : trend === 'down' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#64748B]/10 text-[#64748B] dark:bg-[#8A99AF]/10 dark:text-[#8A99AF]'}`}>
                    {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{kpi.rate}
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

export default LogisticsKpiCards;
