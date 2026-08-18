import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight as BreadcrumbRight, Search, ChevronUp, ChevronDown, Edit, Trash2, Download } from 'lucide-react';

const initialData = [
  { id: 1, name: 'Abram Schleifer', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'Edinburgh', age: 57, startDate: '25 Apr, 2027', salary: '$89,500', status: 'Hired' },
  { id: 2, name: 'Abram Schleifer', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'Edinburgh', age: 57, startDate: '25 Apr, 2027', salary: '$89,500', status: 'Hired' },
  { id: 3, name: 'Abram Schleifer', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'Edinburgh', age: 57, startDate: '25 Apr, 2027', salary: '$89,500', status: 'Hired' },
  { id: 4, name: 'Carla George', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'London', age: 45, startDate: '11 May, 2027', salary: '$15,500', status: 'Pending' },
  { id: 5, name: 'Carla George', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'London', age: 45, startDate: '11 May, 2027', salary: '$15,500', status: 'Pending' },
  { id: 6, name: 'Carla George', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'London', age: 45, startDate: '11 May, 2027', salary: '$15,500', status: 'Pending' },
  { id: 7, name: 'Ekstrom Bothman', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'San Francisco', age: 53, startDate: '15 Nov, 2027', salary: '$19,200', status: 'Hired' },
  { id: 8, name: 'Ekstrom Bothman', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'San Francisco', age: 53, startDate: '15 Nov, 2027', salary: '$19,200', status: 'Hired' },
  { id: 9, name: 'Ekstrom Bothman', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'San Francisco', age: 53, startDate: '15 Nov, 2027', salary: '$19,200', status: 'Hired' },
  { id: 10, name: 'Emery Culhane', email: 'demoemail@gmail.com', position: 'Sales Assistant', office: 'New York', age: 45, startDate: '29 Jun, 2027', salary: '$23,500', status: 'Hired' },
];

const dt3Data = [
  { id: 1, name: 'Abram Schleifer', email: 'demoemail@gmail.com', position: 'Software Engineer', salary: '$89,500', office: 'Edinburgh', status: 'Hired' },
  { id: 2, name: 'Abram Schleifer', email: 'demoemail@gmail.com', position: 'Software Engineer', salary: '$89,500', office: 'Edinburgh', status: 'Hired' },
  { id: 3, name: 'Abram Schleifer', email: 'demoemail@gmail.com', position: 'Software Engineer', salary: '$89,500', office: 'Edinburgh', status: 'Hired' },
  { id: 4, name: 'Carla George', email: 'demoemail@gmail.com', position: 'Integration Specialist', salary: '$15,500', office: 'London', status: 'Pending' },
  { id: 5, name: 'Carla George', email: 'demoemail@gmail.com', position: 'Integration Specialist', salary: '$15,500', office: 'London', status: 'Pending' },
  { id: 6, name: 'Carla George', email: 'demoemail@gmail.com', position: 'Integration Specialist', salary: '$15,500', office: 'London', status: 'Pending' },
  { id: 7, name: 'Ekstrom Bothman', email: 'demoemail@gmail.com', position: 'Sales Assistant', salary: '$19,200', office: 'San Francisco', status: 'Hired' },
  { id: 8, name: 'Ekstrom Bothman', email: 'demoemail@gmail.com', position: 'Sales Assistant', salary: '$19,200', office: 'San Francisco', status: 'Hired' },
  { id: 9, name: 'Ekstrom Bothman', email: 'demoemail@gmail.com', position: 'Sales Assistant', salary: '$19,200', office: 'San Francisco', status: 'Hired' },
  { id: 10, name: 'Emery Culhane', email: 'demoemail@gmail.com', position: 'Pre-Sales Support', salary: '$23,500', office: 'New York', status: 'Hired' },
];

const SortIcon = () => (
  <div className="inline-flex flex-col space-y-[2px] ml-2 opacity-50">
    <ChevronUp className="w-2.5 h-2.5" />
    <ChevronDown className="w-2.5 h-2.5" />
  </div>
);

const DataTables = () => {
  const [searchTerm2, setSearchTerm2] = useState('');
  const [searchTerm3, setSearchTerm3] = useState('');

  const [selectedDt3, setSelectedDt3] = useState(new Set());

  const handleSelectDt3 = (id) => {
    const newSet = new Set(selectedDt3);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedDt3(newSet);
  };

  const handleSelectAllDt3 = () => {
    if (selectedDt3.size === dt3Data.length) {
      setSelectedDt3(new Set());
    } else {
      setSelectedDt3(new Set(dt3Data.map(d => d.id)));
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Data Tables</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <BreadcrumbRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Data Tables</span>
        </div>
      </div>

      <div className="flex flex-col gap-9">
        
        {/* Datatable 1 */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Datatable 1</h3>
          </div>
          <div className="p-6.5">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-black dark:text-white">
                Show 
                <div className="relative">
                  <select className="appearance-none rounded border border-stroke bg-transparent py-1.5 pl-3 pr-8 outline-none dark:border-strokedark dark:bg-form-input">
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div> 
                entries
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search..." className="w-full sm:w-64 rounded border border-stroke bg-transparent py-1.5 pl-9 pr-3 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input" />
              </div>
            </div>
            
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-6 cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">User <SortIcon /></th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Position <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Office <SortIcon /></th>
                    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Age <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Start date <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Salary <SortIcon /></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty state matches reference which says "Showing to of entries" but shows no rows */}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              <p className="text-sm text-black dark:text-white">Showing 0 to 0 of 0 entries</p>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center rounded p-2 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition opacity-50 cursor-not-allowed">
                  &larr;
                </button>
                <button className="flex items-center justify-center rounded bg-primary py-1.5 px-3 font-medium text-white">
                  1
                </button>
                <button className="flex items-center justify-center rounded p-2 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition opacity-50 cursor-not-allowed">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Datatable 2 */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Datatable 2</h3>
          </div>
          <div className="p-6.5">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-black dark:text-white">
                Show 
                <div className="relative">
                  <select className="appearance-none rounded border border-stroke bg-transparent py-1.5 pl-3 pr-8 outline-none dark:border-strokedark dark:bg-form-input">
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div> 
                entries
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm2}
                  onChange={(e) => setSearchTerm2(e.target.value)}
                  className="w-full sm:w-64 rounded border border-stroke bg-transparent py-1.5 pl-9 pr-3 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input" 
                />
              </div>
            </div>
            
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-6 cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80 border-b border-[#eee] dark:border-strokedark">User <SortIcon /></th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80 border-b border-[#eee] dark:border-strokedark">Position <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80 border-b border-[#eee] dark:border-strokedark">Office <SortIcon /></th>
                    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80 border-b border-[#eee] dark:border-strokedark">Age <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80 border-b border-[#eee] dark:border-strokedark">Start date <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80 border-b border-[#eee] dark:border-strokedark">Salary <SortIcon /></th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white border-b border-[#eee] dark:border-strokedark text-right">Action <SortIcon /></th>
                  </tr>
                </thead>
                <tbody>
                  {initialData.filter(d => d.name.toLowerCase().includes(searchTerm2.toLowerCase()) || d.position.toLowerCase().includes(searchTerm2.toLowerCase())).map((row) => (
                    <tr key={row.id}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-6 text-black dark:text-white font-medium">{row.name}</td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.position}</td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.office}</td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.age}</td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.startDate}</td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.salary}</td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                        <div className="flex items-center justify-end space-x-3.5">
                          <button className="hover:text-primary"><Trash2 className="w-4 h-4" /></button>
                          <button className="hover:text-primary"><Edit className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center rounded px-3 py-1.5 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition">
                  Previous
                </button>
                <button className="flex items-center justify-center rounded bg-primary py-1.5 px-3 font-medium text-white">
                  1
                </button>
                <button className="flex items-center justify-center rounded py-1.5 px-3 font-medium text-black hover:bg-gray dark:text-white dark:hover:bg-meta-4">
                  2
                </button>
                <button className="flex items-center justify-center rounded px-3 py-1.5 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition">
                  Next
                </button>
              </div>
              <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">Showing 1 to 10 of 30 entries</p>
            </div>
          </div>
        </div>

        {/* Datatable 3 */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Datatable 3</h3>
          </div>
          <div className="p-6.5">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-black dark:text-white">
                Show 
                <div className="relative">
                  <select className="appearance-none rounded border border-stroke bg-transparent py-1.5 pl-3 pr-8 outline-none dark:border-strokedark dark:bg-form-input">
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div> 
                entries
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm3}
                    onChange={(e) => setSearchTerm3(e.target.value)}
                    className="w-full sm:w-64 rounded border border-stroke bg-transparent py-1.5 pl-9 pr-3 outline-none focus:border-primary dark:border-strokedark dark:bg-form-input" 
                  />
                </div>
                <button className="flex items-center gap-2 rounded border border-stroke py-1.5 px-4 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 text-black dark:text-white">
                  Download <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-stroke dark:border-strokedark">
                    <th className="py-4 px-4 xl:pl-6 w-[50px]">
                      <input 
                        type="checkbox" 
                        className="rounded border-stroke cursor-pointer" 
                        checked={selectedDt3.size === dt3Data.length && dt3Data.length > 0}
                        onChange={handleSelectAllDt3}
                      />
                    </th>
                    <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">User <SortIcon /></th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Position <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Salary <SortIcon /></th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Office <SortIcon /></th>
                    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer hover:bg-gray-3 dark:hover:bg-meta-4/80">Status <SortIcon /></th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white text-right">Action <SortIcon /></th>
                  </tr>
                </thead>
                <tbody>
                  {dt3Data.filter(d => d.name.toLowerCase().includes(searchTerm3.toLowerCase()) || d.position.toLowerCase().includes(searchTerm3.toLowerCase())).map((row) => (
                    <tr key={row.id}>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark xl:pl-6">
                        <input 
                          type="checkbox" 
                          className="rounded border-stroke cursor-pointer"
                          checked={selectedDt3.has(row.id)}
                          onChange={() => handleSelectDt3(row.id)}
                        />
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">{row.name}</h5>
                        <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{row.email}</p>
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.position}</td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.salary}</td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-[#64748B] dark:text-[#8A99AF]">{row.office}</td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                        <span className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium ${row.status === 'Hired' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-right">
                        <div className="flex items-center justify-end space-x-3.5">
                          <button className="hover:text-primary"><Trash2 className="w-4 h-4" /></button>
                          <button className="hover:text-primary"><Edit className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">Showing 1 to 10 of 30 entries</p>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center rounded px-3 py-1.5 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition">
                  Previous
                </button>
                <button className="flex items-center justify-center rounded bg-primary py-1.5 px-3 font-medium text-white">
                  1
                </button>
                <button className="flex items-center justify-center rounded py-1.5 px-3 font-medium text-black hover:bg-gray dark:text-white dark:hover:bg-meta-4">
                  2
                </button>
                <button className="flex items-center justify-center rounded px-3 py-1.5 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default DataTables;
