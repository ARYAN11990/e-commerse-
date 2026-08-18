import React, { useState } from 'react';
import { Settings, MoreHorizontal, X, ChevronDown } from 'lucide-react';
import DropdownDefault from '../../components/DropdownDefault';

const initialIntegrations = [
  {
    id: 1,
    name: 'Mailchimp',
    description: 'Connect Mailchimp to streamline your email marketing and automate campaigns.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="#FFE01B"/>
        <path d="M16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22ZM16 20.5C18.4853 20.5 20.5 18.4853 20.5 16C20.5 13.5147 18.4853 11.5 16 11.5C13.5147 11.5 11.5 13.5147 11.5 16C11.5 18.4853 13.5147 20.5 16 20.5Z" fill="black"/>
      </svg>
    ),
    enabled: true,
  },
  {
    id: 2,
    name: 'Google Meet',
    description: 'Connect your Google Meet account for seamless video conferencing.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 10L16 14.5L9.5 10V22H22.5V10Z" fill="#00AC47"/>
        <path d="M22.5 10L16 14.5L9.5 10V22H22.5V10Z" fill="#00832D"/>
        <path d="M9.5 10V22L16 17.5V14.5L9.5 10Z" fill="#0066DA"/>
        <path d="M9.5 10L16 14.5L22.5 10L16 5.5L9.5 10Z" fill="#E94235"/>
        <path d="M16 14.5L22.5 10V22L16 17.5V14.5Z" fill="#FFBA00"/>
      </svg>
    ),
    enabled: false,
  },
  {
    id: 3,
    name: 'Zoom',
    description: 'Integrate Zoom to streamline your virtual meetings and team collaborations.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#2D8CFF"/>
        <path d="M11 13C11 11.8954 11.8954 11 13 11H18C19.1046 11 20 11.8954 20 13V18C20 19.1046 19.1046 20 18 20H13C11.8954 20 11 19.1046 11 18V13Z" fill="white"/>
        <path d="M24 12.5L20 15V16L24 18.5V12.5Z" fill="white"/>
      </svg>
    ),
    enabled: false,
  },
  {
    id: 4,
    name: 'Loom',
    description: 'Integrate Loom to easily record, share, and manage video messages.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22ZM16 19.6C17.9882 19.6 19.6 17.9882 19.6 16C19.6 14.0118 17.9882 12.4 16 12.4C14.0118 12.4 12.4 14.0118 12.4 16C12.4 17.9882 14.0118 19.6 16 19.6Z" fill="#5E4CFF"/>
        <circle cx="16" cy="16" r="3.6" fill="#5E4CFF"/>
      </svg>
    ),
    enabled: false,
  },
  {
    id: 5,
    name: 'Linear',
    description: 'Integrate Linear to manage issues, track progress, and streamline your team\'s workflow.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#5E6AD2"/>
        <path d="M10 16L16 10M16 22L22 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    enabled: false,
  },
  {
    id: 6,
    name: 'Gmail',
    description: 'Integrate Gmail to send, receive, and manage emails directly from your workspace.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 22V10L16 16L24 10V22H8Z" fill="#EA4335"/>
        <path d="M8 10L16 16L24 10V8H8V10Z" fill="#C5221F"/>
        <path d="M8 10L16 16L24 10L24 12L16 18L8 12V10Z" fill="#FABB05"/>
        <path d="M8 22H11V14.25L8 12V22Z" fill="#4285F4"/>
        <path d="M24 22H21V14.25L24 12V22Z" fill="#34A853"/>
      </svg>
    ),
    enabled: false,
  },
  {
    id: 7,
    name: 'Trello',
    description: 'Capture, organize, and tackle your to-dos from Trello within the platform.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#0079BF"/>
        <rect x="7" y="7" width="8" height="14" rx="2" fill="white"/>
        <rect x="17" y="7" width="8" height="9" rx="2" fill="white"/>
      </svg>
    ),
    enabled: false,
  },
  {
    id: 8,
    name: 'Notion',
    description: 'Capture, organize, and tackle your to-dos from Notion seamlessly.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="white" stroke="#111111" strokeWidth="2"/>
        <path d="M10 10H14L18 18V10H22V22H18L14 14V22H10V10Z" fill="#111111"/>
      </svg>
    ),
    enabled: false,
  },
  {
    id: 9,
    name: 'Jira',
    description: 'Track issues and manage projects with ease and full control via Jira.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 22L10 16L16 10L22 16L16 22Z" fill="#2684FF"/>
      </svg>
    ),
    enabled: false,
  }
];

const Integrations = () => {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [activeIntegration, setActiveIntegration] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleIntegration = (id) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
    ));
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Integrations
        </h2>

        <div className="flex items-center gap-4">
          <nav>
            <ol className="flex items-center gap-2">
              <li><a className="font-medium hover:text-primary" href="/">Home /</a></li>
              <li className="font-medium text-primary">Integrations</li>
            </ol>
          </nav>
          <button className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80">
            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z" fill=""/>
            </svg>
            Add New Integration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {integrations.map((integration) => (
          <div key={integration.id} className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded bg-gray dark:bg-meta-4">
                {integration.icon}
              </div>
              <DropdownDefault options={['Edit', 'Delete']} />
            </div>

            <h4 className="mb-2 text-title-sm2 font-bold text-black dark:text-white">
              {integration.name}
            </h4>
            <p className="text-sm font-medium mb-6 text-[#64748B] dark:text-[#8A99AF]">
              {integration.description}
            </p>

            <div className="border-t border-stroke dark:border-strokedark pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                                <button 
                  onClick={() => { setActiveIntegration(integration); setIsSettingsOpen(true); }}
                  className="text-[#64748B] hover:text-black dark:text-[#8A99AF] dark:hover:text-white"
                >
                  <Settings className="w-5 h-5" />
                </button>
                                <button 
                  onClick={() => { setActiveIntegration(integration); setIsDetailsOpen(true); }}
                  className="text-sm font-medium text-black dark:text-white border border-stroke dark:border-strokedark py-1 px-3 rounded hover:bg-gray dark:hover:bg-meta-4 transition"
                >
                  Details
                </button>
              </div>

              {/* Toggle Switch */}
              <label 
                className={`relative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full ${integration.enabled ? 'bg-primary' : 'bg-stroke dark:bg-[#313D4A]'}`}
              >
                <input
                  type="checkbox"
                  className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                  checked={integration.enabled}
                  onChange={() => toggleIntegration(integration.id)}
                />
                <span
                  className={`absolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${
                    integration.enabled ? 'translate-x-6' : ''
                  }`}
                ></span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && activeIntegration && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-[600px] rounded-lg bg-white p-4 sm:p-8 dark:bg-boxdark">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">Integration settings</h3>
                <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Manage and configure your connected apps and services</p>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray hover:bg-opacity-80 dark:bg-meta-4 text-black dark:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Select App</label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">{activeIntegration.name}</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </div>
              </div>
              
              <div>
                <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Client ID</label>
                <input type="text" defaultValue="872364219810-abc123xyz456.apps.googleusercontent.com" className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
              </div>

              <div>
                <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Client Secret</label>
                <input type="text" defaultValue="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e" className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
              </div>

              <div>
                <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">Authentication base URI</label>
                <input type="text" defaultValue="https://accounts.application.com/o/oauth2/auth" className="w-full rounded border border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF] mb-4">Save your changes by clicking 'Save Changes'</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsSettingsOpen(false)} className="flex w-full justify-center rounded border border-stroke py-3 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                  Close
                </button>
                <button onClick={() => setIsSettingsOpen(false)} className="flex w-full justify-center rounded bg-primary py-3 px-6 font-medium text-gray hover:bg-opacity-90">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsOpen && activeIntegration && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-[600px] rounded-lg bg-white p-4 sm:p-8 dark:bg-boxdark">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">Integration details</h3>
                <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Check the credentials and settings for your connected app.</p>
              </div>
              <button onClick={() => setIsDetailsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray hover:bg-opacity-80 dark:bg-meta-4 text-black dark:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-10">
                <div className="w-full sm:w-1/3">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">App Name</span>
                </div>
                <div className="w-full sm:w-2/3">
                  <span className="text-sm font-medium text-black dark:text-white">{activeIntegration.name} App</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-10">
                <div className="w-full sm:w-1/3">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Client ID</span>
                </div>
                <div className="w-full sm:w-2/3">
                  <span className="text-sm font-medium text-black dark:text-white break-words">872364219810-abc123xyz456.apps.usercontent.com</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-10">
                <div className="w-full sm:w-1/3">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Client Secret</span>
                </div>
                <div className="w-full sm:w-2/3">
                  <span className="text-sm font-medium text-black dark:text-white break-words">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e</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-10">
                <div className="w-full sm:w-1/3">
                  <span className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">Authentication base URI</span>
                </div>
                <div className="w-full sm:w-2/3">
                  <span className="text-sm font-medium text-black dark:text-white break-words">https://accounts.app.com/o/oauth2/auth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Integrations;
