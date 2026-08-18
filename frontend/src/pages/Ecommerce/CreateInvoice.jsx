import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Info, Eye, Save, Minus, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [items, setItems] = useState([
    { id: 1, name: 'Macbook pro 13"', quantity: 1, price: 1200, discount: 0 },
    { id: 2, name: 'Apple Watch Ultra', quantity: 1, price: 300, discount: 50 },
    { id: 3, name: 'iPhone 15 Pro Max', quantity: 2, price: 800, discount: 0 },
    { id: 4, name: 'iPad Pro 3rd Gen', quantity: 1, price: 900, discount: 0 },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    quantity: 1,
    discount: '0%'
  });

  const calculateItemTotal = (price, qty, discountStr) => {
    const discount = parseInt(discountStr) || 0;
    const subtotal = price * qty;
    return subtotal - (subtotal * (discount / 100));
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;
    const discountNum = parseInt(newItem.discount) || 0;
    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItem.name,
        quantity: newItem.quantity,
        price: Number(newItem.price),
        discount: discountNum
      }
    ]);
    setNewItem({ name: '', price: 0, quantity: 1, discount: '0%' });
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subTotal = items.reduce((sum, item) => sum + calculateItemTotal(item.price, item.quantity, item.discount), 0);
  const vat = subTotal * 0.1;
  const total = subTotal + vat;

  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSaveInvoice = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast('success', 'Invoice Saved', 'Invoice has been successfully saved.');
      navigate('/ecommerce/invoices');
    }, 1000);
  };

  const handlePreviewInvoice = () => {
    setShowPreview(true);
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      
      {/* Preview Modal Overlay */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-default dark:bg-boxdark relative">
            <button 
              onClick={() => setShowPreview(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Invoice Preview</h2>
            <div className="border border-stroke dark:border-strokedark rounded p-6 bg-gray-50 dark:bg-meta-4/30">
              <div className="flex justify-between mb-8">
                <div>
                  <h4 className="font-bold text-black dark:text-white mb-1">From:</h4>
                  <p className="text-sm">Your Company</p>
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-black dark:text-white mb-1">To:</h4>
                  <p className="text-sm">Jhon Deniyal</p>
                </div>
              </div>
              <div className="mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="py-2 text-sm">Item</th>
                      <th className="py-2 text-sm text-center">Qty</th>
                      <th className="py-2 text-sm text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-b border-stroke dark:border-strokedark">
                        <td className="py-2 text-sm">{item.name}</td>
                        <td className="py-2 text-sm text-center">{item.quantity}</td>
                        <td className="py-2 text-sm text-right">${calculateItemTotal(item.price, item.quantity, item.discount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <div className="w-1/2">
                  <div className="flex justify-between py-1"><span className="text-sm">Subtotal:</span><span className="text-sm font-medium">${subTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-sm">VAT (10%):</span><span className="text-sm font-medium">${vat.toFixed(2)}</span></div>
                  <div className="flex justify-between py-2 mt-2 border-t border-stroke dark:border-strokedark"><span className="font-bold text-black dark:text-white">Total:</span><span className="font-bold text-black dark:text-white">${total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowPreview(false)} className="rounded border border-stroke py-2 px-6 font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4">Close Preview</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Create Invoice
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm hidden sm:flex">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Create Invoice</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-bold text-black dark:text-white text-lg">
            Create Invoice
          </h3>
        </div>

        <div className="p-6.5">
          {/* Top Form */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Invoice Number</label>
              <input type="text" defaultValue="WP-3434434" className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Customer Name</label>
              <input type="text" defaultValue="Jhon Deniyal" className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Customer Address</label>
              <input type="text" placeholder="Enter customer address" className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Payment Condition</label>
              <select className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white appearance-none">
                <option value="">Select Payment Condition</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Currency</label>
              <select className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white appearance-none">
                <option value="">Select Currency</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Issue Date</label>
              <input type="date" className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Due Date</label>
              <input type="date" className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Additional Info</label>
              <textarea rows={4} placeholder="Receipt Info (optional)" className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary text-black dark:text-white"></textarea>
            </div>
          </div>
        </div>

        <div className="border-t border-stroke dark:border-strokedark p-6.5">
          {/* Line Items Table */}
          <div className="max-w-full overflow-x-auto mb-8">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#313D4A] text-left">
                  <th className="px-4 py-4 text-sm font-medium text-black dark:text-white rounded-l-md w-16">S. No.</th>
                  <th className="px-4 py-4 text-sm font-medium text-black dark:text-white">Products</th>
                  <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-center">Quantity</th>
                  <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-center">Unit Cost</th>
                  <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-center">Discount</th>
                  <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-right">Total</th>
                  <th className="px-4 py-4 text-sm font-medium text-black dark:text-white text-center rounded-r-md w-16"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b border-stroke dark:border-strokedark last:border-0">
                    <td className="px-4 py-5 text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{index + 1}</td>
                    <td className="px-4 py-5 text-sm font-medium text-black dark:text-white">{item.name}</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">{item.quantity}</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">${item.price}</td>
                    <td className="px-4 py-5 text-sm text-center text-[#64748B] dark:text-[#8A99AF]">{item.discount}%</td>
                    <td className="px-4 py-5 text-sm font-medium text-black dark:text-white text-right">
                      ${calculateItemTotal(item.price, item.quantity, item.discount).toFixed(2)}
                    </td>
                    <td className="px-4 py-5 text-center">
                      <button onClick={() => removeItem(item.id)} className="text-[#64748B] hover:text-[#EF4444] transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Product Form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-4 border-b border-stroke pb-6 dark:border-strokedark">
            <div className="md:col-span-4">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Product Name</label>
              <input 
                type="text" 
                placeholder="Enter product name" 
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 text-black dark:text-white" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Price</label>
              <input 
                type="number" 
                value={newItem.price || ''}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 text-black dark:text-white" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Quantity</label>
              <div className="flex items-center rounded border border-stroke bg-transparent dark:border-strokedark dark:bg-meta-4 h-[46px]">
                <button 
                  onClick={() => setNewItem({...newItem, quantity: Math.max(1, newItem.quantity - 1)})}
                  className="flex-1 flex items-center justify-center text-[#64748B] hover:text-black dark:hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-px h-full bg-stroke dark:bg-strokedark"></div>
                <input 
                  type="number" 
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                  className="w-12 text-center bg-transparent outline-none text-black dark:text-white font-medium" 
                />
                <div className="w-px h-full bg-stroke dark:bg-strokedark"></div>
                <button 
                  onClick={() => setNewItem({...newItem, quantity: newItem.quantity + 1})}
                  className="flex-1 flex items-center justify-center text-[#64748B] hover:text-black dark:hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">Discount</label>
              <select 
                value={newItem.discount}
                onChange={(e) => setNewItem({...newItem, discount: e.target.value})}
                className="w-full rounded border border-stroke bg-transparent py-2.5 px-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 text-black dark:text-white appearance-none"
              >
                <option value="0%">0%</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
                <option value="50%">50%</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button 
                onClick={handleAddItem}
                className="w-full h-[46px] flex justify-center items-center rounded bg-[#3C50E0] font-medium text-white hover:bg-opacity-90 transition"
              >
                Save Product
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8 text-[#64748B] dark:text-[#8A99AF]">
            <Info className="w-4 h-4" />
            <span className="text-sm">After filling in the product details, press Enter/Return or click 'Save Product' to add it to the list.</span>
          </div>

          {/* Summary and Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-8">
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 order-2 md:order-1">
              <button 
                onClick={handlePreviewInvoice}
                className="flex items-center justify-center gap-2 rounded border border-stroke py-2.5 px-6 font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition"
              >
                <Eye className="w-4 h-4" />
                Preview Invoice
              </button>
              <button 
                onClick={handleSaveInvoice}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 rounded bg-primary py-2.5 px-6 font-medium text-white hover:bg-opacity-90 transition disabled:opacity-70"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Invoice'}
              </button>
            </div>

            <div className="w-full md:w-1/3 order-1 md:order-2">
              <h4 className="mb-4 font-bold text-black dark:text-white text-right">Order summary</h4>
              <div className="flex justify-between py-2 border-b border-stroke dark:border-strokedark">
                <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Sub Total</span>
                <span className="text-sm font-bold text-black dark:text-white">${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stroke dark:border-strokedark">
                <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Vat (10%):</span>
                <span className="text-sm font-bold text-black dark:text-white">${vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-4 mt-2 border-t border-stroke dark:border-strokedark">
                <span className="font-bold text-black dark:text-white">Total</span>
                <span className="font-bold text-black dark:text-white text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
