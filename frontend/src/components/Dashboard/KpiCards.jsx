import { useEffect, useState } from 'react';
import { Users, Package, ArrowUp, ArrowDown , ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

const KpiCards = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard/kpis')
      .then(data => setData(data))
      .catch(err => console.error("Failed to fetch KPIs", err));
  }, []);

  if (!data) return <div className="text-center py-4">Loading KPIs...</div>;

  const kpis = [
    {
      title: "Customers",
      key: "customers",
      icon: <Users className="w-5 h-5 text-[#64748B] dark:text-[#8A99AF]" />,
    },
    {
      title: "Orders",
      key: "orders",
      icon: <Package className="w-5 h-5 text-[#64748B] dark:text-[#8A99AF]" />,
    }
  ];

  return (
    <>
      {kpis.map((kpi, idx) => {
        const itemData = data[kpi.key];
        const trend = itemData.trend;

        return (
          <div key={idx} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-sm flex flex-col justify-between h-[160px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F1F5F9] dark:bg-[#1A222C]">
              {kpi.icon}
            </div>

            <div className="mt-4">
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-1 block">{kpi.title}</span>
              <div className="flex items-end justify-between">
                <h4 className="text-[28px] font-bold text-[#1C2434] dark:text-white leading-none">
                  {itemData.value}
                </h4>
                
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${
                  trend === 'up' ? 'text-[#10B981] bg-[#10B981]/10' : trend === 'down' ? 'text-[#DC3545] bg-[#DC3545]/10' : 'text-[#64748B] dark:text-[#8A99AF] bg-[#64748B]/10 dark:bg-[#8A99AF]/10'
                }`}>
                  {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : trend === 'down' ? <ArrowDown className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  {itemData.rate}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default KpiCards;
