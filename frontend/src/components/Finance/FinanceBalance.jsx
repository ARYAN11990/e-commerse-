import ReactApexChart from 'react-apexcharts';
import { Copy, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const FinanceBalance = () => {
  const { data, loading, error, fetchData } = useApi('/finance/balance');

  const options = {
    chart: {
      type: 'area',
      height: 60,
      sparkline: { enabled: true },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0'],
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
        isEmpty={!data} 
        skeleton={
          <div className="h-full w-full animate-pulse flex flex-col justify-between pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div><div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="flex items-center gap-2"><div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div><div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div></div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div><div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="w-32 h-[60px] bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded opacity-50"></div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-stroke dark:border-[#2E3A47] pt-6">
              <div className="flex items-center gap-2"><div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div></div>
              <div className="flex items-center gap-2 w-full sm:w-auto"><div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div><div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div><div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div></div>
            </div>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Total Balance</h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Overview of your current funds</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-3 py-1.5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
              <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">🇺🇸</span>
              USD
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-3 py-1.5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
              June 2025
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-title-xl font-bold text-[#1C2434] dark:text-white text-[32px] leading-none mb-1">
              {data?.balance}
            </h2>
            <span className={`text-sm font-bold flex items-center gap-1 ${data?.trend === 'up' ? 'text-[#10B981]' : data?.trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
              {data?.trend === 'up' ? '↑' : data?.trend === 'down' ? '↓' : ''} {data?.change} <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF] font-normal">{data?.comparison}</span>
            </span>
          </div>
          <div className="w-32">
            <ReactApexChart options={options} series={[{ name: "Balance", data: data?.sparkline || [] }]} type="area" height={60} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-stroke dark:border-[#2E3A47] pt-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Primary Account:</span>
            <span className="text-sm font-bold text-[#1C2434] dark:text-white">{data?.account_number}</span>
            <button className="text-gray-400 hover:text-[#3C50E0]">
              <Copy className="w-4 h-4" />
            </button>
            <button className="ml-2 rounded-md border border-stroke dark:border-[#2E3A47] px-3 py-1 text-xs font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
              See Details
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-md bg-[#3C50E0] px-6 py-2 text-sm font-medium text-white hover:bg-blue-600">
              <ArrowUpRight className="w-4 h-4" />
              Transfer
            </button>
            <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-6 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">
              <ArrowDownLeft className="w-4 h-4" />
              Received
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-md border border-stroke dark:border-[#2E3A47] text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0] hover:bg-gray-50 dark:hover:bg-[#313D4A] shrink-0">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default FinanceBalance;
