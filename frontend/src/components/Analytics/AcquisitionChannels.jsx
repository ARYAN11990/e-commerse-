import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const AcquisitionChannels = () => {
  const { data, loading, error, fetchData } = useApi('/analytics/acquisition-channels');

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#60A5FA', '#93C5FD', '#BFDBFE'],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        columnWidth: '40%',
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    yaxis: {
      min: 0,
      max: 120,
      tickAmount: 6,
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
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
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Acquisition Channels</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#3C50E0]"></span>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Direct</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#60A5FA]"></span>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Referral</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#93C5FD]"></span>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Organic Search</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#BFDBFE]"></span>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Social</span>
        </div>
      </div>
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data.series || data.series.length === 0} 
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
        <div id="chartTwo" className="-ml-5">
          <ReactApexChart options={options} series={data?.series || []} type="bar" height={350} />
        </div>
      </DataState>
    </div>
  );
};

export default AcquisitionChannels;
