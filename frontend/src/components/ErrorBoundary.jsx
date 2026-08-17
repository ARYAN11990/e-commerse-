import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-[#2E3A47] dark:bg-[#24303F] flex flex-col items-center justify-center text-center h-full min-h-[150px]">
          <AlertTriangle className="w-8 h-8 text-[#EF4444] mb-3" />
          <h4 className="text-lg font-bold text-[#1C2434] dark:text-white mb-1">
            Component Error
          </h4>
          <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">
            {this.state.error?.message || "Something went wrong loading this component."}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-opacity-90 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
