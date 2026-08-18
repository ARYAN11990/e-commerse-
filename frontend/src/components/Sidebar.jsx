import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Calendar, User, Users, CheckSquare, FileText, Table, File, ChevronUp, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [ecommerceOpen, setEcommerceOpen] = useState(true);
  const [taskOpen, setTaskOpen] = useState(false);
  const [formsOpen, setFormsOpen] = useState(false);
  const [tablesOpen, setTablesOpen] = useState(true);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />
      
      <aside
        className={`absolute left-0 top-0 z-30 flex h-screen flex-col overflow-y-hidden bg-white dark:bg-[#24303F] border-r border-stroke dark:border-[#2E3A47] duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen 
            ? 'translate-x-0 w-72 lg:w-0 lg:border-none lg:opacity-0 lg:overflow-hidden' 
            : '-translate-x-full w-72 lg:w-72'
        }`}
      >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 mt-5">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="bg-[#3C50E0] p-1.5 rounded-lg w-9 h-9 flex items-center justify-center">
            {/* Custom Logo approximation */}
            <div className="flex gap-0.5 items-end h-4">
              <div className="w-1 h-3 bg-white dark:bg-[#24303F] rounded-sm"></div>
              <div className="w-1 h-4 bg-white dark:bg-[#24303F] rounded-sm"></div>
              <div className="w-1 h-2 bg-white dark:bg-[#24303F] rounded-sm"></div>
            </div>
          </div>
          <span className="text-[#1C2434] dark:text-white text-2xl font-bold">TailAdmin</span>
        </NavLink>
      </div>

      {/* Sidebar Menu */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">MENU</h3>
            
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Dashboard Dropdown (Expanded) */}
              <li>
                <div 
                  className={`group relative flex items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium cursor-pointer ${
                    dashboardOpen 
                      ? 'bg-[#F1F5F9] dark:bg-[#1A222C] text-[#3C50E0]' 
                      : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                  }`}
                  onClick={() => setDashboardOpen(!dashboardOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </div>
                  {dashboardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                </div>
                {/* Dropdown Items */}
                <div className={`mt-2 pl-9 pr-4 ${dashboardOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink
                        to="/ecommerce"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive || window.location.pathname === '/' 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        eCommerce
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Analytics
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/marketing"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Marketing
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/crm"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        CRM
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/stocks"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Stocks
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/saas"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        SaaS
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/logistics"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Logistics
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/ai"
                        className={({ isActive }) =>
                          `flex justify-between items-center rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        AI
                        <span className="rounded-md bg-[#3C50E0] px-2 py-0.5 text-xs font-medium text-white">Pro</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/sales"
                        className={({ isActive }) =>
                          `flex justify-between items-center rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Sales
                        <span className="rounded-md bg-[#10B981]/10 px-2 py-0.5 text-xs font-medium text-[#10B981]">NEW</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/finance"
                        className={({ isActive }) =>
                          `flex justify-between items-center rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Finance
                        <span className="rounded-md bg-[#10B981]/10 px-2 py-0.5 text-xs font-medium text-[#10B981]">NEW</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* E-commerce Dropdown (Expanded) */}
              <li>
                <div 
                  className={`group relative flex items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium cursor-pointer ${
                    ecommerceOpen 
                      ? 'bg-[#F1F5F9] dark:bg-[#1A222C] text-[#3C50E0]' 
                      : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                  }`}
                  onClick={() => setEcommerceOpen(!ecommerceOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingCart className="w-5 h-5" />
                    E-commerce
                  </div>
                  {ecommerceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                </div>
                {/* Dropdown Items */}
                <div className={`mt-2 pl-9 pr-4 ${ecommerceOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      { path: '/ecommerce/products', name: 'Products' },
                      { path: '/ecommerce/add-product', name: 'Add Product' },
                      { path: '/ecommerce/billing', name: 'Billing' },
                      { path: '/ecommerce/invoices', name: 'Invoices' },
                      { path: '/ecommerce/single-invoice', name: 'Single Invoice' },
                      { path: '/ecommerce/create-invoice', name: 'Create Invoice' },
                      { path: '/ecommerce/transactions', name: 'Transactions' },
                      { path: '/ecommerce/single-transaction', name: 'Single Transaction' },
                    ].map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                              isActive 
                                ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                                : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                            }`
                          }
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/users" className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                    isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                  }`
                }>
                  <Users className="w-5 h-5" />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/calendar" className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                    isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                  }`
                }>
                  <Calendar className="w-5 h-5" />
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">
                  <User className="w-5 h-5" />
                  User Profile
                </NavLink>
              </li>
              <li>
                <div 
                  className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray hover:text-[#1C2434] dark:hover:bg-meta-4 dark:hover:text-white ${taskOpen ? 'bg-gray dark:bg-meta-4 text-[#1C2434] dark:text-white' : ''}`}
                  onClick={() => setTaskOpen(!taskOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckSquare className="w-5 h-5" />
                    Task
                  </div>
                  {taskOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                </div>
                {/* Task Dropdown */}
                <div className={`mt-2 pl-9 pr-4 ${taskOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink
                        to="/task/list"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/task/kanban"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Kanban
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div 
                  className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray hover:text-[#1C2434] dark:hover:bg-meta-4 dark:hover:text-white ${formsOpen ? 'bg-gray dark:bg-meta-4 text-[#1C2434] dark:text-white' : ''}`}
                  onClick={() => setFormsOpen(!formsOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5" />
                    Forms
                  </div>
                  {formsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                </div>
                {/* Forms Dropdown */}
                <div className={`mt-2 pl-9 pr-4 ${formsOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink
                        to="/forms/elements"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Form Elements
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/forms/layout"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Form Layout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div 
                  className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray hover:text-[#1C2434] dark:hover:bg-meta-4 dark:hover:text-white ${tablesOpen ? 'bg-gray dark:bg-meta-4 text-[#1C2434] dark:text-white' : ''}`}
                  onClick={() => setTablesOpen(!tablesOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <Table className="w-5 h-5" />
                    Tables
                  </div>
                  {tablesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                </div>
                {/* Tables Dropdown */}
                <div className={`mt-2 pl-9 pr-4 ${tablesOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink
                        to="/tables/basic-tables"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Basic Tables
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/tables/data-tables"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Data Tables
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="#" className="group relative flex items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">
                  <div className="flex items-center gap-2.5">
                    <File className="w-5 h-5" />
                    Pages
                  </div>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
