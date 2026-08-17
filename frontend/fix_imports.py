import os
import re

hooks = ['useState', 'useEffect', 'useMemo', 'useCallback', 'useRef', 'useContext']
base = 'C:/Users/SIS/Desktop/ecommers/frontend/src/pages'

for root, _, files in os.walk(base):
    for file in files:
        if not (file.endswith('.jsx') or file.endswith('.js')): continue
        path = os.path.join(root, file)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        usages = []
        for hook in hooks:
            if re.search(r'\b' + hook + r'\b', content):
                usages.append(hook)
        if not usages: continue
        
        react_import_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'"]react[\'"]', content)
        
        missing = []
        if not react_import_match:
            if "from 'react'" not in content and 'from "react"' not in content:
                missing = usages
        else:
            existing = react_import_match.group(1)
            for hook in usages:
                if hook not in existing:
                    missing.append(hook)
                    
        if missing:
            print(f'Modifying {file} for {missing}')
            if react_import_match:
                old_import = react_import_match.group(0)
                inner = react_import_match.group(1)
                new_inner = inner + ', ' + ', '.join(missing)
                new_import = old_import.replace(inner, new_inner)
                content = content.replace(old_import, new_import)
            else:
                new_import = f"import {{ {', '.join(missing)} }} from 'react';\n"
                content = new_import + content
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
