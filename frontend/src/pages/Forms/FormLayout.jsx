import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight as BreadcrumbRight, User, Mail, Lock, Calendar, ChevronDown, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const FormLayout = () => {
  const { showToast } = useToast();

  const handleSubmit = (e, formName) => {
    e.preventDefault();
    showToast(`${formName} submitted successfully!`, 'success');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Form Layout</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <BreadcrumbRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Form Layout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* Basic Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Basic Form</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'Basic Form')}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <input type="text" placeholder="Name" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <input type="email" placeholder="Email address" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>
                <div className="mb-4.5">
                  <input type="password" placeholder="Password" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
                <div className="mb-5.5">
                  <input type="password" placeholder="Confirm Password" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
                <button type="submit" className="flex w-full justify-center rounded bg-[#3C50E0] p-3 font-medium text-gray hover:bg-opacity-90 text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Example Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Example Form</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'Contact Form')}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">First Name</label>
                    <input type="text" placeholder="Enter first name" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Last Name</label>
                    <input type="text" placeholder="Enter last name" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Email</label>
                  <input type="email" placeholder="Enter email address" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Select Subject</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Option 1</option>
                      <option value="">Option 2</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Message</label>
                  <textarea rows="6" placeholder="Enter your message" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                </div>
                <button type="submit" className="flex w-full justify-center items-center gap-2 rounded bg-[#3C50E0] p-3 font-medium text-gray hover:bg-opacity-90 text-white">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* Example Form with Icons */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Example Form with Icons</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'Login Form')}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Username" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11 pr-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>
                <div className="mb-4.5">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" placeholder="Email address" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11 pr-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>
                <div className="mb-4.5">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" placeholder="Password" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11 pr-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>
                <div className="mb-5.5">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" placeholder="Confirm Password" required className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-11 pr-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <label className="flex cursor-pointer select-none items-center gap-2">
                    <input type="checkbox" className="sr-only" />
                    <div className="flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                      <span className="opacity-0">✓</span>
                    </div>
                    <span className="text-sm font-medium">Remember me</span>
                  </label>
                  <button type="submit" className="flex justify-center rounded bg-[#3C50E0] p-3 px-6 font-medium text-gray hover:bg-opacity-90 text-white w-full sm:w-auto">
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Large Example Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Example Form</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'Personal Info Form')}>
              <div className="p-6.5">
                <h4 className="mb-4 text-sm font-bold text-black dark:text-white uppercase tracking-wider">Personal Info</h4>
                
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">First Name</label>
                    <input type="text" placeholder="Enter first name" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Last Name</label>
                    <input type="text" placeholder="Enter last name" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>
                
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Gender</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Male</option>
                      <option value="">Female</option>
                      <option value="">Other</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </span>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Date of Birth</label>
                  <div className="relative">
                    <input type="date" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pl-5 pr-12 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Category</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Category 1</option>
                      <option value="">Category 2</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </span>
                  </div>
                </div>

                <h4 className="mb-4 text-sm font-bold text-black dark:text-white uppercase tracking-wider">Address</h4>
                
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Street</label>
                  <input type="text" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                </div>
                
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">City</label>
                    <input type="text" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">State</label>
                    <input type="text" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Post Code</label>
                    <input type="text" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Country</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">--Select Country--</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex items-center gap-6">
                  <label className="text-sm font-medium text-black dark:text-white">Membership:</label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="membership" className="w-4 h-4" defaultChecked />
                    <span className="text-sm">Free</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="membership" className="w-4 h-4" />
                    <span className="text-sm">Paid</span>
                  </label>
                </div>
                
                <div className="flex gap-4">
                  <button type="submit" className="flex justify-center rounded bg-[#3C50E0] p-3 px-6 font-medium text-gray hover:bg-opacity-90 text-white">
                    Save Changes
                  </button>
                  <button type="button" className="flex justify-center rounded border border-stroke p-3 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition">
                    Cancel
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default FormLayout;
