import ReactApexChart from 'react-apexcharts';
import DropdownDefault from '../DropdownDefault';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const TotalRevenueEarned = () => {
  const { data, loading, error, fetchData } = useApi('/logistics/revenue-earned');

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
          <div className="h-full w-full animate-pulse flex flex-col pt-2 justify-between">
            <div className="flex justify-between items-start mb-6">
              <div><div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div><div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <div><div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div><div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="w-24 h-[60px] bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded opacity-50"></div>
            </div>
          </div>
        }
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Total revenue earned</span>
            <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] mt-1">
              {data?.total_revenue}
            </h4>
          </div>
          <DropdownDefault options={['View Details', 'Export', 'Delete']} />
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] block mb-1">Shipped quantities</span>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white leading-none">
              {data?.shipped_quantities}
            </h4>
          </div>
          <div className="w-24">
            <ReactApexChart options={options} series={data?.series || []} type="area" height={60} />
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default TotalRevenueEarned;
