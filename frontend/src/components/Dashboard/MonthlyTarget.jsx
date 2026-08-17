import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const MonthlyTarget = () => {
  const { data, loading, error, fetchData } = useApi('/dashboard/monthly-target');

  const options = {
    chart: { type: 'radialBar', fontFamily: 'Inter, sans-serif' },
    colors: ['#3C50E0'],
    plotOptions: {
      radialBar: {
        startAngle: -100,
        endAngle: 100,
        hollow: { size: '65%' },
        track: { background: '#E2E8F0', strokeWidth: '100%', margin: 0 },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            offsetY: 10,
            show: true,
            fontSize: '32px',
            fontWeight: 700,
            color: '#1C2434',
            formatter: (val) => `${val}%`
          }
        }
      }
    },
    stroke: { lineCap: 'round' },
    labels: ['Target'],
  };

  const renderTrend = (trend) => {
    return trend === 'up' ? 
      <ArrowUp className="w-3 h-3 text-[#10B981]" /> : 
      trend === 'down' ? <ArrowDown className="w-3 h-3 text-[#DC3545]" /> :
      <ArrowRight className="w-3 h-3 text-[#64748B] dark:text-[#8A99AF]" />;
  };

  return (
    <div className="w-full rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-6 shadow-sm sm:px-7.5 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Monthly Target</h4>
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mt-1">Target you've set for each month</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data} 
        skeleton={
          <div className="flex flex-col items-center animate-pulse pt-4">
            <div className="h-[220px] w-[220px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mt-6"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-2 mb-8"></div>
            <div className="flex w-full justify-between mt-6">
              <div className="w-1/3 flex flex-col items-center"><div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 mb-2"></div><div className="h-5 w-16 bg-gray-200 dark:bg-gray-700"></div></div>
              <div className="w-1/3 flex flex-col items-center"><div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 mb-2"></div><div className="h-5 w-16 bg-gray-200 dark:bg-gray-700"></div></div>
              <div className="w-1/3 flex flex-col items-center"><div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 mb-2"></div><div className="h-5 w-16 bg-gray-200 dark:bg-gray-700"></div></div>
            </div>
          </div>
        }
      >
        <div className="flex flex-col justify-center items-center mt-6">
          <div className="relative h-[220px] w-[260px] flex justify-center items-center -mt-8">
            <ReactApexChart options={options} series={[data?.percentage || 0]} type="radialBar" height={320} />
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-md mt-4">
              +10%
            </div>
          </div>
          
          <p className="text-center text-sm font-medium text-[#64748B] dark:text-[#8A99AF] max-w-[280px] mx-auto mt-2">
            You earn $3287 today, it's higher than last month.<br/> Keep up your good work!
          </p>
        </div>

        <div className="mt-8 flex justify-between">
          <div className="text-center px-4 w-1/3">
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">Target</p>
            <div className="flex items-center justify-center gap-1">
              <span className="font-bold text-[#1C2434] dark:text-white">{data?.target}</span>
              {renderTrend(data?.target_trend)}
            </div>
          </div>
          <div className="text-center px-4 w-1/3 border-l border-r border-stroke dark:border-[#2E3A47]">
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">Revenue</p>
            <div className="flex items-center justify-center gap-1">
              <span className="font-bold text-[#1C2434] dark:text-white">{data?.revenue}</span>
              {renderTrend(data?.revenue_trend)}
            </div>
          </div>
          <div className="text-center px-4 w-1/3">
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1">Today</p>
            <div className="flex items-center justify-center gap-1">
              <span className="font-bold text-[#1C2434] dark:text-white">{data?.today}</span>
              {renderTrend(data?.today_trend)}
            </div>
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default MonthlyTarget;
