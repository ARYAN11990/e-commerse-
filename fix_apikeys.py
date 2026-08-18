import os
import re

app_path = r"c:\Users\SIS\Desktop\ecommers\frontend\src\pages\Pages\ApiKeys.jsx"
with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("key: `new_key_**********`,", "key: `new_key_**********${randomString}`,")
text = text.replace("key: `new_key_**********${randomString}`,", "key: `new_key_**********${randomString}`,") # just in case

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed ApiKeys string interpolation")
