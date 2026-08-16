import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';

const MyCards = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/finance/cards')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[240px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default flex flex-col mb-4 md:mb-6 2xl:mb-7.5">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">My Cards</h4>
        <button className="flex items-center gap-1 rounded-md border border-stroke dark:border-[#2E3A47] px-3 py-1.5 text-xs font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">
          <Plus className="w-3 h-3" />
          Add Card
        </button>
      </div>

      {/* Credit Card Visual */}
      <div className="relative rounded-2xl bg-[#111928] p-6 overflow-hidden text-white mb-6">
        {/* Background elements to mimic the glossy card look */}
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white dark:bg-[#24303F]/5 blur-2xl"></div>
        <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-[#3C50E0]/20 blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 20C11 19.3499 11.0825 18.7188 11.238 18.1158M15 20C14.7738 18.9189 14.6548 17.7816 14.6548 16.6074C14.6548 14.1534 15.2289 11.8384 16.2307 9.80023M19 20C18.6732 18.1065 18.5 16.1436 18.5 14.135C18.5 10.4287 19.2996 6.94065 20.7356 3.83398" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs font-medium text-[#10B981] flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
               {data.status}
            </span>
          </div>
          {/* Mastercard Logo Placeholder */}
          <div className="flex -space-x-3">
             <div className="w-8 h-8 rounded-full bg-[#EA001B] opacity-80 mix-blend-multiply"></div>
             <div className="w-8 h-8 rounded-full bg-[#F79E1B] opacity-80 mix-blend-multiply"></div>
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-medium tracking-wider mb-8">{data.name}</h3>
          
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] uppercase opacity-70 block mb-1">Card Number</span>
              <p className="font-medium tracking-widest">{data.number}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase opacity-70 block mb-1">Exp</span>
              <p className="font-medium tracking-wider">{data.exp}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase opacity-70 block mb-1">CVC</span>
              <p className="font-medium tracking-wider">{data.cvc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">Virtual Card</h5>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-md border border-stroke dark:border-[#2E3A47] flex items-center justify-center text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-md border border-stroke dark:border-[#2E3A47] flex items-center justify-center text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCards;
