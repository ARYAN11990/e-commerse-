import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const Spending = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/finance/spending')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[280px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse h-full" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Spending</h4>
        <div className="relative">
          <select className="appearance-none rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-1 pl-3 pr-8 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] outline-none hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <option>Yearly</option>
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64748B] dark:text-[#8A99AF]">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Total</span>
        <h2 className="text-[32px] font-bold text-[#1C2434] dark:text-white leading-none mt-1">
          {data.total}
        </h2>
      </div>

      {/* Segmented Progress Bar */}
      <div className="flex w-full h-4 rounded-full overflow-hidden mb-8 bg-gray-100 gap-1">
        {data.categories.map((cat, idx) => (
          <div key={idx} className="h-full" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}></div>
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-auto">
        {data.categories.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
            <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF] truncate">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spending;
