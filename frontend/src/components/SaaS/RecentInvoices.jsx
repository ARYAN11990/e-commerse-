import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const RecentInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get('/saas/recent-invoices')
      .then((data) => setInvoices(data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'text-[#10B981]';
      case 'Pending': return 'text-[#F59E0B]';
      case 'Cancelled': return 'text-[#EF4444]';
      default: return 'text-[#64748B] dark:text-[#8A99AF]';
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="text-xl font-bold text-[#1C2434] dark:text-white mb-6">Recent Invoices</h4>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-stroke dark:border-[#2E3A47] text-left">
              <th className="pb-3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Serial No:</th>
              <th className="pb-3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Close Date</th>
              <th className="pb-3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">User</th>
              <th className="pb-3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Amount</th>
              <th className="pb-3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0 hover:bg-gray-50 dark:hover:bg-[#313D4A]/50">
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{invoice.id}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{invoice.date}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{invoice.user}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{invoice.amount}</p>
                </td>
                <td className="py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(invoice.status)} border-current bg-transparent`}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInvoices;
