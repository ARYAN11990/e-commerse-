import React from 'react';
import { Download, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SingleTransaction = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/ecommerce/transactions')}
            className="p-1 text-[#64748B] hover:text-[#3C50E0]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Transaction Details
          </h2>
        </div>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li><a className="font-medium hover:text-[#3C50E0]" href="/ecommerce/transactions">Transactions /</a></li>
            <li className="font-medium text-[#3C50E0]">TRX-98213</li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {/* Main Details */}
        <div className="lg:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
              <h3 className="font-medium text-black dark:text-white">
                General Information
              </h3>
              <span className="inline-flex rounded-md bg-[#10B981]/10 px-3 py-1 text-sm font-medium text-[#10B981] gap-1.5 items-center">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            </div>
            
            <div className="p-6.5">
              <div className="mb-8 flex justify-center">
                <div className="text-center">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Amount Processed</span>
                  <h2 className="text-4xl font-bold text-black dark:text-white mt-2">$1,450.00</h2>
                  <p className="text-sm mt-1">Dec 15, 2027, 14:30 EST</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stroke dark:border-strokedark">
                <div>
                  <span className="block text-sm font-medium mb-1">Transaction ID</span>
                  <p className="text-black dark:text-white font-medium">TRX-98213</p>
                </div>
                <div>
                  <span className="block text-sm font-medium mb-1">Payment Method</span>
                  <p className="text-black dark:text-white font-medium">Credit Card (Visa ending in 1234)</p>
                </div>
                <div>
                  <span className="block text-sm font-medium mb-1">Reference ID</span>
                  <p className="text-black dark:text-white font-medium">REF-A7B8C9D0</p>
                </div>
                <div>
                  <span className="block text-sm font-medium mb-1">Processing Fee</span>
                  <p className="text-black dark:text-white font-medium">$43.50 (3%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Customer Details
              </h3>
            </div>
            <div className="p-6.5">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-primary">
                  AC
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white">Acme Corp</h4>
                  <p className="text-sm">billing@acme.com</p>
                </div>
              </div>
              
              <div className="border-t border-stroke pt-4 dark:border-strokedark">
                <span className="block text-sm font-medium mb-2">Billing Address</span>
                <p className="text-sm text-black dark:text-white">
                  123 Business Avenue<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-stroke dark:border-strokedark py-2.5 font-medium hover:bg-gray-50 dark:hover:bg-meta-4 transition">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTransaction;
