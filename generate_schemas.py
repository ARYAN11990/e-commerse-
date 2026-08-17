import json
import os
import subprocess
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from backend.providers.mock_generators import (
    generate_ecommerce_state,
    generate_analytics_state,
    generate_marketing_state,
    generate_crm_state,
    generate_stocks_state,
    generate_saas_state,
    generate_logistics_state,
    generate_ai_state,
    generate_sales_state,
    generate_finance_state
)

domain_funcs = {
    'dashboard': generate_ecommerce_state,
    'analytics': generate_analytics_state,
    'marketing': generate_marketing_state,
    'crm': generate_crm_state,
    'stocks': generate_stocks_state,
    'saas': generate_saas_state,
    'logistics': generate_logistics_state,
    'ai': generate_ai_state,
    'sales': generate_sales_state,
    'finance': generate_finance_state
}

schemas_dir = 'backend/schemas'
os.makedirs(schemas_dir, exist_ok=True)
with open(os.path.join(schemas_dir, '__init__.py'), 'w') as f:
    f.write("")

for domain, func in domain_funcs.items():
    state = func()
    json_path = f"backend/schemas/{domain}.json"
    with open(json_path, 'w') as f:
        json.dump(state, f)
    
    out_path = f"backend/schemas/{domain}.py"
    subprocess.run([
        sys.executable, "-m", "datamodel_code_generator",
        "--input", json_path,
        "--input-file-type", "json",
        "--output", out_path,
        "--class-name", f"{domain.capitalize()}Response"
    ])
    
    os.remove(json_path)

print("Finished generating schemas!")
