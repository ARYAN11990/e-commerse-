import { useState, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import DataState from '../DataState';
import DataTable from '../DataTable';

const DeliveryActivities = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const { data: activities = [], loading, error, fetchData } = useApi('/logistics/activities');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-[#10B981]';
      case 'In-Transit':
      case 'In Transit': return 'text-[#F59E0B]';
      case 'Pending': return 'text-[#3C50E0]';
      case 'Processing': return 'text-[#818CF8]';
      default: return 'text-[#64748B] dark:text-[#8A99AF]';
    }
  };

  const filteredData = useMemo(() => {
    if (!activities) return [];
    if (activeTab === 'All') return activities;
    return activities.filter(item => {
      // Handle the dash variation
      const itemStatus = item.status === 'In Transit' ? 'In-Transit' : item.status;
      return itemStatus === activeTab;
    });
  }, [activities, activeTab]);

  const columns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Category', accessor: 'category' },
    { header: 'Company', accessor: 'company' },
    { header: 'Arrival Time', accessor: 'arrival' },
    { header: 'Route', accessor: 'route' },
    { header: 'Price', accessor: 'price' },
    { 
      header: 'Status', 
      accessor: 'status',
      renderCell: (row) => (
        <span className={'text-xs font-medium ' + getStatusColor(row.status)}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] pt-6 shadow-default">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 px-5 sm:px-7.5">
        <div>
          <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Delivery Activities</h4>
          <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Track your recent shipping activities</span>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="flex bg-[#F1F5F9] dark:bg-[#1A222C] rounded-md p-1 min-w-max">
            {['All', 'Delivered', 'In-Transit', 'Pending', 'Processing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={'px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ' + (
                  activeTab === tab ? 'bg-white dark:bg-[#24303F] shadow-sm text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className={'flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ' + (filterOpen ? 'bg-gray-50 dark:bg-[#313D4A] text-[#1C2434] dark:text-white' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] hover:text-[#1C2434] dark:hover:text-white dark:text-white')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <DataState 
        loading={loading} 
        error={error} 
        onRetry={fetchData} 
        isEmpty={filteredData.length === 0} 
      >
        <DataTable columns={columns} data={filteredData} selectable={true} />
      </DataState>
    </div>
  );
};

export default DeliveryActivities;
