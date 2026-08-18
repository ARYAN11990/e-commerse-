import re

with open('src/components/Sidebar.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports
content = re.sub(
    r"import \{ ([^}]+) \} from 'lucide-react';",
    r"import { \1, Map, Box, Plug } from 'lucide-react';",
    content
)

# 2. Add state variables
states_to_add = """  const [chartsOpen, setChartsOpen] = useState(false);
  const [mapsOpen, setMapsOpen] = useState(false);
  const [uiElementsOpen, setUiElementsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);"""

# I need to be careful not to duplicate setChartsOpen, so I'll just find setChartsOpen and append the others.
if 'setMapsOpen' not in content:
    content = content.replace(
        "const [chartsOpen, setChartsOpen] = useState(false);",
        "const [chartsOpen, setChartsOpen] = useState(false);\n  const [mapsOpen, setMapsOpen] = useState(false);\n  const [uiElementsOpen, setUiElementsOpen] = useState(false);\n  const [authOpen, setAuthOpen] = useState(false);"
    )

# 3. Create the new list items to insert after Charts list item
new_items = """
              {/* Maps Menu */}
              <li>
                <div 
                  className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white ${mapsOpen ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : ''}`}
                  onClick={() => setMapsOpen(!mapsOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <Map className="w-5 h-5" />
                    Maps
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#219653]/10 px-2 py-0.5 text-xs font-medium text-[#219653]">NEW</span>
                    {mapsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                  </div>
                </div>
                {/* Maps Dropdown */}
                <div className={`mt-2 pl-9 pr-4 ${mapsOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink to="/maps/google-maps" className={({ isActive }) => `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white'}`}>Google Maps</NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* UI Elements Menu */}
              <li>
                <div 
                  className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white ${uiElementsOpen ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : ''}`}
                  onClick={() => setUiElementsOpen(!uiElementsOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <Box className="w-5 h-5" />
                    UI Elements
                  </div>
                  <div className="flex items-center gap-2">
                    {uiElementsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                  </div>
                </div>
                {/* UI Elements Dropdown */}
                <div className={`mt-2 pl-9 pr-4 ${uiElementsOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink to="/ui/alerts" className={({ isActive }) => `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white'}`}>Alerts</NavLink>
                    </li>
                    <li>
                      <NavLink to="/ui/buttons" className={({ isActive }) => `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white'}`}>Buttons</NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Authentication Menu */}
              <li>
                <div 
                  className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white ${authOpen ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : ''}`}
                  onClick={() => setAuthOpen(!authOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <Plug className="w-5 h-5" />
                    Authentication
                  </div>
                  <div className="flex items-center gap-2">
                    {authOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                  </div>
                </div>
                {/* Authentication Dropdown */}
                <div className={`mt-2 pl-9 pr-4 ${authOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink to="/login" className={({ isActive }) => `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white'}`}>Sign In</NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" className={({ isActive }) => `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white'}`}>Sign Up</NavLink>
                    </li>
                    <li>
                      <NavLink to="/reset-password" className={({ isActive }) => `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white'}`}>Reset Password</NavLink>
                    </li>
                    <li>
                      <NavLink to="/verify-email" className={({ isActive }) => `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white'}`}>Two Step Verification</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
"""

# Find where the Charts dropdown ends.
# It ends with:
#                     </li>
#                   </ul>
#                 </div>
#               </li>
#             </ul>
#           </div>
#         </nav>
#       </div>

# I can just split the content by '            </ul>\n          </div>\n        </nav>' and inject it.

if 'Authentication' not in content:
    parts = content.split('            </ul>\n          </div>\n        </nav>\n      </div>\n    </aside>')
    content = parts[0] + new_items + '            </ul>\n          </div>\n        </nav>\n      </div>\n    </aside>' + parts[1]

with open('src/components/Sidebar.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
