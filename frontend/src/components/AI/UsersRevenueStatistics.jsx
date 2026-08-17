import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const UsersRevenueStatistics = () => {
  const [period, setPeriod] = useState('Monthly');
  const { data, loading, error, fetchData } = useApi('/ai/statistics');

  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#80CAEE'],
    stroke: { curve: 'straight', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data?.categories || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    yaxis: {
      min: 0,
      max: 35000,
      tickAmount: 7,
      labels: { 
        style: { colors: '#64748B', fontSize: '12px' },
        formatter: (val) => `${val / 1000}K`
      }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    legend: { show: false }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data?.series || data?.series.length === 0} 
        skeleton={
          <div className="h-full w-full animate-pulse flex flex-col pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div><div className="h-6 w-56 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700"></div><div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700"></div><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
            </div>
            <div className="flex-1 w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-[320px]"></div>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Users & Revenue Statistics</h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Visualize month-to-month progress and engagement.</span>
          </div>
          
          <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1">
            {['Monthly', 'Quarterly', 'Annually'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                  period === p ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Users</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#80CAEE]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Revenue</span>
          </div>
        </div>

        {data?.categories && data?.series && (
          <div id="usersRevenueChart" className="-ml-5 flex-1 flex flex-col justify-end">
            <ReactApexChart options={{...options, xaxis: { ...options.xaxis, categories: data?.categories }}} series={data?.series} type="area" height={320} />
          </div>
        )}
      </DataState>
    </div>
  );
};

export default UsersRevenueStatistics;
