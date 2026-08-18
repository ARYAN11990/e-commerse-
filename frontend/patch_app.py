import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <PublicRoute><Component /></PublicRoute> with just <Component />
content = re.sub(
    r'<Route path="(/login|/register|/forgot-password|/reset-password|/verify-email)" element=\{<PublicRoute><([A-Za-z]+) /></PublicRoute>\} />',
    r'<Route path="\1" element={<\2 />} />',
    content
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
