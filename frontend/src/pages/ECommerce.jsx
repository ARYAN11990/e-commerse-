import KpiCards from '../components/Dashboard/KpiCards';
import MonthlySales from '../components/Dashboard/MonthlySales';
import MonthlyTarget from '../components/Dashboard/MonthlyTarget';
import StatisticsChart from '../components/Dashboard/StatisticsChart';
import Demographics from '../components/Dashboard/Demographics';
import RecentOrders from '../components/Dashboard/RecentOrders';

const ECommerce = () => {
  return (
    <>
      {/* Top Row */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Left Column (KPIs + Bar Chart) */}
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 2xl:gap-7.5">
            <KpiCards />
          </div>
          <div className="flex-1">
            <MonthlySales />
          </div>
        </div>

        {/* Right Column (Radial Target Chart) */}
        <div className="col-span-12 xl:col-span-5 flex">
          <MonthlyTarget />
        </div>
      </div>

      {/* Middle Row (Statistics Area Chart) */}
      <div className="mt-4 md:mt-6 2xl:mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <StatisticsChart />
        </div>
      </div>

      {/* Bottom Row (Map + Table) */}
      <div className="mt-4 md:mt-6 2xl:mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-5">
          <Demographics />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
