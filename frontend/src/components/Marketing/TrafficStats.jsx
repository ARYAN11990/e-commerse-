import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const SparklineChart = ({ color, data }) => {
  const options = {
    chart: { type: 'line', sparkline: { enabled: true } },
    stroke: { curve: 'smooth', width: 2 },
    colors: [color],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: () => '' } },
      marker: { show: false }
    }
  };
  const series = [{ data: data }];
  return <ReactApexChart options={options} series={series} type="line" height={30} width={60} />;
};

const TrafficStats = () => {
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState('Today');

  useEffect(() => {
    api.get('/marketing/traffic-stats')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="animate-pulse bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] h-[400px]" />;

  const statsList = [
    { 
      label: 'New Subscribers', 
      key: 'new_subscribers', 
      color: '#10B981', 
      sparkData: [10, 15, 12, 18, 14, 20, 22] 
    },
    { 
      label: 'Conversion Rate', 
      key: 'conversion_rate', 
      color: '#EF4444', 
      sparkData: [20, 18, 15, 17, 12, 14, 10] 
    },
    { 
      label: 'Page Bounce Rate', 
      key: 'page_bounce_rate', 
      color: '#10B981', 
      sparkData: [15, 12, 18, 14, 20, 18, 22] 
    },
  ];

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Traffic Stats</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1 mb-6">
        {['Today', 'Week', 'Month'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors text-center ${
              period === p ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {statsList.map((stat, idx) => {
          const itemData = data[stat.key];
          const trend = itemData.trend;
          return (
            <div key={idx} className={`${idx !== statsList.length - 1 ? 'border-b border-stroke dark:border-[#2E3A47] pb-6' : ''}`}>
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] block mb-1">{stat.label}</span>
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[24px] leading-none mb-1">
                    {itemData.value}
                  </h4>
                  <span className={`text-xs font-medium ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                    {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{itemData.rate} <span className="text-gray-400">then last Week</span>
                  </span>
                </div>
                <div>
                  <SparklineChart color={stat.color} data={stat.sparkData} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrafficStats;
