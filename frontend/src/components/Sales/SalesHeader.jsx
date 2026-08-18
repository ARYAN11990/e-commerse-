import { Calendar, Filter, Download } from 'lucide-react';
import { exportToCSV } from '../../utils/exportToCSV';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const SalesHeader = () => {
  const { data, loading, error, fetchData } = useApi('/sales/header');

  return (
    <DataState
      loading={loading}
      error={error}
      onRetry={fetchData}
      isEmpty={!data}
      skeleton={<div className="animate-pulse h-[60px] mb-4 md:mb-6 2xl:mb-7.5" />}
    >
      {data && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6 2xl:mb-7.5">
      <div>
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">{data.title}</h2>
        <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{data.subtitle}</p>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] flex-1 sm:flex-none">
          <Calendar className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          {data.date_range}
        </button>
        <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">
          <Filter className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          Filter
        </button>
        <button onClick={() => exportToCSV([{ SalesDate: '2026-08-18', Total: 1500 }], 'sales-export')} className="flex items-center gap-2 rounded-md bg-[#3C50E0] px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
        </div>
      )}
    </DataState>
  );
};

export default SalesHeader;
