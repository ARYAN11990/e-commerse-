import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownDefault from '../DropdownDefault';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

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
  const [timeframe, setTimeframe] = useState('Month');
  const { data, loading, error, fetchData } = useApi('/marketing/traffic-stats');

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
        <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />
      </div>

      <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1 mb-6">
        {['Today', 'Week', 'Month'].map((p) => (
          <button
            key={p}
            onClick={() => setTimeframe(p)}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors text-center ${
              timeframe === p ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data} 
        skeleton={
          <div className="flex flex-col animate-pulse pt-2 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col pb-6 border-b border-stroke dark:border-[#2E3A47] last:border-0">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-col gap-6 flex-1">
          {statsList.map((stat, idx) => {
            const itemData = data?.[stat.key];
            if (!itemData) return null;
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
      </DataState>
    </div>
  );
};

export default TrafficStats;
