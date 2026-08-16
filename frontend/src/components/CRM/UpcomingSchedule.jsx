import { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { api } from '../../services/api';

const UpcomingSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/crm/upcoming-schedule')
      .then((res) => res.json())
      .then((data) => setSchedule(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full">
      <div className="mb-6 flex justify-between items-center">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Upcoming Schedule</h4>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        {schedule.map((item, idx) => (
          <div key={item.id} className="flex gap-4">
            <div className="pt-1">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3C50E0] focus:ring-[#3C50E0]" />
            </div>
            <div className="flex-1 flex gap-4">
              <div className="w-24 flex flex-col gap-1">
                <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.date}</span>
                <span className="text-sm font-bold text-[#1C2434] dark:text-white">{item.time}</span>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{item.title}</h5>
                <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{item.desc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSchedule;
