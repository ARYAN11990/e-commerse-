import { ChevronRight } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const FinanceTransactionList = () => {
  const { data: transactions = [], loading, error, fetchData } = useApi('/finance/transaction-list');

  const getIcon = (iconName) => {
    // Generate distinct simple colored boxes as placeholders based on the icon string
    switch (iconName) {
      case 'stellar': return <span className="text-xl">⭐</span>;
      case 'netflix': return <span className="text-xl text-red-600 font-bold">N</span>;
      case 'paypal': return <span className="text-xl text-blue-600 font-bold">P</span>;
      case 'google': return <span className="text-xl">🔺</span>;
      default: return <span className="text-xl">💲</span>;
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex-1 flex flex-col">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!transactions || transactions.length === 0} 
        skeleton={
          <div className="h-full w-full animate-pulse flex flex-col pt-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="flex flex-col gap-4 flex-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        }
      >
        <h4 className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-4">Recent Transactions</h4>

        <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 no-scrollbar">
          {(transactions || []).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-50 dark:bg-[#313D4A] border border-stroke dark:border-[#2E3A47]">
                  {getIcon(tx.icon)}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{tx.title}</h5>
                  <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{tx.subtitle}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className={`text-sm font-bold block ${tx.type === 'positive' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    {tx.amount}
                  </span>
                  <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{tx.date}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full rounded-md border border-stroke dark:border-[#2E3A47] py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition-colors shrink-0">
          See All Transactions
        </button>
      </DataState>
    </div>
  );
};

export default FinanceTransactionList;
