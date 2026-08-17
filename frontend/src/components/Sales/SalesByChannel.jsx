import { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const SalesByChannel = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/sales/channel')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[400px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse h-full" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Sales by Channel</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Channel performance overview</span>
        </div>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[32px] leading-none">
          {data.value}
        </h4>
        <span className={`text-sm font-bold flex items-center gap-1 ${data.trend === 'up' ? 'text-[#10B981]' : data.trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
          {data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : ''} {data.change}
        </span>
        <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] ml-1">{data.comparison}</span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="flex w-full h-4 rounded-full overflow-hidden mb-4 bg-gray-100 gap-1">
        <div className="h-full bg-[#3C50E0]" style={{ width: '40%' }}></div>
        <div className="h-full bg-[#80CAEE]" style={{ width: '30%' }}></div>
        <div className="h-full bg-[#E2E8F0]" style={{ width: '30%' }}></div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-8">
        {data.channels.map((channel, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }}></span>
            <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{channel.name}</span>
          </div>
        ))}
      </div>

      {/* Data Table inside Card */}
      <div className="border border-stroke dark:border-[#2E3A47] rounded-lg mt-auto overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stroke dark:border-[#2E3A47] bg-gray-50 dark:bg-[#313D4A]/50 text-left">
              <th className="py-2.5 px-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Channels</th>
              <th className="py-2.5 px-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Metric</th>
              <th className="py-2.5 px-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.channels.map((channel, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-none hover:bg-gray-50 dark:hover:bg-[#313D4A]/30">
                <td className="py-3 px-4 text-sm font-medium text-[#1C2434] dark:text-white">{channel.name}</td>
                <td className="py-3 px-4 text-sm font-medium text-[#1C2434] dark:text-white">{channel.metric}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`text-xs font-bold inline-flex items-center gap-1 ${channel.trend === 'up' ? 'text-[#10B981]' : channel.trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                    {channel.trend === 'up' ? '↑' : channel.trend === 'down' ? '↓' : ''} {channel.total_change}
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

export default SalesByChannel;
