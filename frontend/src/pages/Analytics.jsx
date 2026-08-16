import AnalyticsKpiCards from '../components/Analytics/AnalyticsKpiCards';
import AnalyticsChart from '../components/Analytics/AnalyticsChart';
import TopChannels from '../components/Analytics/TopChannels';
import TopPages from '../components/Analytics/TopPages';
import ActiveUsers from '../components/Analytics/ActiveUsers';
import AcquisitionChannels from '../components/Analytics/AcquisitionChannels';
import SessionsByDevice from '../components/Analytics/SessionsByDevice';
import Demographics from '../components/Dashboard/Demographics';
import AnalyticsRecentOrders from '../components/Analytics/AnalyticsRecentOrders';

const Analytics = () => {
  return (
    <>
      {/* Top Row: KPIs */}
      <AnalyticsKpiCards />

      {/* Second Row: Bar Chart */}
      <AnalyticsChart />

      {/* Third Row: Top Channels | Top Pages | Active Users */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        <div className="col-span-12 lg:col-span-4">
          <TopChannels />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <TopPages />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ActiveUsers />
        </div>
      </div>

      {/* Fourth Row: Acquisition Channels | Sessions By Device */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        <div className="col-span-12 xl:col-span-8">
          <AcquisitionChannels />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <SessionsByDevice />
        </div>
      </div>

      {/* Fifth Row: Demographics | Recent Orders */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-5">
          <Demographics />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <AnalyticsRecentOrders />
        </div>
      </div>
    </>
  );
};

export default Analytics;
