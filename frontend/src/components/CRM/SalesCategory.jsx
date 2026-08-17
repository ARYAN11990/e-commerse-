import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const SalesCategory = () => {
  const { data, loading, error, fetchData } = useApi('/crm/sales-category');

  const options = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#60A5FA', '#93C5FD'],
    labels: data?.categories?.map(c => c.label) || [],
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              color: '#1C2434',
              fontWeight: 'bold',
            },
            value: {
              show: true,
              fontSize: '14px',
              color: '#64748B',
              fontWeight: 500,
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1C2434',
              formatter: function () {
                return data?.total || '';
              }
            }
          }
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  };

  const getDotColor = (index) => {
    const colors = ['bg-[#3C50E0]', 'bg-[#60A5FA]', 'bg-[#93C5FD]'];
    return colors[index] || 'bg-gray-200';
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Sales Category</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data.series || data.series.length === 0} 
        skeleton={
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-8 animate-pulse">
            <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"></div><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
                  <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded ml-4.5"></div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-8">
          <div className="w-48 h-48">
            <ReactApexChart options={options} series={data?.series || []} type="donut" />
          </div>

          <div className="flex flex-col gap-4">
            {data?.categories?.map((cat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getDotColor(idx)}`}></span>
                  <span className="text-sm font-semibold text-[#1C2434] dark:text-white">{cat.label}</span>
                </div>
                <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF] ml-4.5">
                  {cat.percentage} · {cat.products}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default SalesCategory;
