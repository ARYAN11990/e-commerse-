import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '../../services/api';

const AIRecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get('/ai/recent-transactions')
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-[#10B981] bg-[#10B981]/10';
      case 'Expired': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-[#64748B] dark:text-[#8A99AF] bg-gray-100';
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Recent Transactions</h4>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <button className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-1.5 pl-10 pr-4 text-sm outline-none focus:border-[#3C50E0] focus:ring-1 focus:ring-[#3C50E0]"
            />
          </div>
          
          <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-1.5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] hover:text-[#1C2434] dark:hover:text-white dark:text-white whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto border-t border-stroke dark:border-[#2E3A47]">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-stroke dark:border-[#2E3A47] text-left">
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Paid By</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Package Name</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Price</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Paid Date</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Status</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0 hover:bg-gray-50 dark:hover:bg-[#313D4A]/50">
                <td className="py-4 pr-4">
                  <h5 className="text-sm font-medium text-[#1C2434] dark:text-white">{item.name}</h5>
                  <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{item.email}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.package}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.price}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.date}</p>
                </td>
                <td className="py-4">
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white px-2">
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 mb-4 flex flex-wrap items-center justify-between gap-4">
        <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
          ← Previous
        </button>
        
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md bg-[#3C50E0] text-sm font-medium text-white">1</button>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">2</button>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">3</button>
        </div>

        <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
          Next →
        </button>
      </div>
    </div>
  );
};

export default AIRecentTransactions;
