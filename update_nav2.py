import os
import re

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\App.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    app = f.read()

# Add import
app = app.replace("const Faq = lazy(() => import('./pages/Pages/Faq'));", 
"const Faq = lazy(() => import('./pages/Pages/Faq'));\nconst Integrations = lazy(() => import('./pages/Pages/Integrations'));")

# Add route
app = app.replace("<Route path=\"/pages/faq\" element={<ProtectedRoute><Faq /></ProtectedRoute>} />", 
"<Route path=\"/pages/faq\" element={<ProtectedRoute><Faq /></ProtectedRoute>} />\n                  <Route path=\"/pages/integrations\" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app)

sidebar_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\components\Sidebar.jsx"
with open(sidebar_path, 'r', encoding='utf-8') as f:
    sidebar = f.read()

new_navlink = """                      <li>
                        <NavLink
                          to="/pages/integrations"
                          className={({ isActive }) =>
                            lex items-center gap-2.5 rounded-md py-2 px-4 text-sm font-medium 
                          }
                        >
                          Integrations
                        </NavLink>
                      </li>"""

sidebar = sidebar.replace("FAQ\n                        </NavLink>\n                      </li>", "FAQ\n                        </NavLink>\n                      </li>\n" + new_navlink)

with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(sidebar)

print("Updated app and sidebar")
