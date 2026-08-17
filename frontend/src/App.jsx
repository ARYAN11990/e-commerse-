import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useAuth } from './context/AuthContext';

const ECommerce = lazy(() => import('./pages/ECommerce'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Marketing = lazy(() => import('./pages/Marketing'));
const CRM = lazy(() => import('./pages/CRM'));
const Stocks = lazy(() => import('./pages/Stocks'));
const SaaS = lazy(() => import('./pages/SaaS'));
const Logistics = lazy(() => import('./pages/Logistics'));
const AI = lazy(() => import('./pages/AI'));
const Sales = lazy(() => import('./pages/Sales'));
const Finance = lazy(() => import('./pages/Finance'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Users = lazy(() => import('./pages/Users'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { loading } = useAuth();
  
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#F1F5F9] dark:bg-[#1A222C]">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F1F5F9] dark:bg-[#1A222C] text-[#64748B] dark:text-[#8A99AF] font-inter">
      {!isAuthPage && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {!isAuthPage && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        
        <main>
          <div className={isAuthPage ? "" : "mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10"}>
            <Suspense fallback={
              <div className="flex h-full min-h-[500px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#3C50E0] border-t-transparent"></div>
              </div>
            }>
              <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

                {/* Protected Dashboard Routes */}
                <Route path="/" element={<ProtectedRoute><ECommerce /></ProtectedRoute>} />
                <Route path="/ecommerce" element={<ProtectedRoute><ECommerce /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/marketing" element={<ProtectedRoute><Marketing /></ProtectedRoute>} />
                <Route path="/crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
                <Route path="/stocks" element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
                <Route path="/saas" element={<ProtectedRoute><SaaS /></ProtectedRoute>} />
                <Route path="/logistics" element={<ProtectedRoute><Logistics /></ProtectedRoute>} />
                <Route path="/ai" element={<ProtectedRoute><AI /></ProtectedRoute>} />
                <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
                <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
