import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const EstimatedRevenue = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/crm/estimated-revenue')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="animate-pulse h-[400px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47]" />;

  const options = {
    chart: {
      type: 'radialBar',
      fontFamily: 'Inter, sans-serif',
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -100,
        endAngle: 100,
        hollow: {
          margin: 15,
          size: "65%",
          background: "transparent",
        },
        track: {
          background: '#E2E8F0',
          strokeWidth: '100%',
          margin: 0,
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#64748B',
            fontSize: '14px',
            fontWeight: 500,
          },
          value: {
            offsetY: 10,
            color: '#1C2434',
            fontSize: '32px',
            fontWeight: 'bold',
            show: true,
            formatter: function() {
              return data.goal_value;
            }
          }
        }
      }
    },
    fill: { colors: ['#3C50E0'] },
    stroke: { lineCap: 'round' },
    labels: ['June Goals'],
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Estimated Revenue</h4>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Target you've set for each month</span>
      </div>

      <div className="flex justify-center mt-6">
        <ReactApexChart options={options} series={[65]} type="radialBar" height={250} />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Marketing</span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{data.marketing.percentage}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <h5 className="text-lg font-bold text-[#1C2434] dark:text-white w-24">{data.marketing.value}</h5>
            <div className="flex-1 bg-[#E2E8F0] rounded-full h-1.5">
              <div className="bg-[#3C50E0] h-1.5 rounded-full" style={{ width: data.marketing.percentage }}></div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Sales</span>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{data.sales.percentage}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <h5 className="text-lg font-bold text-[#1C2434] dark:text-white w-24">{data.sales.value}</h5>
            <div className="flex-1 bg-[#E2E8F0] rounded-full h-1.5">
              <div className="bg-[#3C50E0] h-1.5 rounded-full" style={{ width: data.sales.percentage }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedRevenue;
