import os
import re

root_dir = os.path.abspath(os.path.dirname(__file__) + '/..')
html_files = []
for root, dirs, files in os.walk(root_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

count_cleaned = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig_content = content

    # Clean nested or malformed noscript tags for font-awesome
    content = re.sub(
        r'<link rel=[\"\']stylesheet[\"\'] href=[\"\']https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.5\.1/css/all\.min\.css[\"\'][^>]*>\s*(?:<noscript>.*?</noscript>)+',
        '''<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></noscript>''',
        content,
        flags=re.DOTALL
    )

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count_cleaned += 1

print(f'Cleaned up noscript tags across {count_cleaned} files')
