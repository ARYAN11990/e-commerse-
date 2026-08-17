import { useApi } from '../../hooks/useApi';
import DataTable from '../DataTable';

const RecentInvoices = () => {
  const { data: invoices = [], loading, error, fetchData: fetchInvoices } = useApi('/saas/recent-invoices');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'text-[#10B981]';
      case 'Pending': return 'text-[#F59E0B]';
      case 'Cancelled': return 'text-[#EF4444]';
      default: return 'text-[#64748B] dark:text-[#8A99AF]';
    }
  };

  const columns = [
    {
      header: 'Serial No:',
      accessor: 'id',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.id}</p>
    },
    {
      header: 'Close Date',
      accessor: 'date',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.date}</p>
    },
    {
      header: 'User',
      accessor: 'user',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.user}</p>
    },
    {
      header: 'Amount',
      accessor: 'amount',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.amount}</p>
    },
    {
      header: 'Status',
      accessor: 'status',
      renderCell: (row) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(row.status)} border-current bg-transparent`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="xl:pb-1">
      <DataTable
        title="Recent Invoices"
        columns={columns}
        data={invoices}
        loading={loading}
        error={error}
        onRetry={fetchInvoices}
        searchable={false}
        showFilter={false}
      />
    </div>
  );
};

export default RecentInvoices;
