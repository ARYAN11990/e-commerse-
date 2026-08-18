import os

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Pages\ApiKeys.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

import re
# Fix all the broken classNames in td
text = re.sub(r'className=\{\s*order-b border-\[#eee\] py-5 px-4 pl-0 dark:border-strokedark\s*\}', r'className={`border-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark ${key === apiKeys.length - 1 ? "border-b-0" : ""}`}', text)
text = re.sub(r'className=\{\s*order-b border-\[#eee\] py-5 px-4 dark:border-strokedark\s*\}', r'className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? "border-b-0" : ""}`}', text)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed table cell classes")
