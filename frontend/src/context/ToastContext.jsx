import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

const ToastItem = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-[#34D399]" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-[#F87171]" />;
      default: return <Info className="w-5 h-5 text-[#3B82F6]" />;
    }
  };

  const getBorder = () => {
    switch (toast.type) {
      case 'success': return 'border-[#34D399]';
      case 'error': return 'border-[#F87171]';
      default: return 'border-[#3B82F6]';
    }
  };

  return (
    <div className={`flex items-center justify-between w-80 bg-white dark:bg-[#1A222C] border-l-4 ${getBorder()} shadow-lg rounded-r-md px-4 py-3 transform transition-all duration-300 ease-in-out translate-x-0 opacity-100`}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <p className="text-sm font-medium text-[#1C2434] dark:text-white">
          {toast.message}
        </p>
      </div>
      <button onClick={() => onRemove(toast.id)} className="text-[#64748B] hover:text-[#1C2434] dark:hover:text-white transition">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
