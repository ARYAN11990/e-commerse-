import React, { useState } from 'react';
import { Copy, RefreshCw, Trash2, Edit2, Plus } from 'lucide-react';

const initialApiKeys = [
  {
    id: 1,
    name: 'Production API key',
    key: 'sk_live_**********4248',
    status: 'Disabled',
    created: '25 Jan, 2025',
    lastUsed: 'Today, 10:45 AM',
    enabled: false,
  },
  {
    id: 2,
    name: 'Development API key',
    key: 'dev_live_**********4923',
    status: 'Active',
    created: '29 Dec, 2024',
    lastUsed: 'Today, 12:40 AM',
    enabled: true,
  },
  {
    id: 3,
    name: 'Legacy API Key',
    key: 'leg_live_**********0932',
    status: 'Active',
    created: '12 Mar, 2024',
    lastUsed: 'Today, 11:45 PM',
    enabled: true,
  },
];

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, key) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRefresh = (id) => {
    setApiKeys(apiKeys.map(apiKey => {
      if (apiKey.id === id) {
        const randomString = Math.random().toString(36).substring(2, 6);
        return {
          ...apiKey,
          key: apiKey.key.replace(/\d{4}$/, randomString)
        };
      }
      return apiKey;
    }));
  };

  const handleDelete = (id) => {
    setApiKeys(apiKeys.filter(apiKey => apiKey.id !== id));
  };

  const handleToggle = (id) => {
    setApiKeys(apiKeys.map(apiKey => {
      if (apiKey.id === id) {
        const newEnabled = !apiKey.enabled;
        return {
          ...apiKey,
          enabled: newEnabled,
          status: newEnabled ? 'Active' : 'Disabled'
        };
      }
      return apiKey;
    }));
  };

  const handleAddKey = () => {
    const newId = apiKeys.length ? Math.max(...apiKeys.map(k => k.id)) + 1 : 1;
    const randomString = Math.random().toString(36).substring(2, 6);
    const newKey = {
      id: newId,
      name: 'New API Key ' + newId,
      key: `new_key_**********${randomString}`,
      status: 'Active',
      created: 'Today',
      lastUsed: 'Never',
      enabled: true,
    };
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Api Keys
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li><a className="font-medium hover:text-primary" href="/">Home /</a></li>
            <li className="font-medium text-primary">Api Keys</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              API Keys
            </h4>
            <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">
              API keys are used to authentication requests to the tailadmin API
            </p>
          </div>
          <button 
            onClick={handleAddKey}
            className="inline-flex items-center gap-2 rounded bg-primary py-2 px-4 font-medium text-white hover:bg-opacity-80"
          >
            <Plus className="h-5 w-5" />
            Add API Key
          </button>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-0 border-b border-stroke dark:border-strokedark">
                  Name
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark">
                  Created
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark">
                  Last used
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark">
                  Disable/Enable
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white border-b border-stroke dark:border-strokedark">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((apiKey, key) => (
                <tr key={apiKey.id}>
                  <td className={`border-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}>
                    <h5 className="font-medium text-black dark:text-white mb-2">
                      {apiKey.name}
                    </h5>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          value={apiKey.key}
                          readOnly
                          className="w-full rounded border border-stroke bg-transparent py-2 pl-4 pr-24 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        />
                        <button 
                          onClick={() => handleCopy(apiKey.id, apiKey.key)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm font-medium hover:text-primary dark:text-white"
                        >
                          <Copy className="h-4 w-4" />
                          {copiedId === apiKey.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <button 
                        onClick={() => handleRefresh(apiKey.id)}
                        className="flex h-9 w-9 items-center justify-center rounded border border-stroke hover:text-primary dark:border-strokedark dark:text-white dark:hover:text-primary transition"
                        title="Regenerate Key"
                      >
                        <RefreshCw className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </td>
                  <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}>
                    <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${apiKey.enabled ? 'text-success bg-success' : 'text-danger bg-danger'}`}>
                      {apiKey.status}
                    </p>
                  </td>
                  <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}>
                    <p className="text-sm text-black dark:text-white font-medium">
                      {apiKey.created}
                    </p>
                  </td>
                  <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}>
                    <p className="text-sm text-black dark:text-white font-medium">
                      {apiKey.lastUsed}
                    </p>
                  </td>
                  <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}>
                    <label 
                      className={`relative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full ${apiKey.enabled ? 'bg-primary' : 'bg-stroke dark:bg-[#313D4A]'}`}
                    >
                      <input
                        type="checkbox"
                        className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                        checked={apiKey.enabled}
                        onChange={() => handleToggle(apiKey.id)}
                      />
                      <span
                        className={`absolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${apiKey.enabled ? 'translate-x-6' : ''}`}
                      ></span>
                    </label>
                  </td>
                  <td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleDelete(apiKey.id)}
                        className="hover:text-danger text-[#64748B] transition"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="hover:text-primary text-[#64748B] transition">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApiKeys;
