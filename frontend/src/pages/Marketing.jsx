import MarketingKpiCards from '../components/Marketing/MarketingKpiCards';
import ImpressionTraffic from '../components/Marketing/ImpressionTraffic';
import TrafficStats from '../components/Marketing/TrafficStats';
import FeaturedCampaigns from '../components/Marketing/FeaturedCampaigns';
import TopTrafficSource from '../components/Marketing/TopTrafficSource';

const Marketing = () => {
  return (
    <>
      {/* Top Row: KPIs */}
      <MarketingKpiCards />

      {/* Middle Row: Area Chart & Stats */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        <div className="col-span-12 xl:col-span-8">
          <ImpressionTraffic />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <TrafficStats />
        </div>
      </div>

      {/* Bottom Row: Campaigns Table & Traffic Source List */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <FeaturedCampaigns />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <TopTrafficSource />
        </div>
      </div>
    </>
  );
};

export default Marketing;
