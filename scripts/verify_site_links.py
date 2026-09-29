import os
import glob
import re

html_files = [f for f in glob.glob('**/*.html', recursive=True) if not f.startswith('.')]
broken_links = {}

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    links = re.findall(r'href=["\'](/[^"\'#?]+)["\']', content)
    for l in set(links):
        rel_path = l.lstrip('/')
        if not rel_path:
            continue
        exists = (
            os.path.exists(rel_path) or
            os.path.exists(rel_path + '.html') or
            os.path.exists(os.path.join(rel_path, 'index.html'))
        )
        if not exists:
            if l not in broken_links:
                broken_links[l] = []
            broken_links[l].append(fpath)

print("Broken root-relative links count:", len(broken_links))
for l, files in broken_links.items():
    print(f"  - {l} (in {len(files)} files)")

if os.path.exists('scripts/test_footer_template.py'):
    os.remove('scripts/test_footer_template.py')
