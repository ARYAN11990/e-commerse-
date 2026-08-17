import React from 'react';
import { Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useApi } from '../../hooks/useApi';

const Products = () => {
  const navigate = useNavigate();
  const { data: products, loading, error, fetchData } = useApi('/ecommerce/products');

  const columns = [
    {
      header: 'Products',
      accessor: 'name',
      renderCell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={row.image} alt={row.name} className="h-full w-full object-cover" />
          </div>
          <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.name}</p>
        </div>
      )
    },
    { header: 'Category', accessor: 'category' },
    { header: 'Brand', accessor: 'brand' },
    { header: 'Price', accessor: 'price' },
    {
      header: 'Stock',
      accessor: 'stock',
      renderCell: (row) => (
        <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
          row.stock === 'In Stock'
            ? 'bg-[#10B981]/10 text-[#10B981]'
            : 'bg-[#EF4444]/10 text-[#EF4444]'
        }`}>
          {row.stock}
        </span>
      )
    },
    { header: 'Created At', accessor: 'created_at' }
  ];

  const filterOptions = [
    {
      key: 'category',
      label: 'Category',
      options: ['Laptop', 'Accessories', 'Watch', 'Audio', 'Camera', 'Phone']
    },
    {
      key: 'stock',
      label: 'Stock Status',
      options: ['In Stock', 'Out of Stock']
    }
  ];

  const headerActions = (
    <>
      <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
        Export
        <Download className="w-4 h-4" />
      </button>
      <button 
        onClick={() => navigate('/ecommerce/add-product')}
        className="flex items-center gap-2 rounded-md bg-[#3C50E0] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition"
      >
        <Plus className="w-4 h-4" />
        Add Product
      </button>
    </>
  );

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Products
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Products</li>
          </ol>
        </nav>
      </div>

      <DataTable
        title="Products List"
        subtitle="Track your store's progress to boost your sales."
        headerActions={headerActions}
        columns={columns}
        data={products || []}
        loading={loading}
        error={error}
        onRetry={fetchData}
        searchable={true}
        showFilter={true}
        filterOptions={filterOptions}
        selectable={true}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
      />
    </div>
  );
};

export default Products;
