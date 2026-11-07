import os, re

cats = ['audio-tools', 'business-tools', 'calculators', 'design-tools', 'developer-tools', 'ecommerce-tools', 'finance-tools', 'games', 'image-tools', 'pdf-tools', 'security-tools', 'student-tools', 'text-tools', 'video-tools']

for c in cats:
    p = os.path.join(c, 'index.html')
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
        links = re.findall(r'href=["\']([^"\']+)["\']', html)
        cat_links = set()
        for l in links:
            if c in l and l not in [f'/{c}/', f'/{c}/index.html', f'{c}/index.html', 'index.html', './']:
                cat_links.add(l)
        print(f'{c}: found {len(cat_links)} tool links. Links: {list(cat_links)[:4]}')
    else:
        print(f'{c}: MISSING')

