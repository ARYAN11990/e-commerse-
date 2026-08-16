import os, glob, re

frontend_dir = 'c:/Users/SIS/Desktop/ecommers/frontend/src'
jsx_files = glob.glob(frontend_dir + '/**/*.jsx', recursive=True)

for file_path in jsx_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'fetch(\'http://localhost:8000/api/' not in content:
        continue
        
    # Calculate depth to resolve the import path
    # e.g., src/components/Dashboard/KpiCards.jsx is depth 2 (components -> Dashboard)
    # relative path to src/services/api.js would be '../../services/api'
    rel_path = os.path.relpath(file_path, frontend_dir)
    depth = rel_path.count(os.sep)
    if depth == 0:
        import_path = './services/api'
    else:
        import_path = '../' * depth + 'services/api'
    
    # Add import at the top
    if 'import { api }' not in content:
        lines = content.split('\n')
        # find the last import
        last_import = -1
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import = i
        
        if last_import != -1:
            lines.insert(last_import + 1, f"import {{ api }} from '{import_path.replace('\\\\', '/')}';")
        else:
            lines.insert(0, f"import {{ api }} from '{import_path.replace('\\\\', '/')}';")
        content = '\n'.join(lines)
    
    # Replace GET fetches
    content = re.sub(r"fetch\('http://localhost:8000/api/([^']+)'\)\s*\.then\([^)]+\s*=>\s*[a-zA-Z]+\.json\(\)\)", r"api.get('/\1')", content)
    
    # Replace POST fetches (like DangerZone)
    content = re.sub(r"fetch\('http://localhost:8000/api/([^']+)',\s*{\s*method:\s*'POST'\s*}\)", r"api.post('/\1', {})", content)
    
    # Replace DELETE fetches
    content = re.sub(r"fetch\('http://localhost:8000/api/([^']+)',\s*{\s*method:\s*'DELETE'\s*}\)", r"api.delete('/\1')", content)
    
    # Replace PUT fetches with body
    # Specifically UserProfile and Security
    # This is a bit tricky, let's just do a manual check if needed.
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("GET, POST, DELETE fetches refactored. Check UserProfile, Security manually if needed.")
