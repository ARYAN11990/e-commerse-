import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const SaaSOverview = () => {
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState('Monthly');

  useEffect(() => {
    fetch('http://localhost:8000/api/saas/overview')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="animate-pulse h-[160px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] mb-4 md:mb-6 2xl:mb-7.5" />;

  const metrics = [
    { label: 'Total Revenue', key: 'revenue' },
    { label: 'Active Users', key: 'active_users' },
    { label: 'Customer Lifetime Value', key: 'clv' },
    { label: 'Customer Acquisition Cost', key: 'cac' },
  ];

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-4 md:mb-6 2xl:mb-7.5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stroke dark:border-[#2E3A47] pb-5 mb-5">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Overview</h4>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1">
            {['Weekly', 'Monthly', 'Yearly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                  period === p ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-1.5 text-xs font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] hover:text-[#1C2434] dark:hover:text-white dark:text-white transition">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stroke">
        {metrics.map((item, index) => {
          const metricData = data[item.key];
          const trend = metricData.trend;

          return (
            <div key={index} className={`flex flex-col gap-2 ${index !== 0 ? 'sm:pl-6 xl:pl-8 pt-4 sm:pt-0' : 'pr-6 xl:pr-8 pb-4 sm:pb-0'}`}>
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.label}</span>
              <div className="flex items-center gap-3">
                <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none">
                  {metricData.value}
                </h4>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : trend === 'down' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'bg-[#64748B]/10 text-[#64748B] dark:bg-[#8A99AF]/10 dark:text-[#8A99AF]'}`}>
                  {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{metricData.rate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SaaSOverview;
