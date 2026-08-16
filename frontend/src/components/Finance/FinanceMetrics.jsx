import { useState, useEffect } from 'react';
import { Wallet, LineChart, CreditCard, PiggyBank } from 'lucide-react';
import { api } from '../../services/api';

const FinanceMetrics = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/finance/metrics')
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error(err));
  }, []);

  if (!metrics.length) return <div className="grid grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5"><div className="h-[280px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse col-span-2" /></div>;

  const getIcon = (iconName, color) => {
    switch (iconName) {
      case 'wallet': return <Wallet className="w-5 h-5" style={{ color }} />;
      case 'chart': return <LineChart className="w-5 h-5" style={{ color }} />;
      case 'credit_card': return <CreditCard className="w-5 h-5" style={{ color }} />;
      case 'saving': return <PiggyBank className="w-5 h-5" style={{ color }} />;
      default: return <Wallet className="w-5 h-5" style={{ color }} />;
    }
  };

  const getIconBg = (color) => {
    return { backgroundColor: `${color}15` }; // 15 represents ~10% opacity in hex approximation for simplicity, or we can use Tailwind classes if preset
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5 h-full">
      {metrics.map((metric) => {
        const trend = metric.trend;
        
        return (
          <div key={metric.id} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex flex-col justify-between h-full min-h-[130px]">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{metric.label}</span>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={getIconBg(metric.color)}
              >
                {getIcon(metric.icon, metric.color)}
              </div>
            </div>
            
            <div>
              <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none mb-2">
                {metric.value}
              </h4>
              <div className="flex items-center gap-2">
                {trend === 'neutral' ? (
                  <div className="flex items-center gap-2 w-full">
                    {/* Goal progress visualization */}
                    <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                       <div className="h-full bg-[#3C50E0] w-[80%]"></div>
                    </div>
                    <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{metric.change}</span>
                  </div>
                ) : (
                  <span className={`text-xs font-bold flex items-center gap-1 ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {metric.change} <span className="font-normal text-[#64748B] dark:text-[#8A99AF]">{metric.comparison}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinanceMetrics;
