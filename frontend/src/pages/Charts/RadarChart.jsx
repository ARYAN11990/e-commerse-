import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ReactApexChart from 'react-apexcharts';

const RadarChart = () => {

  const commonOptions = {
    chart: { fontFamily: 'Inter, sans-serif', toolbar: { show: false } },
  };

  // Radar Chart 1
  const chart1Options = {
    ...commonOptions,
    labels: ['Estonia', 'Germany', 'France', 'Spain', 'Italy', 'Canada', 'Japan', 'Brazil'],
    colors: ['#3C50E0'],
    stroke: { width: 2, colors: ['#3C50E0'] },
    fill: { opacity: 0.2 },
    markers: { size: 4, colors: ['#3C50E0'], strokeWidth: 0 },
    yaxis: { show: false },
  };
  const chart1Series = [{ name: 'Series 1', data: [7, 4, 3, 4, 3, 4, 5, 6] }];

  // Radar Chart 2
  const chart2Options = {
    ...commonOptions,
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    colors: ['#3C50E0', '#f43f5e'], // Blue and Pink
    stroke: { width: 2 },
    fill: { opacity: 0.2 },
    markers: { size: 0 },
    yaxis: { show: false, min: 0, max: 100 },
    legend: { show: false }
  };
  const chart2Series = [
    { name: 'Desktop', data: [80, 50, 30, 40, 100, 20, 40] },
    { name: 'Mobile', data: [20, 30, 40, 80, 20, 80, 50] }
  ];

  // Radar Chart 3
  const chart3Options = {
    ...commonOptions,
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    colors: ['#3C50E0', '#80CAEE'],
    stroke: { width: 2 },
    fill: { opacity: 0.1 },
    markers: { size: 4 },
    yaxis: { show: false },
    legend: { show: false }
  };
  const chart3Series = [
    { name: 'Series 1', data: [110, 80, 90, 80, 100, 70, 90] },
    { name: 'Series 2', data: [80, 100, 60, 90, 70, 100, 110] }
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Radar Chart</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Radar Chart</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5">
        
        {/* Radar Chart 1 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 md:col-span-1">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Radar Chart 1</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart1Options} series={chart1Series} type="radar" width={400} height={400} />
          </div>
        </div>

        {/* Radar Chart 2 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 md:col-span-1">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Radar Chart 2</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart2Options} series={chart2Series} type="radar" width={400} height={400} />
          </div>
          <div className="flex justify-center gap-4 text-sm font-medium text-black dark:text-white">
            <div className="flex items-center gap-2">
              <span className="block w-2.5 h-2.5 rounded-full bg-[#3C50E0]"></span>
              Desktop
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span>
              Mobile
            </div>
          </div>
        </div>

        {/* Radar Chart 3 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 md:col-span-1">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Radar Chart 3</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart3Options} series={chart3Series} type="radar" width={400} height={400} />
          </div>
        </div>

      </div>
    </>
  );
};

export default RadarChart;
