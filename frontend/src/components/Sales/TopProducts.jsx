import { useApi } from '../../hooks/useApi';
import DataTable from '../DataTable';

const TopProducts = () => {
  const { data: products = [], loading, error, fetchData: fetchProducts } = useApi('/sales/top-products');

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'text-[#10B981] bg-[#10B981]/10';
      case 'Low Stock': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-[#64748B] dark:text-[#8A99AF] bg-gray-100';
    }
  };

  const getProductImage = (image) => {
    // Generate distinct simple colored boxes as placeholders based on the image string
    let bg = 'bg-gray-200';
    if(image.includes('jacket')) bg = 'bg-[#1C2434]';
    if(image.includes('pants')) bg = 'bg-[#64748B]';
    if(image.includes('shirt')) bg = 'bg-[#E2E8F0]';
    if(image.includes('boots')) bg = 'bg-[#3C50E0]';

    return (
      <div className={`w-12 h-12 rounded-md flex-shrink-0 flex items-center justify-center ${bg} overflow-hidden`}>
         <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white/50 stroke-current stroke-2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
         </svg>
      </div>
    );
  };

  const columns = [
    {
      header: 'Product Name',
      accessor: 'name',
      className: 'min-w-[220px]',
      renderCell: (row) => (
        <div className="flex items-center gap-4">
          {getProductImage(row.image)}
          <div>
            <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{row.name}</h5>
            <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{row.variants}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Product ID',
      accessor: 'product_id',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.product_id}</p>
    },
    {
      header: 'Sales',
      accessor: 'sales',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.sales}</p>
    },
    {
      header: 'Earnings',
      accessor: 'earnings',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.earnings}</p>
    },
    {
      header: 'Stocks',
      accessor: 'stocks',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.stocks}</p>
    },
    {
      header: 'Status',
      accessor: 'status',
      renderCell: (row) => (
        <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="xl:pb-6">
      <DataTable
        title="Top Products"
        columns={columns}
        data={products}
        loading={loading}
        error={error}
        onRetry={fetchProducts}
        searchable={false}
      />
    </div>
  );
};

export default TopProducts;
