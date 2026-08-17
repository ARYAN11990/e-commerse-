import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const UserRetention = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/sales/retention')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[400px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse h-full" />;

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
          {data.rate}
        </h4>
        <span className={`text-sm font-bold flex items-center gap-1 ${data.trend === 'up' ? 'text-[#10B981]' : data.trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
          {data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : ''} {data.change}
        </span>
        <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] ml-1">{data.comparison}</span>
      </div>

      <div id="retentionChart" className="-ml-3 flex-1 flex flex-col justify-end">
        <ReactApexChart options={options} series={getStackedSeries(data.series[0].data)} type="bar" height={280} />
      </div>
    </div>
  );
};

export default UserRetention;
