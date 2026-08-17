import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const SessionsByDevice = () => {
  const { data, loading, error, fetchData } = useApi('/analytics/sessions-by-device');

  const options = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#60A5FA', '#93C5FD'],
    labels: data?.labels || [],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full">
      <div className="mb-8 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Sessions By Device</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data?.series || data?.series.length === 0} 
        skeleton={
          <div className="flex flex-col items-center animate-pulse pt-4">
            <div className="h-[200px] w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex w-full justify-center gap-4 mt-8 mb-4">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        }
      >
        <div className="mb-8 flex justify-center">
          <ReactApexChart options={options} series={data?.series || []} type="donut" width={300} />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Desktop</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Mobile</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Tablet</span>
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default SessionsByDevice;
