import { useApi } from '../../hooks/useApi';
import DropdownDefault from '../DropdownDefault';
import DataTable from '../DataTable';

const LatestTransactions = () => {
  const { data: transactions = [], loading, error, fetchData: fetchTransactions } = useApi('/stocks/latest-transactions');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'text-[#10B981] bg-[#10B981]/10';
      case 'Pending': return 'text-[#F59E0B] bg-[#F59E0B]/10';
      case 'Failed': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-[#64748B] dark:text-[#8A99AF] bg-gray-100';
    }
  };

  const getLogo = (logoName) => {
    switch (logoName) {
      case 'paypal': return <div className="w-8 h-8 rounded-full bg-[#3C50E0] flex items-center justify-center text-white font-bold italic text-xs">P</div>;
      case 'apple': return <div className="w-8 h-8 rounded-full bg-[#1C2434] flex items-center justify-center text-white font-bold text-xs"></div>;
      case 'kkst': return <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold text-xs">K</div>;
      case 'facebook': return <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-xs">f</div>;
      case 'amazon': return <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-white font-bold text-xs">a</div>;
      default: return <div className="w-8 h-8 rounded-full bg-gray-200"></div>;
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      renderCell: (row) => (
        <div className="flex items-center gap-3">
          {getLogo(row.logo)}
          <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.name}</p>
        </div>
      )
    },
    {
      header: 'Date',
      accessor: 'date',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.date}</p>
    },
    {
      header: 'Price',
      accessor: 'price',
      renderCell: (row) => <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row.price}</p>
    },
    {
      header: 'Category',
      accessor: 'category',
      renderCell: (row) => <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{row.category}</p>
    },
    {
      header: 'Status',
      accessor: 'status',
      renderCell: (row) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      className: 'text-center',
      renderCell: (row) => (
        <div className="flex justify-center"><DropdownDefault options={['View Details', 'Export', 'Delete']} /></div>
      )
    }
  ];

  return (
    <div className="mt-4 md:mt-6 2xl:mt-7.5">
      <DataTable
        title="Latest Transactions"
        columns={columns}
        data={transactions}
        loading={loading}
        error={error}
        onRetry={fetchTransactions}
        searchable={true}
        showFilter={false}
      />
    </div>
  );
};

export default LatestTransactions;
