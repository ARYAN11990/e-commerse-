import os

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Pages\Integrations.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("elative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full }", "`relative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full ${integration.enabled ? 'bg-primary' : 'bg-stroke dark:bg-[#313D4A]'}`")
text = text.replace("bsolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 }", "`absolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${integration.enabled ? 'translate-x-6' : ''}`")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(text)

sidebar_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Sidebar.jsx"
with open(sidebar_path, 'r', encoding='utf-8') as f:
    sidebar = f.read()

sidebar = sidebar.replace("lex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium", "`flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${isActive ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'}`")

# Wait, let's just rewrite the NavLink block for Integrations
import re
sidebar = re.sub(r"<NavLink\s+to=\"/pages/integrations\"[\s\S]*?</NavLink>", """<NavLink
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
                        </NavLink>""", sidebar)

with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(sidebar)

print("Fixed syntax")
