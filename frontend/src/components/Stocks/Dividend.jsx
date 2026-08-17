import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const Dividend = () => {
  const { data, loading, error, fetchData } = useApi('/stocks/dividend');

  const options = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
        borderRadius: 2,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    xaxis: {
      categories: data?.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '10px' } }
    },
    yaxis: {
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: { style: { colors: '#64748B', fontSize: '10px' } }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    fill: { opacity: 1 }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 mb-4 md:mb-6 2xl:mb-7.5">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data?.series || data?.series.length === 0} 
        skeleton={
          <div className="h-[200px] w-full animate-pulse flex items-end gap-2 px-2 pb-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
            ))}
          </div>
        }
      >
        <div className="mb-4 flex justify-between items-center">
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Dividend</h4>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        
        <div id="dividendChart" className="-ml-5">
          <ReactApexChart options={options} series={data?.series || []} type="bar" height={200} />
        </div>
      </DataState>
    </div>
  );
};

export default Dividend;
