import os
import re

def replace_in_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Dividend.jsx
replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Stocks\Dividend.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>""", "          <DropdownDefault options={['View Details', 'Export', 'Delete']} />")
])

# 2. LatestTransactions.jsx
replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Stocks\LatestTransactions.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-4 h-4 mx-auto" />
        </button>""", "        <div className=\"flex justify-center\"><DropdownDefault options={['View Details', 'Export', 'Delete']} /></div>")
])

# 3. MyWatchlist.jsx
replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Stocks\MyWatchlist.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>""", "        <DropdownDefault options={['View Details', 'Export', 'Delete']} />")
])

# 4. DeliveryVehicles.jsx
replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Logistics\DeliveryVehicles.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>""", "          <DropdownDefault options={['View Details', 'Export', 'Delete']} />")
])

# 5. TotalRevenueEarned.jsx
replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Logistics\TotalRevenueEarned.jsx", [
    ("import { MoreVertical } from 'lucide-react';", "import DropdownDefault from '../DropdownDefault';"),
    ("""          <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>""", "          <DropdownDefault options={['View Details', 'Export', 'Delete']} />")
])

# 6. TrackingDelivery.jsx
replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Logistics\TrackingDelivery.jsx", [
    ("import { MoreVertical, MessageSquare, Phone } from 'lucide-react';", "import { MessageSquare, Phone } from 'lucide-react';\nimport DropdownDefault from '../DropdownDefault';"),
    ("""        <button className="text-gray-400 hover:text-[#1C2434] dark:hover:text-white dark:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>""", "        <DropdownDefault options={['View Details', 'Export', 'Delete']} />")
])

# 7. TrendingStocks.jsx (Buy/Sell buttons)
replace_in_file(r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Stocks\TrendingStocks.jsx", [
    ("""                  <button className="flex-1 rounded-md border border-stroke dark:border-[#2E3A47] py-2.5 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
                    Short Stock
                  </button>
                  <button className="flex-1 rounded-md bg-[#3C50E0] py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition">
                    Buy Stock
                  </button>""",
"""                  <button onClick={() => alert('Action initiated')} className="flex-1 rounded-md border border-stroke dark:border-[#2E3A47] py-2.5 text-sm font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition">
                    Short Stock
                  </button>
                  <button onClick={() => alert('Action initiated')} className="flex-1 rounded-md bg-[#3C50E0] py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition">
                    Buy Stock
                  </button>""")
])
