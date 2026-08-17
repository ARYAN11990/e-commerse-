import React from 'react';
import { Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useApi } from '../../hooks/useApi';

const Transactions = () => {
  const navigate = useNavigate();
  const { data: transactions, loading, error, fetchData } = useApi('/ecommerce/transactions');

  const columns = [
    { header: 'Transaction ID', accessor: 'id' },
    { header: 'Payment Method', accessor: 'method' },
    {
      header: 'Amount',
      accessor: 'amount',
      renderCell: (row) => (
        <span className="font-medium text-black dark:text-white">{row.amount}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      renderCell: (row) => (
        <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
          row.status === 'Completed'
            ? 'bg-[#10B981]/10 text-[#10B981]'
            : 'bg-[#F59E0B]/10 text-[#F59E0B]'
        }`}>
          {row.status}
        </span>
      )
    },
    { header: 'Date', accessor: 'date' }
  ];

  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      options: ['Completed', 'Pending']
    },
    {
      key: 'method',
      label: 'Payment Method',
      options: ['Credit Card', 'PayPal']
    }
  ];

  const headerActions = (
    <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
      <Download className="w-4 h-4" />
      Export
    </button>
  );

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Transactions
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Transactions</li>
          </ol>
        </nav>
      </div>

      <DataTable
        title="Transactions List"
        subtitle="View and manage all financial transactions."
        headerActions={headerActions}
        columns={columns}
        data={transactions || []}
        loading={loading}
        error={error}
        onRetry={fetchData}
        searchable={true}
        showFilter={true}
        filterOptions={filterOptions}
        selectable={false}
        onView={(row) => navigate('/ecommerce/single-transaction')}
      />
    </div>
  );
};

export default Transactions;
