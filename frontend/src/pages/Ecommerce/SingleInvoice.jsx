import React, { useState } from 'react';
import { Printer, CreditCard, X, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// Generic Checkout Modal Component
const CheckoutModal = ({ isOpen, onClose, totalAmount, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess();
        onClose();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-default dark:bg-boxdark">
        <div className="mb-4 flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
          <h3 className="text-xl font-bold text-black dark:text-white">Secure Checkout</h3>
          {!isProcessing && !isSuccess && (
            <button onClick={onClose} className="text-gray-500 hover:text-black dark:hover:text-white transition">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-[#10B981] mb-4" />
            <h4 className="text-xl font-bold text-black dark:text-white">Payment Successful!</h4>
            <p className="text-sm text-[#64748B] dark:text-[#8A99AF] mt-2">Your invoice has been paid.</p>
          </div>
        ) : isProcessing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent mb-4"></div>
            <h4 className="text-lg font-bold text-black dark:text-white">Processing Payment...</h4>
            <p className="text-sm text-[#64748B] dark:text-[#8A99AF] mt-2">Please do not close this window.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="rounded border border-stroke p-4 dark:border-strokedark bg-gray-50 dark:bg-meta-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Amount Due</span>
                <span className="text-xl font-bold text-black dark:text-white">{totalAmount}</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Select Payment Method</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center justify-between rounded border border-primary bg-primary/5 p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-primary focus:ring-primary" />
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-black dark:text-white">Visa ending in 1234</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">Primary</span>
                </label>
                <label className="flex items-center justify-between rounded border border-stroke p-3 cursor-pointer hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="h-4 w-4 text-primary focus:ring-primary" />
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#64748B] dark:text-[#8A99AF]" />
                      <span className="text-sm font-medium text-black dark:text-white">Mastercard ending in 5678</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-2 flex justify-end gap-3">
              <button onClick={onClose} className="rounded border border-stroke py-2 px-4 font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">Cancel</button>
              <button onClick={handlePay} className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 transition">Pay {totalAmount}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SingleInvoice = () => {
  const { addToast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handlePaymentSuccess = () => {
    addToast('success', 'Payment Complete', 'Invoice #348 has been marked as paid.');
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount="$4,235"
        onSuccess={handlePaymentSuccess}
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Invoice
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Invoice</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Card Header */}
        <div className="flex flex-col gap-5 p-6.5 border-b border-stroke dark:border-strokedark sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-medium text-black dark:text-white">Invoice</h3>
          <span className="font-medium text-black dark:text-white">ID: #348</span>
        </div>

        <div className="p-6.5">
          {/* Invoice Header Details */}
          <div className="flex flex-wrap justify-between gap-5 pb-8 border-b border-stroke dark:border-strokedark">
            {/* From */}
            <div className="w-full sm:w-1/2 lg:w-5/12">
              <span className="block mb-1.5 font-medium text-black dark:text-white">From</span>
              <h5 className="mb-1 text-lg font-bold text-black dark:text-white">Pimjo LLC</h5>
              <p className="text-sm text-[#64748B] dark:text-[#8A99AF] leading-relaxed">
                1280, Clair Street,<br />Massachusetts, New York - 02543
              </p>
              
              <div className="mt-6">
                <span className="block mb-1 font-medium text-black dark:text-white">Issued On:</span>
                <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">11 March, 2027</span>
              </div>
            </div>
            
            {/* Divider (Hidden on small screens) */}
            <div className="hidden sm:block w-px bg-stroke dark:bg-strokedark"></div>
            
            {/* To */}
            <div className="w-full sm:w-1/2 lg:w-5/12 text-left sm:text-right">
              <span className="block mb-1.5 font-medium text-black dark:text-white">To</span>
              <h5 className="mb-1 text-lg font-bold text-black dark:text-white">Albert Ward</h5>
              <p className="text-sm text-[#64748B] dark:text-[#8A99AF] leading-relaxed">
                355, Shobe Lane<br />Colorado, Fort Collins - 80543
              </p>
              
              <div className="mt-6">
                <span className="block mb-1 font-medium text-black dark:text-white">Due On:</span>
                <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">16 March, 2027</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-[#313D4A] text-left">
                    <th className="px-4 py-4 font-medium text-black dark:text-white rounded-l-md">S.No.#</th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">Products</th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-center">Quantity</th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-center">Unit Cost</th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-center">Discount</th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-right rounded-r-md">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <td className="px-4 py-5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">1</td>
                    <td className="px-4 py-5 text-sm font-medium text-black dark:text-white">Macbook pro 13"</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">1</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">$48</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">0%</td>
                    <td className="px-4 py-5 text-sm font-medium text-black dark:text-white text-right">$1,200</td>
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
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">3</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">$800</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">0%</td>
                    <td className="px-4 py-5 text-sm font-medium text-black dark:text-white text-right">$1,600</td>
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
            <div className="flex justify-end mt-8 pb-8 border-b border-stroke dark:border-strokedark">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <h4 className="mb-4 font-bold text-black dark:text-white">Order summary</h4>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Sub Total</span>
                  <span className="text-sm font-bold text-black dark:text-white">$3,850</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Vat (10%):</span>
                  <span className="text-sm font-bold text-black dark:text-white">$385</span>
                </div>
                <div className="flex justify-between py-4 mt-2 border-t border-stroke dark:border-strokedark">
                  <span className="font-bold text-black dark:text-white">Total</span>
                  <span className="font-bold text-black dark:text-white">$4,235</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4.5 mt-8">
              <button onClick={() => setIsCheckoutOpen(true)} className="flex justify-center rounded border border-stroke py-2.5 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition">
                Proceed to payment
              </button>
              <button onClick={() => window.print()} className="flex items-center justify-center gap-2 rounded bg-primary py-2.5 px-6 font-medium text-white hover:bg-opacity-90 transition">
                <Printer className="w-5 h-5" />
                Print
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInvoice;
