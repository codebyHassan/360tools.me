import os

root_dir = os.path.abspath(os.path.dirname(__file__) + '/..')
html_files = []
for root, dirs, files in os.walk(root_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

color_map = {
    'bg-[#f8fafc]': 'bg-[#fbf7ee]',
    'text-[#183153]': 'text-[#3e2723]',
    'bg-[#183153]': 'bg-[#3e2723]',
    'text-[#146ebe]': 'text-[#c27803]',
    'border-[#25406b]': 'border-[#ded2be]',
    'selection:bg-[#ffd43b] selection:text-[#183153]': 'selection:bg-[#c27803] selection:text-white',
}

count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig_content = content
    for old_val, new_val in color_map.items():
        content = content.replace(old_val, new_val)

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f'Updated theme colors across {count} HTML files.')
