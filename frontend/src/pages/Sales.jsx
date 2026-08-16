import SalesHeader from '../components/Sales/SalesHeader';
import SalesKpiCards from '../components/Sales/SalesKpiCards';
import SalesStatistics from '../components/Sales/SalesStatistics';
import UserRetention from '../components/Sales/UserRetention';
import SalesByChannel from '../components/Sales/SalesByChannel';
import SalesByCountry from '../components/Sales/SalesByCountry';
import TopProducts from '../components/Sales/TopProducts';

const Sales = () => {
  return (
    <>
      <SalesHeader />
      <SalesKpiCards />
      
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <SalesStatistics />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
        <div className="col-span-1 md:col-span-1 xl:col-span-4 flex flex-col">
          <UserRetention />
        </div>
        <div className="col-span-1 md:col-span-1 xl:col-span-4 flex flex-col">
          <SalesByChannel />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-4 flex flex-col">
          <SalesByCountry />
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <TopProducts />
        </div>
      </div>
    </>
  );
};

export default Sales;
