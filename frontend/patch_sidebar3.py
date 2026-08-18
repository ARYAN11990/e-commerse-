import re

with open('src/components/Sidebar.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the parent menu item for Charts
content = content.replace(
    "${chartsOpen ? 'bg-gray dark:bg-meta-4 text-[#1C2434] dark:text-white' : ''}",
    "${chartsOpen ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' : ''}"
)

# Replace the NEW badge
content = re.sub(
    r'<span className="rounded-full bg-\[#3C50E0\]/10 px-2 py-0\.5 text-xs font-medium text-\[#3C50E0\] dark:text-white dark:bg-meta-4">NEW</span>',
    r'<span className="rounded-full bg-[#219653]/10 px-2 py-0.5 text-xs font-medium text-[#219653] dark:text-white dark:bg-meta-4">NEW</span>',
    content
)

# Update hover background for submenu items
content = content.replace(
    "text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white",
    "text-[#64748B] dark:text-[#8A99AF] hover:bg-gray dark:hover:bg-meta-4 hover:text-[#1C2434] dark:hover:text-white"
)

with open('src/components/Sidebar.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
