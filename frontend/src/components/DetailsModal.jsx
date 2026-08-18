import { X } from 'lucide-react';

const DetailsModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  footer
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-default dark:bg-[#24303F] max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between border-b border-stroke pb-4 dark:border-[#2E3A47]">
          <h3 className="text-xl font-bold text-[#1C2434] dark:text-white">
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="py-2">
          {children}
        </div>
        
        {footer && (
          <div className="mt-6 flex justify-end gap-3 border-t border-stroke pt-4 dark:border-[#2E3A47]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;
