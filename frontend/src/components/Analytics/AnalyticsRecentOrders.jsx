import { useApi } from '../../hooks/useApi';
import DataTable from '../DataTable';

const getFlag = (countryCode) => {
  const flags = {
    us: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#FFF"/><rect width="10" height="8" fill="#0A3161"/><rect y="1.5" width="24" height="1.5" fill="#B31942"/><rect y="4.5" width="24" height="1.5" fill="#B31942"/><rect y="7.5" width="24" height="1.5" fill="#B31942"/><rect y="10.5" width="24" height="1.5" fill="#B31942"/><rect y="13.5" width="24" height="1.5" fill="#B31942"/></svg>,
    gb: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#012169"/><path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFF" strokeWidth="3"/><path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1"/><path d="M12,0 L12,16 M0,8 L24,8" stroke="#FFF" strokeWidth="4"/><path d="M12,0 L12,16 M0,8 L24,8" stroke="#C8102E" strokeWidth="2"/></svg>,
    fr: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="8" height="16" fill="#002395"/><rect x="8" width="8" height="16" fill="#FFF"/><rect x="16" width="8" height="16" fill="#ED2939"/></svg>,
    de: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="5.3" fill="#000"/><rect y="5.3" width="24" height="5.3" fill="#DD0000"/><rect y="10.6" width="24" height="5.3" fill="#FFCE00"/></svg>,
    fi: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="16" fill="#FFF"/><rect y="6" width="24" height="4" fill="#002F6C"/><rect x="6" width="4" height="16" fill="#002F6C"/></svg>,
    be: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="8" height="16" fill="#000"/><rect x="8" width="8" height="16" fill="#FDDA24"/><rect x="16" width="8" height="16" fill="#EF3340"/></svg>,
    in: <svg width="24" height="16" viewBox="0 0 24 16"><rect width="24" height="5.3" fill="#FF9933"/><rect y="5.3" width="24" height="5.3" fill="#FFF"/><rect y="10.6" width="24" height="5.3" fill="#138808"/><circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth="0.5"/></svg>,
  };
  return flags[countryCode] || <div className="w-6 h-4 bg-gray-200"></div>;
};

const AnalyticsRecentOrders = () => {
  const { data: orders = [], loading, error, fetchData: fetchOrders } = useApi('/analytics/recent-orders');

  const columns = [
    {
      header: 'Products',
      accessor: 'product',
      renderCell: (row) => <p className="text-sm font-semibold text-[#1C2434] dark:text-white">{row.product}</p>
    },
    {
      header: 'Category',
      accessor: 'category',
      renderCell: (row) => <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">{row.category}</p>
    },
    {
      header: 'Country',
      accessor: 'country',
      className: 'text-center',
      renderCell: (row) => (
        <div className="flex justify-center">
          {getFlag(row.country)}
        </div>
      )
    },
    {
      header: 'CR',
      accessor: 'cr',
      className: 'text-center',
      renderCell: (row) => <p className="text-sm text-[#64748B] dark:text-[#8A99AF] text-center">{row.cr}</p>
    },
    {
      header: 'Value',
      accessor: 'value',
      className: 'text-right',
      renderCell: (row) => <p className="text-sm font-medium text-[#10B981] text-right">{row.value}</p>
    }
  ];

  return (
    <div className="h-full">
      <DataTable
        title="Recent Orders"
        columns={columns}
        data={orders}
        loading={loading}
        error={error}
        onRetry={fetchOrders}
        searchable={false}
        headerClassName="h-full"
      />
    </div>
  );
};

export default AnalyticsRecentOrders;
