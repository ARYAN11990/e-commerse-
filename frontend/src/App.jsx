import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ECommerce from './pages/ECommerce';
import Analytics from './pages/Analytics';
import Marketing from './pages/Marketing';
import CRM from './pages/CRM';
import Stocks from './pages/Stocks';
import SaaS from './pages/SaaS';
import Logistics from './pages/Logistics';
import AI from './pages/AI';
import Sales from './pages/Sales';
import Finance from './pages/Finance';
import UserProfile from './pages/UserProfile';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F1F5F9] dark:bg-[#1A222C] text-[#64748B] dark:text-[#8A99AF] font-inter">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Routes>
              <Route path="/" element={<ECommerce />} />
              <Route path="/ecommerce" element={<ECommerce />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/saas" element={<SaaS />} />
              <Route path="/logistics" element={<Logistics />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
