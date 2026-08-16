import FinanceBalance from '../components/Finance/FinanceBalance';
import FinanceMetrics from '../components/Finance/FinanceMetrics';
import CashflowOverview from '../components/Finance/CashflowOverview';
import MyCards from '../components/Finance/MyCards';
import Spending from '../components/Finance/Spending';
import QuickSend from '../components/Finance/QuickSend';
import FinanceTransactionList from '../components/Finance/FinanceTransactionList';
import FinanceRecentTransactions from '../components/Finance/FinanceRecentTransactions';

const Finance = () => {
  return (
    <>
      {/* Top Row */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        <div className="col-span-12 xl:col-span-5">
          <FinanceBalance />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <FinanceMetrics />
        </div>
      </div>

      {/* Middle & Lower Sections combined into a grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        
        {/* Left Column (8 cols) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
          <CashflowOverview />
          
          {/* Sub-grid for Spending and QuickSend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5 h-full">
            <Spending />
            <QuickSend />
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <MyCards />
          <FinanceTransactionList />
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <FinanceRecentTransactions />
        </div>
      </div>
    </>
  );
};

export default Finance;
