import ReactApexChart from 'react-apexcharts';
import DropdownDefault from '../DropdownDefault';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const ConversionFunnel = () => {
  const { data, loading, error, fetchData } = useApi('/saas/conversion-funnel');

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#291D89', '#3C50E0', '#60A5FA', '#93C5FD'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
        borderRadius: 2,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: {
      categories: data?.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
    },
    yaxis: {
      min: 0,
      max: 120,
      tickAmount: 6,
      labels: { style: { colors: '#64748B', fontSize: '12px' } }
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

  const legends = [
    { label: 'Ad Impression', color: 'bg-[#291D89]' },
    { label: 'Website Session', color: 'bg-[#3C50E0]' },
    { label: 'App Download', color: 'bg-[#60A5FA]' },
    { label: 'New Users', color: 'bg-[#93C5FD]' },
  ];

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-4 md:mb-6 2xl:mb-7.5">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data?.series || data?.series.length === 0} 
        skeleton={
          <div className="h-full w-full animate-pulse pt-2">
            <div className="h-[320px] w-full flex items-end justify-between px-4 pb-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="w-[10%] bg-gray-200 dark:bg-gray-700 rounded-t" style={{ height: `${Math.random() * 60 + 40}%` }}></div>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Conversion Funnel</h4>
          <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
          {legends.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.label}</span>
            </div>
          ))}
        </div>

        <div id="conversionChart" className="-ml-5">
          <ReactApexChart options={options} series={data?.series || []} type="bar" height={320} />
        </div>
      </DataState>
    </div>
  );
};

export default ConversionFunnel;
