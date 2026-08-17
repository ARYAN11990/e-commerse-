import re

file_path = 'c:/Users/SIS/Desktop/ecommers/frontend/src/components/Dashboard/Demographics.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def fix_path(match):
    path = match.group(1)
    # Add space before minus sign if it's preceded by a digit
    path = re.sub(r'(?<=[0-9])-', ' -', path)
    return f'<path d="{path}"'

new_content = re.sub(r'<path d="([^"]+)"', fix_path, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Path fixed!')
