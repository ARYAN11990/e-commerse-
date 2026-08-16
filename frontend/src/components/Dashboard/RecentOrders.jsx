import { useEffect, useState } from 'react';
import { Settings2 } from 'lucide-react';
import { api } from '../../services/api';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/dashboard/recent-orders')
      .then(data => setOrders(data));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-[#10B981]';
      case 'Pending': return 'text-[#F59E0B]';
      case 'Canceled': return 'text-[#DC3545]';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="h-full rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-6 shadow-sm sm:px-7.5">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Recent Orders</h4>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-stroke dark:border-[#2E3A47] px-4 py-1.5 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            <Settings2 className="w-4 h-4" />
            Filter
          </button>
          <button className="border border-stroke dark:border-[#2E3A47] px-4 py-1.5 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            See all
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b border-stroke dark:border-[#2E3A47]">
              <th className="pb-4 font-medium text-[#64748B] dark:text-[#8A99AF] text-sm w-[40%]">Products</th>
              <th className="pb-4 font-medium text-[#64748B] dark:text-[#8A99AF] text-sm w-[20%]">Category</th>
              <th className="pb-4 font-medium text-[#64748B] dark:text-[#8A99AF] text-sm w-[20%]">Price</th>
              <th className="pb-4 font-medium text-[#64748B] dark:text-[#8A99AF] text-sm w-[20%]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-stroke dark:border-[#2E3A47] last:border-b-0">
                <td className="py-3">
                  <div className="flex items-center gap-4">
                    <div className="h-[46px] w-[46px] rounded-md overflow-hidden bg-white dark:bg-[#24303F] flex-shrink-0">
                      <img src={order.image} alt="Product" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C2434] dark:text-white text-sm">{order.productName}</p>
                      <p className="text-[13px] text-[#64748B] dark:text-[#8A99AF] font-medium">{order.variants}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <p className="text-sm text-[#64748B] dark:text-[#8A99AF] font-medium">{order.category}</p>
                </td>
                <td className="py-3">
                  <p className="text-sm text-[#64748B] dark:text-[#8A99AF] font-medium">{order.price}</p>
                </td>
                <td className="py-3">
                  <p className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
