import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = () => {
  const chartOptions = {
    chart: { fontFamily: 'Inter, sans-serif' },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF'],
    labels: ['Sales', 'Marketing', 'Development'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: '22px' },
          value: { fontSize: '16px' },
          total: { show: true, label: 'Total', formatter: function () { return 249 } }
        }
      }
    }
  };
  const chartSeries = [44, 55, 67];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Radial Chart</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Radial Chart</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 md:col-span-1">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Radial Bar Chart</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chartOptions} series={chartSeries} type="radialBar" width={380} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RadialChart;
