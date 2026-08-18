import React, { useState } from 'react';
import { LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, description, confirmText, confirmStyle = 'danger', requireTyping = false, loading = false }) => {
  const [typedValue, setTypedValue] = useState('');
  
  if (!isOpen) return null;

  const isConfirmDisabled = requireTyping ? typedValue !== 'DELETE' : false;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}></div>
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white dark:bg-[#24303F] p-6 shadow-lg">
        <h3 className="text-xl font-bold text-[#1C2434] dark:text-white mb-4">{title}</h3>
        <p className="text-[#64748B] dark:text-[#8A99AF] mb-6 leading-relaxed">{description}</p>
        
        {requireTyping && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1C2434] dark:text-white mb-2">
              Type <strong className="text-danger">DELETE</strong> to confirm:
            </label>
            <input 
              type="text" 
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 outline-none focus:border-danger dark:border-[#2E3A47] dark:focus:border-danger text-black dark:text-white"
            />
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isConfirmDisabled || loading}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50 ${
              confirmStyle === 'danger' ? 'bg-danger hover:bg-opacity-90' : 'bg-primary hover:bg-opacity-90'
            }`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

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
