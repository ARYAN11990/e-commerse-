import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Simple mapping of classes to their dark mode equivalents.
    # We use regex with negative lookbehind to ensure we don't double-replace.
    # E.g., we look for "bg-white" not followed by " dark:bg-[#24303F]"
    
    replacements = [
        # Surfaces
        (r'\bbg-white(?!\s+dark:bg-\[#24303F\])', r'bg-white dark:bg-[#24303F]'),
        (r'\bbg-\[#F1F5F9\](?!\s+dark:bg-\[#1A222C\])', r'bg-[#F1F5F9] dark:bg-[#1A222C]'),
        
        # Text
        (r'\btext-\[#1C2434\](?!\s+dark:text-white)', r'text-[#1C2434] dark:text-white'),
        (r'\btext-\[#64748B\](?!\s+dark:text-\[#8A99AF\])', r'text-[#64748B] dark:text-[#8A99AF]'),
        (r'\bhover:text-\[#1C2434\](?!\s+dark:hover:text-white)', r'hover:text-[#1C2434] dark:hover:text-white'),
        
        # Borders
        (r'\bborder-stroke(?!\s+dark:border-\[#2E3A47\])', r'border-stroke dark:border-[#2E3A47]'),
        
        # Muted Backgrounds
        (r'\bbg-gray-50(?!\s+dark:bg-\[#313D4A\])', r'bg-gray-50 dark:bg-[#313D4A]'),
        (r'\bhover:bg-gray-50(?!\s+dark:hover:bg-\[#313D4A\])', r'hover:bg-gray-50 dark:hover:bg-[#313D4A]'),
        
        # Sidebar Active state
        (r'\bbg-\[#EDF2F9\](?!\s+dark:bg-\[#333A48\])', r'bg-[#EDF2F9] dark:bg-[#333A48]'),
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    root_dir = os.path.join('c:\\', 'Users', 'SIS', 'Desktop', 'ecommers', 'frontend', 'src')
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.jsx') or filename.endswith('.js') or filename.endswith('.tsx'):
                process_file(os.path.join(dirpath, filename))

if __name__ == '__main__':
    main()
