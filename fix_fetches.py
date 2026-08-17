import os, glob, re

frontend_dir = 'c:/Users/SIS/Desktop/ecommers/frontend/src'
jsx_files = glob.glob(frontend_dir + '/**/*.jsx', recursive=True)

count = 0
for file_path in jsx_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "fetch('http://localhost:8000/api/" not in content:
        continue
        
    rel_path = os.path.relpath(file_path, frontend_dir)
    depth = rel_path.count(os.sep)
    if depth == 0:
        import_path = './services/api'
    else:
        import_path = '../' * depth + 'services/api'
    
    if 'import { api }' not in content:
        lines = content.split('\n')
        last_import = -1
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import = i
        
        if last_import != -1:
            lines.insert(last_import + 1, f"import {{ api }} from '{import_path.replace('\\\\', '/')}';")
        else:
            lines.insert(0, f"import {{ api }} from '{import_path.replace('\\\\', '/')}';")
        content = '\n'.join(lines)
    
    # Replace fetch GET
    # Match: fetch('http://localhost:8000/api/XXX') \n .then( (res) => res.json() ) or similar
    content = re.sub(r"fetch\('http://localhost:8000/api/([^']+)'\)\s*\.then\([\s\S]*?\.json\(\)\)\s*", r"api.get('/\1')\n      ", content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    count += 1

print(f'Done replacing fetch in {count} files!')
