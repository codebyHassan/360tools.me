import os

root_dir = os.path.abspath(os.path.dirname(__file__) + '/..')
html_files = []
for root, dirs, files in os.walk(root_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig_content = content
    content = content.replace('</noscript></noscript>', '</noscript>')

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print('Fixed extra noscript closing tags.')
