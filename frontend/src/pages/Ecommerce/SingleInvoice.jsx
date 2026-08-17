import React from 'react';
import { Download, Printer } from 'lucide-react';

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
            <li><a className="font-medium hover:text-[#3C50E0]" href="/ecommerce/invoices">Invoices /</a></li>
            <li className="font-medium text-[#3C50E0]">INV-2027-001</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col-reverse gap-5 p-6.5 border-b border-stroke dark:border-strokedark sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="text-2xl font-bold text-black dark:text-white">TAILADMIN</h4>
            <p className="text-sm font-medium">tailadmin.com</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 rounded-md bg-[#3C50E0] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div className="p-6.5">
          <div className="flex flex-wrap justify-between gap-5 pb-8 border-b border-stroke dark:border-strokedark">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <span className="block mb-1.5 font-medium text-black dark:text-white">Billed To:</span>
              <h5 className="mb-1 text-lg font-bold text-black dark:text-white">Acme Corp</h5>
              <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">123 Business Avenue<br/>New York, NY 10001<br/>United States</p>
            </div>
            
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <span className="block mb-1.5 font-medium text-black dark:text-white">Shipped To:</span>
              <h5 className="mb-1 text-lg font-bold text-black dark:text-white">Acme Corp Warehouse</h5>
              <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">456 Logistics Blvd<br/>Newark, NJ 07101<br/>United States</p>
            </div>

            <div className="w-full sm:w-1/2 lg:w-1/3">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-black dark:text-white">Invoice ID:</span>
                <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">INV-2027-001</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-black dark:text-white">Issue Date:</span>
                <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">15 Dec, 2027</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-black dark:text-white">Due Date:</span>
                <span className="text-sm text-[#64748B] dark:text-[#8A99AF]">15 Jan, 2028</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-[#313D4A] text-left">
                    <th className="px-4 py-3 font-medium text-black dark:text-white rounded-l-md">Description</th>
                    <th className="px-4 py-3 font-medium text-black dark:text-white text-center">Qty</th>
                    <th className="px-4 py-3 font-medium text-black dark:text-white text-right">Unit Price</th>
                    <th className="px-4 py-3 font-medium text-black dark:text-white text-right rounded-r-md">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <td className="px-4 py-4 text-sm font-medium text-black dark:text-white">TailAdmin Pro License (Annual)</td>
                    <td className="px-4 py-4 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">1</td>
                    <td className="px-4 py-4 text-sm text-right text-[#64748B] dark:text-[#8A99AF]">$599.00</td>
                    <td className="px-4 py-4 text-sm font-medium text-black dark:text-white text-right">$599.00</td>
                  </tr>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <td className="px-4 py-4 text-sm font-medium text-black dark:text-white">Custom Development Hours</td>
                    <td className="px-4 py-4 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">10</td>
                    <td className="px-4 py-4 text-sm text-right text-[#64748B] dark:text-[#8A99AF]">$75.00</td>
                    <td className="px-4 py-4 text-sm font-medium text-black dark:text-white text-right">$750.00</td>
                  </tr>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <td className="px-4 py-4 text-sm font-medium text-black dark:text-white">Premium Support Package</td>
                    <td className="px-4 py-4 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">1</td>
                    <td className="px-4 py-4 text-sm text-right text-[#64748B] dark:text-[#8A99AF]">$101.00</td>
                    <td className="px-4 py-4 text-sm font-medium text-black dark:text-white text-right">$101.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-8">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <div className="flex justify-between py-3 border-b border-stroke dark:border-strokedark">
                  <span className="font-medium text-black dark:text-white">Subtotal</span>
                  <span className="font-medium text-black dark:text-white">$1,450.00</span>
                </div>
                <div className="flex justify-between py-3 border-b border-stroke dark:border-strokedark">
                  <span className="font-medium text-black dark:text-white">Tax (10%)</span>
                  <span className="font-medium text-black dark:text-white">$145.00</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-lg font-bold text-[#3C50E0]">Total</span>
                  <span className="text-lg font-bold text-[#3C50E0]">$1,595.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInvoice;
