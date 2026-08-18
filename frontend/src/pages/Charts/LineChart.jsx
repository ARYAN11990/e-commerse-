import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  // Chart 1: Smooth Area Line Chart
  const chart1Options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
    },
    colors: ['#3C50E0'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 250,
      tickAmount: 5,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    grid: { show: false },
  };

  const chart1Series = [{ name: 'Sales', data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235] }];

  // Chart 2: Multiple Series Area Line Chart
  const chart2Options = {
    ...chart1Options,
    colors: ['#3C50E0', '#80CAEE'],
    stroke: { curve: 'smooth', width: [2, 2] },
    legend: { show: false },
  };

  const chart2Series = [
    { name: 'Sales', data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235] },
    { name: 'Revenue', data: [40, 30, 60, 40, 50, 40, 70, 100, 110, 120, 150, 140] },
  ];

  // Chart 3: Straight Line Area Chart
  const chart3Options = {
    ...chart1Options,
    stroke: { curve: 'straight', width: 2 },
    xaxis: {
      categories: ["Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25", "Nov '25", "Dec '25", "2026", "Feb '26", "Mar '26", "Apr"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tickPlacement: 'on'
    },
    yaxis: {
      min: 28.00,
      max: 40.00,
      tickAmount: 6,
      labels: { formatter: (value) => value.toFixed(2) }
    },
  };

  const generateData = () => {
    let data = [];
    for(let i=0; i<150; i++) {
        data.push(30 + Math.random() * 4 + (i > 130 ? (i-130)*0.5 : 0) - (i > 60 && i < 100 ? 2 : 0));
    }
    return data;
  }

  const chart3Series = [{ name: 'Value', data: generateData() }];
  chart3Options.xaxis.categories = undefined; // Clear categories to use simple index for dummy data layout if we don't map exactly

  // Better approach for Chart 3: Use numeric x-axis or hide some labels if we use exactly the categories shown
  // The screenshot shows a lot of data points (maybe daily data).
  // I will just use categories and spread dummy data evenly.
  const chart3Labels = [];
  const chart3Data = [];
  let val = 31;
  const targetLabels = ["Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25", "Nov '25", "Dec '25", "2026", "Feb '26", "Mar '26", "Apr"];
  for (let i = 0; i < 200; i++) {
    val += Math.random() * 2 - 1;
    if (val < 29) val = 29.5;
    if (i > 180) val += 0.5;
    chart3Data.push(val);
    
    // Distribute the 11 labels evenly across 200 points
    if (i % 18 === 0 && targetLabels[Math.floor(i / 18)]) {
        chart3Labels.push(targetLabels[Math.floor(i / 18)]);
    } else {
        chart3Labels.push("");
    }
  }

  const chart3OptionsFinal = {
      ...chart1Options,
      stroke: { curve: 'straight', width: 1.5 },
      xaxis: {
          categories: chart3Labels,
          labels: {
              formatter: function (value) {
                return value ? value : '';
              }
          },
          tickAmount: 11
      },
      yaxis: {
          min: 28, max: 40, tickAmount: 6,
          labels: { formatter: (val) => val.toFixed(2) }
      }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Line Chart</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Line Chart</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7.5">
        {/* Line Chart 1 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Line Chart 1</h3>
          <div>
            <ReactApexChart options={chart1Options} series={chart1Series} type="area" height={350} />
          </div>
        </div>

        {/* Line Chart 2 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Line Chart 2</h3>
          <div>
            <ReactApexChart options={chart2Options} series={chart2Series} type="area" height={350} />
          </div>
        </div>

        {/* Line Chart 3 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Line Chart 3</h3>
          <div>
            <ReactApexChart options={chart3OptionsFinal} series={[{ name: 'Value', data: chart3Data }]} type="area" height={350} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LineChart;
