import React from 'react';
import { Printer } from 'lucide-react';

const SingleInvoice = () => {
  return (
    <div className="p-4 md:p-6 2xl:p-10">
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
              <button onClick={() => window.alert('Proceeding to secure payment gateway...')} className="flex justify-center rounded border border-stroke py-2.5 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition">
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
