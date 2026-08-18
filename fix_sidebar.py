import os

sidebar_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Sidebar.jsx"
with open(sidebar_path, 'r', encoding='utf-8') as f:
    sidebar = f.read()

sidebar = sidebar.replace("const [tablesOpen, setTablesOpen] = useState(true);", "const [tablesOpen, setTablesOpen] = useState(true);\n  const [pagesOpen, setPagesOpen] = useState(true);")

old_pages = """                <li>
                  <a href="#" className="group relative flex items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white">
                    <div className="flex items-center gap-2.5">
                      <File className="w-5 h-5" />
                      Pages
                    </div>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </a>
                </li>"""

new_pages = """                <li>
                  <div 
                    className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray hover:text-[#1C2434] dark:hover:bg-meta-4 dark:hover:text-white ${pagesOpen ? 'bg-gray dark:bg-meta-4 text-[#1C2434] dark:text-white' : ''}`}
                    onClick={() => setPagesOpen(!pagesOpen)}
                  >
                    <div className="flex items-center gap-2.5">
                      <File className="w-5 h-5" />
                      Pages
                    </div>
                    {pagesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                  </div>
                  {/* Pages Dropdown */}
                  <div className={`mt-2 pl-9 pr-4 ${pagesOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col gap-1.5">
                      <li>
                        <NavLink
                          to="/pages/file-manager"
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                              isActive 
                                ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                                : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                            }`
                          }
                        >
                          File Manager
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pages/pricing-tables"
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                              isActive 
                                ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                                : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                            }`
                          }
                        >
                          Pricing Tables
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pages/faq"
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                              isActive 
                                ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                                : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                            }`
                          }
                        >
                          FAQ
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pages/integrations"
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                              isActive 
                                ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                                : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                            }`
                          }
                        >
                          Integrations
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>"""
sidebar = sidebar.replace(old_pages, new_pages)

with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(sidebar)

print("Fixed Sidebar.jsx")
