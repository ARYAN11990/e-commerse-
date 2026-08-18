import os

def replace_in_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Task\TaskKanban.jsx", [
    ("import { Plus, MoreHorizontal, Calendar, Search } from 'lucide-react';", "import { Plus, MoreHorizontal, Calendar, Search } from 'lucide-react';\nimport DropdownDefault from '../../components/DropdownDefault';"),
    ("""                      <button className="text-[#64748B] hover:text-[#1C2434] dark:hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>""", "                      <DropdownDefault options={['Edit', 'Delete']} />")
])

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Task\TaskList.jsx", [
    ("import { Plus, Search, Filter, MoreHorizontal, Calendar } from 'lucide-react';", "import { Plus, Search, Filter, MoreHorizontal, Calendar } from 'lucide-react';\nimport DropdownDefault from '../../components/DropdownDefault';"),
    ("""                  <button className="text-[#64748B] hover:text-[#1C2434] dark:hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>""", "                  <DropdownDefault options={['Edit', 'Delete']} />")
])
