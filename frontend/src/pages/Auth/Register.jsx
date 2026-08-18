import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import AuthLayout from '../../components/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await register({
        username: email,
        email: email,
        password: password,
        full_name: `${firstName} ${lastName}`
      });
      showToast('Registered successfully', 'success');
      navigate('/login');
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setIsSubmitting(true);
    showToast(`Redirecting to ${provider} for sign up...`, 'success');
    
    // Simulate OAuth redirect and successful callback for registration
    setTimeout(async () => {
      try {
        // Authenticate as default mock user to simulate "account created & logged in"
        await login('ARYAN PARMAR', 'admin123');
        showToast(`Successfully registered and logged in with ${provider}`, 'success');
        navigate('/');
      } catch (err) {
        showToast(`OAuth Error with ${provider}: ${err.message}`, 'error');
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1C2434] dark:text-white mb-2">Sign Up</h2>
        <p className="text-[#64748B] dark:text-[#8A99AF] font-medium">Enter your email and password to sign up!</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <button 
          onClick={() => handleSocialRegister('Google')}
          disabled={isSubmitting}
          type="button"
          className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-3 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 transition disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_191_13499_register)">
              <path d="M19.6456 10.2222C19.6456 9.51111 19.5818 8.81852 19.4649 8.14074H10.0531V12.0741H15.4316C15.2085 13.3444 14.4754 14.437 13.4131 15.1481V17.6963H16.6433C18.5342 15.9593 19.6456 13.3333 19.6456 10.2222Z" fill="#4285F4" />
              <path d="M10.0531 19.9999C12.7523 19.9999 15.0152 19.1036 16.6539 17.6962L13.4237 15.1481C12.5312 15.7444 11.3934 16.0888 10.0531 16.0888C7.45827 16.0888 5.25707 14.337 4.46011 11.9888H1.12134V14.5777C2.76003 17.8296 6.13628 19.9999 10.0531 19.9999Z" fill="#34A853" />
              <path d="M4.46011 11.9888C4.25827 11.3888 4.14134 10.7444 4.14134 10.0888C4.14134 9.4333 4.25827 8.78886 4.46011 8.18886V5.59998H1.12134C0.441336 6.95553 0.0482613 8.48886 0.0482613 10.0888C0.0482613 11.6888 0.441336 13.2222 1.12134 14.5777L4.46011 11.9888Z" fill="#FBBC05" />
              <path d="M10.0531 4.08886C11.5195 4.08886 12.8369 4.59257 13.8783 5.58145L16.7176 2.74219C15.0046 1.14441 12.7416 0.177734 10.0531 0.177734C6.13628 0.177734 2.76003 2.3481 1.12134 5.59998L4.46011 8.18886C5.25707 5.84074 7.45827 4.08886 10.0531 4.08886Z" fill="#EB4335" />
            </g>
            <defs>
              <clipPath id="clip0_191_13499_register">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="font-medium text-[#1C2434] dark:text-white">Sign up with Google</span>
        </button>
        <button 
          onClick={() => handleSocialRegister('X')}
          disabled={isSubmitting}
          type="button"
          className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-3 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 transition disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9566 8.52843L19.2619 0H17.5312L11.1963 7.39169L6.13639 0H0.289062L7.9547 11.157L0.289062 20H2.01981L8.71886 12.1813L14.0622 20H19.9095L11.9562 8.52843H11.9566ZM9.59604 11.1578L8.82025 10.048L2.64166 1.22271H5.3005L10.3015 8.37397L11.0773 9.48382L17.532 18.7161H14.8732L9.59604 11.1582V11.1578Z" fill="currentColor" className="text-black dark:text-white" />
          </svg>
          <span className="font-medium text-[#1C2434] dark:text-white">Sign up with X</span>
        </button>
      </div>

      <div className="relative mb-8 text-center">
        <span className="relative z-10 bg-white px-4 text-sm font-medium text-[#64748B] dark:bg-boxdark dark:text-[#8A99AF]">Or</span>
        <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 border-t border-stroke dark:border-strokedark"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col sm:flex-row gap-5">
          <div className="w-full sm:w-1/2">
            <label className="mb-2.5 block font-medium text-[#1C2434] dark:text-white">
              First Name<span className="text-[#DC3545]">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="mb-2.5 block font-medium text-[#1C2434] dark:text-white">
              Last Name<span className="text-[#DC3545]">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2.5 block font-medium text-[#1C2434] dark:text-white">
            Email<span className="text-[#DC3545]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-[#1C2434] dark:text-white">
            Password<span className="text-[#DC3545]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#3C50E0]"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex cursor-pointer items-start gap-3">
            <div className="relative flex items-center pt-1">
              <input type="checkbox" className="peer sr-only" required />
              <div className="h-5 w-5 rounded border border-stroke bg-gray peer-checked:border-primary peer-checked:bg-primary dark:border-strokedark dark:bg-meta-4"></div>
              <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L3.99998 4.5858L1.70711 2.29289C1.31658 1.90237 0.683417 1.90237 0.292893 2.29289C-0.0976311 2.68342 -0.0976311 3.31658 0.292893 3.70711L3.29289 6.70711C3.68342 7.09763 4.31658 7.09763 4.70711 6.70711L9.70711 1.70711Z" fill="white" />
              </svg>
            </div>
            <span className="font-medium text-[#64748B] dark:text-[#8A99AF] leading-relaxed">
              By creating an account means you agree to the <span className="text-[#1C2434] dark:text-white">Terms and Conditions</span>, and our <span className="text-[#1C2434] dark:text-white">Privacy Policy</span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-lg border border-[#3C50E0] bg-[#3C50E0] py-3 px-4 text-white font-medium transition hover:bg-opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="mt-6 text-center">
          <p className="font-medium text-[#64748B] dark:text-[#8A99AF]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3C50E0] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
