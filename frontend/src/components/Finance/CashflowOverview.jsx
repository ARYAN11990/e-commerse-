import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../services/api';

const CashflowOverview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/finance/cashflow')
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
    colors: ['#3C50E0', '#80CAEE'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: [4, 4],
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    yaxis: {
      min: 0,
      max: 25000,
      tickAmount: 5,
      labels: { 
        style: { colors: '#64748B', fontSize: '12px' },
        formatter: (val) => `${val / 1000}K`
      }
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    legend: { show: false },
    fill: { opacity: 1 }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-stroke dark:border-[#2E3A47] pb-6">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white mb-1">Cashflow Overview</h4>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="appearance-none rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-1.5 pl-3 pr-8 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] outline-none hover:text-[#1C2434] dark:hover:text-white dark:text-white">
              <option>2025</option>
              <option>2024</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64748B] dark:text-[#8A99AF]">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-1.5 pl-3 pr-8 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] outline-none hover:text-[#1C2434] dark:hover:text-white dark:text-white">
              <option>3 Month</option>
              <option>6 Month</option>
              <option>Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64748B] dark:text-[#8A99AF]">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
           <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Total Revenue</span>
           <div className="flex items-center gap-2 mt-1">
              <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white leading-none">
                {data.revenue}
              </h2>
              <span className="rounded-full bg-[#10B981]/10 px-2 py-0.5 text-xs font-bold text-[#10B981]">
                {data.change}
              </span>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C50E0]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#80CAEE]"></span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Expense</span>
          </div>
        </div>
      </div>

      <div id="cashflowChart" className="-ml-5 flex-1 flex flex-col justify-end">
        <ReactApexChart options={options} series={data.series} type="bar" height={320} />
      </div>
    </div>
  );
};

export default CashflowOverview;
