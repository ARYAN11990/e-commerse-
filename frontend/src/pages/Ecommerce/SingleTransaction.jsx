import React from 'react';
import { ShoppingCart, CreditCard, Mail } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const SingleTransaction = () => {
  const { addToast } = useToast();

  const handleAction = (actionName) => {
    addToast('info', actionName, `Action ${actionName} triggered successfully.`);
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Transaction Details
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm hidden sm:flex">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Transaction Details</li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col gap-7.5">
        
        {/* Top Summary Bar Card */}
        <div className="flex flex-col gap-5 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <h3 className="font-bold text-black dark:text-white text-lg">Order ID : #34834</h3>
            <span className="inline-flex rounded-full bg-[#10B981]/10 px-3 py-1 text-sm font-medium text-[#10B981]">
              Completed
            </span>
            <div className="hidden sm:block h-6 w-px bg-stroke dark:bg-strokedark mx-1"></div>
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Due date: 25 August 2025</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleAction('View Receipt')} className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 transition">
              View Receipt
            </button>
            <button onClick={() => handleAction('Refund')} className="rounded border border-stroke py-2 px-6 font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
              Refund
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7.5 lg:grid-cols-12">
          
          {/* Left Column (Order Details) */}
          <div className="lg:col-span-8">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold text-black dark:text-white text-lg">
                  Order Details
                </h3>
              </div>
              
              <div className="p-6.5">
                {/* Table */}
                <div className="max-w-full overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] dark:bg-[#313D4A] text-left">
                        <th className="px-4 py-4 text-sm font-medium text-black dark:text-white rounded-l-md w-16">S. No.</th>
                        <th className="px-4 py-4 text-sm font-medium text-black dark:text-white">Products</th>
                        <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-center">Quantity</th>
                        <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-center">Unit Cost</th>
                        <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-center">Discount</th>
                        <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-right rounded-r-md">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-stroke dark:border-strokedark">
                        <td className="px-4 py-5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">1</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white">Macbook pro 13"</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">1</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">$1200</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">0%</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white text-right">$1200</td>
                      </tr>
                      <tr className="border-b border-stroke dark:border-strokedark">
                        <td className="px-4 py-5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">2</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white">Apple Watch Ultra</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">1</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">$300</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">50%</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white text-right">$150</td>
                      </tr>
                      <tr className="border-b border-stroke dark:border-strokedark">
                        <td className="px-4 py-5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">3</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white">iPhone 15 Pro Max</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">2</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">$800</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">0%</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white text-right">$1600</td>
                      </tr>
                      <tr className="border-b border-stroke dark:border-strokedark">
                        <td className="px-4 py-5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">4</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white">iPad Pro 3rd Gen</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">1</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">$900</td>
                        <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">0%</td>
                        <td className="px-4 py-5 text-sm font-medium text-black dark:text-white text-right">$900</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Order Summary */}
                <div className="flex justify-end mt-8">
                  <div className="w-full sm:w-1/2 lg:w-1/3 text-right sm:text-left">
                    <h4 className="mb-4 font-bold text-black dark:text-white">Order summary</h4>
                    <div className="flex justify-between py-2 border-b border-stroke dark:border-strokedark">
                      <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Sub Total</span>
                      <span className="text-sm font-bold text-black dark:text-white">$3,850</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-stroke dark:border-strokedark">
                      <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Vat (10%):</span>
                      <span className="text-sm font-bold text-black dark:text-white">$385</span>
                    </div>
                    <div className="flex justify-between py-4 mt-2">
                      <span className="font-bold text-black dark:text-white">Total</span>
                      <span className="font-bold text-black dark:text-white text-xl">$4,235</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column (Customer & History) */}
          <div className="lg:col-span-4 flex flex-col gap-7.5">
            
            {/* Customer Details Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold text-black dark:text-white text-lg">
                  Customer Details
                </h3>
              </div>
              <div className="p-6.5">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Name</span>
                    <span className="w-2/3 text-sm font-medium text-black dark:text-white">Musharof Chowdhury</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Email</span>
                    <span className="w-2/3 text-sm font-medium text-black dark:text-white">name@example.com</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Phone</span>
                    <span className="w-2/3 text-sm font-medium text-black dark:text-white">Mountain View, CA, 94040</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Phone</span>
                    <span className="w-2/3 text-sm font-medium text-black dark:text-white">+123 456 7890</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Country</span>
                    <span className="w-2/3 text-sm font-medium text-black dark:text-white">United States</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Address</span>
                    <span className="w-2/3 text-sm font-medium text-black dark:text-white">62 Miles Drive St, Newark, NJ<br/>07103, California.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold text-black dark:text-white text-lg">
                  Order History
                </h3>
              </div>
              <div className="p-6.5">
                
                {/* Timeline */}
                <div className="relative border-l border-stroke dark:border-strokedark ml-6 pb-6">
                  
                  {/* Step 1 */}
                  <div className="mb-10 relative">
                    <span className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white text-black dark:border-strokedark dark:bg-meta-4 dark:text-white">
                      <ShoppingCart className="h-5 w-5" />
                    </span>
                    <div className="ml-8 flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                      <div>
                        <h5 className="font-bold text-black dark:text-white">Checkout Started</h5>
                        <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">via tailadmin.com</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">12:54</p>
                        <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">12th Apr 28</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="mb-10 relative">
                    <span className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white text-black dark:border-strokedark dark:bg-meta-4 dark:text-white">
                      <CreditCard className="h-5 w-5" />
                    </span>
                    <div className="ml-8 flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                      <div>
                        <h5 className="font-bold text-black dark:text-white">Purchased</h5>
                        <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">for US$4,235 via PayPal</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">12:58</p>
                        <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">12th Apr 28</p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white text-black dark:border-strokedark dark:bg-meta-4 dark:text-white">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div className="ml-8 flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                      <div>
                        <h5 className="font-bold text-black dark:text-white">Receipt Email Sent</h5>
                        <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Receipt #1734535</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">12:58</p>
                        <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">12th Apr 28</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex items-center justify-start gap-3">
                  <button onClick={() => handleAction('Resend')} className="rounded border border-stroke py-1.5 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
                    Resend
                  </button>
                  <button onClick={() => handleAction('Forward')} className="rounded border border-stroke py-1.5 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
                    Forward
                  </button>
                  <button onClick={() => handleAction('Preview')} className="rounded border border-stroke py-1.5 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
                    Preview
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleTransaction;
