import LogisticsKpiCards from '../components/Logistics/LogisticsKpiCards';
import DeliveryStatistics from '../components/Logistics/DeliveryStatistics';
import TrackingDelivery from '../components/Logistics/TrackingDelivery';
import TotalRevenueEarned from '../components/Logistics/TotalRevenueEarned';
import DeliveryVehicles from '../components/Logistics/DeliveryVehicles';
import DeliveryActivities from '../components/Logistics/DeliveryActivities';

const Logistics = () => {
  return (
    <>
      {/* Top Row: 3 KPI Cards */}
      <LogisticsKpiCards />

      {/* Main Content: 8/4 Split */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        
        {/* Left Column (Span 8) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
          <DeliveryStatistics />
          
          {/* Sub-grid: 50/50 split inside the left column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5">
            <TotalRevenueEarned />
            <DeliveryVehicles />
          </div>
        </div>

        {/* Right Column (Span 4) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col">
          <TrackingDelivery />
        </div>

      </div>

      {/* Bottom Row: Full-width Table */}
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <DeliveryActivities />
        </div>
      </div>
    </>
  );
};

export default Logistics;
