import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { useToast } from '../../context/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      showToast('Password reset link sent to your email', 'success');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#1C2434] dark:text-white mb-2">Forgot Your Password?</h2>
        <p className="text-[#64748B] dark:text-[#8A99AF] font-medium leading-relaxed">
          Enter the email address linked to your account, and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-[#1C2434] dark:text-white">
            Email<span className="text-[#DC3545]">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-lg border border-[#3C50E0] bg-[#3C50E0] py-3 px-4 text-white font-medium transition hover:bg-opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="mt-6 text-center">
          <p className="font-medium text-[#64748B] dark:text-[#8A99AF]">
            Wait, I remember my password...{' '}
            <Link to="/login" className="text-[#3C50E0] hover:underline">
              Click here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
