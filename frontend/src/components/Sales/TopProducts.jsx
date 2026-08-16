import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/sales/top-products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'text-[#10B981] bg-[#10B981]/10';
      case 'Low Stock': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-[#64748B] dark:text-[#8A99AF] bg-gray-100';
    }
  };

  const getProductImage = (image) => {
    // Generate distinct simple colored boxes as placeholders based on the image string
    let bg = 'bg-gray-200';
    if(image.includes('jacket')) bg = 'bg-[#1C2434]';
    if(image.includes('pants')) bg = 'bg-[#64748B]';
    if(image.includes('shirt')) bg = 'bg-[#E2E8F0]';
    if(image.includes('boots')) bg = 'bg-[#3C50E0]';

    return (
      <div className={`w-12 h-12 rounded-md flex-shrink-0 flex items-center justify-center ${bg} overflow-hidden`}>
         <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white/50 stroke-current stroke-2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
         </svg>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">Top Products</h4>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] hover:text-[#1C2434] dark:hover:text-white dark:text-white whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
            </svg>
            Filter
          </button>
          <button className="rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] whitespace-nowrap">
            See All
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-stroke dark:border-[#2E3A47] text-left">
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] min-w-[220px]">Product Name</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Product ID</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Sales</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Earnings</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Stocks</th>
              <th className="py-4 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF]">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="border-b border-stroke dark:border-[#2E3A47] last:border-0 hover:bg-gray-50 dark:hover:bg-[#313D4A]/50">
                <td className="py-4 flex items-center gap-4">
                  {getProductImage(item.image)}
                  <div>
                    <h5 className="text-sm font-bold text-[#1C2434] dark:text-white">{item.name}</h5>
                    <p className="text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{item.variants}</p>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.product_id}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{item.sales}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#1C2434] dark:text-white">{item.earnings}</p>
                </td>
                <td className="py-4">
                  <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{item.stocks}</p>
                </td>
                <td className="py-4">
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
