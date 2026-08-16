import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const Dividend = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/stocks/dividend')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[200px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse mb-4 md:mb-6 2xl:mb-7.5" />;

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
        columnWidth: '35%',
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
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 mb-4 md:mb-6 2xl:mb-7.5">
      <div className="mb-4 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Dividend</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div id="dividendChart" className="-ml-5">
        <ReactApexChart options={options} series={data.series} type="bar" height={200} />
      </div>
    </div>
  );
};

export default Dividend;
