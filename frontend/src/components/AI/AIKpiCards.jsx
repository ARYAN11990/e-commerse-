import { Users, Folder, DollarSign, UserCheck } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const AIKpiCards = () => {
  const { data: kpis = [], loading, error, fetchData } = useApi('/ai/kpis');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'users': return <Users className="w-5 h-5 text-[#3C50E0]" />;
      case 'folder': return <Folder className="w-5 h-5 text-[#3BA2B8]" />;
      case 'dollar': return <DollarSign className="w-5 h-5 text-[#10B981]" />;
      case 'user_check': return <UserCheck className="w-5 h-5 text-[#F59E0B]" />;
      default: return <Users className="w-5 h-5 text-[#3C50E0]" />;
    }
  };

  const getIconBg = (iconName) => {
    switch (iconName) {
      case 'users': return 'bg-[#3C50E0]/10';
      case 'folder': return 'bg-[#3BA2B8]/10';
      case 'dollar': return 'bg-[#10B981]/10';
      case 'user_check': return 'bg-[#F59E0B]/10';
      default: return 'bg-[#3C50E0]/10';
    }
  };

  return (
    <DataState 
      loading={loading} 
      error={error} 
      onRetry={fetchData} 
      isEmpty={!kpis || kpis.length === 0} 
      skeleton={
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-[140px] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1.5"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              </div>
            </div>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        {kpis.map((kpi) => {
          const trend = kpi.trend;
  
          return (
            <div key={kpi.id} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-[140px] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-[#1C2434] dark:text-white">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getIconBg(kpi.icon)}`}>
                  {getIcon(kpi.icon)}
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none mb-1">
                    {kpi.value}
                  </h4>
                  <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{kpi.period}</span>
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                  {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {kpi.rate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </DataState>
  );
};

export default AIKpiCards;
