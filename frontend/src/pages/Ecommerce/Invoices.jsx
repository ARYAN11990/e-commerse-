import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Filter, Search, MoreHorizontal, Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Invoices = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('All Invoices');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  
  // Filter Dropdown state
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterRef = useRef(null);

  const allInvoices = [
    { id: '#323534', customer: 'Lindsey Curtis', creationDate: 'August 7, 2028', dueDate: 'February 28, 2028', total: '999', status: 'Paid' },
    { id: '#323535', customer: 'John Doe', creationDate: 'July 1, 2028', dueDate: 'January 1, 2029', total: '1200', status: 'Unpaid' },
    { id: '#323536', customer: 'Jane Smith', creationDate: 'June 15, 2028', dueDate: 'December 15, 2028', total: '850', status: 'Draft' },
    { id: '#323537', customer: 'Michael Brown', creationDate: 'May 10, 2028', dueDate: 'November 10, 2028', total: '1500', status: 'Paid' },
    { id: '#323538', customer: 'Emily Davis', creationDate: 'April 5, 2028', dueDate: 'October 5, 2028', total: '700', status: 'Unpaid' },
    { id: '#323539', customer: 'Chris Wilson', creationDate: 'March 1, 2028', dueDate: 'September 1, 2028', total: '1100', status: 'Paid' },
    { id: '#323540', customer: 'Jessica Lee', creationDate: 'February 20, 2028', dueDate: 'August 20, 2028', total: '950', status: 'Draft' },
  ];

  const filteredInvoices = useMemo(() => {
    let result = allInvoices;
    if (activeTab === 'Unpaid') {
      result = result.filter(inv => inv.status === 'Unpaid');
    } else if (activeTab === 'Draft') {
      result = result.filter(inv => inv.status === 'Draft');
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(inv => 
        inv.customer.toLowerCase().includes(q) || 
        inv.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  // Handle outside click for filter dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedInvoices(filteredInvoices.map(inv => inv.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectInvoice = (id) => {
    setSelectedInvoices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    const dataToExport = selectedInvoices.length > 0 
      ? allInvoices.filter(inv => selectedInvoices.includes(inv.id))
      : filteredInvoices;

    if (dataToExport.length === 0) {
      addToast('warning', 'Export Failed', 'No data to export.');
      return;
    }

    // Generate CSV
    const headers = ['Invoice Number', 'Customer', 'Creation Date', 'Due Date', 'Total', 'Status'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(inv => 
        `"${inv.id}","${inv.customer}","${inv.creationDate}","${inv.dueDate}","${inv.total}","${inv.status}"`
      )
    ].join('\\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invoices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('success', 'Export Successful', 'invoices.csv has been downloaded.');
  };

  const handleActionClick = (id) => {
    navigate('/ecommerce/single-invoice');
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Invoices
        </h2>
        <nav className="flex items-center gap-4">
          <ol className="flex items-center gap-2 text-sm hidden sm:flex">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Invoices</li>
          </ol>
          <button 
            onClick={() => navigate('/ecommerce/create-invoice')}
            className="flex items-center gap-2 rounded bg-[#3C50E0] py-2 px-4.5 font-medium text-white hover:bg-opacity-90 transition"
          >
            <Plus className="h-4 w-4" />
            Create an Invoice
          </button>
        </nav>
      </div>

      {/* Overview Card */}
      <div className="mb-7.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 sm:px-6 xl:px-7.5">
           <h4 className="text-xl font-semibold text-black dark:text-white mb-6">Overview</h4>
           <div className="flex flex-col sm:flex-row">
             <div className="flex-1 sm:border-r border-stroke dark:border-strokedark pr-6 pb-6 sm:pb-0">
               <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Overdue</span>
               <h4 className="mt-2 text-3xl font-bold text-black dark:text-white">$120.80</h4>
             </div>
             <div className="flex-1 sm:border-r border-stroke dark:border-strokedark px-6 pb-6 sm:pb-0">
               <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Due within next 30 days</span>
               <h4 className="mt-2 text-3xl font-bold text-black dark:text-white">0.00</h4>
             </div>
             <div className="flex-1 sm:border-r border-stroke dark:border-strokedark px-6 pb-6 sm:pb-0">
               <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Average time to get paid</span>
               <h4 className="mt-2 text-3xl font-bold text-black dark:text-white">24 days</h4>
             </div>
             <div className="flex-1 pl-6">
               <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Upcoming Payout</span>
               <h4 className="mt-2 text-3xl font-bold text-black dark:text-white">$3,450.50</h4>
             </div>
           </div>
        </div>
      </div>

      {/* Invoices List Card */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
        {/* Card Header */}
        <div className="flex flex-col gap-4 border-b border-stroke py-6 px-4 dark:border-strokedark sm:px-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="font-bold text-black dark:text-white text-xl">Invoices</h3>
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mt-1">Your most recent invoices list</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Tabs */}
            <div className="flex items-center rounded-md border border-stroke bg-gray p-1 dark:border-strokedark dark:bg-meta-4 mr-4">
              {['All Invoices', 'Unpaid', 'Draft'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded py-1.5 px-4 text-sm font-medium transition ${
                    activeTab === tab
                      ? 'bg-white text-black shadow-sm dark:bg-boxdark dark:text-white'
                      : 'text-[#64748B] hover:text-black dark:text-[#8A99AF] dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
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
                  className="w-full rounded-md border border-stroke bg-transparent py-2 pl-10 pr-4 text-sm font-medium outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary sm:w-54"
                />
              </div>

              {/* Action Buttons */}
              <div className="relative" ref={filterRef}>
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)} 
                  className={`flex items-center justify-center gap-2 rounded-md border border-stroke py-2 px-4 text-sm font-medium transition ${
                    showFilterDropdown ? 'bg-gray-50 dark:bg-meta-4 text-primary border-primary' : 'text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                {/* Filter Dropdown Menu */}
                {showFilterDropdown && (
                  <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
                    <h5 className="mb-2 text-sm font-bold text-black dark:text-white">Filter by Status</h5>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-meta-4 p-1 rounded">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" onChange={() => {setActiveTab('All Invoices'); setShowFilterDropdown(false)}} checked={activeTab === 'All Invoices'} />
                        <span className="text-sm font-medium text-black dark:text-white">All Invoices</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-meta-4 p-1 rounded">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" onChange={() => {setActiveTab('Paid'); setShowFilterDropdown(false)}} checked={activeTab === 'Paid'} />
                        <span className="text-sm font-medium text-black dark:text-white">Paid</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-meta-4 p-1 rounded">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary" onChange={() => {setActiveTab('Unpaid'); setShowFilterDropdown(false)}} checked={activeTab === 'Unpaid'} />
                        <span className="text-sm font-medium text-black dark:text-white">Unpaid</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={handleExport} className="flex items-center justify-center gap-2 rounded-md border border-stroke py-2 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
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
                    checked={filteredInvoices.length > 0 && selectedInvoices.length === filteredInvoices.length}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                  />
                </th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Invoice Number</th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Customer <span className="text-xs text-gray-400 ml-1">⇕</span></th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Creation Date <span className="text-xs text-gray-400 ml-1">⇕</span></th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Due Date <span className="text-xs text-gray-400 ml-1">⇕</span></th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Total</th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white">Status</th>
                <th className="py-5 px-4 text-sm font-medium text-black dark:text-white xl:pr-7.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? filteredInvoices.map((invoice, idx) => (
                <tr key={idx} className="border-b border-stroke dark:border-strokedark last:border-0 hover:bg-gray-50 dark:hover:bg-meta-4/50 transition">
                  <td className="py-6 px-4 xl:pl-7.5 text-center">
                    <input 
                      type="checkbox" 
                      onChange={() => handleSelectInvoice(invoice.id)}
                      checked={selectedInvoices.includes(invoice.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
                    />
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{invoice.id}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-black dark:text-white">{invoice.customer}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{invoice.creationDate}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{invoice.dueDate}</p>
                  </td>
                  <td className="py-6 px-4">
                    <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{invoice.total}</p>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`inline-flex rounded-md py-1 px-3 text-xs font-medium ${
                      invoice.status === 'Paid' ? 'bg-[#10B981]/10 text-[#10B981]' :
                      invoice.status === 'Unpaid' ? 'bg-[#EF4444]/10 text-[#EF4444]' :
                      'bg-[#64748B]/10 text-[#64748B] dark:text-[#8A99AF]'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-6 px-4 xl:pr-7.5 text-center">
                    <button onClick={() => handleActionClick(invoice.id)} className="text-[#64748B] hover:text-primary transition p-2">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">No invoices found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-stroke py-4 px-4 dark:border-strokedark sm:px-6 gap-4">
          <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">
            Showing 1 to {Math.min(10, filteredInvoices.length)} of 25
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
              3
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

export default Invoices;
