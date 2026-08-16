import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '../../services/api';

const Security = ({ data, onUpdate2FA }) => {
  const [loading, setLoading] = useState(false);

  if (!data) return <div className="h-40 bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse mb-6" />;

  const handleToggle = () => {
    setLoading(true);
    api.put('/profile/security', { two_factor_enabled: !data.two_factor_enabled })
      .then(resData => {
        onUpdate2FA(resData.security);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-6">
      <h3 className="font-medium text-[#1C2434] dark:text-white text-lg mb-6">Security</h3>

      <div className="flex justify-between items-center pb-6 border-b border-stroke dark:border-[#2E3A47] mb-6">
        <div>
          <h4 className="text-sm font-bold text-[#1C2434] dark:text-white">Change Password</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Receive real-time notifications and team alerts.</p>
        </div>
        <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">
          <Pencil className="w-4 h-4" />
          Change Password
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold text-[#1C2434] dark:text-white">Two-factor authentication (2FA)</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Keep your account secure by enabling 2FA</p>
        </div>
        
        {/* Custom Toggle Switch */}
        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={data.two_factor_enabled}
              onChange={handleToggle}
              disabled={loading}
            />
            <div className={`block h-6 w-10 rounded-full transition ${data.two_factor_enabled ? 'bg-[#3C50E0]' : 'bg-gray-300'}`}></div>
            <div className={`absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-[#24303F] transition ${data.two_factor_enabled ? 'right-1' : 'left-1'}`}></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Security;
