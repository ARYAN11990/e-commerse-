import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const APITokenUsages = () => {
  const { data, loading, error, fetchData } = useApi('/ai/token-usages');

  const options = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF'],
    labels: data?.platforms?.map(p => p.name) || [],
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: '#1C2434',
              formatter: () => data?.total || 0
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '12px',
              color: '#64748B',
              formatter: () => data?.limit || 0
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 }
  };

  const getPlatformIcon = (iconName) => {
    switch (iconName) {
      case 'gpt':
        return <div className="w-8 h-8 rounded-full border border-stroke dark:border-[#2E3A47] bg-[#F8FAFC] flex items-center justify-center text-[#1C2434] dark:text-white font-bold text-xs"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 7.1"/><path d="M12 12l9.9 4.9"/></svg></div>;
      case 'gemini':
        return <div className="w-8 h-8 rounded-full border border-stroke dark:border-[#2E3A47] bg-[#F8FAFC] flex items-center justify-center"><div className="w-4 h-4 bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 rounded-[3px] transform rotate-45"></div></div>;
      case 'xai':
        return <div className="w-8 h-8 rounded-full border border-stroke dark:border-[#2E3A47] bg-[#F8FAFC] flex items-center justify-center text-[#1C2434] dark:text-white font-bold text-sm italic">xI</div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-gray-200"></div>;
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data || !data?.platforms || data?.platforms.length === 0} 
        skeleton={
          <div className="h-full w-full animate-pulse flex flex-col pt-2">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 mx-auto h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        }
      >
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">API Token Usages</h4>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {data?.platforms && (
          <div className="flex justify-center mb-6">
            <div className="w-64 relative">
              <ReactApexChart options={options} series={data?.chart_series || []} type="donut" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 flex-1">
          {data?.platforms?.map((platform, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getPlatformIcon(platform.icon)}
                <div>
                  <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{platform.name}</h5>
                  <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{platform.keys}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#1C2434] dark:text-white flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3C50E0]"></span> {platform.used}
                </span>
                <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">Token used</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full text-center text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0] transition-colors">
          View All Usage Details
        </button>
      </DataState>
    </div>
  );
};

export default APITokenUsages;
