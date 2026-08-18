import os
import re

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Pages\ApiKeys.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

# I will just write a function to fix all td's
# Since the whole string is messed up, I will just do it explicitly
text = re.sub(r'className=\{\s*order-b[^>]+>', r'className={`border-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark ${key === apiKeys.length - 1 ? "border-b-0" : ""}`}>', text)
text = re.sub(r'<td className=\{\s*order-b[^>]+>', r'<td className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? "border-b-0" : ""}`}>', text)

# Better yet, let's just do a big replace
text = text.replace("className={ order-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark }", "className={`border-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}")
text = text.replace("className={ order-b border-[#eee] py-5 px-4 dark:border-strokedark }", "className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${key === apiKeys.length - 1 ? 'border-b-0' : ''}`}")

# Also fixing the toggle switch classes which might be broken
text = text.replace("className={ elative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full }", "className={`relative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full ${apiKey.enabled ? 'bg-primary' : 'bg-stroke dark:bg-[#313D4A]'}`}")
text = text.replace("className={ bsolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 }", "className={`absolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${apiKey.enabled ? 'translate-x-6' : ''}`}")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed td classes")
