import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { api } from '../../services/api';

const QuickSend = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/finance/quicksend')
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div className="h-[280px] bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse h-full" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default h-full flex flex-col justify-between">
      <h4 className="text-xl font-bold text-[#1C2434] dark:text-white mb-4">Quick send</h4>

      {/* Avatars List */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
        {data.users.map((user, idx) => (
          <div 
            key={user.id} 
            className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center cursor-pointer ${idx === 0 ? 'ring-2 ring-[#3C50E0] ring-offset-2' : 'border border-stroke dark:border-[#2E3A47]'}`}
            style={{ 
              backgroundImage: idx === 0 ? 'none' : 'url(https://i.pravatar.cc/100?img=' + (user.id + 10) + ')',
              backgroundSize: 'cover',
              backgroundColor: idx === 0 ? '#3C50E0' : 'transparent'
            }}
          >
            {idx === 0 && <span className="text-white text-lg leading-none">👤</span>}
          </div>
        ))}
        <button className="w-8 h-8 rounded-full border border-stroke dark:border-[#2E3A47] flex items-center justify-center text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] shrink-0 ml-2">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Send From</label>
          <div className="relative z-20 bg-transparent">
            <select className="relative z-20 w-full appearance-none rounded border border-stroke dark:border-[#2E3A47] bg-transparent py-2 px-3 text-sm font-medium outline-none transition focus:border-[#3C50E0] active:border-[#3C50E0]">
              <option value="">Visa •••• •••• 3657</option>
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="mb-1.5 block text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Currency</label>
            <div className="relative z-20 bg-transparent">
              <select className="relative z-20 w-full appearance-none rounded border border-stroke dark:border-[#2E3A47] bg-transparent py-2 px-3 text-sm font-medium outline-none transition focus:border-[#3C50E0] active:border-[#3C50E0]">
                <option value="">$ USD</option>
              </select>
              <span className="absolute top-1/2 right-2 z-10 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          
          <div className="w-2/3">
            <label className="mb-1.5 block text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Amount</label>
            <input 
              type="text" 
              placeholder="0.00" 
              className="w-full rounded border border-stroke dark:border-[#2E3A47] bg-transparent py-2 px-3 text-sm font-medium outline-none transition focus:border-[#3C50E0] active:border-[#3C50E0]" 
            />
          </div>
        </div>

        <button className="flex w-full justify-center rounded bg-[#3C50E0] p-2 font-medium text-white hover:bg-opacity-90">
          Send Money
        </button>
      </div>
    </div>
  );
};

export default QuickSend;
