import { useState, useEffect } from 'react';
import { MoreVertical, Users, UserPlus, Calendar, Activity } from 'lucide-react';
import { api } from '../../services/api';

const UserAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/ai/user-analytics')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[280px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse h-full" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
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
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">{data.total}</h4>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 flex-1">
        {/* Free Users */}
        <div className="border-r border-stroke dark:border-[#2E3A47] pr-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Free Users</span>
            <Users className="w-4 h-4 text-[#3C50E0]" />
          </div>
          <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data.free.value}</h4>
          <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
            <span className="font-medium text-[#1C2434] dark:text-white">{data.free.percentage}</span> {data.free.label}
          </p>
        </div>

        {/* Paid Users */}
        <div className="pl-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Paid Users</span>
            <UserPlus className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data.paid.value}</h4>
          <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
            <span className="font-medium text-[#1C2434] dark:text-white">{data.paid.percentage}</span> {data.paid.label}
          </p>
        </div>

        {/* This Month */}
        <div className="border-r border-t border-stroke dark:border-[#2E3A47] pt-6 pr-6 -mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">This Month</span>
            <Calendar className="w-4 h-4 text-[#10B981]" />
          </div>
          <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data.this_month.value}</h4>
          <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
            <span className="font-medium text-[#10B981]">{data.this_month.change}</span> {data.this_month.label}
          </p>
        </div>

        {/* This Year */}
        <div className="border-t border-stroke dark:border-[#2E3A47] pt-6 pl-6 -mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">This Year</span>
            <Activity className="w-4 h-4 text-[#F43F5E]" />
          </div>
          <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">{data.this_year.value}</h4>
          <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
            <span className="font-medium text-[#10B981]">{data.this_year.change}</span> {data.this_year.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
