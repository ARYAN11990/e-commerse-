import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { TaskProvider } from './context/TaskContext';

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
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));
const CalendarApp = lazy(() => import('./pages/CalendarApp'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const VerifyEmail = lazy(() => import('./pages/Auth/VerifyEmail'));

const TaskList = lazy(() => import('./pages/Task/TaskList'));
const TaskKanban = lazy(() => import('./pages/Task/TaskKanban'));

const FormElements = lazy(() => import('./pages/Forms/FormElements'));
const FormLayout = lazy(() => import('./pages/Forms/FormLayout'));

const BasicTables = lazy(() => import('./pages/Tables/BasicTables'));
const DataTables = lazy(() => import('./pages/Tables/DataTables'));

// Ecommerce Sub-pages
const Products = lazy(() => import('./pages/Ecommerce/Products'));
const AddProduct = lazy(() => import('./pages/Ecommerce/AddProduct'));
const Billing = lazy(() => import('./pages/Ecommerce/Billing'));
const Invoices = lazy(() => import('./pages/Ecommerce/Invoices'));
const SingleInvoice = lazy(() => import('./pages/Ecommerce/SingleInvoice'));
const CreateInvoice = lazy(() => import('./pages/Ecommerce/CreateInvoice'));
const Transactions = lazy(() => import('./pages/Ecommerce/Transactions'));
const SingleTransaction = lazy(() => import('./pages/Ecommerce/SingleTransaction'));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { loading } = useAuth();
  
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'].includes(location.pathname);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#F1F5F9] dark:bg-[#1A222C]">Loading...</div>;
  }

  return (
    <ToastProvider>
      <TaskProvider>
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
              <ErrorBoundary>
                <Routes>
                  {/* Public Auth Routes */}
                  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                  <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                  <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                  <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
                  <Route path="/verify-email" element={<PublicRoute><VerifyEmail /></PublicRoute>} />

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
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                  <Route path="/calendar" element={<ProtectedRoute><CalendarApp /></ProtectedRoute>} />

                  {/* Task Routes */}
                  <Route path="/task/list" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
                  <Route path="/task/kanban" element={<ProtectedRoute><TaskKanban /></ProtectedRoute>} />

                  {/* Forms Routes */}
                  <Route path="/forms/elements" element={<ProtectedRoute><FormElements /></ProtectedRoute>} />
                  <Route path="/forms/layout" element={<ProtectedRoute><FormLayout /></ProtectedRoute>} />

                  {/* Tables Routes */}
                  <Route path="/tables/basic-tables" element={<ProtectedRoute><BasicTables /></ProtectedRoute>} />
                  <Route path="/tables/data-tables" element={<ProtectedRoute><DataTables /></ProtectedRoute>} />

                  {/* Ecommerce Sub-pages Routes */}
                  <Route path="/ecommerce/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                  <Route path="/ecommerce/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                  <Route path="/ecommerce/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
                  <Route path="/ecommerce/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
                  <Route path="/ecommerce/single-invoice" element={<ProtectedRoute><SingleInvoice /></ProtectedRoute>} />
                  <Route path="/ecommerce/create-invoice" element={<ProtectedRoute><CreateInvoice /></ProtectedRoute>} />
                  <Route path="/ecommerce/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                  <Route path="/ecommerce/single-transaction" element={<ProtectedRoute><SingleTransaction /></ProtectedRoute>} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
    </TaskProvider>
    </ToastProvider>
  );
}

export default App;
