import os
import re

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Pages\Integrations.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Imports
text = text.replace("import { Settings, MoreHorizontal } from 'lucide-react';", "import { Settings, MoreHorizontal, X, ChevronDown } from 'lucide-react';")

# 2. State
state_str = """const Integrations = () => {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [activeIntegration, setActiveIntegration] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);"""
text = text.replace("const Integrations = () => {\n  const [integrations, setIntegrations] = useState(initialIntegrations);", state_str)

# 3. Buttons
button_str_settings = """                <button 
                  onClick={() => { setActiveIntegration(integration); setIsSettingsOpen(true); }}
                  className="text-[#64748B] hover:text-black dark:text-[#8A99AF] dark:hover:text-white"
                >
                  <Settings className="w-5 h-5" />
                </button>"""
text = re.sub(r"<button className=\"text-\[#64748B\] hover:text-black dark:text-\[#8A99AF\] dark:hover:text-white\">\s*<Settings className=\"w-5 h-5\" />\s*</button>", button_str_settings, text)

button_str_details = """                <button 
                  onClick={() => { setActiveIntegration(integration); setIsDetailsOpen(true); }}
                  className="text-sm font-medium text-black dark:text-white border border-stroke dark:border-strokedark py-1 px-3 rounded hover:bg-gray dark:hover:bg-meta-4 transition"
                >
                  Details
                </button>"""
text = re.sub(r"<button className=\"text-sm font-medium text-black dark:text-white border border-stroke dark:border-strokedark py-1 px-3 rounded hover:bg-gray dark:hover:bg-meta-4 transition\">\s*Details\s*</button>", button_str_details, text)


# 4. Modals
modals_str = """
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
};"""

text = text.replace("    </>\n  );\n};", modals_str)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Modals added!")
