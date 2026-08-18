import os

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\App.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace("const Integrations = lazy(() => import('./pages/Pages/Integrations'));", 
"const Integrations = lazy(() => import('./pages/Pages/Integrations'));\nconst ApiKeys = lazy(() => import('./pages/Pages/ApiKeys'));")

app = app.replace("<Route path=\"/pages/integrations\" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />", 
"<Route path=\"/pages/integrations\" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />\n                  <Route path=\"/pages/api-keys\" element={<ProtectedRoute><ApiKeys /></ProtectedRoute>} />")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app)

sidebar_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Sidebar.jsx"
with open(sidebar_path, 'r', encoding='utf-8') as f:
    sidebar = f.read()

new_navlink = """                      <li>
                        <NavLink
                          to="/pages/api-keys"
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium ${
                              isActive 
                                ? 'bg-[#EDF2F9] dark:bg-[#333A48] text-[#3C50E0]' 
                                : 'text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white dark:text-white'
                            }`
                          }
                        >
                          API Keys
                        </NavLink>
                      </li>"""

sidebar = sidebar.replace("FAQ\n                        </NavLink>\n                      </li>", "FAQ\n                        </NavLink>\n                      </li>\n" + new_navlink)

with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(sidebar)

print("Updated App and Sidebar for API Keys")
