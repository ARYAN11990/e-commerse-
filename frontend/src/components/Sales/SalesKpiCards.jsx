import ReactApexChart from 'react-apexcharts';
import { DollarSign, Box, ArrowRightLeft, Undo2 } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const SalesKpiCards = () => {
  const { data: kpis = [], loading, error, fetchData } = useApi('/sales/kpis');

  const getIcon = (iconName, color) => {
    switch (iconName) {
      case 'dollar': return <DollarSign className="w-5 h-5" style={{ color }} />;
      case 'box': return <Box className="w-5 h-5" style={{ color }} />;
      case 'arrows': return <ArrowRightLeft className="w-5 h-5" style={{ color }} />;
      case 'money_return': return <Undo2 className="w-5 h-5" style={{ color }} />;
      default: return <DollarSign className="w-5 h-5" style={{ color }} />;
    }
  };

  const getOptions = (color) => ({
    chart: {
      type: 'area',
      height: 40,
      sparkline: { enabled: true },
      fontFamily: 'Inter, sans-serif',
    },
    colors: [color],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } }, marker: { show: false } }
  });

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
                <div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="flex items-end justify-between">
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-24 h-10 bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded opacity-50"></div>
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
                <div>
                  <span className="text-sm font-medium text-[#1C2434] dark:text-white">{kpi.label}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-xs font-bold flex items-center gap-1 ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                      {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {kpi.rate}
                    </span>
                    <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{kpi.comparison}</span>
                  </div>
                </div>
                <div>
                  {getIcon(kpi.icon, kpi.color)}
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none mb-1">
                  {kpi.value}
                </h4>
                <div className="w-24">
                  <ReactApexChart options={getOptions(kpi.color)} series={kpi.series} type="area" height={40} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DataState>
  );
};

export default SalesKpiCards;
