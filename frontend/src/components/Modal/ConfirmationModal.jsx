import React, { useState, useEffect } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, description, confirmText, confirmStyle = 'danger', requireTyping = false, loading = false }) => {
  const [typedValue, setTypedValue] = useState('');
  
  useEffect(() => {
    if (!isOpen) {
      setTypedValue('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const isConfirmDisabled = requireTyping ? typedValue !== 'DELETE' : false;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={!loading ? onClose : undefined} aria-hidden="true"></div>
      <div 
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg bg-white dark:bg-[#24303F] p-6 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h3 id="modal-title" className="text-xl font-bold text-[#1C2434] dark:text-white mb-4">{title}</h3>
        <p className="text-[#64748B] dark:text-[#8A99AF] mb-6 leading-relaxed">{description}</p>
        
        {requireTyping && (
          <div className="mb-6">
            <label htmlFor="confirm-delete" className="block text-sm font-medium text-[#1C2434] dark:text-white mb-2">
              Type <strong className="text-danger">DELETE</strong> to confirm:
            </label>
            <input 
              id="confirm-delete"
              type="text" 
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-md border border-stroke bg-transparent py-2 px-4 outline-none focus:border-danger dark:border-[#2E3A47] dark:focus:border-danger text-black dark:text-white"
              disabled={loading}
            />
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose}
            disabled={loading}
            className="rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isConfirmDisabled || loading}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50 ${
              confirmStyle === 'danger' ? 'bg-danger hover:bg-opacity-90' : 'bg-primary hover:bg-opacity-90'
            }`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
