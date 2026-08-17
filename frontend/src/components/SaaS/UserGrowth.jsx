import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const UserGrowth = () => {
  const { data, loading, error, fetchData } = useApi('/saas/user-growth');

  const options = {
    chart: {
      type: 'area',
      height: 60,
      sparkline: { enabled: true },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#10B981'],
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
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col justify-between">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data?.series || data?.series.length === 0} 
        skeleton={
          <div className="flex flex-col animate-pulse pt-2 justify-between flex-1">
            <div className="flex items-end justify-between mt-auto">
              <div>
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="w-24 h-[60px] bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded opacity-50"></div>
            </div>
          </div>
        }
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-lg font-bold text-[#1C2434] dark:text-white">User Growth</h4>
            <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">New signups website + mobile</span>
          </div>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] mb-1">
              {data?.value}
            </h4>
            <span className="text-xs font-medium text-[#10B981]">
              +{data?.change} <span className="text-gray-400">than last Week</span>
            </span>
          </div>
          <div className="w-24">
            <ReactApexChart options={options} series={data?.series || []} type="area" height={60} />
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default UserGrowth;
