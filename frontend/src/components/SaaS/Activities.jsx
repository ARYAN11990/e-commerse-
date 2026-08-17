import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const Activities = () => {
  const { data: activities = [], loading, error, fetchData } = useApi('/saas/activities');

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Activities</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!activities || activities.length === 0} 
        skeleton={
          <div className="relative pt-2">
            <div className="absolute left-[18px] top-4 bottom-4 w-[1px] bg-stroke"></div>
            <div className="flex flex-col gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex gap-4 relative animate-pulse">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-white dark:bg-[#24303F] flex items-center justify-center shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="relative">
          <div className="absolute left-[18px] top-4 bottom-4 w-[1px] bg-stroke"></div>
          
          <div className="flex flex-col gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-4 relative">
                <div className="relative z-10 w-10 h-10 rounded-full bg-white dark:bg-[#24303F] flex items-center justify-center shrink-0">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(activity.user)}&background=random`} 
                    alt="User" 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-sm">
                      New invoice
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">
                    {activity.user} <span className="font-normal text-[#64748B] dark:text-[#8A99AF]">{activity.action}</span>
                  </p>
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{activity.invoice}</p>
                  <span className="text-xs text-[#64748B] dark:text-[#8A99AF]">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DataState>
    </div>
  );
};

export default Activities;
