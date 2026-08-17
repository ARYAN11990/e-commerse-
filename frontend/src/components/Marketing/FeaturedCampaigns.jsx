import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const FeaturedCampaigns = () => {
  const { data: campaigns = [], loading, error, fetchData } = useApi('/marketing/featured-campaigns');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'text-[#10B981] bg-[#10B981]/10';
      case 'Pending': return 'text-[#F59E0B] bg-[#F59E0B]/10';
      case 'Failed': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-[#64748B] dark:text-[#8A99AF] bg-[#F1F5F9] dark:bg-[#1A222C]';
    }
  };

  const getBrandIcon = (brand) => {
    // Simple placeholder icons matching the screenshot's basic colors
    switch (brand) {
      case 'Slack': return <div className="w-6 h-6 rounded-md bg-[#4A154B] flex items-center justify-center text-white text-[10px] font-bold">S</div>;
      case 'Facebook': return <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-[12px] font-bold">f</div>;
      case 'Google': return <div className="w-6 h-6 rounded-full bg-white dark:bg-[#24303F] border border-stroke dark:border-[#2E3A47] flex items-center justify-center text-[#EA4335] text-[12px] font-bold">G</div>;
      case 'Instagram': return <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white text-[12px] font-bold">IG</div>;
      default: return <div className="w-6 h-6 rounded-md bg-gray-200"></div>;
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 h-full">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Featured Campaigns</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!campaigns || campaigns.length === 0} 
        skeleton={
          <div className="flex flex-col animate-pulse pt-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-stroke dark:border-[#2E3A47]">
                <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
                <div className="flex items-center gap-3"><div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div><div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></div></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            ))}
          </div>
        }
      >
        <div className="max-w-full overflow-x-auto pb-4">
          <table className="w-full table-auto min-w-[500px]">
            <thead>
              <tr className="border-b border-stroke dark:border-[#2E3A47] text-left">
                <th className="pb-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Creator</th>
                <th className="pb-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase">Campaign</th>
                <th className="pb-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((item, index) => (
                <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.creator)}&background=random`} alt="User" />
                      </div>
                      <p className="text-sm font-medium text-[#1C2434] dark:text-white">{item.creator}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {getBrandIcon(item.brand)}
                      <div>
                        <p className="text-sm font-medium text-[#1C2434] dark:text-white">{item.campaign}</p>
                        <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">Ads campaign</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </div>
  );
};

export default FeaturedCampaigns;
