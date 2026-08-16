import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const CRMKpiCards = () => {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/crm/kpis')
      .then((res) => res.json())
      .then((data) => setKpis(data))
      .catch((err) => console.error(err));
  }, []);

  if (!kpis) return <div className="animate-pulse h-[140px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] mb-4 md:mb-6 2xl:mb-7.5" />;

  const kpiList = [
    { label: 'Active Deal', key: 'active_deal' },
    { label: 'Revenue Total', key: 'revenue_total' },
    { label: 'Closed Deals', key: 'closed_deals' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
      {kpiList.map((item) => {
        const data = kpis[item.key];
        const trend = data.trend;

        return (
          <div key={item.key} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex flex-col justify-center h-[140px]">
            <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[32px] leading-none mb-4">
              {data.value}
            </h4>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.label}</span>
              <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : trend === 'down' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#64748B]/10 text-[#64748B] dark:bg-[#8A99AF]/10 dark:text-[#8A99AF]'}`}>
                  {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{data.rate}
                </span>
                <span className="text-gray-400">From last month</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CRMKpiCards;
