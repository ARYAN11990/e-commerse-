import { useApi } from '../../hooks/useApi';
import DataTable from '../DataTable';

const CRMRecentOrders = () => {
  const { data: orders = [], loading, error, fetchData: fetchOrders } = useApi('/crm/recent-orders');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'text-[#10B981]';
      case 'Pending': return 'text-[#F59E0B]';
      case 'Cancel': return 'text-[#EF4444]';
      default: return 'text-[#64748B] dark:text-[#8A99AF]';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-[#3C50E0]/10 text-[#3C50E0]', 'bg-[#10B981]/10 text-[#10B981]', 'bg-[#F59E0B]/10 text-[#F59E0B]', 'bg-[#EF4444]/10 text-[#EF4444]'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleDelete = (row) => {
    // Delete action placeholder
  };

  const columns = [
    {
      header: 'Deal ID',
      accessor: 'id',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.id}</p>
    },
    {
      header: 'Customer',
      accessor: 'customer_name',
      renderCell: (row) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(row.customer_name)}`}>
            {getInitials(row.customer_name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1C2434] dark:text-white">{row.customer_name}</p>
            <a href={`mailto:${row.customer_email}`} className="text-xs text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0]">{row.customer_email}</a>
          </div>
        </div>
      )
    },
    {
      header: 'Product/Service',
      accessor: 'product',
      renderCell: (row) => <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{row.product}</p>
    },
    {
      header: 'Deal Value',
      accessor: 'value',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.value}</p>
    },
    {
      header: 'Close Date',
      accessor: 'date',
      renderCell: (row) => <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{row.date}</p>
    },
    {
      header: 'Status',
      accessor: 'status',
      className: 'text-center',
      renderCell: (row) => (
        <div className="text-center">
          <span className={`text-xs font-medium ${getStatusColor(row.status)}`}>
            {row.status}
          </span>
        </div>
      )
    }
  ];

  return (
    <div className="mt-4 md:mt-6 2xl:mt-7.5">
      <DataTable
        title="Recent Orders"
        columns={columns}
        data={orders}
        loading={loading}
        error={error}
        onRetry={fetchOrders}
        searchable={true}
        selectable={true}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CRMRecentOrders;
