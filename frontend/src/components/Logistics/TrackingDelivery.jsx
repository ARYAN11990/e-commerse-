import { useState, useEffect } from 'react';
import { MoreVertical, MessageSquare, Phone } from 'lucide-react';
import { api } from '../../services/api';

const TrackingDelivery = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/logistics/tracking')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="animate-pulse h-[600px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] h-full" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Tracking Delivery</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Last viewed delivery history</span>
        </div>
        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Static Map Image / Placeholder */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-6 overflow-hidden relative border border-stroke dark:border-[#2E3A47]">
        {/* We use a simple CSS pattern to simulate a map if an image isn't available, but we'll use a high quality placeholder */}
        <img 
          src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+1C2434(-73.935242,40.730610)/-73.935242,40.730610,12,0/600x400?access_token=pk.eyJ1IjoiZXhhbXBsZXRva2VuIiwiYSI6ImNraW5vbnkxaTBtcmIydm4wNzUycDA2NmEifQ.example" 
          alt="Map"
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 bg-[#F8FAFC] hidden items-center justify-center flex-col text-[#64748B] dark:text-[#8A99AF]">
          <span className="text-3xl mb-2">🗺️</span>
          <span className="text-xs font-medium">Map Area</span>
        </div>
        {/* Map pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
           <svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 34 12 34C12 34 24 21 24 12C24 5.37258 18.6274 0 12 0ZM12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5Z" fill="#1C2434"/>
           </svg>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Tracking ID</span>
          <h5 className="text-lg font-bold text-[#1C2434] dark:text-white">{data.tracking_id}</h5>
        </div>
        <span className="rounded-full bg-[#10B981]/10 px-3 py-1 text-sm font-medium text-[#10B981]">
          {data.status}
        </span>
      </div>

      <div className="relative flex-1 mb-6">
        <div className="absolute left-5 top-2 bottom-2 w-px border-l-2 border-dashed border-stroke dark:border-[#2E3A47]"></div>
        
        <div className="flex flex-col gap-6">
          {data.timeline.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border ${item.completed ? 'bg-white dark:bg-[#24303F] border-[#3C50E0] text-[#3C50E0]' : 'bg-[#F1F5F9] dark:bg-[#1A222C] border-[#F1F5F9] text-[#64748B] dark:text-[#8A99AF]'}`}>
                {index === 0 && <span className="w-4 h-4">📦</span>}
                {index === 1 && <span className="w-4 h-4">🚚</span>}
                {index === 2 && <span className="w-4 h-4">✅</span>}
              </div>
              <div className="flex-1">
                <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{item.date}</span>
                <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{item.title}</h5>
              </div>
              <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-stroke dark:border-[#2E3A47] pt-6 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3C50E0] text-white flex items-center justify-center font-bold text-sm">
              {data.courier.avatar}
            </div>
            <div>
              <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Courier</span>
              <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{data.courier.name}</h5>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-stroke dark:border-[#2E3A47] flex items-center justify-center text-gray-400 hover:text-[#3C50E0] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-stroke dark:border-[#2E3A47] flex items-center justify-center text-gray-400 hover:text-[#3C50E0] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingDelivery;
