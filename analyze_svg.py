import re

with open('c:/Users/SIS/Desktop/ecommers/frontend/src/components/Dashboard/Demographics.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

path = re.search(r'<path d="([^"]+)"', content).group(1)

print('Weird chars:', set(re.findall(r'[^0-9\s,\-\.a-zA-Z]', path)))
