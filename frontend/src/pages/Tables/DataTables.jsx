import { useState } from 'react';
import { ChevronDown, Search, Download, Trash2, Edit } from 'lucide-react';
import DataTable from '../../components/DataTable';

const DataTables = () => {
  const [initialData] = useState([
    { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: '61', startDate: '2011/04/25', salary: ',800' },
    { id: 2, name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: '63', startDate: '2011/07/25', salary: ',750' },
  ]);

  const [dt3Data] = useState([
    { id: 1, name: 'Musharof Chy', email: 'musharof@example.com', position: 'Multidisciplinary Web Entrepreneur', salary: ',500', office: 'USA', status: 'Hired' },
    { id: 2, name: 'Naimur Rahman', email: 'naimur@example.com', position: 'Website Front-end Developer', salary: ',500', office: 'USA', status: 'Hired' },
  ]);

  const columns1 = [
    { header: 'User', accessor: 'name' },
    { header: 'Position', accessor: 'position' },
    { header: 'Office', accessor: 'office' },
    { header: 'Age', accessor: 'age' },
    { header: 'Start date', accessor: 'startDate' },
    { header: 'Salary', accessor: 'salary' },
  ];

  const columns3 = [
    { 
      header: 'User', 
      accessor: 'name',
      renderCell: (row) => (
        <div>
          <h5 className="font-medium text-black dark:text-white">{row.name}</h5>
          <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{row.email}</p>
        </div>
      )
    },
    { header: 'Position', accessor: 'position' },
    { header: 'Salary', accessor: 'salary' },
    { header: 'Office', accessor: 'office' },
    { 
      header: 'Status', 
      accessor: 'status',
      renderCell: (row) => (
        <span className={'inline-block rounded px-2.5 py-0.5 text-sm font-medium ' + (row.status === 'Hired' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Data Tables
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <DataTable 
            title="Datatable 1" 
            columns={columns1} 
            data={[]} 
            searchable 
            rowsPerPageOptions={[10, 25]} 
            defaultRowsPerPage={10} 
          />
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <DataTable 
            title="Datatable 2" 
            columns={columns1} 
            data={initialData} 
            searchable 
            rowsPerPageOptions={[10, 25]} 
            defaultRowsPerPage={10}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <DataTable 
            title="Datatable 3" 
            columns={columns3} 
            data={dt3Data} 
            searchable 
            selectable
            rowsPerPageOptions={[10, 25]} 
            defaultRowsPerPage={10}
            headerActions={
              <button className="flex items-center gap-2 rounded border border-stroke py-1.5 px-4 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 text-black dark:text-white">
                Download <Download className="w-4 h-4" />
              </button>
            }
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    </>
  );
};
export default DataTables;
