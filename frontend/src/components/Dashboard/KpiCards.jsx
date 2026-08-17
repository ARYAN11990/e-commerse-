import { useEffect, useState } from 'react';
import { Users, Package, ArrowUp, ArrowDown , ArrowRight } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const KpiCards = () => {
  const { data, loading, error, fetchData } = useApi('/dashboard/kpis');

  const kpis = [
    {
      title: "Customers",
      key: "customers",
      icon: <Users className="w-5 h-5 text-[#64748B] dark:text-[#8A99AF]" />,
    },
    {
      title: "Orders",
      key: "orders",
      icon: <Package className="w-5 h-5 text-[#64748B] dark:text-[#8A99AF]" />,
    }
  ];

  return (
    <DataState loading={loading} error={error} onRetry={fetchData} isEmpty={!data} skeleton={
      <>
        <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-sm flex flex-col justify-between h-[160px] animate-pulse">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-4"><div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div><div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
        </div>
        <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-sm flex flex-col justify-between h-[160px] animate-pulse">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-4"><div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div><div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
        </div>
      </>
    }>
      {kpis.map((kpi, idx) => {
        const itemData = data[kpi.key];
        const trend = itemData.trend;

        return (
          <div key={idx} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-sm flex flex-col justify-between h-[160px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F1F5F9] dark:bg-[#1A222C]">
              {kpi.icon}
            </div>

            <div className="mt-4">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1 block">{kpi.title}</span>
              <div className="flex items-end justify-between">
                <h4 className="text-[28px] font-bold text-[#1C2434] dark:text-white leading-none">
                  {itemData.value}
                </h4>
                
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${
                  trend === 'up' ? 'text-[#10B981] bg-[#10B981]/10' : trend === 'down' ? 'text-[#DC3545] bg-[#DC3545]/10' : 'text-[#64748B] dark:text-[#8A99AF] bg-[#64748B]/10 dark:bg-[#8A99AF]/10'
                }`}>
                  {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : trend === 'down' ? <ArrowDown className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  {itemData.rate}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </DataState>
  );
};

export default KpiCards;
