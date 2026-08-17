import { useApi } from '../../hooks/useApi';
import DataTable from '../DataTable';

const FinanceRecentTransactions = () => {
  const { data: transactions = [], loading, error, fetchData: fetchTransactions } = useApi('/finance/recent-transactions');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-[#10B981]';
      case 'In Progress': return 'text-[#F59E0B]';
      default: return 'text-[#64748B] dark:text-[#8A99AF]';
    }
  };

  const columns = [
    {
      header: 'Order ID',
      accessor: 'order_id',
      renderCell: (row) => <p className="text-sm font-semibold text-[#1C2434] dark:text-white">{row.order_id}</p>
    },
    {
      header: 'Activity',
      accessor: 'activity',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.activity}</p>
    },
    {
      header: 'Price',
      accessor: 'price',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.price}</p>
    },
    {
      header: 'Date',
      accessor: 'date',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.date}</p>
    },
    {
      header: 'Status',
      accessor: 'status',
      renderCell: (row) => (
        <span className={`text-xs font-bold ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      )
    }
  ];

  const filterOptions = [
    { key: 'status', label: 'Status', options: ['Completed', 'In Progress'] }
  ];

  return (
    <div className="mb-4 md:mb-6 2xl:mb-7.5">
      <DataTable
        title="Recent Transactions"
        columns={columns}
        data={transactions}
        loading={loading}
        error={error}
        onRetry={fetchTransactions}
        searchable={true}
        showFilter={true}
        filterOptions={filterOptions}
        selectable={true}
        onSelectionChange={() => {}}
        onView={() => {}}
      />
    </div>
  );
};

export default FinanceRecentTransactions;
