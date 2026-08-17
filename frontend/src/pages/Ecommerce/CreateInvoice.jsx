import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../components/Form/Input';
import { useToast } from '../../context/ToastContext';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, price: 0 }
  ]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addToast('success', 'Invoice Created', 'Invoice has been successfully generated.');
      navigate('/ecommerce/invoices');
    }, 800);
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Create Invoice
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li><a className="font-medium hover:text-[#3C50E0]" href="/ecommerce/invoices">Invoices /</a></li>
            <li className="font-medium text-[#3C50E0]">Create</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8 border-b border-stroke pb-8 dark:border-strokedark">
            <div>
              <h3 className="mb-4 text-lg font-medium text-black dark:text-white">Billed To</h3>
              <Input label="Client Name" placeholder="Acme Corp" required />
              <div className="mt-4">
                <Input label="Client Email" type="email" placeholder="client@acme.com" required />
              </div>
              <div className="mt-4">
                <Input label="Billing Address" placeholder="123 Business Ave, NY" required />
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-medium text-black dark:text-white">Invoice Details</h3>
              <Input label="Invoice Number" placeholder="INV-2027-002" defaultValue="INV-2027-002" required />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input label="Issue Date" type="date" required />
                <Input label="Due Date" type="date" required />
              </div>
            </div>
          </div>

          <div className="mb-8 border-b border-stroke pb-8 dark:border-strokedark">
            <h3 className="mb-4 text-lg font-medium text-black dark:text-white">Line Items</h3>
            
            <div className="hidden sm:grid grid-cols-12 gap-4 mb-2">
              <div className="col-span-6 font-medium text-black dark:text-white">Description</div>
              <div className="col-span-2 font-medium text-black dark:text-white">Qty</div>
              <div className="col-span-2 font-medium text-black dark:text-white">Price</div>
              <div className="col-span-2 font-medium text-black dark:text-white text-right">Total</div>
            </div>

            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4 items-center">
                <div className="sm:col-span-6">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Item description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
                    required
                  />
                </div>
                <div className="sm:col-span-2 flex justify-between items-center sm:justify-end">
                  <span className="font-medium text-black dark:text-white sm:mr-4">
                    ${(item.quantity * item.price).toFixed(2)}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-danger hover:opacity-80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="mt-2 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          <div className="flex justify-end">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <div className="flex justify-between py-3">
                <span className="text-lg font-bold text-[#3C50E0]">Total</span>
                <span className="text-lg font-bold text-[#3C50E0]">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/ecommerce/invoices')}
                  className="flex-1 rounded-sm border border-stroke py-3 px-6 text-center font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-sm bg-primary py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-70 transition flex justify-center items-center gap-2"
                >
                  {loading ? 'Sending...' : 'Send Invoice'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
