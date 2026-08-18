import re

with open('src/components/Sidebar.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add PieChart to imports
content = re.sub(r'import \{ ([^}]+) \} from \'lucide-react\';', r"import { \1, PieChart } from 'lucide-react';", content)

# Add state
if 'setChartsOpen' not in content:
    content = re.sub(r'const \[pagesOpen, setPagesOpen\] = useState\(false\);', r"const [pagesOpen, setPagesOpen] = useState(false);\n  const [chartsOpen, setChartsOpen] = useState(false);", content)

# Add menu section
others_section = """            </ul>
          </div>
          
          {/* OTHERS GROUP */}
          <div>
            <h3 className="mb-4 ml-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">OTHERS</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <div 
                  className={`group relative flex cursor-pointer items-center justify-between gap-2.5 rounded-sm py-2 px-4 font-medium text-[#64748B] dark:text-[#8A99AF] hover:bg-gray hover:text-[#1C2434] dark:hover:bg-meta-4 dark:hover:text-white ${chartsOpen ? 'bg-gray dark:bg-meta-4 text-[#1C2434] dark:text-white' : ''}`}
                  onClick={() => setChartsOpen(!chartsOpen)}
                >
                  <div className="flex items-center gap-2.5">
                    <PieChart className="w-5 h-5" />
                    Charts
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#3C50E0]/10 px-2 py-0.5 text-xs font-medium text-[#3C50E0] dark:text-white dark:bg-meta-4">NEW</span>
                    {chartsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
                  </div>
                </div>
                {/* Charts Dropdown */}
                <div className={`mt-2 pl-9 pr-4 ${chartsOpen ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col gap-1.5">
                    <li>
                      <NavLink
                        to="/charts/line-chart"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Line Chart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/charts/bar-chart"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Bar Chart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/charts/pie-chart"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Pie Chart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/charts/radar-chart"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Radar Chart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/charts/radial-chart"
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                            isActive 
                              ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                              : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                          }`
                        }
                      >
                        Radial Chart
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>"""

if 'OTHERS' not in content:
    content = content.replace("            </ul>\n          </div>\n        </nav>\n      </div>\n    </aside>", others_section + "\n            </ul>\n          </div>\n        </nav>\n      </div>\n    </aside>")

with open('src/components/Sidebar.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
