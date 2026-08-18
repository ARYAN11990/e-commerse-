import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Search, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Transactions = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  
  const allTransactions = [
    { id: '#323537', customer: 'Abram Schleifer', email: 'abram@example.com', totalAmount: '$43,999', dueDate: '25 Apr, 2027', status: 'Completed' },
    { id: '#323544', customer: 'Ava Smith', email: 'ava.smith@example.com', totalAmount: '$1,200', dueDate: '01 Dec, 2027', status: 'Pending' },
    { id: '#323538', customer: 'Carla George', email: 'carla65@example.com', totalAmount: '$919', dueDate: '11 May, 2027', status: 'Completed' },
    { id: '#323543', customer: 'Ekstrom Bothman', email: 'ekstrom@example.com', totalAmount: '$679', dueDate: '15 Nov, 2027', status: 'Completed' },
    { id: '#323552', customer: 'Elia Davis', email: 'elia.davis@example.com', totalAmount: '$210', dueDate: '01 Mar, 2028', status: 'Failed' },
    { id: '#323539', customer: 'Emery Culhane', email: 'emery09@example.com', totalAmount: '$839', dueDate: '29 Jun, 2027', status: 'Completed' },
    { id: '#323547', customer: 'Ethan Patel', email: 'ethan.patel@example.com', totalAmount: '$2,100', dueDate: '05 Jan, 2028', status: 'Pending' },
    { id: '#323553', customer: 'James Martinez', email: 'james.martinez@example.com', totalAmount: '$3,300', dueDate: '15 Mar, 2028', status: 'Completed' },
    { id: '#323535', customer: 'Kalya George', email: 'kaiya@example.com', totalAmount: '$1,579', dueDate: '13 Mar, 2027', status: 'Failed' },
    { id: '#323549', customer: 'Liam Brown', email: 'liam.brown@example.com', totalAmount: '$450', dueDate: '28 Jan, 2028', status: 'Failed' },
  ];

  const filteredTransactions = useMemo(() => {
    let result = allTransactions;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(txn => 
        txn.customer.toLowerCase().includes(q) || 
        txn.email.toLowerCase().includes(q) ||
        txn.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTransactions(filteredTransactions.map(txn => txn.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id) => {
    setSelectedTransactions(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const dataToExport = selectedTransactions.length > 0 
      ? allTransactions.filter(txn => selectedTransactions.includes(txn.id))
      : filteredTransactions;

    if (dataToExport.length === 0) {
      addToast('warning', 'Export Failed', 'No data to export.');
      return;
    }

    const headers = ['Order ID', 'Customer', 'Email', 'Total Amount', 'Due Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(txn => 
        `"${txn.id}","${txn.customer}","${txn.email}","${txn.totalAmount}","${txn.dueDate}","${txn.status}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('success', 'Export Successful', 'transactions.csv has been downloaded.');
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Transactions
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm hidden sm:flex">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Transactions</li>
          </ol>
        </nav>
      </div>

      {/* Transactions List Card */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
        {/* Card Header */}
        <div className="flex flex-col gap-4 border-b border-stroke py-6 px-4 dark:border-strokedark sm:px-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="font-bold text-black dark:text-white text-xl">Transactions</h3>
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mt-1">Your most recent transactions list</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-[#64748B] dark:text-[#8A99AF]" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-stroke bg-transparent py-2 pl-10 pr-4 text-sm font-medium outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary sm:w-60"
              />
            </div>

            {/* Date Range Dropdown */}
            <button className="flex items-center justify-center gap-2 rounded-md border border-stroke py-2 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition min-w-max">
              Last 7 Days
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Export Button */}
            <button onClick={handleExportCSV} className="flex items-center justify-center gap-2 rounded-md border border-stroke py-2 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition min-w-max">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-stroke dark:border-strokedark text-left">
                <th className="py-5 px-4 font-medium text-black dark:text-white xl:pl-7.5 w-12 text-center">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={filteredTransactions.length > 0 && selectedTransactions.length === filteredTransactions.length}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                  />
                </th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Order ID</th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white min-w-max">Customer <span className="text-xs text-gray-400 ml-1">⇕</span></th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Email <span className="text-xs text-gray-400 ml-1">⇕</span></th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white min-w-max">Total Amount <span className="text-xs text-gray-400 ml-1">⇕</span></th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white min-w-max">Due Date</th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Status</th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white xl:pr-7.5 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? filteredTransactions.map((txn, idx) => (
                <tr key={idx} className="border-b border-stroke dark:border-strokedark last:border-0 hover:bg-gray-50 dark:hover:bg-meta-4/50 transition">
                  <td className="py-6 px-4 xl:pl-7.5 text-center">
                    <input 
                      type="checkbox" 
                      onChange={() => handleSelectTransaction(txn.id)}
                      checked={selectedTransactions.includes(txn.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
                    />
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{txn.id}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-black dark:text-white">{txn.customer}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{txn.email}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{txn.totalAmount}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{txn.dueDate}</p>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`inline-flex rounded-md py-1 px-3 text-xs font-medium ${
                      txn.status === 'Completed' ? 'bg-[#10B981]/10 text-[#10B981]' :
                      txn.status === 'Pending' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                      'bg-[#EF4444]/10 text-[#EF4444]'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-6 px-4 xl:pr-7.5 text-center">
                    <button onClick={() => navigate('/ecommerce/single-transaction')} className="text-[#64748B] hover:text-primary transition p-2">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">No transactions found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-stroke py-4 px-4 dark:border-strokedark sm:px-6 gap-4">
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">
            Showing 1 to {Math.min(10, filteredTransactions.length)} of 20
          </p>
          <div className="flex items-center gap-1.5">
            <button className="flex h-8 w-8 items-center justify-center rounded border border-stroke bg-white text-[#64748B] hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark dark:text-[#8A99AF] dark:hover:bg-meta-4 disabled:opacity-50" disabled>
              &lt;
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded bg-[#3C50E0] text-white font-medium">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-stroke bg-white text-[#64748B] hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark dark:text-[#8A99AF] dark:hover:bg-meta-4">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded border border-stroke bg-white text-[#64748B] hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark dark:text-[#8A99AF] dark:hover:bg-meta-4">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
