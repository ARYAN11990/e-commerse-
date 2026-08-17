import React from 'react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed?', 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  isDanger = false 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[999] bg-black/50 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white p-8 shadow-default dark:bg-[#24303F] text-center">
        <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
          {title}
        </h3>
        <p className="mb-6 text-[#64748B] dark:text-[#8A99AF]">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="w-full rounded border border-stroke px-4 py-2 font-medium text-black transition hover:bg-gray-50 dark:border-[#2E3A47] dark:text-white dark:hover:bg-[#313D4A]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`w-full rounded px-4 py-2 font-medium text-white transition hover:bg-opacity-90 ${
              isDanger ? 'bg-danger' : 'bg-primary'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
