import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const TopChannels = () => {
  const { data: channels = [], loading, error, fetchData } = useApi('/analytics/top-channels');

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Top Channels</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!channels || channels.length === 0} 
        skeleton={
          <div className="flex flex-col animate-pulse pt-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex justify-between py-4 border-b border-stroke dark:border-[#2E3A47]">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="grid grid-cols-2 border-b border-stroke dark:border-[#2E3A47] pb-3 mb-3">
            <div className="p-2.5 xl:p-0">
              <h5 className="text-xs font-semibold uppercase text-gray-400 xsm:text-base">Source</h5>
            </div>
            <div className="p-2.5 xl:p-0 text-right">
              <h5 className="text-xs font-semibold uppercase text-gray-400 xsm:text-base">Visitors</h5>
            </div>
          </div>

          {(channels || []).map((channel, key) => (
            <div
              className={`grid grid-cols-2 ${
                key === channels.length - 1 ? '' : 'border-b border-stroke dark:border-[#2E3A47]'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5 pl-0">
                <p className="text-[#64748B] dark:text-[#8A99AF] font-medium">{channel.source}</p>
              </div>
              <div className="flex items-center justify-end p-2.5 xl:p-5 pr-0">
                <p className="text-[#1C2434] dark:text-white font-medium">{channel.visitors}</p>
              </div>
            </div>
          ))}
        </div>
      </DataState>
      
      <div className="mt-4 mb-4">
        <button className="w-full rounded-md border border-stroke dark:border-[#2E3A47] py-3 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
          Channels Report →
        </button>
      </div>
    </div>
  );
};

export default TopChannels;
