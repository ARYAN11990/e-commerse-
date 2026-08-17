import { MoreVertical, Users, UserPlus, Calendar, Activity } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const UserAnalytics = () => {
  const { data, loading, error, fetchData } = useApi('/ai/user-analytics');

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data} 
        skeleton={
          <div className="h-full w-full animate-pulse flex flex-col pt-2">
            <div className="flex justify-between items-start mb-6">
              <div><div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
            <div className="flex items-center justify-between border-b border-stroke dark:border-[#2E3A47] pb-6 mb-6">
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-700"></div><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 flex-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`flex flex-col justify-center ${i === 1 ? 'border-r border-stroke dark:border-[#2E3A47] pr-6' : i === 2 ? 'pl-6' : i === 3 ? 'border-r border-t border-stroke dark:border-[#2E3A47] pt-6 pr-6 -mt-2' : 'border-t border-stroke dark:border-[#2E3A47] pt-6 pl-6 -mt-2'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">User Analytics</h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Platform user insights</span>
          </div>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-stroke dark:border-[#2E3A47] pb-6 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#64748B] dark:text-[#8A99AF]" />
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Total Users</span>
          </div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">{data?.total}</h4>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 flex-1">
          {/* Free Users */}
          <div className="border-r border-stroke dark:border-[#2E3A47] pr-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Free Users</span>
              <Users className="w-4 h-4 text-[#3C50E0]" />
            </div>
            <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data?.free?.value}</h4>
            <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
              <span className="font-medium text-[#1C2434] dark:text-white">{data?.free?.percentage}</span> {data?.free?.label}
            </p>
          </div>

          {/* Paid Users */}
          <div className="pl-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Paid Users</span>
              <UserPlus className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data?.paid?.value}</h4>
            <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
              <span className="font-medium text-[#1C2434] dark:text-white">{data?.paid?.percentage}</span> {data?.paid?.label}
            </p>
          </div>

          {/* This Month */}
          <div className="border-r border-t border-stroke dark:border-[#2E3A47] pt-6 pr-6 -mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">This Month</span>
              <Calendar className="w-4 h-4 text-[#10B981]" />
            </div>
            <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data?.this_month?.value}</h4>
            <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
              <span className="font-medium text-[#10B981]">{data?.this_month?.change}</span> {data?.this_month?.label}
            </p>
          </div>

          {/* This Year */}
          <div className="border-t border-stroke dark:border-[#2E3A47] pt-6 pl-6 -mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">This Year</span>
              <Activity className="w-4 h-4 text-[#F43F5E]" />
            </div>
            <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data?.this_year?.value}</h4>
            <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
              <span className="font-medium text-[#10B981]">{data?.this_year?.change}</span> {data?.this_year?.label}
            </p>
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default UserAnalytics;
