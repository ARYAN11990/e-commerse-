import React from 'react';
import { CreditCard, Edit, Plus, Trash2 } from 'lucide-react';

const Billing = () => {
  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Billing
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Billing</li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Payment Methods */}
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
              <h3 className="font-medium text-black dark:text-white">
                Payment Methods
              </h3>
              <button className="text-sm text-primary hover:underline">Add New</button>
            </div>
            <div className="p-6.5">
              <div className="mb-4 flex items-center justify-between rounded-md border border-stroke p-4 dark:border-strokedark">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-16 items-center justify-center rounded border border-stroke bg-gray dark:border-strokedark dark:bg-meta-4">
                    <CreditCard className="text-black dark:text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-black dark:text-white">Visa ending in 1234</h5>
                    <p className="text-sm">Expires 12/28</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Primary</span>
                  <button className="text-gray-500 hover:text-black dark:hover:text-white"><Edit className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border border-stroke p-4 dark:border-strokedark">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-16 items-center justify-center rounded border border-stroke bg-gray dark:border-strokedark dark:bg-meta-4">
                    <CreditCard className="text-black dark:text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-black dark:text-white">Mastercard ending in 5678</h5>
                    <p className="text-sm">Expires 09/26</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-gray-500 hover:text-black dark:hover:text-white"><Edit className="w-4 h-4" /></button>
                  <button className="text-gray-500 hover:text-danger"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Current Plan
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-title-sm font-bold text-black dark:text-white">TailAdmin Pro</h4>
                  <span className="text-title-sm font-bold text-primary">$59/mo</span>
                </div>
                <p className="text-sm">Your next billing date is Dec 15, 2027.</p>
              </div>

              <div className="mb-6 border-t border-stroke pt-4 dark:border-strokedark">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Team Members</span>
                  <span className="text-sm font-medium">12 / 20</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-stroke dark:bg-strokedark">
                  <div className="h-2.5 rounded-full bg-primary" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex-1 rounded-sm border border-primary text-primary py-2 px-4 text-center font-medium hover:bg-primary hover:text-white transition">
                  Change Plan
                </button>
                <button className="flex-1 rounded-sm border border-stroke py-2 px-4 text-center font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
                  Cancel Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
