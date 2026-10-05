import os
from datetime import datetime

today = datetime.now().strftime('%Y-%m-%d')

exclude = {'404.html', 'appearance.html', 'blog-post.html', 'google0af4db396aa23bef.html'}

all_files = []
for r, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'scripts', 'scratch']]
    for f in files:
        if f.endswith('.html') and f not in exclude:
            rel = os.path.relpath(os.path.join(r, f), '.').replace(os.sep, '/')
            all_files.append(rel)

urls = []

for hf in sorted(all_files):
    if hf == 'index.html':
        url = 'https://360tools.me/'
        priority = '1.0'
        freq = 'daily'
    elif hf.endswith('/index.html'):
        hub_slug = hf[:-11]  # remove '/index.html'
        url = f'https://360tools.me/{hub_slug}/'
        if hub_slug.startswith('pdf-tools/') or hub_slug.startswith('games/'):
            priority = '0.8'
            freq = 'weekly'
        else:
            priority = '0.9'
            freq = 'weekly'
    else:
        url = f'https://360tools.me/{hf}'
        if hf.startswith('blogs/'):
            priority = '0.8'
            freq = 'weekly'
        elif hf in ['about.html', 'contact.html', 'privacy.html', 'terms.html', 'disclaimer.html', 'changelog.html', 'blog.html']:
            priority = '0.6'
            freq = 'monthly'
        elif any(hf.startswith(c) for c in ['business-tools/', 'text-tools/', 'finance-tools/', 'security-tools/', 'design-tools/', 'student-tools/', 'developer-tools/', 'audio-tools/', 'image-tools/', 'ecommerce-tools/', 'calculators/', 'video-tools/']):
            priority = '0.85'
            freq = 'weekly'
        else:
            priority = '0.7'
            freq = 'weekly'
            
    urls.append((url, priority, freq))

# Deduplicate while preserving order
seen = set()
unique_urls = []
for u, p, f in urls:
    if u not in seen:
        seen.add(u)
        unique_urls.append((u, p, f))

# Sort: homepage first, then hubs (0.9), tools (0.85), blogs/games (0.8), others
def sort_key(item):
    u, p, f = item
    if u == 'https://360tools.me/':
        return (0, '')
    return (1 - float(p), u)

unique_urls.sort(key=sort_key)

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
]

for u, p, f in unique_urls:
    xml_lines.append('  <url>')
    xml_lines.append(f'    <loc>{u}</loc>')
    xml_lines.append(f'    <lastmod>{today}</lastmod>')
    xml_lines.append(f'    <changefreq>{f}</changefreq>')
    xml_lines.append(f'    <priority>{p}</priority>')
    xml_lines.append('  </url>')

xml_lines.append('</urlset>')

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml_lines) + '\n')

print(f"Successfully generated sitemap.xml with {len(unique_urls)} verified URLs.")
