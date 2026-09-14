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

count_updated = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig_content = content
    rel_depth = len(os.path.relpath(filepath, root_dir).split(os.sep)) - 1
    prefix = '../' * rel_depth

    # Replace twitter:image and remaining logo.jpg occurrences with logo.webp or logo-icon.webp
    content = re.sub(
        r'content=[\"\'](?:https://360tools\.me/)?(?:images/)?logo\.jpg[\"\']',
        f'content="{prefix}images/logo.webp"',
        content
    )
    content = re.sub(
        r'\"logo\":\s*\"https://360tools\.me/images/logo\.jpg\"',
        '"logo": "https://360tools.me/images/logo.webp"',
        content
    )
    content = re.sub(
        r'src=[\"\']images/logo\.jpg[\"\']',
        f'src="{prefix}images/logo-icon.webp"',
        content
    )
    content = re.sub(
        r'\'images/logo\.jpg\'',
        f"'{prefix}images/logo.webp'",
        content
    )

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count_updated += 1

print(f'Cleaned up logo references across {count_updated} files')
