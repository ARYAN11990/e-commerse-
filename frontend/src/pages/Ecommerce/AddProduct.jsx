import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Input } from '../../components/Form/Input';
import { Textarea } from '../../components/Form/Textarea';
import { Select } from '../../components/Form/Select';
import { useToast } from '../../context/ToastContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    color: '',
    weight: '',
    length: '',
    width: '',
    description: '',
    price: '',
    stock: 1,
    availability: '',
  });

  const categories = [
    { value: 'laptop', label: 'Laptop' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const brands = [
    { value: 'apple', label: 'Apple' },
    { value: 'asus', label: 'ASUS' },
  ];

  const colors = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
  ];

  const availabilityOptions = [
    { value: 'in_stock', label: 'In Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      addToast('success', 'Product added successfully!', 'The product has been listed in your catalog.');
      setTimeout(() => {
        navigate('/ecommerce/products');
      }, 1000);
    } catch (error) {
      addToast('error', 'Error adding product', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Add Product
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Add Product</li>
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Products Description */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Products Description
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input label="Product Name" name="name" placeholder="Enter product name" value={formData.name} onChange={handleChange} />
              <Select label="Category" name="category" options={categories} value={formData.category} onChange={handleSelectChange('category')} placeholder="Select Category" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Select label="Brand" name="brand" options={brands} value={formData.brand} onChange={handleSelectChange('brand')} placeholder="Select Brand" />
              <Select label="Color" name="color" options={colors} value={formData.color} onChange={handleSelectChange('color')} placeholder="Select color" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Input label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} />
              <Input label="Length (cm)" name="length" type="number" value={formData.length} onChange={handleChange} />
              <Input label="Width (cm)" name="width" type="number" value={formData.width} onChange={handleChange} />
            </div>
            <Textarea label="Description" name="description" placeholder="Receipt Info (optional)" value={formData.description} onChange={handleChange} rows={6} />
          </div>
        </div>

        {/* Pricing & Availability */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Pricing & Availability
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Input label="Weight (kg)" name="weight2" type="number" placeholder="15" onChange={()=>{}} />
              <Input label="Length (cm)" name="length2" type="number" placeholder="120" onChange={()=>{}} />
              <Input label="Width (cm)" name="width2" type="number" placeholder="23" onChange={()=>{}} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">Stock Quantity</label>
                <div className="flex items-center rounded-lg border border-stroke dark:border-strokedark">
                  <button type="button" className="px-4 py-3 border-r border-stroke dark:border-strokedark hover:bg-gray-50" onClick={() => setFormData(p => ({...p, stock: Math.max(0, p.stock - 1)}))}>-</button>
                  <input type="number" className="w-full text-center bg-transparent py-3 outline-none" value={formData.stock} onChange={handleChange} name="stock" />
                  <button type="button" className="px-4 py-3 border-l border-stroke dark:border-strokedark hover:bg-gray-50" onClick={() => setFormData(p => ({...p, stock: p.stock + 1}))}>+</button>
                </div>
              </div>
              <Select label="Availability Status" name="availability" options={availabilityOptions} value={formData.availability} onChange={handleSelectChange('availability')} placeholder="Select Availability" />
            </div>
          </div>
        </div>

        {/* Products Images */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Products Images
            </h3>
          </div>
          <div className="p-6.5">
            <div className="relative block w-full appearance-none rounded border border-dashed border-[#E2E8F0] bg-[#F8FAFC] py-12 px-4 dark:border-strokedark dark:bg-meta-4 sm:py-20">
              <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" />
              <div className="flex flex-col items-center justify-center space-y-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-1">
                  <Upload className="w-5 h-5 text-[#64748B]" />
                </span>
                <p className="text-sm font-medium">
                  <span className="font-semibold text-black dark:text-white">Click to upload</span> or drag and drop SVG,
                </p>
                <p className="mt-1 text-xs">PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4.5 mt-2">
          <button type="button" onClick={() => navigate('/ecommerce/products')} className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white transition">
            Draft
          </button>
          <button type="submit" disabled={loading} className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 disabled:opacity-70 transition">
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
