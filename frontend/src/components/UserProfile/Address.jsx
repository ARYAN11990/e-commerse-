import { Pencil } from 'lucide-react';

const Address = ({ data, onEdit }) => {
  if (!data) return <div className="h-40 bg-white dark:bg-[#24303F] rounded-xl border border-stroke dark:border-[#2E3A47] animate-pulse mb-6" />;

  return (
    <div className="rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 shadow-default mb-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-medium text-[#1C2434] dark:text-white text-lg">Address</h3>
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-1.5 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">Country</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.country}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">City/State</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.city_state}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">Postal Code</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.postal_code}</span>
        </div>
        <div>
          <span className="block text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-2">TAX ID</span>
          <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{data.tax_id}</span>
        </div>
      </div>
    </div>
  );
};

export default Address;
