import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const ActiveUsers = () => {
  const { data, loading, error, fetchData } = useApi('/analytics/active-users');

  const options = {
    chart: {
      type: 'area',
      height: 150,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    colors: ['#3C50E0'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: { formatter: function (seriesName) { return '' } }
      },
      marker: { show: false }
    }
  };

  const series = [{
    name: 'Active Users',
    data: data.series
  }];

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] pt-6 shadow-default flex flex-col justify-between h-full">
      <div className="mb-6 flex justify-between items-center px-5 sm:px-7.5">
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Active Users</h4>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data} 
        skeleton={
          <div className="px-5 sm:px-7.5 pb-6 mt-4 animate-pulse">
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="mt-8 h-24 w-full bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t opacity-50"></div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        }
      >
        <div className="px-5 sm:px-7.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]"></span>
            </span>
            <h4 className="text-title-xl font-bold text-[#1C2434] dark:text-white text-2xl">
              {data?.live}
            </h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Live visitors</span>
          </div>
        </div>
        
        <div className="mt-4 bg-[#F8FAFC] pt-6 rounded-b-xl border-t border-stroke dark:border-[#2E3A47]">
          <div className="h-[100px] mb-2 px-2">
            <ReactApexChart options={options} series={[{name: 'Active Users', data: data?.series || []}]} type="area" height={100} />
          </div>
          
          <div className="grid grid-cols-3 text-center border-t border-stroke dark:border-[#2E3A47] divide-x divide-stroke py-4 bg-white dark:bg-[#24303F] rounded-b-xl">
            <div>
              <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-0.5">{data?.avg_daily}</h4>
              <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Avg. Daily</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-0.5">{data?.avg_weekly}</h4>
              <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Avg. Weekly</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-0.5">{data?.avg_monthly}</h4>
              <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Avg. Monthly</span>
            </div>
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default ActiveUsers;
