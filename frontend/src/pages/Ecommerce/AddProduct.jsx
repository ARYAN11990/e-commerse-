import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { Input } from '../../components/Form/Input';
import { Textarea } from '../../components/Form/Textarea';
import { Select } from '../../components/Form/Select';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
  });
  
  const categories = [
    { value: 'laptop', label: 'Laptop' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'watch', label: 'Watch' },
    { value: 'audio', label: 'Audio' },
    { value: 'camera', label: 'Camera' },
    { value: 'phone', label: 'Phone' },
  ];

  const brands = [
    { value: 'apple', label: 'Apple' },
    { value: 'asus', label: 'ASUS' },
    { value: 'bose', label: 'Bose' },
    { value: 'canon', label: 'Canon' },
    { value: 'dell', label: 'Dell' },
    { value: 'google', label: 'Google' },
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
      // In a real app, this would POST to /ecommerce/products
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
            <li><a className="font-medium hover:text-[#3C50E0]" href="/ecommerce/products">Products /</a></li>
            <li className="font-medium text-[#3C50E0]">Add Product</li>
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-9">
            {/* Description Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  General Information
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <Input
                  label="Product Name"
                  name="name"
                  placeholder="e.g. Apple Watch Ultra"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  label="Product Description"
                  name="description"
                  placeholder="Write a detailed description..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                />
              </div>
            </div>

            {/* Media Upload Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product Image
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="relative mb-5.5 block w-full appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <Upload className="w-5 h-5 text-primary" />
                    </span>
                    <p className="text-sm font-medium">
                      <span className="text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1.5 text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-9">
            {/* Organization Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Organization
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <Select
                  label="Category"
                  options={categories}
                  value={formData.category}
                  onChange={handleSelectChange('category')}
                  placeholder="Select Category"
                />
                <Select
                  label="Brand"
                  options={brands}
                  value={formData.brand}
                  onChange={handleSelectChange('brand')}
                  placeholder="Select Brand"
                />
              </div>
            </div>

            {/* Pricing Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Pricing & Inventory
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <Input
                  label="Price ($)"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/ecommerce/products')}
                className="flex-1 rounded-sm border border-stroke py-3 px-6 text-center font-medium text-black hover:bg-gray-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 transition"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-sm bg-primary py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-70 transition flex items-center justify-center gap-2"
              >
                {loading ? 'Publishing...' : 'Publish Product'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
