import { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { api } from '../../services/api';

const CRMRecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/crm/recent-orders')
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'text-[#10B981]';
      case 'Pending': return 'text-[#F59E0B]';
      case 'Cancel': return 'text-[#EF4444]';
      default: return 'text-[#64748B] dark:text-[#8A99AF]';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-[#3C50E0]/10 text-[#3C50E0]', 'bg-[#10B981]/10 text-[#10B981]', 'bg-[#F59E0B]/10 text-[#F59E0B]', 'bg-[#EF4444]/10 text-[#EF4444]'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 mt-4 md:mt-6 2xl:mt-7.5">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Recent Orders</h4>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <button className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-2 pl-10 pr-4 text-sm outline-none focus:border-[#3C50E0] focus:ring-1 focus:ring-[#3C50E0]"
            />
          </div>
          <button className="flex items-center gap-1 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#313D4A] whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F8FAFC] text-left">
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47] first:border-l first:rounded-tl-md w-12 text-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3C50E0] focus:ring-[#3C50E0]" />
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47]">Deal ID</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47]">Customer</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47]">Product/Service</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47]">Deal Value</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47]">Close Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47] text-center">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-b border-t border-stroke dark:border-[#2E3A47] last:border-r last:rounded-tr-md text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0 hover:bg-gray-50 dark:hover:bg-[#313D4A]/50">
                <td className="px-4 py-3.5 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3C50E0] focus:ring-[#3C50E0]" />
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{order.id}</p>
                </td>
                <td className="px-4 py-3.5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(order.customer_name)}`}>
                    {getInitials(order.customer_name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C2434] dark:text-white">{order.customer_name}</p>
                    <a href={`mailto:${order.customer_email}`} className="text-xs text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0]">{order.customer_email}</a>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{order.product}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{order.value}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{order.date}</p>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <button className="text-gray-400 hover:text-[#EF4444] transition">
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CRMRecentOrders;
