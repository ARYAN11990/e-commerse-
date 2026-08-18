import React, { useState, useEffect } from 'react';
import { Pencil, Smartphone, Shield, LogOut, Check, X } from 'lucide-react';
import { api } from '../../services/api';
import { Form, Input, Toggle, useFormContext } from '../Form';
import { useToast } from '../../context/ToastContext';

const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    if (!password) {
      setStrength(0);
      return;
    }
    if (password.length > 8) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    setStrength(score);
  }, [password]);

  const getStrengthLabel = () => {
    if (strength === 0) return '';
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-danger';
    if (strength <= 2) return 'bg-warning';
    if (strength === 3) return 'bg-primary';
    return 'bg-success';
  };

  if (!password) return null;

  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">Password Strength</span>
        <span className={`text-xs font-semibold ${
          strength <= 1 ? 'text-danger' : 
          strength <= 2 ? 'text-warning' : 
          strength === 3 ? 'text-primary' : 'text-success'
        }`}>{getStrengthLabel()}</span>
      </div>
      <div className="w-full h-1.5 bg-gray dark:bg-meta-4 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
      </div>
      <ul className="mt-2 text-xs text-[#64748B] dark:text-[#8A99AF] space-y-1">
        <li className="flex items-center gap-1"><span className={password.length > 8 ? "text-success" : ""}>✓</span> 8+ characters</li>
        <li className="flex items-center gap-1"><span className={/[A-Z]/.test(password) ? "text-success" : ""}>✓</span> Uppercase letter</li>
        <li className="flex items-center gap-1"><span className={/\d/.test(password) ? "text-success" : ""}>✓</span> Number</li>
        <li className="flex items-center gap-1"><span className={/[^a-zA-Z0-9]/.test(password) ? "text-success" : ""}>✓</span> Special character</li>
      </ul>
    </div>
  );
};

const CustomPasswordForm = ({ handleUpdatePassword, setPasswordModalOpen }) => {
  const { values, isSubmitting } = useFormContext();
  
  return (
    <div className="p-6 flex flex-col gap-2">
      <Input name="current_password" type="password" label="Current Password" containerClassName="mb-2" />
      <Input name="new_password" type="password" label="New Password" containerClassName="mb-1" />
      
      <PasswordStrength password={values.new_password} />
      
      <Input name="confirm_password" type="password" label="Confirm Password" containerClassName="mb-2" />
      
      <div className="flex justify-end gap-4 mt-6">
        <button type="button" onClick={() => setPasswordModalOpen(false)} className="rounded border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="rounded bg-[#3C50E0] px-6 py-2 font-medium text-white hover:bg-opacity-90 disabled:opacity-50">
          {isSubmitting ? "Saving..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

const Security = ({ data, sessions = [], onUpdate2FA, onUpdateSessions }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  
  if (!data) return <div className="h-40 bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse mb-6" />;

  const handleUpdatePassword = async (values, { setApiSuccess }) => {
    await api.put('/profile/password', {
      current_password: values.current_password,
      new_password: values.new_password,
    });
    setApiSuccess("Password updated successfully!");
    showToast("Password updated successfully!", "success");
    setTimeout(() => setPasswordModalOpen(false), 1500);
  };

  const handleToggle2FAClick = () => {
    if (data.two_factor_enabled) {
      // Direct disable
      disable2FA();
    } else {
      // Open setup modal
      setTwoFactorModalOpen(true);
      setOtp('');
      setOtpError('');
    }
  };

  const disable2FA = async () => {
    setLoading(true);
    try {
      const resData = await api.put('/profile/security', { two_factor_enabled: false });
      onUpdate2FA(resData.security);
      showToast("Two-factor authentication disabled", "success");
    } catch (err) {
      showToast(err.message || "Failed to disable 2FA", "error");
    } finally {
      setLoading(false);
    }
  };

  const enable2FA = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    setOtpError('');
    try {
      const resData = await api.put('/profile/security', { two_factor_enabled: true });
      onUpdate2FA(resData.security);
      showToast("Two-factor authentication enabled successfully", "success");
      setTwoFactorModalOpen(false);
    } catch (err) {
      setOtpError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutSession = async (sessionId) => {
    try {
      const res = await api.delete(`/profile/sessions/${sessionId}`);
      onUpdateSessions(res.sessions);
      showToast("Session logged out successfully", "success");
    } catch (err) {
      showToast(err.message || "Failed to logout session", "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default">
        <h3 className="font-medium text-[#1C2434] dark:text-white text-lg mb-6">Security</h3>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-stroke dark:border-[#2E3A47] mb-6 gap-4">
          <div>
            <h4 className="font-bold text-[#1C2434] dark:text-white mb-1">Change Password</h4>
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Ensure your account is using a long, random password to stay secure.</p>
          </div>
          <button 
            onClick={() => setPasswordModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] whitespace-nowrap"
          >
            <Pencil className="w-4 h-4" /> Change Password
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h4 className="font-bold text-[#1C2434] dark:text-white mb-1 flex items-center gap-2">
              Two-Factor Authentication (2FA)
              {data.two_factor_enabled ? (
                <span className="bg-success/10 text-success text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                  <Check className="w-3 h-3" /> Enabled
                </span>
              ) : (
                <span className="bg-gray text-[#64748B] dark:bg-meta-4 dark:text-[#8A99AF] text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                  <X className="w-3 h-3" /> Disabled
                </span>
              )}
            </h4>
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Add additional security to your account using two factor authentication.</p>
          </div>
          
          <button 
            onClick={handleToggle2FAClick}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
              data.two_factor_enabled 
                ? 'border border-stroke dark:border-[#2E3A47] text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]' 
                : 'bg-primary text-white hover:bg-opacity-90'
            }`}
          >
            <Shield className="w-4 h-4" />
            {data.two_factor_enabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default">
        <h3 className="font-medium text-[#1C2434] dark:text-white text-lg mb-6">Active Sessions</h3>
        
        <div className="flex flex-col gap-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-stroke dark:border-[#2E3A47] rounded-lg gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray dark:bg-meta-4 flex items-center justify-center text-[#64748B] dark:text-[#8A99AF]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-[#1C2434] dark:text-white text-sm flex items-center gap-2">
                    {session.device} · {session.os}
                    {session.current && <span className="bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 rounded uppercase">Current Session</span>}
                  </h5>
                  <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mt-1">{session.ip} · {session.location}</p>
                  <p className="text-xs text-[#64748B] dark:text-[#8A99AF] mt-0.5">{session.last_active}</p>
                </div>
              </div>
              
              {!session.current && (
                <button 
                  onClick={() => handleLogoutSession(session.id)}
                  className="text-sm font-medium text-danger hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> Logout Device
                </button>
              )}
            </div>
          ))}
          {sessions.length === 0 && (
            <p className="text-sm text-[#64748B] dark:text-[#8A99AF] text-center py-4">No active sessions found.</p>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setPasswordModalOpen(false)}></div>
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white dark:bg-[#24303F] shadow-lg overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stroke dark:border-[#2E3A47]">
              <h3 className="text-xl font-bold text-[#1C2434] dark:text-white">Change Password</h3>
            </div>
            <Form 
              initialValues={{ current_password: '', new_password: '', confirm_password: '' }} 
              validationRules={{
                current_password: { required: 'Current password is required' },
                new_password: { required: 'New password is required', minLength: 8 },
                confirm_password: { required: 'Please confirm your new password', match: 'new_password', matchMessage: 'Passwords do not match' }
              }}
              onSubmit={handleUpdatePassword} 
              resetOnSubmit={true}
            >
              <CustomPasswordForm setPasswordModalOpen={setPasswordModalOpen} />
            </Form>
          </div>
        </>
      )}

      {/* 2FA Setup Modal */}
      {twoFactorModalOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setTwoFactorModalOpen(false)}></div>
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white dark:bg-[#24303F] shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#1C2434] dark:text-white mb-4">Setup Two-Factor Authentication</h3>
            <p className="text-sm text-[#64748B] dark:text-[#8A99AF] mb-6 leading-relaxed">
              Scan the QR code below with your authenticator app, then enter the 6-digit code to verify and enable 2FA.
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 bg-white p-2 rounded-lg border border-stroke dark:border-[#2E3A47]">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/TailAdmin:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=TailAdmin`} alt="QR Code" className="w-full h-full" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="mb-2.5 block text-sm font-medium text-black dark:text-white text-center">Verification Code</label>
              <input 
                type="text" 
                maxLength="6"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full text-center text-2xl tracking-[0.5em] font-mono rounded-lg border border-stroke bg-transparent py-4 outline-none focus:border-primary dark:border-[#2E3A47] dark:focus:border-primary text-black dark:text-white"
              />
              {otpError && <p className="mt-2 text-sm text-danger text-center">{otpError}</p>}
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setTwoFactorModalOpen(false)} className="rounded border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]">Cancel</button>
              <button onClick={enable2FA} disabled={loading} className="rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify & Enable'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Security;
