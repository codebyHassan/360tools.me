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

print(f'Found {len(html_files)} HTML files')

count_updated = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig_content = content
    rel_depth = len(os.path.relpath(filepath, root_dir).split(os.sep)) - 1
    prefix = '../' * rel_depth

    # 1. Update logo favicon
    content = re.sub(
        r'<link rel=[\"\'](?:shortcut )?icon[\"\'][^>]*href=[\"\'][^\"\']*logo\.jpg[\"\'][^>]*>',
        f'<link rel="icon" type="image/webp" href="{prefix}images/logo-icon.webp">',
        content
    )
    content = re.sub(
        r'<link rel=[\"\']apple-touch-icon[\"\'][^>]*href=[\"\'][^\"\']*logo\.jpg[\"\'][^>]*>',
        f'<link rel="apple-touch-icon" href="{prefix}images/logo-icon.webp">',
        content
    )
    content = re.sub(
        r'<meta property=[\"\']og:image[\"\'][^>]*content=[\"\'][^\"\']*logo\.jpg[\"\'][^>]*>',
        f'<meta property="og:image" content="{prefix}images/logo.webp">',
        content
    )

    # 2. Update FontAwesome & style.css & tailwindcdn
    if 'rel="preconnect" href="https://fonts.googleapis.com"' not in content:
        preconnect_block = f'''  <!-- Preconnect External Domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
'''
        if '<link rel="stylesheet" href="https://cdnjs.cloudflare.com' in content:
            content = content.replace(
                '<link rel="stylesheet" href="https://cdnjs.cloudflare.com',
                preconnect_block + '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com',
                1
            )

    # Make FontAwesome non-blocking
    content = re.sub(
        r'<link rel=[\"\']stylesheet[\"\'] href=[\"\']https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.5\.1/css/all\.min\.css[\"\'](?! media)>',
        r'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" media="print" onload="this.media=\'all\'">\n  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></noscript>',
        content
    )

    # Replace css/style.css with css/style.min.css
    css_path = f'{prefix}css/style.min.css'
    content = re.sub(
        r'<link rel=[\"\']stylesheet[\"\'] href=[\"\'](?:\.\./)?css/style(?:\.min)?\.css[\"\']>',
        f'<link rel="stylesheet" href="{css_path}">',
        content
    )

    # Remove Tailwind CDN script tag
    content = re.sub(r'\s*<script src=[\"\']https://cdn\.tailwindcss\.com[\"\']></script>', '', content)

    # Fix header layout shift
    content = re.sub(r'<header id=[\"\']globalHeader[\"\'](?!\s*class=)(.*?)>', r'<header id="globalHeader" class="min-h-[58px]"\1>', content)

    # Update js/main.js to js/main.min.js
    js_path = f'{prefix}js/main.min.js'
    content = re.sub(
        r'<script src=[\"\'](?:\.\./)?js/main\.js[\"\']></script>',
        f'<script src="{js_path}"></script>',
        content
    )

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count_updated += 1

print(f'Updated {count_updated} files successfully!')
