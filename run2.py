import os

def replace_in_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\SaaS\Activities.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">\n          <MoreVertical className="w-5 h-5" />\n        </button>""", "        <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />")
])

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\SaaS\ChurnRate.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">\n            <MoreVertical className="w-5 h-5" />\n          </button>""", "          <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />")
])

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\SaaS\ConversionFunnel.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">\n            <MoreVertical className="w-5 h-5" />\n          </button>""", "          <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />")
])

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\SaaS\ProductPerformance.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">\n          <MoreVertical className="w-5 h-5" />\n        </button>""", "        <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />"),
    ("const [tab, setTab] = useState('Daily Sales');", "const [timeframe, setTimeframe] = useState('Daily Sales');"),
    ("onClick={() => setTab(t)}", "onClick={() => setTimeframe(t)}"),
    ("tab === t", "timeframe === t")
])

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\SaaS\UserGrowth.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">\n            <MoreVertical className="w-5 h-5" />\n          </button>""", "          <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />")
])

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Marketing\TopTrafficSource.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">\n          <MoreVertical className="w-5 h-5" />\n        </button>""", "        <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />")
])

replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Marketing\TrafficStats.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">\n          <MoreVertical className="w-5 h-5" />\n        </button>""", "        <DropdownDefault options={['View Report', 'Download PDF', 'Settings']} onSelect={() => {}} />"),
    ("const [period, setPeriod] = useState('Today');", "const [timeframe, setTimeframe] = useState('Month');"),
    ("onClick={() => setPeriod(p)}", "onClick={() => setTimeframe(p)}"),
    ("period === p", "timeframe === p")
])
