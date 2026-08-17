import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const DeliveryActivities = () => {
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    api.get('/logistics/activities')
      .then((data) => setActivities(data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-[#10B981]';
      case 'In Transit': return 'text-[#F59E0B]';
      case 'Pending': return 'text-[#3C50E0]';
      case 'Processing': return 'text-[#818CF8]';
      default: return 'text-[#64748B] dark:text-[#8A99AF]';
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Delivery Activities</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Track your recent shipping activities</span>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1 min-w-max">
            {['All', 'Delivered', 'In-Transit', 'Pending', 'Processing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                  activeTab === tab ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-1.5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] hover:text-[#1C2434] dark:hover:text-white dark:text-white whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto border-t border-stroke dark:border-[#2E3A47]">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-stroke dark:border-[#2E3A47] text-left">
              <th className="py-4 pl-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] w-12 text-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3C50E0]" />
              </th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Order ID</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase flex items-center gap-1">Category <span className="text-[10px]">↕</span></th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Company <span className="text-[10px]">↕</span></th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Arrival Time <span className="text-[10px]">↕</span></th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Route</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Price</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0 hover:bg-gray-50 dark:hover:bg-[#313D4A]/50">
                <td className="py-4 pl-4 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3C50E0]" />
                </td>
                <td className="py-4">
                  <p className="text-sm font-semibold text-[#1C2434] dark:text-white">{item.id}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.category}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.company}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.arrival}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.route}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{item.price}</p>
                </td>
                <td className="py-4">
                  <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 mb-4 flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Showing 1 to 5 of 10</span>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-8 h-8 rounded-md border border-stroke dark:border-[#2E3A47] text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="w-8 h-8 rounded-md bg-[#3C50E0] text-sm font-medium text-white">1</button>
          <button className="w-8 h-8 rounded-md text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">2</button>
          <button className="flex items-center justify-center w-8 h-8 rounded-md border border-stroke dark:border-[#2E3A47] text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">
             <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryActivities;
