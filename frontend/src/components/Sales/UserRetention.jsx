import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const UserRetention = () => {
  const { data, loading, error, fetchData } = useApi('/sales/retention');

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
      stacked: true,
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#BFE6F8', '#E2F2FC'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '85%',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    yaxis: { show: false },
    grid: { show: false },
    legend: { show: false },
    fill: { opacity: 1 }
  };

  // Re-map the single series data into stacked layers to create the waterfall/retention visual from the reference.
  const getStackedSeries = (baseData) => {
    // This simulates the descending stepped visual seen in the screenshot
    const layers = 5;
    let series = [];
    for(let i=0; i<layers; i++) {
        series.push({
            name: `Cohort ${i}`,
            data: baseData.map(val => Math.max(0, val - (i * 15)))
        });
    }
    return series;
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data.series || data.series.length === 0} 
        skeleton={
          <div className="h-full w-full animate-pulse flex flex-col pt-2">
            <div className="flex justify-between items-start mb-4">
              <div><div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="w-full flex-1 flex items-end justify-between px-4 pb-4 h-[280px]">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="w-[12%] bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t opacity-50" style={{ height: `${Math.max(20, 100 - i * 15)}%` }}></div>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">User Retention</h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">User engagement over time</span>
          </div>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[32px] leading-none">
            {data?.rate}
          </h4>
          <span className={`text-sm font-bold flex items-center gap-1 ${data?.trend === 'up' ? 'text-[#10B981]' : data?.trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
            {data?.trend === 'up' ? '↑' : data?.trend === 'down' ? '↓' : ''} {data?.change}
          </span>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] ml-1">{data?.comparison}</span>
        </div>

        <div id="retentionChart" className="-ml-3 flex-1 flex flex-col justify-end">
          <ReactApexChart options={options} series={data?.series ? getStackedSeries(data.series[0].data) : []} type="bar" height={280} />
        </div>
      </DataState>
    </div>
  );
};

export default UserRetention;
