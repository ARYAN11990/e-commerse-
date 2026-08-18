import React from 'react';
import { CreditCard, Edit, Plus, Trash2, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Billing = () => {
  const { addToast } = useToast();

  const handleUpdatePlan = () => {
    addToast('info', 'Update Plan', 'Opening plan update dialog...');
  };

  const handleCancelPlan = () => {
    addToast('warning', 'Cancel Subscription', 'Are you sure you want to cancel?');
  };

  const handleAddPayment = () => {
    addToast('info', 'Add Payment Method', 'Opening secure payment form...');
  };

  const handleEditPayment = () => {
    addToast('info', 'Edit Payment Method', 'Editing payment details...');
  };

  const handleDeletePayment = () => {
    addToast('error', 'Delete Payment Method', 'Payment method removed successfully.');
  };

  const handleDownloadAll = () => {
    addToast('success', 'Download Started', 'Downloading all billing history...');
  };

  const handleDownloadInvoice = (invoiceId) => {
    addToast('success', 'Download Started', `Downloading ${invoiceId}...`);
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Billing
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm hidden sm:flex">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Billing</li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col gap-9">
        {/* Current Plan */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Current Plan
            </h3>
          </div>
          <div className="p-6.5">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {/* Left Column */}
              <div className="lg:w-1/2">
                <h4 className="mb-1 text-title-sm font-bold text-black dark:text-white">Basic Plan</h4>
                <p className="mb-6 text-sm text-[#64748B] dark:text-[#8A99AF]">Our most popular plan for small teams.</p>
                <div className="flex items-end gap-1">
                  <h2 className="text-3xl font-bold text-black dark:text-white">$20</h2>
                  <span className="mb-1 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">/ month</span>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="lg:w-1/2">
                <div className="mb-6 border-b border-stroke pb-6 dark:border-strokedark">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-black dark:text-white">Teams</span>
                    <span className="text-sm font-medium text-black dark:text-white">12 / 20</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-stroke dark:bg-strokedark">
                    <div className="h-2.5 rounded-full bg-primary" style={{ width: '60%' }}></div>
                  </div>
                  <p className="mt-2 text-sm text-[#64748B] dark:text-[#8A99AF]">You are currently using 60% of your available team member slots.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={handleUpdatePlan} className="rounded border border-stroke py-2 px-6 font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
                    Update Plan
                  </button>
                  <button onClick={handleCancelPlan} className="rounded border border-[#EF4444] text-[#EF4444] py-2 px-6 font-medium hover:bg-[#EF4444] hover:text-white transition">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">
              Payment Methods
            </h3>
            <button onClick={handleAddPayment} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              <Plus className="w-4 h-4" />
              Add Payment Method
            </button>
          </div>
          <div className="p-6.5">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between rounded-md border border-stroke p-5 dark:border-strokedark">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="flex h-14 w-20 items-center justify-center rounded border border-stroke bg-gray dark:border-strokedark dark:bg-meta-4">
                  <CreditCard className="text-black dark:text-white w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h5 className="font-medium text-black dark:text-white">Visa ending in 1234</h5>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Primary</span>
                  </div>
                  <p className="mt-1 text-sm text-[#64748B] dark:text-[#8A99AF]">Expires 12/28</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleEditPayment} className="rounded border border-stroke py-1.5 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">Edit</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md border border-stroke p-5 dark:border-strokedark">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="flex h-14 w-20 items-center justify-center rounded border border-stroke bg-gray dark:border-strokedark dark:bg-meta-4">
                  <CreditCard className="text-[#64748B] dark:text-[#8A99AF] w-8 h-8" />
                </div>
                <div>
                  <h5 className="font-medium text-black dark:text-white">Mastercard ending in 5678</h5>
                  <p className="mt-1 text-sm text-[#64748B] dark:text-[#8A99AF]">Expires 09/26</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleEditPayment} className="rounded border border-stroke py-1.5 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">Edit</button>
                <button onClick={handleDeletePayment} className="text-[#EF4444] hover:text-[#B91C1C] transition"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">
              Billing History
            </h3>
            <button onClick={handleDownloadAll} className="flex items-center gap-2 rounded border border-stroke py-1.5 px-3 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#F8FAFC] text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-6">Date</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Invoice</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Amount</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Status</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white text-right xl:pr-6">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4/50 transition">
                  <td className="py-5 px-4 xl:pl-6 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Dec 1, 2027</td>
                  <td className="py-5 px-4 text-sm font-medium text-black dark:text-white">Basic Plan - Dec 2027</td>
                  <td className="py-5 px-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">$20.00</td>
                  <td className="py-5 px-4">
                    <span className="inline-flex rounded-md bg-[#10B981]/10 py-1 px-3 text-xs font-medium text-[#10B981]">Paid</span>
                  </td>
                  <td className="py-5 px-4 text-right xl:pr-6">
                    <button onClick={() => handleDownloadInvoice('Dec 2027')} className="text-primary hover:underline text-sm font-medium">Download</button>
                  </td>
                </tr>
                <tr className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4/50 transition">
                  <td className="py-5 px-4 xl:pl-6 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Nov 1, 2027</td>
                  <td className="py-5 px-4 text-sm font-medium text-black dark:text-white">Basic Plan - Nov 2027</td>
                  <td className="py-5 px-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">$20.00</td>
                  <td className="py-5 px-4">
                    <span className="inline-flex rounded-md bg-[#10B981]/10 py-1 px-3 text-xs font-medium text-[#10B981]">Paid</span>
                  </td>
                  <td className="py-5 px-4 text-right xl:pr-6">
                    <button onClick={() => handleDownloadInvoice('Nov 2027')} className="text-primary hover:underline text-sm font-medium">Download</button>
                  </td>
                </tr>
                <tr className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4/50 transition">
                  <td className="py-5 px-4 xl:pl-6 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Oct 1, 2027</td>
                  <td className="py-5 px-4 text-sm font-medium text-black dark:text-white">Basic Plan - Oct 2027</td>
                  <td className="py-5 px-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">$20.00</td>
                  <td className="py-5 px-4">
                    <span className="inline-flex rounded-md bg-[#10B981]/10 py-1 px-3 text-xs font-medium text-[#10B981]">Paid</span>
                  </td>
                  <td className="py-5 px-4 text-right xl:pr-6">
                    <button onClick={() => handleDownloadInvoice('Oct 2027')} className="text-primary hover:underline text-sm font-medium">Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
