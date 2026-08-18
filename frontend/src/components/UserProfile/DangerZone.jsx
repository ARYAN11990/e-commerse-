import React, { useState } from 'react';
import { LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import ConfirmationModal from '../Modal/ConfirmationModal';

const DangerZone = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [modalType, setModalType] = useState(null); // 'logout' or 'delete'
  const [loading, setLoading] = useState(false);

  const handleLogoutAll = async () => {
    setLoading(true);
    try {
      await api.post('/profile/logout-all', {});
      showToast('Successfully logged out of all devices', 'success');
      setModalType(null);
      // Wait a moment then navigate to login or home
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      showToast(err.message || 'Failed to logout devices', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete('/profile/account');
      showToast('Account deleted successfully', 'success');
      setModalType(null);
      // Navigate to login or home
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      showToast(err.message || 'Failed to delete account', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-6">
      <h3 className="font-medium text-[#1C2434] dark:text-white text-lg mb-6 text-danger">Danger Zone</h3>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-stroke dark:border-[#2E3A47] mb-6 gap-4">
        <div>
          <h4 className="font-bold text-[#1C2434] dark:text-white mb-1">Logout all devices</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Sign out from every active session across all browsers and devices.</p>
        </div>
        <button 
          onClick={() => setModalType('logout')}
          className="flex items-center justify-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] whitespace-nowrap"
        >
          <LogOut className="w-4 h-4" />
          Logout all devices
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h4 className="font-bold text-[#1C2434] dark:text-white mb-1">Delete account</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Deleting your account is permanent and cannot be undone.</p>
        </div>
        <button 
          onClick={() => setModalType('delete')}
          className="flex items-center justify-center gap-2 rounded-md border border-danger text-danger px-4 py-2 text-sm font-medium hover:bg-danger/10 whitespace-nowrap transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete account
        </button>
      </div>

      <ConfirmationModal 
        isOpen={modalType === 'logout'}
        onClose={() => setModalType(null)}
        onConfirm={handleLogoutAll}
        title="Logout All Devices?"
        description="Are you sure you want to sign out from every active session? You will be logged out of this device as well."
        confirmText="Logout All"
        confirmStyle="primary"
        loading={loading}
      />

      <ConfirmationModal 
        isOpen={modalType === 'delete'}
        onClose={() => setModalType(null)}
        onConfirm={handleDelete}
        title="Delete Account?"
        description="This action cannot be undone. All your personal data, settings, and activity will be permanently deleted from our servers."
        confirmText="Yes, Delete My Account"
        confirmStyle="danger"
        requireTyping={true}
        loading={loading}
      />
    </div>
  );
};

export default DangerZone;
