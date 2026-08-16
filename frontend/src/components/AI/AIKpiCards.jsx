import { useState, useEffect } from 'react';
import { Users, Folder, DollarSign, UserCheck } from 'lucide-react';
import { api } from '../../services/api';

const AIKpiCards = () => {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/ai/kpis')
      .then((res) => res.json())
      .then((data) => setKpis(data))
      .catch((err) => console.error(err));
  }, []);

  if (!kpis.length) return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5"><div className="h-[140px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse col-span-4" /></div>;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'users': return <Users className="w-5 h-5 text-[#3C50E0]" />;
      case 'folder': return <Folder className="w-5 h-5 text-[#3BA2B8]" />;
      case 'dollar': return <DollarSign className="w-5 h-5 text-[#10B981]" />;
      case 'user_check': return <UserCheck className="w-5 h-5 text-[#F59E0B]" />;
      default: return <Users className="w-5 h-5 text-[#3C50E0]" />;
    }
  };

  const getIconBg = (iconName) => {
    switch (iconName) {
      case 'users': return 'bg-[#3C50E0]/10';
      case 'folder': return 'bg-[#3BA2B8]/10';
      case 'dollar': return 'bg-[#10B981]/10';
      case 'user_check': return 'bg-[#F59E0B]/10';
      default: return 'bg-[#3C50E0]/10';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
      {kpis.map((kpi) => {
        const trend = kpi.trend;

        return (
          <div key={kpi.id} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-[140px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-[#1C2434] dark:text-white">{kpi.label}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getIconBg(kpi.icon)}`}>
                {getIcon(kpi.icon)}
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none mb-1">
                  {kpi.value}
                </h4>
                <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{kpi.period}</span>
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {kpi.rate}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AIKpiCards;
