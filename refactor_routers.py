import os
import re
import importlib
from typing import get_type_hints

routers_dir = "c:/Users/SIS/Desktop/ecommers/backend/routers"
routers = ['dashboard', 'analytics', 'marketing', 'crm', 'stocks', 'saas', 'logistics', 'ai', 'sales', 'finance']

import sys
sys.path.append('c:/Users/SIS/Desktop/ecommers/backend')

for router in routers:
    filepath = os.path.join(routers_dir, f"{router}.py")
    with open(filepath, 'r') as f:
        content = f.read()

    schema_module = importlib.import_module(f"schemas.{router}")
    response_class = getattr(schema_module, f"{router.capitalize()}Response")
    hints = get_type_hints(response_class)

    def repl(m):
        route_decorator = m.group(1)
        func_def = m.group(2)
        key = m.group(3)
        
        hint = hints.get(key)
        hint_str = str(hint)
        hint_str = hint_str.replace(f"schemas.{router}.", "")
        hint_str = hint_str.replace("<class '", "").replace("'>", "")
        hint_str = hint_str.replace("typing.List", "list")
        
        if "response_model=" not in route_decorator:
            new_decorator = route_decorator.replace(')', f', response_model={hint_str})')
        else:
            new_decorator = route_decorator
            
        return f"{new_decorator}\n{func_def}\n    return service.get_all_data()[\"{key}\"]"
    
    # regex using DOTALL for function definition
    pattern = r'(@router\.get\([^)]+\))\s+(def\s+[a-zA-Z0-9_]+\(.*?\):)\s+return\s+service\.get_all_data\(\)\["([^"]+)"\]'
    
    new_content = re.sub(pattern, repl, content, flags=re.DOTALL)
    
    if "from schemas" not in new_content:
        new_content = f"from schemas.{router} import *\nfrom typing import List, Dict, Any\n" + new_content
        
    with open(filepath, 'w') as f:
        f.write(new_content)

print("Routers updated with response_models!")
