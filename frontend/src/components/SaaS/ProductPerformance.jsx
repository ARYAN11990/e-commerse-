import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const ProductPerformance = () => {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('Daily Sales');

  useEffect(() => {
    api.get('/saas/product-performance')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="animate-pulse h-[500px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] h-full" />;

  const options = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 2,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '10px' } }
    },
    yaxis: {
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: { style: { colors: '#64748B', fontSize: '10px' } }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    fill: { opacity: 1 }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Product Performance</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1 mb-6">
        {['Daily Sales', 'Online Sales', 'New Users'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-medium rounded-sm transition-colors text-center ${
              tab === t ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] block mb-1">Digital Product</span>
          <span className="text-lg font-bold text-[#1C2434] dark:text-white flex items-center gap-1">
            <span className="text-[#10B981] text-sm">↑</span> {data.digital_product.value}
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] block mb-1">Physical Product</span>
          <span className="text-lg font-bold text-[#1C2434] dark:text-white flex items-center justify-end gap-1">
            <span className="text-[#EF4444] text-sm">↓</span> {data.physical_product.value}
          </span>
        </div>
      </div>

      <div className="border border-stroke dark:border-[#2E3A47] rounded-xl p-5 flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] block mb-1">Average Daily Sales</span>
            <h4 className="text-[28px] font-bold text-[#1C2434] dark:text-white leading-none">{data.average_daily_sales.value}</h4>
          </div>
          <span className="rounded-full bg-[#EF4444]/10 px-2 py-0.5 text-xs font-medium text-[#EF4444]">
            ↓ {data.average_daily_sales.change}
          </span>
        </div>
        
        <div className="-ml-5 mt-auto">
          <ReactApexChart options={options} series={data.series} type="bar" height={220} />
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;
