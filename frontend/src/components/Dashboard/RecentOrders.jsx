import { useApi } from '../../hooks/useApi';
import DataTable from '../DataTable';

const RecentOrders = () => {
  const { data: orders = [], loading, error, fetchData: fetchOrders } = useApi('/dashboard/recent-orders');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-[#10B981]';
      case 'Pending': return 'text-[#F59E0B]';
      case 'Canceled': return 'text-[#DC3545]';
      default: return 'text-gray-500';
    }
  };

  const columns = [
    {
      header: 'Products',
      accessor: 'productName',
      className: 'w-[40%]',
      renderCell: (row) => (
        <div className="flex items-center gap-4 py-1">
          <div className="h-[46px] w-[46px] rounded-md overflow-hidden bg-white dark:bg-[#24303F] flex-shrink-0">
            <img src={row.image} alt="Product" className="w-full h-full object-cover rounded-md" />
          </div>
          <div>
            <p className="font-semibold text-[#1C2434] dark:text-white text-sm">{row.productName}</p>
            <p className="text-[13px] text-[#64748B] dark:text-[#8A99AF] font-medium">{row.variants}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      className: 'w-[20%]',
      renderCell: (row) => <p className="text-sm text-[#64748B] dark:text-[#8A99AF] font-medium">{row.category}</p>
    },
    {
      header: 'Price',
      accessor: 'price',
      className: 'w-[20%]',
      renderCell: (row) => <p className="text-sm text-[#64748B] dark:text-[#8A99AF] font-medium">{row.price}</p>
    },
    {
      header: 'Status',
      accessor: 'status',
      className: 'w-[20%]',
      renderCell: (row) => (
        <p className={`text-sm font-semibold ${getStatusColor(row.status)}`}>
          {row.status}
        </p>
      )
    }
  ];

  const filterOptions = [
    { key: 'status', label: 'Status', options: ['Delivered', 'Pending', 'Canceled'] },
    { key: 'category', label: 'Category', options: ['Laptop', 'Watch', 'SmartPhone', 'Electronics', 'Accessories'] }
  ];

  return (
    <div className="h-full">
      <DataTable
        title="Recent Orders"
        columns={columns}
        data={orders}
        loading={loading}
        error={error}
        onRetry={fetchOrders}
        searchable={true}
        showFilter={true}
        filterOptions={filterOptions}
        headerClassName="h-full"
      />
    </div>
  );
};

export default RecentOrders;
