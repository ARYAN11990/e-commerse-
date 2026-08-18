import os

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Pages\Integrations.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("className={\n`relative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full ${integration.enabled ? 'bg-primary' : 'bg-stroke dark:bg-[#313D4A]'}`", "className={`relative m-0 block h-6.5 w-12.5 cursor-pointer rounded-full ${integration.enabled ? 'bg-primary' : 'bg-stroke dark:bg-[#313D4A]'}`}")
text = text.replace("className={ `absolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${integration.enabled ? 'translate-x-6' : ''}`", "className={`absolute top-1/2 left-1 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${integration.enabled ? 'translate-x-6' : ''}`}")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed missing braces")
