import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Moon, Sun } from 'lucide-react';

const AuthLayout = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-boxdark font-inter overflow-hidden relative">
      {/* Left Side */}
      <div className="w-full xl:w-1/2 flex flex-col p-4 sm:p-12 xl:p-16 relative z-10">
        <div className="mb-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#3C50E0] dark:text-[#8A99AF] dark:hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to dashboard
          </Link>
        </div>
        
        <div className="w-full max-w-[480px] mx-auto my-auto py-10">
          {children}
        </div>
        
        <div className="mt-auto" /> {/* Spacer */}
      </div>

      {/* Right Side */}
      <div className="hidden xl:flex w-1/2 bg-[#1C2434] relative flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background Grid Pattern (Simplified CSS approximation) */}
        <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(#3C50E0 1px, transparent 1px), linear-gradient(90deg, #3C50E0 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute right-0 top-0 opacity-10 w-96 h-96 bg-primary blur-[100px] rounded-full"></div>
        <div className="absolute left-0 bottom-0 opacity-10 w-96 h-96 bg-primary blur-[100px] rounded-full"></div>

        <div className="relative z-10 text-center">
          <Link className="mb-5 inline-block" to="/">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-12 h-12 bg-[#3C50E0] rounded-lg text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="10" width="4" height="8" rx="2" fill="white"/>
                  <rect x="10" y="6" width="4" height="12" rx="2" fill="white"/>
                  <rect x="17" y="10" width="4" height="8" rx="2" fill="white"/>
                </svg>
              </span>
              <span className="text-4xl font-bold text-white tracking-wide">TailAdmin</span>
            </div>
          </Link>
          <p className="text-[#8A99AF] mt-5 text-lg">
            Free and Open-Source Tailwind CSS Admin<br />Dashboard Template
          </p>
        </div>
        
      </div>

      {/* Floating Dark Mode Toggle */}
      <button 
        aria-label="Toggle Dark Mode"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="absolute bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#3C50E0] text-white shadow-lg transition-transform hover:scale-105"
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default AuthLayout;
