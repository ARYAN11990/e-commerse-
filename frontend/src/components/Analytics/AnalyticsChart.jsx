import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const AnalyticsChart = () => {
  const [period, setPeriod] = useState('30 days');
  const { data: chartData, loading, error, fetchData } = useApi('/analytics/visitor-analytics');

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 2,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    xaxis: {
      categories: chartData?.categories || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#64748B', fontSize: '12px' }
      }
    },
    yaxis: {
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: {
        style: { colors: '#64748B', fontSize: '12px' }
      }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: function (val) { return val + " visitors" } }
    }
  };

  const series = [{
    name: 'Visitors',
    data: chartData?.data || []
  }];

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-4 md:mb-6 2xl:mb-7.5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Analytics</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Visitor analytics of last 30 days</span>
        </div>
        <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1">
          {['12 months', '30 days', '7 days', '24 hours'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                period === p ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!chartData || !chartData.data || chartData.data.length === 0} 
        skeleton={
          <div className="h-[350px] w-full animate-pulse flex items-end gap-3 px-4 pb-4 mt-6">
            <div className="h-2/3 w-full bg-gray-200 dark:bg-gray-700 rounded-t"></div>
            <div className="h-1/2 w-full bg-gray-200 dark:bg-gray-700 rounded-t"></div>
            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-t"></div>
            <div className="h-3/4 w-full bg-gray-200 dark:bg-gray-700 rounded-t"></div>
            <div className="h-1/3 w-full bg-gray-200 dark:bg-gray-700 rounded-t"></div>
          </div>
        }
      >
        <div id="chartOne" className="-ml-5">
          <ReactApexChart options={options} series={[{name: 'Visitors', data: chartData?.data || []}]} type="bar" height={350} />
        </div>
      </DataState>
    </div>
  );
};

export default AnalyticsChart;
