import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DollarSign, Box, ArrowRightLeft, Undo2 } from 'lucide-react';
import { api } from '../../services/api';

const SalesKpiCards = () => {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/sales/kpis')
      .then((res) => res.json())
      .then((data) => setKpis(data))
      .catch((err) => console.error(err));
  }, []);

  if (!kpis.length) return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5"><div className="h-[140px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse col-span-4" /></div>;

  const getIcon = (iconName, color) => {
    switch (iconName) {
      case 'dollar': return <DollarSign className="w-5 h-5" style={{ color }} />;
      case 'box': return <Box className="w-5 h-5" style={{ color }} />;
      case 'arrows': return <ArrowRightLeft className="w-5 h-5" style={{ color }} />;
      case 'money_return': return <Undo2 className="w-5 h-5" style={{ color }} />;
      default: return <DollarSign className="w-5 h-5" style={{ color }} />;
    }
  };

  const getOptions = (color) => ({
    chart: {
      type: 'area',
      height: 40,
      sparkline: { enabled: true },
      fontFamily: 'Inter, sans-serif',
    },
    colors: [color],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } }, marker: { show: false } }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5 mb-4 md:mb-6 2xl:mb-7.5">
      {kpis.map((kpi) => {
        const trend = kpi.trend;

        return (
          <div key={kpi.id} className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-[140px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium text-[#1C2434] dark:text-white">{kpi.label}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-xs font-bold flex items-center gap-1 ${trend === 'up' ? 'text-[#10B981]' : trend === 'down' ? 'text-[#EF4444]' : 'text-[#64748B] dark:text-[#8A99AF]'}`}>
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {kpi.rate}
                  </span>
                  <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{kpi.comparison}</span>
                </div>
              </div>
              <div>
                {getIcon(kpi.icon, kpi.color)}
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[28px] leading-none mb-1">
                {kpi.value}
              </h4>
              <div className="w-24">
                <ReactApexChart options={getOptions(kpi.color)} series={kpi.series} type="area" height={40} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SalesKpiCards;
