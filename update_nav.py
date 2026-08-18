import os

sidebar_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Sidebar.jsx"
with open(sidebar_path, 'r', encoding='utf-8') as f:
    sidebar = f.read()

import re

# Find the <li> block for Pages
pattern = r"<li>\s*<a href=\"#\" className=\"group relative flex items-center justify-between gap-2\.5 rounded-sm py-2 px-4 font-medium text-\[#64748B\] dark:text-\[#8A99AF\] hover:text-\[#1C2434\] dark:hover:text-white dark:text-white\">\s*<div className=\"flex items-center gap-2\.5\">\s*<File className=\"w-5 h-5\" />\s*Pages\s*</div>\s*<ChevronDown className=\"w-4 h-4 opacity-50\" />\s*</a>\s*</li>"

new_pages = """<li>
                  <div 
                    className={group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray hover:text-[#1C2434] dark:hover:bg-meta-4 dark:hover:text-white }
                    onClick={() => setPagesOpen(!pagesOpen)}
                  >
                    <div className="flex items-center gap-2.5">
                      <File className="w-5 h-5" />
                      Pages
                    </div>
                    {pagesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                  </div>
                  {/* Pages Dropdown */}
                  <div className={mt-2 pl-9 pr-4 }>
                    <ul className="flex flex-col gap-1.5">
                      <li>
                        <NavLink
                          to="/pages/file-manager"
                          className={({ isActive }) =>
                            lex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium 
                          }
                        >
                          File Manager
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pages/pricing-tables"
                          className={({ isActive }) =>
                            lex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium 
                          }
                        >
                          Pricing Tables
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pages/faq"
                          className={({ isActive }) =>
                            lex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium 
                          }
                        >
                          FAQ
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>"""

sidebar = re.sub(pattern, new_pages, sidebar)

with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(sidebar)

print("Fixed sidebar!")
