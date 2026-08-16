import { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const TopChannels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/analytics/top-channels')
      .then((res) => res.json())
      .then((data) => setChannels(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Top Channels</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 border-b border-stroke dark:border-[#2E3A47] pb-3 mb-3">
          <div className="p-2.5 xl:p-0">
            <h5 className="text-xs font-semibold uppercase text-gray-400 xsm:text-base">Source</h5>
          </div>
          <div className="p-2.5 xl:p-0 text-right">
            <h5 className="text-xs font-semibold uppercase text-gray-400 xsm:text-base">Visitors</h5>
          </div>
        </div>

        {channels.map((channel, key) => (
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
      
      <div className="mt-4 mb-4">
        <button className="w-full rounded-md border border-stroke dark:border-[#2E3A47] py-3 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
          Channels Report →
        </button>
      </div>
    </div>
  );
};

export default TopChannels;
