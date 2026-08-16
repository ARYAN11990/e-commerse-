import os, glob, re

router_files = glob.glob('backend/routers/*.py')

for rf in router_files:
    if 'profile' in rf or 'auth' in rf or 'notifications' in rf: continue
    
    module = os.path.basename(rf).replace('.py', '')
    
    with open(rf, 'r', encoding='utf-8') as f:
        content = f.read()
        
    endpoints = re.findall(r'@router\.get\("([^"]+)"\)\n(?:async )?def ([^\(]+)\(\):\n.*?return .*?\["([^"]+)"\]', content, re.DOTALL)
    
    new_content = f'''from fastapi import APIRouter, Depends
from dependencies import get_{module}_service
from services.{module}_service import {module.capitalize()}Service

router = APIRouter(prefix="/{module}", tags=["{module}"])
'''
    
    for path, func_name, key in endpoints:
        new_content += f'''
@router.get("{path}")
def {func_name}(service: {module.capitalize()}Service = Depends(get_{module}_service)):
    return service.get_all_data()["{key}"]
'''
    
    with open(rf, 'w', encoding='utf-8') as f:
        f.write(new_content)
