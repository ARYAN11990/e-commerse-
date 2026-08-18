import DropdownDefault from '../DropdownDefault';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const TopTrafficSource = () => {
  const { data: sources = [], loading, error, fetchData } = useApi('/marketing/top-traffic-source');

  const getBrandIcon = (source) => {
    switch (source) {
      case 'Google': return <div className="w-8 h-8 rounded-full bg-white dark:bg-[#24303F] border border-stroke dark:border-[#2E3A47] flex items-center justify-center text-[#EA4335] font-bold text-lg">G</div>;
      case 'Youtube': return <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white">▶</div>;
      case 'Facebook': return <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold">f</div>;
      case 'Instagram': return <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white text-xs font-bold">IG</div>;
      default: return <div className="w-8 h-8 rounded-full bg-gray-200"></div>;
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-5 shadow-default sm:px-7.5 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Top Traffic Source</h4>
        <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!sources || sources.length === 0} 
        skeleton={
          <div className="flex flex-col animate-pulse pt-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
                <div className="flex items-center gap-4 w-1/2"><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"></div><div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-col gap-6 flex-1">
          {(sources || []).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getBrandIcon(item.source)}
                <p className="text-sm font-medium text-[#1C2434] dark:text-white">{item.source}</p>
              </div>
              <div className="flex items-center gap-4 w-1/2">
                <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
                  <div 
                    className="bg-[#3C50E0] h-1.5 rounded-full" 
                    style={{ width: item.percentage }}
                  ></div>
                </div>
                <p className="text-sm font-medium text-[#1C2434] dark:text-white w-8 text-right">{item.percentage}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button className="w-full rounded-md border border-stroke dark:border-[#2E3A47] py-3 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
            View All
          </button>
        </div>
      </DataState>
    </div>
  );
};

export default TopTrafficSource;
