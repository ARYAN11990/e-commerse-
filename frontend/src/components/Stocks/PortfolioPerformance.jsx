import ReactApexChart from 'react-apexcharts';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const PortfolioPerformance = () => {
  const [period, setPeriod] = useState('Monthly');
  const { data, loading, error, fetchData } = useApi('/stocks/portfolio-performance');

  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0'],
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2 },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tickAmount: 10,
      labels: { style: { colors: '#64748B', fontSize: '10px' } }
    },
    yaxis: {
      min: 28,
      max: 40,
      tickAmount: 6,
      labels: { 
        style: { colors: '#64748B', fontSize: '10px' },
        formatter: (val) => val.toFixed(2)
      }
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
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data.series || data.series.length === 0} 
        skeleton={
          <div className="h-full w-full animate-pulse pt-2">
            <div className="h-[320px] w-full bg-gradient-to-t from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded opacity-50"></div>
          </div>
        }
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Portfolio Performance</h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Here is your performance stats of each month</span>
          </div>
          <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1">
            {['Monthly', 'Quarterly', 'Annually'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                  period === p ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        
        <div id="portfolioChart" className="-ml-5 flex-1">
          <ReactApexChart options={options} series={data?.series || []} type="area" height={320} />
        </div>
      </DataState>
    </div>
  );
};

export default PortfolioPerformance;
