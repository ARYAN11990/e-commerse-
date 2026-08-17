import { useState, useEffect } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const LatestTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get('/stocks/latest-transactions')
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'text-[#10B981] bg-[#10B981]/10';
      case 'Pending': return 'text-[#F59E0B] bg-[#F59E0B]/10';
      case 'Failed': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-[#64748B] dark:text-[#8A99AF] bg-gray-100';
    }
  };

  const getLogo = (logoName) => {
    switch (logoName) {
      case 'paypal': return <div className="w-8 h-8 rounded-full bg-[#3C50E0] flex items-center justify-center text-white font-bold italic text-xs">P</div>;
      case 'apple': return <div className="w-8 h-8 rounded-full bg-[#1C2434] flex items-center justify-center text-white font-bold text-xs"></div>;
      case 'kkst': return <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold text-xs">K</div>;
      case 'facebook': return <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-xs">f</div>;
      case 'amazon': return <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-white font-bold text-xs">a</div>;
      default: return <div className="w-8 h-8 rounded-full bg-gray-200"></div>;
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 mt-4 md:mt-6 2xl:mt-7.5">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Latest Transactions</h4>
        <div className="relative w-full sm:w-64">
          <button className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-gray-400" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-2 pl-10 pr-4 text-sm outline-none focus:border-[#3C50E0] focus:ring-1 focus:ring-[#3C50E0]"
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-stroke dark:border-[#2E3A47] text-left">
              <th className="py-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Name</th>
              <th className="py-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Date</th>
              <th className="py-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Price</th>
              <th className="py-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Category</th>
              <th className="py-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Status</th>
              <th className="py-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0 hover:bg-gray-50 dark:hover:bg-[#313D4A]/50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {getLogo(tx.logo)}
                    <p className="text-sm font-medium text-[#1C2434] dark:text-white">{tx.name}</p>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{tx.date}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{tx.price}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{tx.category}</p>
                </td>
                <td className="py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
                    <MoreVertical className="w-4 h-4 mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 mb-4 flex flex-wrap items-center justify-between gap-4 border-t border-stroke dark:border-[#2E3A47] pt-4">
        <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
          ← Previous
        </button>
        
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md bg-[#EDF2F9] dark:bg-[#333A48] text-sm font-medium text-[#3C50E0]">1</button>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">2</button>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">3</button>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">...</span>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">8</button>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">9</button>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">10</button>
        </div>

        <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
          Next →
        </button>
      </div>
    </div>
  );
};

export default LatestTransactions;
