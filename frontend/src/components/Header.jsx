import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Moon, Sun, Menu, ChevronDown, User as UserIcon, Settings, LogOut, Check } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import DataState from './DataState';
const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  }, [theme]);

  // Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = [
    { name: 'eCommerce Dashboard', path: '/ecommerce' },
    { name: 'Analytics Dashboard', path: '/analytics' },
    { name: 'Marketing Dashboard', path: '/marketing' },
    { name: 'CRM Dashboard', path: '/crm' },
    { name: 'Stocks Dashboard', path: '/stocks' },
    { name: 'SaaS Dashboard', path: '/saas' },
    { name: 'Logistics Dashboard', path: '/logistics' },
    { name: 'AI Dashboard', path: '/ai' },
    { name: 'Sales Dashboard', path: '/sales' },
    { name: 'Finance Dashboard', path: '/finance' },
    { name: 'User Management', path: '/users' },
    { name: 'User Profile & Settings', path: '/profile' }
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    setSelectedSearchIndex(0);
  }, [searchQuery, searchOpen]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSearchIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSearchIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedSearchIndex]) {
        navigate(searchResults[selectedSearchIndex].path);
        setSearchOpen(false);
      }
    }
  };

  // Notifications State
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: notifications, loading: notifLoading, error: notifError, fetchData: fetchNotifs } = useApi('/notifications');

  const markAllRead = () => {
    api.put('/notifications/read-all', {}).then(() => fetchNotifs());
  };

  const markRead = (id) => {
    api.put(`/notifications/read/${id}`, {}).then(() => fetchNotifs());
  };

  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  // Profile Dropdown State
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white dark:bg-[#24303F] border-b border-stroke dark:border-[#2E3A47] drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11 bg-white dark:bg-[#24303F]">
        
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle Sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-md border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] p-2 shadow-sm text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block relative">
            <div 
              className="relative flex items-center cursor-text"
              onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }}
            >
              <button aria-label="Search" className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0]" />
              </button>
              <input
                type="text"
                placeholder="Search or type command..."
                className="w-full bg-transparent pl-9 pr-14 font-medium focus:outline-none xl:w-125 text-[#64748B] dark:text-[#8A99AF] placeholder-[#64748B] cursor-text pointer-events-none"
                readOnly
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-md bg-[#F1F5F9] dark:bg-[#1A222C] px-2 py-1 text-[10px] font-medium text-[#64748B] dark:text-[#8A99AF]">
                ⌘K
              </span>
            </div>

            {/* Search Dropdown Overlay */}
            {searchOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)}></div>
                <div className="absolute left-0 top-full mt-2 w-full max-w-xl rounded-md border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] shadow-default z-50">
                   <div className="p-3 border-b border-stroke dark:border-[#2E3A47] flex items-center">
                     <Search className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF] mr-2" />
                     <input 
                       ref={searchInputRef}
                       type="text" 
                       className="w-full bg-transparent outline-none text-sm text-[#1C2434] dark:text-white"
                       placeholder="Search pages..."
                       value={searchQuery}
                       onChange={e => setSearchQuery(e.target.value)}
                       onKeyDown={handleSearchKeyDown}
                     />
                   </div>
                   <ul className="max-h-64 overflow-y-auto p-2">
                     {searchResults.map((result, index) => (
                       <li key={result.path}>
                         <NavLink 
                           to={result.path} 
                           onClick={() => setSearchOpen(false)}
                           className={`block w-full px-4 py-2 text-sm rounded-md transition-colors ${
                             index === selectedSearchIndex 
                               ? 'bg-gray-100 dark:bg-[#313D4A] text-[#3C50E0]' 
                               : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] hover:text-[#3C50E0]'
                           }`}
                         >
                           {result.name}
                         </NavLink>
                       </li>
                     ))}
                     {searchResults.length === 0 && (
                       <li className="px-4 py-3 text-sm text-[#64748B] dark:text-[#8A99AF] text-center">No results found</li>
                     )}
                   </ul>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ul className="flex items-center gap-2 sm:gap-4">
            {/* Dark Mode */}
            <li>
              <button 
                aria-label="Toggle Dark Mode"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0]"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </li>
            
            {/* Notification */}
            <li className="relative">
              <button 
                aria-label="Notifications"
                aria-expanded={notifOpen}
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-stroke dark:border-[#2E3A47] bg-gray-50 dark:bg-[#313D4A] text-[#64748B] dark:text-[#8A99AF] hover:text-[#3C50E0]"
              >
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-[#F59E0B] border-2 border-white"></span>
                )}
                <Bell className="w-5 h-5" />
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)}></div>
                  <div className="absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] shadow-default sm:right-0 sm:w-80 z-50">
                    <div className="px-4.5 py-3 flex justify-between items-center border-b border-stroke dark:border-[#2E3A47]">
                      <h5 className="text-sm font-medium text-[#1C2434] dark:text-white">Notifications</h5>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-[#3C50E0] hover:underline">
                          Mark all read
                        </button>
                      )}
                    </div>
                    <DataState 
                      loading={notifLoading}
                      error={notifError}
                      onRetry={fetchNotifs}
                      isEmpty={!notifications || notifications.length === 0}
                      emptyMessage="No notifications yet"
                      skeleton={
                        <div className="p-4 flex flex-col gap-4 animate-pulse">
                           <div className="h-12 bg-gray-200 dark:bg-[#313D4A] rounded"></div>
                           <div className="h-12 bg-gray-200 dark:bg-[#313D4A] rounded"></div>
                           <div className="h-12 bg-gray-200 dark:bg-[#313D4A] rounded"></div>
                        </div>
                      }
                    >
                      <ul className="flex h-auto flex-col overflow-y-auto">
                        {notifications?.map((n) => (
                          <li key={n.id}>
                            <button 
                              onClick={() => { if(!n.read) markRead(n.id); }}
                              className={`w-full text-left flex flex-col gap-2.5 border-t border-stroke dark:border-[#2E3A47] px-4.5 py-3 hover:bg-gray-50 dark:hover:bg-[#313D4A] ${!n.read ? 'bg-[#F1F5F9] dark:bg-[#1A222C]/50' : ''}`}
                            >
                              <p className="text-sm text-[#64748B] dark:text-[#8A99AF]">
                                <span className="text-[#1C2434] dark:text-white font-medium">{n.title}</span> {n.description}
                              </p>
                              <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">{n.date}</p>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </DataState>
                  </div>
                </>
              )}
            </li>
          </ul>

          {/* User Profile */}
          <div className="relative">
            <button 
              className="flex items-center gap-4 ml-2 sm:ml-4" 
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              aria-label="User Profile Dropdown"
              aria-expanded={profileOpen}
            >
              <span className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden shrink-0">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" loading="lazy" className="w-full h-full object-cover" />
              </span>
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-semibold text-[#1C2434] dark:text-white">{user?.full_name || user?.username || 'User'}</span>
                <span className="block text-xs font-medium text-[#64748B] dark:text-[#8A99AF]">{user?.role || 'Administrator'}</span>
              </span>
              <ChevronDown className="hidden sm:block w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] shadow-default z-50">
                  <ul className="flex flex-col gap-5 border-b border-stroke dark:border-[#2E3A47] px-6 py-7.5">
                    <li>
                      <NavLink to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-[#3C50E0] text-[#64748B] dark:text-[#8A99AF]">
                        <UserIcon className="w-5 h-5" />
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <button className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-[#3C50E0] text-[#64748B] dark:text-[#8A99AF]">
                        <Settings className="w-5 h-5" />
                        Account Settings
                      </button>
                    </li>
                  </ul>
                  <button onClick={handleLogout} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-[#3C50E0] text-[#64748B] dark:text-[#8A99AF]">
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
