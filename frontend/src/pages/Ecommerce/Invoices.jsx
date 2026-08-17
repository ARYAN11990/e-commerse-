import React from 'react';
import { Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useApi } from '../../hooks/useApi';

const Invoices = () => {
  const navigate = useNavigate();
  const { data: invoices, loading, error, fetchData } = useApi('/ecommerce/invoices');

  const columns = [
    { header: 'Invoice ID', accessor: 'id' },
    {
      header: 'Client',
      accessor: 'client',
      renderCell: (row) => (
        <span className="font-medium text-black dark:text-white">{row.client}</span>
      )
    },
    { header: 'Amount', accessor: 'amount' },
    {
      header: 'Status',
      accessor: 'status',
      renderCell: (row) => (
        <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
          row.status === 'Paid'
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
      options: ['Paid', 'Pending']
    }
  ];

  const headerActions = (
    <>
      <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
        <Download className="w-4 h-4" />
        Export
      </button>
      <button 
        onClick={() => navigate('/ecommerce/create-invoice')}
        className="flex items-center gap-2 rounded-md bg-[#3C50E0] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition"
      >
        <Plus className="w-4 h-4" />
        Create Invoice
      </button>
    </>
  );

  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Invoices
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li><a className="font-medium hover:text-[#3C50E0]" href="/">Home /</a></li>
            <li className="font-medium text-[#3C50E0]">Invoices</li>
          </ol>
        </nav>
      </div>

      <DataTable
        title="Invoice List"
        subtitle="Manage and track your generated invoices."
        headerActions={headerActions}
        columns={columns}
        data={invoices || []}
        loading={loading}
        error={error}
        onRetry={fetchData}
        searchable={true}
        showFilter={true}
        filterOptions={filterOptions}
        selectable={true}
        onView={(row) => navigate('/ecommerce/single-invoice')}
        onDelete={(row) => console.log('Delete', row)}
      />
    </div>
  );
};

export default Invoices;
