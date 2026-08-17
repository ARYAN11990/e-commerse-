import { MoreVertical } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';

const DeliveryVehicles = () => {
  const { data, loading, error, fetchData } = useApi('/logistics/delivery-vehicles');

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col relative overflow-hidden">
      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={!data} 
        skeleton={
          <div className="h-full w-full animate-pulse flex flex-col pt-2 relative">
            <div className="flex justify-between items-start mb-4">
              <div><div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div><div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div></div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700"></div><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        }
      >
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Delivery Vehicles</h4>
            <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Vehicles operating on the road</span>
          </div>
          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2 relative z-10">
          <h4 className="text-title-md font-bold text-[#1C2434] dark:text-white text-[32px] leading-none">
            {data?.value}
          </h4>
          <span className="text-xs font-medium text-[#10B981]">
            +{data?.change} <span className="text-gray-400">than last Week</span>
          </span>
        </div>

        <div className="flex items-center gap-2 mt-auto relative z-10">
          <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#10B981] text-[#10B981]">
             <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
          </span>
          <span className="text-sm font-medium text-[#10B981]">{data?.status}</span>
        </div>

        {/* Truck Graphic Placeholder */}
        <div className="absolute right-[-20px] bottom-[-20px] w-[180px] opacity-90">
           {/* Simulating a truck illustration matching the reference */}
           <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
              alt="Delivery Truck" 
              className="w-full h-auto object-contain opacity-0"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
           />
           <div className="w-[180px] h-[120px]">
              {/* SVG placeholder representing a truck from the reference layout */}
              <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                 <path d="M10 10 H70 V45 H10 Z" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2"/>
                 <path d="M70 25 H90 L95 35 V45 H70 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2"/>
                 <circle cx="25" cy="45" r="8" fill="#1C2434"/>
                 <circle cx="75" cy="45" r="8" fill="#1C2434"/>
                 <rect x="75" y="27" width="10" height="6" fill="#A7C5FF" rx="1"/>
              </svg>
           </div>
        </div>
      </DataState>
    </div>
  );
};

export default DeliveryVehicles;
