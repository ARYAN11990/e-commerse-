import SaaSOverview from '../components/SaaS/SaaSOverview';
import ChurnRate from '../components/SaaS/ChurnRate';
import UserGrowth from '../components/SaaS/UserGrowth';
import ProductPerformance from '../components/SaaS/ProductPerformance';
import ConversionFunnel from '../components/SaaS/ConversionFunnel';
import RecentInvoices from '../components/SaaS/RecentInvoices';
import Activities from '../components/SaaS/Activities';

const SaaS = () => {
  return (
    <>
      {/* Top Row: Overview Card */}
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <SaaSOverview />
        </div>
      </div>

      {/* Main Content: 8/4 Split */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        
        {/* Left Column (Span 8) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
          {/* Top 50/50 split inside the left column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5">
            <ChurnRate />
            <UserGrowth />
          </div>
          
          <ConversionFunnel />
          <RecentInvoices />
        </div>

        {/* Right Column (Span 4) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-4 md:gap-6 2xl:gap-7.5">
          <ProductPerformance />
          <Activities />
        </div>

      </div>
    </>
  );
};

export default SaaS;
