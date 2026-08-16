import { useState } from 'react';
import { LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const DangerZone = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutAll = () => {
    api.post('/auth/logout-all', {})
      .then(() => navigate('/'));
  };

  const handleDelete = () => {
    api.delete('/profile/account')
      .then(() => navigate('/'));
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-6">
      <h3 className="font-medium text-[#1C2434] dark:text-white text-lg mb-6">Danger Zone</h3>

      <div className="flex justify-between items-center pb-6 border-b border-stroke dark:border-[#2E3A47] mb-6">
        <div>
          <h4 className="text-sm font-bold text-[#1C2434] dark:text-white">Logout all devices</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Sign out from every active session.</p>
        </div>
        <button 
          onClick={handleLogoutAll}
          className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
        >
          <LogOut className="w-4 h-4" />
          Logout all devices
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold text-[#1C2434] dark:text-white">Delete account</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Sign out from every active session.</p> {/* Matches screenshot text mistake if desired, but let's keep it */}
        </div>
        <button 
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 rounded-md border border-red-500 text-red-500 px-4 py-2 text-sm font-medium hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete account
        </button>
      </div>

      {showConfirm && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowConfirm(false)}></div>
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white dark:bg-[#24303F] p-6 shadow-lg">
            <h3 className="text-xl font-bold text-[#1C2434] dark:text-white mb-4">Are you sure?</h3>
            <p className="text-[#64748B] dark:text-[#8A99AF] mb-6">This action cannot be undone. All your data will be permanently deleted.</p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DangerZone;
