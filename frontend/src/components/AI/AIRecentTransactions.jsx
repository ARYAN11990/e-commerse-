import { useApi } from '../../hooks/useApi';
import DataTable from '../DataTable';

const AIRecentTransactions = () => {
  const { data: transactions = [], loading, error, fetchData: fetchTransactions } = useApi('/ai/recent-transactions');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-[#10B981] bg-[#10B981]/10';
      case 'Expired': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-[#64748B] dark:text-[#8A99AF] bg-gray-100';
    }
  };

  const columns = [
    {
      header: 'Paid By',
      accessor: 'name',
      renderCell: (row) => (
        <div>
          <h5 className="text-sm font-medium text-[#1C2434] dark:text-white">{row.name}</h5>
          <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{row.email}</p>
        </div>
      )
    },
    {
      header: 'Package Name',
      accessor: 'package',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.package}</p>
    },
    {
      header: 'Price',
      accessor: 'price',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.price}</p>
    },
    {
      header: 'Paid Date',
      accessor: 'date',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.date}</p>
    },
    {
      header: 'Status',
      accessor: 'status',
      renderCell: (row) => (
        <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      )
    }
  ];

  const filterOptions = [
    { key: 'status', label: 'Status', options: ['Active', 'Expired'] }
  ];

  return (
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
      onView={() => {}}
    />
  );
};

export default AIRecentTransactions;
