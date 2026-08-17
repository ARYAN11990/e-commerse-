import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '../../services/api';
import { Form, Input, Toggle, useFormContext } from '../Form';

const AutoSubmitToggle = ({ onSave }) => {
  const { values, isSubmitting } = useFormContext();
  
  useEffect(() => {
    if (values.two_factor_enabled !== undefined && !isSubmitting) {
      onSave(values);
    }
  }, [values.two_factor_enabled]);
  
  return null;
};

const Security = ({ data, onUpdate2FA }) => {
  const [loading, setLoading] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  if (!data) return <div className="h-40 bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse mb-6" />;

  const handleUpdatePassword = async (values, { setApiSuccess }) => {
    await api.put('/profile/password', {
      current_password: values.current_password,
      new_password: values.new_password,
    });
    setApiSuccess("Password updated successfully!");
    setTimeout(() => setPasswordModalOpen(false), 1500);
  };

  const handleToggle2FA = async (values, { setApiError }) => {
    // Only update if changed
    if (values.two_factor_enabled === data.two_factor_enabled) return;
    
    setLoading(true);
    try {
      const resData = await api.put('/profile/security', { two_factor_enabled: values.two_factor_enabled });
      onUpdate2FA(resData.security);
    } catch (err) {
      setApiError(err.message || "Failed to update 2FA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-6">
      <h3 className="font-medium text-[#1C2434] dark:text-white text-lg mb-6">Security</h3>

      <div className="flex justify-between items-center pb-6 border-b border-stroke dark:border-[#2E3A47] mb-6">
        <div>
          <h4 className="text-sm font-bold text-[#1C2434] dark:text-white">Change Password</h4>
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Receive real-time notifications and team alerts.</p>
        </div>
        <button 
          onClick={() => setPasswordModalOpen(true)}
          className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
        >
          <Pencil className="w-4 h-4" />
          Change Password
        </button>
      </div>

      <Form 
        initialValues={{ two_factor_enabled: data.two_factor_enabled }} 
        onSubmit={handleToggle2FA}
        className="flex justify-between items-center"
      >
        <Toggle 
          name="two_factor_enabled" 
          label="Two-factor authentication (2FA)" 
          description="Keep your account secure by enabling 2FA" 
          disabled={loading}
          containerClassName="flex justify-between items-center w-full m-0"
        />
        <AutoSubmitToggle onSave={(v) => handleToggle2FA(v, { setApiError: () => {} })} />
      </Form>

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setPasswordModalOpen(false)}></div>
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white dark:bg-[#24303F] shadow-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-stroke dark:border-[#2E3A47]">
              <h3 className="text-xl font-bold text-[#1C2434] dark:text-white">Change Password</h3>
            </div>
            <Form 
              initialValues={{ current_password: '', new_password: '', confirm_password: '' }} 
              validationRules={{
                current_password: { required: 'Current password is required' },
                new_password: { required: 'New password is required', minLength: 6 },
                confirm_password: { required: 'Please confirm your new password', match: 'new_password', matchMessage: 'Passwords do not match' }
              }}
              onSubmit={handleUpdatePassword} 
              className="p-6 flex flex-col gap-4"
              resetOnSubmit={true}
            >
              <Input name="current_password" type="password" label="Current Password" containerClassName="" />
              <Input name="new_password" type="password" label="New Password" containerClassName="" />
              <Input name="confirm_password" type="password" label="Confirm Password" containerClassName="" />
              
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setPasswordModalOpen(false)} className="rounded border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">Cancel</button>
                <SubmitButton text="Save Password" loadingText="Saving..." />
              </div>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

const SubmitButton = ({ text, loadingText }) => {
  const { isSubmitting } = useFormContext();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="rounded bg-[#3C50E0] px-6 py-2 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
    >
      {isSubmitting ? loadingText : text}
    </button>
  );
};

export default Security;
