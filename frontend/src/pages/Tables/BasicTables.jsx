import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight as BreadcrumbRight, Search, Filter, MoreHorizontal, Trash2 } from 'lucide-react';

const dt1Data = [
  { id: 1, name: 'Lindsey Curtis', role: 'Web Designer', project: 'Agency Website', status: 'Active', budget: '3.9K', team: ['/images/user/user-01.png', '/images/user/user-02.png', '/images/user/user-03.png'] },
  { id: 2, name: 'Kaiya George', role: 'Project Manager', project: 'Technology', status: 'Pending', budget: '24.9K', team: ['/images/user/user-04.png', '/images/user/user-05.png'] },
  { id: 3, name: 'Zain Geidt', role: 'Content Writer', project: 'Blog Writing', status: 'Active', budget: '12.7K', team: ['/images/user/user-06.png'] },
  { id: 4, name: 'Abram Schleifer', role: 'Digital Marketer', project: 'Social Media', status: 'Cancel', budget: '2.8K', team: ['/images/user/user-01.png', '/images/user/user-02.png', '/images/user/user-03.png'] },
  { id: 5, name: 'Carla George', role: 'Front-end Developer', project: 'Website', status: 'Active', budget: '4.6K', team: ['/images/user/user-04.png', '/images/user/user-05.png', '/images/user/user-06.png'] },
];

const dt2Data = [
  { id: 'DE124321', customer: 'John Doe', email: 'johndoe@gmail.com', initials: 'JD', color: 'bg-primary', product: 'Software License', value: '$18,50.34', date: '2024-06-15', status: 'Complete' },
  { id: 'DE124322', customer: 'Kierra Franci', email: 'kierra@gmail.com', initials: 'KF', color: 'bg-danger', product: 'Software License', value: '$10,50.34', date: '2024-06-15', status: 'Complete' },
  { id: 'DE124323', customer: 'Emerson Workman', email: 'emerson@gmail.com', initials: 'EW', color: 'bg-success', product: 'Software License', value: '$18,50.34', date: '2024-06-15', status: 'Pending' },
  { id: 'DE124324', customer: 'Chance Philips', email: 'chance@gmail.com', initials: 'CP', color: 'bg-warning', product: 'Software License', value: '$10,50.34', date: '2024-06-15', status: 'Complete' },
  { id: 'DE124325', customer: 'Terry Oubill', email: 'terry@gmail.com', initials: 'TO', color: 'bg-success', product: 'Software License', value: '$18,50.34', date: '2024-06-15', status: 'Complete' },
];

const dt3Data = [
  { name: 'Bought PYPL', date: 'Nov 23, 01:00 PM', price: '$2,367.88', category: 'Finance', status: 'Success', icon: 'B', color: 'bg-primary' },
  { name: 'Bought AAPL', date: 'Nov 22, 09:00 PM', price: '$2,367.88', category: 'Technology', status: 'Pending', icon: 'A', color: 'bg-[#13C296]' },
  { name: 'Sell KXST', date: 'Oct 12, 08:34 PM', price: '$6,754.99', category: 'Finance', status: 'Success', icon: 'K', color: 'bg-success' },
  { name: 'Bought FB', date: 'Sep 09, 02:00 AM', price: '$1,440.41', category: 'Social media', status: 'Success', icon: 'f', color: 'bg-primary' },
  { name: 'Sell AMZN', date: 'Feb 25, 08:00 PM', price: '$5,698.55', category: 'E-commerce', status: 'Failed', icon: 'a', color: 'bg-warning' },
];

const dt4Data = [
  { creator: 'Vilson Gouse', campaign: 'Grow your brand by...', type: 'Ads campaign', status: 'Success' },
  { creator: 'Terry Franci', campaign: 'Irinka Reifer Mens...', type: 'Ads campaign', status: 'Pending' },
  { creator: 'Alena Franci', campaign: 'Increase your website tra...', type: 'Ads campaign', status: 'Success' },
  { creator: 'Jocelyn Kenter', campaign: 'Digital Marketing that...', type: 'Ads campaign', status: 'Failed' },
  { creator: 'Brandon Philips', campaign: 'Self branding', type: 'Ads campaign', status: 'Success' },
  { creator: 'James Lipshutz', campaign: 'Increase your website tra...', type: 'Ads campaign', status: 'Success' },
];

const dt5Data = [
  { product: 'TailGrids', category: 'UI Kit', country: 'us', cr: 'Dashboard', value: '$12,499' },
  { product: 'GrayGrids', category: 'Templates', country: 'de', cr: 'Dashboard', value: '$9,486' },
  { product: 'UIdeck', category: 'Templates', country: 'gb', cr: 'Dashboard', value: '$4,521' },
  { product: 'FormBold', category: 'SaaS', country: 'fi', cr: 'Dashboard', value: '$15,843' },
  { product: 'NextAdmin', category: 'Dashboard', country: 'fi', cr: 'Dashboard', value: '$7,523' },
  { product: 'Form Builder', category: 'SaaS', country: 'be', cr: 'Dashboard', value: '$1,377' },
  { product: 'AyroUI', category: 'UI Kit', country: 'bd', cr: 'Dashboard', value: '$999.00' },
];

const BasicTables = () => {
  const [selectedDt2, setSelectedDt2] = useState(new Set());
  
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Basic Tables</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <BreadcrumbRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Basic Tables</span>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        
        {/* Basic Table 1 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Basic Table 1</h4>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">User</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Project Name</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Team</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Budget</th>
                </tr>
              </thead>
              <tbody>
                {dt1Data.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex-shrink-0 bg-gray">
                          <img src={`https://ui-avatars.com/api/?name=${item.name.replace(' ','+')}&background=random`} alt="User" className="rounded-full w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-black dark:text-white">{item.name}</p>
                          <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{item.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.project}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex -space-x-2">
                        {item.team.map((_, i) => (
                          <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-boxdark bg-gray">
                            <img src={`https://ui-avatars.com/api/?name=User&background=random`} alt="User" className="rounded-full w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        item.status === 'Active' ? 'bg-success text-success' :
                        item.status === 'Pending' ? 'bg-warning text-warning' : 'bg-danger text-danger'
                      }`}>
                        {item.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.budget}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic Table 2 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h4 className="text-xl font-semibold text-black dark:text-white">Basic Table 2</h4>
          </div>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="text-xl font-semibold text-black dark:text-white">Recent Orders</h4>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search..." className="w-full sm:w-64 rounded-md border border-stroke bg-transparent py-2 pl-9 pr-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4" />
              </div>
              <button className="flex items-center gap-2 rounded-md border border-stroke py-2 px-4 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 text-black dark:text-white">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          </div>
          
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 xl:pl-6 w-[50px]">
                    <input 
                      type="checkbox" 
                      className="rounded border-stroke cursor-pointer" 
                    />
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Order ID</th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Customer</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Product/Service</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Total Value</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Order Date</th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {dt2Data.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-6">
                      <input 
                        type="checkbox" 
                        className="rounded border-stroke cursor-pointer"
                        checked={selectedDt2.has(item.id)}
                        onChange={() => {
                          const newSet = new Set(selectedDt2);
                          if (newSet.has(item.id)) newSet.delete(item.id);
                          else newSet.add(item.id);
                          setSelectedDt2(newSet);
                        }}
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="font-medium text-black dark:text-white">{item.id}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${item.color}`}>
                          {item.initials}
                        </div>
                        <div>
                          <p className="font-medium text-black dark:text-white">{item.customer}</p>
                          <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.product}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="font-medium text-black dark:text-white">{item.value}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.date}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium ${
                        item.status === 'Complete' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                      <button className="hover:text-primary"><Trash2 className="w-5 h-5 text-gray-500 hover:text-danger" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic Table 3 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="text-xl font-semibold text-black dark:text-white">Basic Table 3</h4>
          </div>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="text-xl font-semibold text-black dark:text-white">Latest Transactions</h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="w-full sm:w-64 rounded-md border border-stroke bg-transparent py-2 pl-9 pr-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4" />
            </div>
          </div>
          
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-stroke dark:border-strokedark">
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-6">Name</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Price</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Category</th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                  <th className="py-4 px-4 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {dt3Data.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-6">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${item.color}`}>
                          {item.icon}
                        </div>
                        <p className="font-medium text-black dark:text-white">{item.name}</p>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.date}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="font-medium text-black dark:text-white">{item.price}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.category}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className={`inline-flex rounded px-2.5 py-0.5 text-sm font-medium ${
                        item.status === 'Success' ? 'bg-success/10 text-success' :
                        item.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                      <button className="text-gray-500 hover:text-black dark:hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <button className="flex items-center justify-center rounded px-3 py-1.5 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition">
              &larr; Previous
            </button>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center rounded bg-[#EFF4FB] dark:bg-meta-4 py-1 px-3 font-medium text-primary">1</button>
              <button className="flex items-center justify-center rounded py-1 px-3 font-medium text-black hover:bg-gray dark:text-white dark:hover:bg-meta-4">2</button>
              <button className="flex items-center justify-center rounded py-1 px-3 font-medium text-black hover:bg-gray dark:text-white dark:hover:bg-meta-4">3</button>
              <span className="text-black dark:text-white">...</span>
              <button className="flex items-center justify-center rounded py-1 px-3 font-medium text-black hover:bg-gray dark:text-white dark:hover:bg-meta-4">8</button>
              <button className="flex items-center justify-center rounded py-1 px-3 font-medium text-black hover:bg-gray dark:text-white dark:hover:bg-meta-4">9</button>
              <button className="flex items-center justify-center rounded py-1 px-3 font-medium text-black hover:bg-gray dark:text-white dark:hover:bg-meta-4">10</button>
            </div>
            <button className="flex items-center justify-center rounded px-3 py-1.5 border border-stroke bg-transparent hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 transition">
              Next &rarr;
            </button>
          </div>
        </div>

        {/* Basic Table 4 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="text-xl font-semibold text-black dark:text-white">Basic Table 4</h4>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">Featured Campaigns</h4>
            <button className="text-gray-500 hover:text-black dark:hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-stroke dark:border-strokedark">
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-6">Creator</th>
                  <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white">Campaign</th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {dt4Data.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex-shrink-0 bg-gray">
                          <img src={`https://ui-avatars.com/api/?name=${item.creator.replace(' ','+')}&background=random`} alt="Creator" className="rounded-full w-full h-full object-cover" />
                        </div>
                        <p className="font-medium text-black dark:text-white">{item.creator}</p>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full text-white bg-primary">
                          {item.campaign.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-black dark:text-white">{item.campaign}</p>
                          <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{item.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                      <span className={`inline-flex font-medium ${
                        item.status === 'Success' ? 'text-success' :
                        item.status === 'Pending' ? 'text-warning' : 'text-danger'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic Table 5 */}
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="text-xl font-semibold text-black dark:text-white">Basic Table 5</h4>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">Recent Orders</h4>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-md border border-stroke py-2 px-4 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 text-black dark:text-white">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="rounded-md border border-stroke py-2 px-4 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 text-black dark:text-white font-medium">
                See all
              </button>
            </div>
          </div>
          
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4 border-b border-stroke dark:border-strokedark">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-6">Products</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Category</th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-center">Country</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">CR</th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {dt5Data.map((item, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-6">
                      <p className="font-medium text-black dark:text-white">{item.product}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-[#64748B] dark:text-[#8A99AF]">{item.category}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                      <img src={`https://flagcdn.com/24x18/${item.country}.png`} alt={item.country} className="mx-auto" />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                      <p className="text-[#64748B] dark:text-[#8A99AF]">{item.cr}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                      <p className="font-medium text-success">{item.value}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};

export default BasicTables;
