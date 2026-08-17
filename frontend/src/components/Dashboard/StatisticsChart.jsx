import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Calendar } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const StatisticsChart = () => {
  const { data, loading, error, fetchData } = useApi('/dashboard/statistics');

  const options = {
    legend: { show: false },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Inter, sans-serif',
      height: 250,
      type: 'area',
      toolbar: { show: false },
    },
    stroke: { width: [2, 2], curve: 'straight' },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
    },
    dataLabels: { enabled: false },
    markers: {
      size: 0,
      hover: { sizeOffset: 5 },
    },
    xaxis: {
      type: 'category',
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B' } }
    },
    yaxis: {
      min: 0,
      max: 250,
      tickAmount: 5,
      labels: { style: { colors: '#64748B' } }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-7.5 pb-2 shadow-sm sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap mb-2">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Statistics</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mt-1">Target you've set for each month</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border border-stroke dark:border-[#2E3A47] px-4 py-1.5 rounded-md">
            <button className="text-sm font-bold text-[#1C2434] dark:text-white">Overview</button>
            <button className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">Sales</button>
            <button className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">Revenue</button>
          </div>
          
          <button className="flex items-center gap-2 border border-stroke dark:border-[#2E3A47] px-4 py-1.5 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            <Calendar className="w-4 h-4" />
            Aug 6 - Aug 12
          </button>
        </div>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data.series || data.series.length === 0} 
        skeleton={
          <div className="h-[250px] w-full animate-pulse flex items-end">
            <div className="h-full w-full bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t opacity-50"></div>
          </div>
        }
      >
        <div id="chartOne" className="-ml-5">
          <ReactApexChart options={options} series={data?.series || []} type="area" height={250} />
        </div>
      </DataState>
    </div>
  );
};

export default StatisticsChart;
