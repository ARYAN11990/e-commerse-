import React, { useState } from 'react';
import { CreditCard, Edit, Plus, Trash2, Download, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// Payment Modal Component
const PaymentModal = ({ isOpen, onClose, mode, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData || { name: '', number: '', expiry: '', cvc: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-default dark:bg-boxdark">
        <div className="mb-4 flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
          <h3 className="text-xl font-bold text-black dark:text-white">
            {mode === 'add' ? 'Add Payment Method' : 'Edit Payment Method'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black dark:hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Name on Card</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded border border-stroke bg-transparent py-2 px-3 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">Card Number</label>
            <input required type="text" name="number" placeholder="**** **** **** 1234" value={formData.number} onChange={handleChange} className="w-full rounded border border-stroke bg-transparent py-2 px-3 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Expiry (MM/YY)</label>
              <input required type="text" name="expiry" placeholder="12/28" value={formData.expiry} onChange={handleChange} className="w-full rounded border border-stroke bg-transparent py-2 px-3 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">CVC</label>
              <input required type="password" name="cvc" placeholder="***" value={formData.cvc} onChange={handleChange} className="w-full rounded border border-stroke bg-transparent py-2 px-3 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded border border-stroke py-2 px-4 font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4">Cancel</button>
            <button type="submit" className="rounded bg-primary py-2 px-4 font-medium text-white hover:bg-opacity-90">{mode === 'add' ? 'Add Card' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Billing = () => {
  const { addToast } = useToast();

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Visa', number: '1234', expiry: '12/28', primary: true },
    { id: 2, name: 'Mastercard', number: '5678', expiry: '09/26', primary: false }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const billingHistory = [
    { id: 'inv_1', date: 'Dec 1, 2027', invoice: 'Basic Plan - Dec 2027', amount: '$20.00', status: 'Paid' },
    { id: 'inv_2', date: 'Nov 1, 2027', invoice: 'Basic Plan - Nov 2027', amount: '$20.00', status: 'Paid' },
    { id: 'inv_3', date: 'Oct 1, 2027', invoice: 'Basic Plan - Oct 2027', amount: '$20.00', status: 'Paid' },
  ];

  const handleUpdatePlan = () => addToast('info', 'Update Plan', 'Opening plan update dialog...');
  const handleCancelPlan = () => addToast('warning', 'Cancel Subscription', 'Are you sure you want to cancel?');

  const handleAddPaymentClick = () => {
    setModalMode('add');
    setEditFormData({ name: '', number: '', expiry: '', cvc: '' });
    setIsModalOpen(true);
  };

  const handleEditPaymentClick = (card) => {
    setModalMode('edit');
    setCurrentEditId(card.id);
    setEditFormData({ name: card.name, number: card.number, expiry: card.expiry, cvc: '***' });
    setIsModalOpen(true);
  };

  const handleDeletePayment = (id) => {
    setPaymentMethods(prev => prev.filter(c => c.id !== id));
    addToast('error', 'Payment Method Removed', 'The card was removed successfully.');
  };

  const handleSavePayment = (formData) => {
    if (modalMode === 'add') {
      const newCard = {
        id: Date.now(),
        name: formData.name || 'Card',
        number: formData.number.slice(-4) || 'XXXX',
        expiry: formData.expiry,
        primary: paymentMethods.length === 0
      };
      setPaymentMethods([...paymentMethods, newCard]);
      addToast('success', 'Payment Method Added', 'Your new card was added successfully.');
    } else {
      setPaymentMethods(prev => prev.map(c => {
        if (c.id === currentEditId) {
          return { ...c, name: formData.name, number: formData.number.slice(-4), expiry: formData.expiry };
        }
        return c;
      }));
      addToast('success', 'Payment Method Updated', 'Your card details were saved.');
    }
  };

  const downloadCSV = (data, filename) => {
    const headers = ['Date', 'Invoice', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => `"${row.date}","${row.invoice}","${row.amount}","${row.status}"`)
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    downloadCSV(billingHistory, 'billing_history_all.csv');
    addToast('success', 'Export Successful', 'All billing history has been downloaded.');
  };

  const handleDownloadInvoice = (invoiceObj) => {
    downloadCSV([invoiceObj], `invoice_${invoiceObj.date.replace(/, /g, '_').replace(/ /g, '_')}.csv`);
    addToast('success', 'Export Successful', `Invoice downloaded.`);
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode} 
        initialData={editFormData} 
        onSave={handleSavePayment} 
      />

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
              <div className="lg:w-1/2">
                <h4 className="mb-1 text-title-sm font-bold text-black dark:text-white">Basic Plan</h4>
                <p className="mb-6 text-sm text-[#64748B] dark:text-[#8A99AF]">Our most popular plan for small teams.</p>
                <div className="flex items-end gap-1">
                  <h2 className="text-3xl font-bold text-black dark:text-white">$20</h2>
                  <span className="mb-1 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">/ month</span>
                </div>
              </div>
              
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
            <button onClick={handleAddPaymentClick} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              <Plus className="w-4 h-4" />
              Add Payment Method
            </button>
          </div>
          <div className="p-6.5">
            {paymentMethods.length === 0 ? (
              <p className="text-sm text-gray-500">No payment methods found.</p>
            ) : (
              paymentMethods.map((card, idx) => (
                <div key={card.id} className={`mb-5 flex flex-col sm:flex-row sm:items-center justify-between rounded-md border border-stroke p-5 dark:border-strokedark ${idx === paymentMethods.length - 1 ? 'mb-0' : ''}`}>
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="flex h-14 w-20 items-center justify-center rounded border border-stroke bg-gray dark:border-strokedark dark:bg-meta-4">
                      <CreditCard className={`${card.primary ? 'text-black dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF]'} w-8 h-8`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h5 className="font-medium text-black dark:text-white">{card.name} ending in {card.number}</h5>
                        {card.primary && <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Primary</span>}
                      </div>
                      <p className="mt-1 text-sm text-[#64748B] dark:text-[#8A99AF]">Expires {card.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleEditPaymentClick(card)} className="rounded border border-stroke py-1.5 px-4 text-sm font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition">Edit</button>
                    {!card.primary && <button onClick={() => handleDeletePayment(card.id)} className="text-[#EF4444] hover:text-[#B91C1C] transition"><Trash2 className="w-5 h-5" /></button>}
                  </div>
                </div>
              ))
            )}
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
                {billingHistory.map((row) => (
                  <tr key={row.id} className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4/50 transition">
                    <td className="py-5 px-4 xl:pl-6 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.date}</td>
                    <td className="py-5 px-4 text-sm font-medium text-black dark:text-white">{row.invoice}</td>
                    <td className="py-5 px-4 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.amount}</td>
                    <td className="py-5 px-4">
                      <span className="inline-flex rounded-md bg-[#10B981]/10 py-1 px-3 text-xs font-medium text-[#10B981]">{row.status}</span>
                    </td>
                    <td className="py-5 px-4 text-right xl:pr-6">
                      <button onClick={() => handleDownloadInvoice(row)} className="text-primary hover:underline text-sm font-medium">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
