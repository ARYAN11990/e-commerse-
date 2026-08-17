import ReactApexChart from 'react-apexcharts';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const DeliveryStatistics = () => {
  const { data, loading, error, fetchData } = useApi('/logistics/delivery-statistics');

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
      stacked: false,
    },
    colors: ['#A7C5FF', '#3C50E0'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 2,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    xaxis: {
      categories: data?.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: { 
        style: { colors: '#64748B', fontSize: '12px' },
        formatter: (val) => `${val}%`
      }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    legend: { show: false },
    fill: { opacity: 1 }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data?.series || data?.series.length === 0} 
        skeleton={
          <div className="h-full w-full animate-pulse pt-2">
            <div className="flex justify-between items-start sm:items-center gap-4 mb-6">
              <div><div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div><div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center gap-6 mb-4">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-[320px] w-full flex items-end justify-between px-4 pb-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="w-[10%] bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t opacity-50" style={{ height: `${Math.random() * 60 + 40}%` }}></div>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Delivery Statistics</h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Total number of deliveries {data?.total_deliveries}</span>
          </div>
          <div className="relative">
            <select className="appearance-none rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-2 pl-4 pr-10 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] outline-none hover:text-[#1C2434] dark:hover:text-white dark:text-white">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annually</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64748B] dark:text-[#8A99AF]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 9.8L3.5 5.6H10.5L7 9.8Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#A7C5FF]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Shipment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#3C50E0]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Delivery</span>
          </div>
        </div>

        <div id="deliveryChart" className="-ml-5">
          <ReactApexChart options={options} series={data?.series || []} type="bar" height={320} />
        </div>
      </DataState>
    </div>
  );
};

export default DeliveryStatistics;
