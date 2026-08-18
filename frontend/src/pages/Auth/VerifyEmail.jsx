import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import AuthLayout from '../../components/AuthLayout';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get('token');
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [status, setStatus] = useState(urlToken ? 'verifying' : 'idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Handle URL token verification
  useEffect(() => {
    if (!urlToken) return;

    const verifyToken = async () => {
      try {
        await api.post('/auth/verify-email', { token: urlToken });
        setStatus('success');
        showToast('Email verified successfully', 'success');
        navigate('/');
      } catch (err) {
        setStatus('error');
        showToast(err.message || 'Verification failed. The token may be expired or invalid.', 'error');
      }
    };

    verifyToken();
  }, [urlToken, navigate, showToast]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newCode = [...code];
    // Allow pasting full code
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < pastedCode.length; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);
      const focusIndex = Math.min(pastedCode.length, 5);
      inputRefs.current[focusIndex].focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = code.join('');
    if (token.length < 6) {
      showToast('Please enter the 6-digit code', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/auth/verify-email', { token });
      showToast('Account verified successfully', 'success');
      navigate('/');
    } catch (err) {
      showToast(err.message || 'Verification failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    setIsResending(true);
    // Simulate resending the code
    setTimeout(() => {
      showToast('Verification code resent to your mobile number!', 'success');
      setIsResending(false);
    }, 1000);
  };

  // If verifying from URL, we can show a simple loading state within the layout
  if (status === 'verifying') {
    return (
      <AuthLayout>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white mb-4">Verifying...</h2>
          <p className="text-[#64748B] dark:text-[#8A99AF]">Please wait while we verify your account.</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#1C2434] dark:text-white mb-2">Two Step Verification</h2>
        <p className="text-[#64748B] dark:text-[#8A99AF] font-medium leading-relaxed">
          A verification code has been sent to your mobile. Please enter it in the field below.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="mb-4 block font-medium text-[#1C2434] dark:text-white">
            Type your 6 digits security code
          </label>
          <div className="flex gap-2 sm:gap-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full flex-1 rounded-lg border border-stroke bg-transparent py-3 text-center text-xl font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-lg border border-[#3C50E0] bg-[#3C50E0] py-3 px-4 text-white font-medium transition hover:bg-opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Verifying..." : "Verify My Account"}
        </button>

        <div className="mt-6 text-left">
          <p className="font-medium text-[#64748B] dark:text-[#8A99AF]">
            Didn't get the code?{' '}
            <button 
              type="button" 
              onClick={handleResend}
              disabled={isResending}
              className="text-[#3C50E0] hover:underline cursor-pointer bg-transparent border-none p-0 disabled:opacity-50"
            >
              {isResending ? 'Resending...' : 'Resend'}
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyEmail;
