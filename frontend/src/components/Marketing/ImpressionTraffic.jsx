import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../services/api';

const ImpressionTraffic = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/marketing/impression-traffic')
      .then((res) => res.json())
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
    colors: ['#80CAEE', '#3C50E0'],
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
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Impression & Data Traffic</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{data.date_range}</span>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white flex items-center justify-end gap-2">
            {data.total_revenue}
            <span className="rounded-full bg-[#10B981]/10 px-2 py-0.5 text-xs font-medium text-[#10B981]">
              +{data.rate}
            </span>
          </h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Total Revenue</span>
        </div>
      </div>
      
      <div id="chartThree" className="-ml-5 flex-1">
        <ReactApexChart options={options} series={data.series} type="area" height={320} />
      </div>
    </div>
  );
};

export default ImpressionTraffic;
