import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const MonthlySales = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard/monthly-sales')
      .then(data => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  const options = {
    colors: ['#3C50E0'],
    chart: {
      fontFamily: 'Inter, sans-serif',
      type: 'bar',
      height: 250,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '25%',
        borderRadius: 2,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B' } }
    },
    yaxis: {
      labels: { style: { colors: '#64748B' } },
      min: 0,
      max: 400,
      tickAmount: 4
    },
    grid: {
      strokeDashArray: 0,
      borderColor: '#E2E8F0',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: (val) => `$ ${val}` }
    }
  };

  const series = [{
    name: 'Sales',
    data: data.data
  }];

  return (
    <div className="h-full rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-sm sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">
          Monthly Sales
        </h4>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5">
          <ReactApexChart options={options} series={series} type="bar" height={220} />
        </div>
      </div>
    </div>
  );
};

export default MonthlySales;
