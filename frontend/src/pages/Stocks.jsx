import StockOverviewCards from '../components/Stocks/StockOverviewCards';
import PortfolioPerformance from '../components/Stocks/PortfolioPerformance';
import Dividend from '../components/Stocks/Dividend';
import TrendingStocks from '../components/Stocks/TrendingStocks';
import MyWatchlist from '../components/Stocks/MyWatchlist';
import LatestTransactions from '../components/Stocks/LatestTransactions';

const Stocks = () => {
  return (
    <>
      {/* Top Row: 4 Stock Cards */}
      <StockOverviewCards />

      {/* Middle Section: 8/4 Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        
        {/* Left Column (Span 8) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
          <PortfolioPerformance />
          <TrendingStocks />
        </div>

        {/* Right Column (Span 4) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
          <Dividend />
          <MyWatchlist />
        </div>
      </div>

      {/* Bottom Row: Full-width Table */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <LatestTransactions />
        </div>
      </div>
    </>
  );
};

export default Stocks;
