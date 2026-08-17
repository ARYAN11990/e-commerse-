import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../services/api';

const CRMStatistics = () => {
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState('Monthly');

  useEffect(() => {
    api.get('/crm/statistics')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[400px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse h-full" />;

  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#80CAEE'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    yaxis: {
      min: 0,
      max: 250,
      tickAmount: 5,
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Statistics</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Target you've set for each month</span>
        </div>
        <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1">
          {['Monthly', 'Quarterly', 'Annually'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                period === p ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-2xl font-bold text-[#1C2434] dark:text-white">{data.profit_1.value}</h4>
            <span className="rounded-full bg-[#10B981]/10 px-2 py-0.5 text-xs font-medium text-[#10B981]">
              +{data.profit_1.rate}
            </span>
          </div>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Avg. Yearly Profit</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-2xl font-bold text-[#1C2434] dark:text-white">{data.profit_2.value}</h4>
            <span className="rounded-full bg-[#EF4444]/10 px-2 py-0.5 text-xs font-medium text-[#EF4444]">
              -{data.profit_2.rate}
            </span>
          </div>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Avg. Yearly Profit</span>
        </div>
      </div>
      
      <div id="crmChartOne" className="-ml-5 flex-1">
        <ReactApexChart options={options} series={data.series} type="area" height={310} />
      </div>
    </div>
  );
};

export default CRMStatistics;
