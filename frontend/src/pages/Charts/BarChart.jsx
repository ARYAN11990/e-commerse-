import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
  // Common categories for months
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Bar Chart 1: Simple Bar
  const chart1Options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '40%',
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 400,
      tickAmount: 4,
    },
    grid: { show: false },
  };
  const chart1Series = [{ name: 'Sales', data: [160, 380, 190, 290, 180, 185, 280, 105, 205, 390, 200, 105] }];

  // Bar Chart 2: Stacked Bar
  const chart2Options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#5572E8', '#80CAEE', '#C2DEED'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 120,
      tickAmount: 6,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      markers: { radius: 12 }
    },
    grid: { show: false },
  };
  const chart2Series = [
    { name: 'Direct', data: [44, 55, 41, 67, 22, 43, 60, 50] },
    { name: 'Referral', data: [13, 23, 20, 8, 13, 27, 20, 25] },
    { name: 'Organic Search', data: [11, 17, 15, 15, 21, 14, 15, 10] },
    { name: 'Social', data: [21, 7, 25, 13, 22, 8, 10, 15] }
  ];

  // Bar Chart 3: Sparkline-like segment bars (100% height, varying color)
  // We can simulate this with a simple bar chart without axes
  const chart3Colors = Array(40).fill('').map((_, i) => {
    if (i < 15) return '#3C50E0'; // dark blue
    if (i < 25) return '#80CAEE'; // light blue
    return '#E2E8F0'; // grey
  });
  const chart3Options = {
    chart: {
      type: 'bar',
      height: 80,
      sparkline: { enabled: true }
    },
    plotOptions: {
      bar: { columnWidth: '60%', borderRadius: 2 }
    },
    colors: chart3Colors,
    dataLabels: { enabled: false },
    tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } } },
  };
  const chart3Series = [{ data: Array(40).fill(100) }];

  // Horizontal Bar Chart
  const chart4Options = {
    chart: {
      type: 'bar',
      height: 80,
      stacked: true,
      sparkline: { enabled: true }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '40%', borderRadius: 4 }
    },
    colors: ['#80CAEE', '#C2DEED', '#D8B4E2', '#A3E635', '#E2E8F0'],
    dataLabels: { enabled: false },
  };
  const chart4Series = [
    { name: 'S1', data: [30] },
    { name: 'S2', data: [25] },
    { name: 'S3', data: [15] },
    { name: 'S4', data: [10] },
    { name: 'S5', data: [20] }
  ];

  // Double Bar Chart
  const chart5Options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#80CAEE'],
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: '50%',
        dataLabels: { position: 'top' },
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: { formatter: (val) => val + "%" }
    },
    legend: { show: false },
    grid: { show: false },
  };
  const chart5Series = [
    { name: 'Metric A', data: [75, 88, 65, 40, 77, 65, 73, 89, 28, 70, 88, 93] },
    { name: 'Metric B', data: [85, 60, 62, 20, 60, 48, 55, 30, 48, 50, 68, 60] }
  ];

  // Horizontal Grouped Bar Chart
  const chart6Options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#E2E8F0'], // Category A (Blue), Category B (Grey, transparent outline)
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '50%',
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [0, 100, 200, 300, 400, 500, 600, 700],
      labels: { show: true },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      labels: { show: true },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      markers: { radius: 12 }
    },
    grid: { show: false },
  };
  const chart6Series = [
    { name: 'Category A', data: [620, 500, 480, 280, 620] },
    { name: 'Category B', data: [0, 0, 0, 0, 0] } // It looks like Category B has empty bars but with an outline in the screenshot? Or just lighter.
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Bar Chart</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Bar Chart</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-7.5">
        
        {/* Bar Chart 1 */}
        <div className="md:col-span-2 xl:col-span-2 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Bar Chart 1</h3>
          <div><ReactApexChart options={chart1Options} series={chart1Series} type="bar" height={350} /></div>
        </div>

        {/* Bar Chart 2 */}
        <div className="md:col-span-2 xl:col-span-2 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Bar Chart 2</h3>
          <div><ReactApexChart options={chart2Options} series={chart2Series} type="bar" height={350} /></div>
        </div>

        {/* Bar Chart 3 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Bar Chart 3</h3>
          <div className="mt-8"><ReactApexChart options={chart3Options} series={chart3Series} type="bar" height={80} /></div>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Horizontal Bar Chart</h3>
          <div className="mt-8"><ReactApexChart options={chart4Options} series={chart4Series} type="bar" height={80} /></div>
        </div>

        {/* Double Bar Chart */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Double Bar Chart</h3>
          <div><ReactApexChart options={chart5Options} series={chart5Series} type="bar" height={350} /></div>
        </div>

        {/* Horizontal Grouped Bar Chart */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Horizontal Grouped Bar Chart</h3>
          <div><ReactApexChart options={chart6Options} series={chart6Series} type="bar" height={350} /></div>
        </div>

      </div>
    </>
  );
};

export default BarChart;
