import React from 'react';
import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';

const DataState = ({ 
  loading, 
  error, 
  onRetry, 
  isEmpty, 
  skeleton, 
  children,
  emptyMessage = "No data available",
  className = ""
}) => {
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] ${className}`}>
        <AlertCircle className="w-10 h-10 text-[#EF4444] mb-3 opacity-80" />
        <h4 className="text-lg font-semibold text-[#1C2434] dark:text-white mb-1">Failed to load data</h4>
        <p className="text-sm text-[#64748B] dark:text-[#8A99AF] mb-4 text-center max-w-sm">
          {error}
        </p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 bg-[#3C50E0] hover:bg-opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    if (skeleton) return <>{skeleton}</>;
    // Generic fallback skeleton if none provided
    return (
      <div className={`rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-6 animate-pulse ${className}`}>
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] ${className}`}>
        <div className="w-12 h-12 rounded-full bg-[#F1F5F9] dark:bg-[#1A222C] flex items-center justify-center mb-3">
          <Inbox className="w-6 h-6 text-[#64748B] dark:text-[#8A99AF]" />
        </div>
        <p className="text-[#64748B] dark:text-[#8A99AF] font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataState;
