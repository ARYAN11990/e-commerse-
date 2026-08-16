import CRMKpiCards from '../components/CRM/CRMKpiCards';
import CRMStatistics from '../components/CRM/CRMStatistics';
import EstimatedRevenue from '../components/CRM/EstimatedRevenue';
import SalesCategory from '../components/CRM/SalesCategory';
import UpcomingSchedule from '../components/CRM/UpcomingSchedule';
import CRMRecentOrders from '../components/CRM/CRMRecentOrders';

const CRM = () => {
  return (
    <>
      {/* Top Row: KPIs */}
      <CRMKpiCards />

      {/* Middle Row: Area Chart & Radial Chart */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        <div className="col-span-12 xl:col-span-8">
          <CRMStatistics />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <EstimatedRevenue />
        </div>
      </div>

      {/* Third Row: Donut Chart & Schedule */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-5">
          <SalesCategory />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <UpcomingSchedule />
        </div>
      </div>

      {/* Bottom Row: Recent Orders Table */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <CRMRecentOrders />
        </div>
      </div>
    </>
  );
};

export default CRM;
