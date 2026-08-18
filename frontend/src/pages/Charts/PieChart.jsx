import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
  // Common pie options
  const commonOptions = {
    chart: { fontFamily: 'Inter, sans-serif' },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    legend: { show: false }, // We might use custom legends
  };

  // 1. Donut Pie Chart 1
  const chart1Options = {
    ...commonOptions,
    labels: ['Desktop', 'Mobile', 'Tablet'],
    colors: ['#3C50E0', '#6577F3', '#8FD0EF'],
    plotOptions: {
      pie: {
        donut: { size: '65%' }
      }
    }
  };
  const chart1Series = [65, 34, 12];

  // 2. Donut Pie Chart 2
  const chart2Options = {
    ...commonOptions,
    labels: ['Downloads', 'Apps', 'Documents', 'Media'],
    colors: ['#8b5cf6', '#f97316', '#22c55e', '#e2e8f0'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: '#1C2434',
              formatter: () => 'Total 135 GB'
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total 135 GB',
              fontSize: '24px',
              fontWeight: '700',
              color: '#1C2434',
              formatter: () => '160' // small text below
            }
          }
        }
      }
    }
  };
  const chart2Series = [20, 30, 40, 10];

  // 3. Donut Chart with Legend
  const chart3Options = {
    ...commonOptions,
    labels: ['ChatGPT', 'Gemini', 'xAI'],
    colors: ['#bca4ef', '#3C50E0', '#80caee'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', color: '#64748B' },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: '#1C2434',
              formatter: () => '13.5M'
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total API Token used',
              fontSize: '14px',
              color: '#64748B',
              formatter: () => '13.5M'
            }
          }
        }
      }
    }
  };
  const chart3Series = [45, 25, 30];

  // 4. Donut Pie Chart 4 (Solid Pie)
  const chart4Options = {
    ...commonOptions,
    labels: ['Image', 'Video', 'Audio', 'Documents'],
    colors: ['#2e3a59', '#3C50E0', '#6577F3', '#8FD0EF'],
    plotOptions: {
      pie: {
        // Not a donut
      }
    }
  };
  const chart4Series = [40, 30, 20, 10];

  // 5. Semi Donut Chart
  const chart5Options = {
    ...commonOptions,
    labels: ['Email', 'Social Media', 'Mobile', 'Direct', 'Other'],
    colors: ['#2e3a59', '#3C50E0', '#6577F3', '#8FD0EF', '#f4eaf2'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: { size: '65%' },
        offsetY: 20
      }
    },
    grid: { padding: { bottom: -80 } }
  };
  const chart5Series = [30, 25, 20, 15, 10];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Pie Chart</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Pie Chart</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7.5">
        
        {/* Donut Pie Chart 1 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Donut Pie Chart 1</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart1Options} series={chart1Series} type="donut" width={280} />
          </div>
          <div className="flex justify-center gap-4 text-sm font-medium text-black dark:text-white">
            {chart1Options.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chart1Options.colors[i] }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Donut Pie Chart 2 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Donut Pie Chart 2</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart2Options} series={chart2Series} type="donut" width={280} />
          </div>
          <div className="flex justify-center gap-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">
            {chart2Options.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chart2Options.colors[i] }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart with Legend */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Donut Chart with Legend</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart3Options} series={chart3Series} type="donut" width={280} />
          </div>
          <div className="flex justify-center gap-4 text-sm font-medium text-black dark:text-white">
            {chart3Options.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chart3Options.colors[i] }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Donut Pie Chart 4 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Donut Pie Chart 4</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart4Options} series={chart4Series} type="pie" width={280} />
          </div>
          <div className="flex justify-center gap-4 text-sm font-medium text-black dark:text-white">
            {chart4Options.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chart4Options.colors[i] }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Semi Donut Chart */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 md:col-span-2 xl:col-span-1">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-8">Semi Donut Chart</h3>
          <div className="flex justify-center mb-6">
            <ReactApexChart options={chart5Options} series={chart5Series} type="donut" width={280} />
          </div>
          <div className="flex justify-center flex-wrap gap-4 text-sm font-medium text-black dark:text-white mt-10">
            {chart5Options.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chart5Options.colors[i] }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default PieChart;
