import { useState, useEffect } from 'react';
import { api } from '../../services/api';

// Country flag mapping helper (simplified SVG representations based on reference)
const getFlag = (countryCode) => {
  const flags = {
    us: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#FFF"/><rect width="10" height="8" fill="#0A3161"/><rect y="1.5" width="24" height="1.5" fill="#B31942"/><rect y="4.5" width="24" height="1.5" fill="#B31942"/><rect y="7.5" width="24" height="1.5" fill="#B31942"/><rect y="10.5" width="24" height="1.5" fill="#B31942"/><rect y="13.5" width="24" height="1.5" fill="#B31942"/></svg>,
    gb: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#012169"/><path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFF" strokeWidth="3"/><path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1"/><path d="M12,0 L12,16 M0,8 L24,8" stroke="#FFF" strokeWidth="4"/><path d="M12,0 L12,16 M0,8 L24,8" stroke="#C8102E" strokeWidth="2"/></svg>,
    fr: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="8" height="16" fill="#002395"/><rect x="8" width="8" height="16" fill="#FFF"/><rect x="16" width="8" height="16" fill="#ED2939"/></svg>,
    de: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="5.3" fill="#000"/><rect y="5.3" width="24" height="5.3" fill="#DD0000"/><rect y="10.6" width="24" height="5.3" fill="#FFCE00"/></svg>,
    fi: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#FFF"/><rect y="6" width="24" height="4" fill="#002F6C"/><rect x="6" width="4" height="16" fill="#002F6C"/></svg>,
    be: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="8" height="16" fill="#000"/><rect x="8" width="8" height="16" fill="#FDDA24"/><rect x="16" width="8" height="16" fill="#EF3340"/></svg>,
    in: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="5.3" fill="#FF9933"/><rect y="5.3" width="24" height="5.3" fill="#FFF"/><rect y="10.6" width="24" height="5.3" fill="#138808"/><circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth="0.5"/></svg>,
  };
  return flags[countryCode] || <div className="w-6 h-4 bg-gray-200"></div>;
};

const AnalyticsRecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/analytics/recent-orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 h-full">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Recent Orders</h4>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 rounded-md border border-stroke dark:border-[#2E3A47] px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
            </svg>
            Filter
          </button>
          <button className="rounded-md border border-stroke dark:border-[#2E3A47] px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F8FAFC] text-left">
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47] first:border-l first:rounded-tl-md last:border-r last:rounded-tr-md">Products</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47]">Category</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47] text-center">Country</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47] text-center">CR</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47] first:border-l last:border-r text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0">
                <td className="px-4 py-3.5">
                  <p className="text-sm font-semibold text-[#1C2434] dark:text-white">{order.product}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{order.category}</p>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <div className="flex justify-center">
                    {getFlag(order.country)}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{order.cr}</p>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <p className="text-sm font-medium text-[#10B981]">{order.value}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsRecentOrders;
