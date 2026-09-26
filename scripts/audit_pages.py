import os
import re

files = ['about.html', 'contact.html', 'privacy-policy.html', 'terms.html', 'disclaimer.html']

for fn in files:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"=== Auditing {fn} ===")
    
    # Title
    title = re.search(r'<title>(.*?)</title>', content)
    print("Title:", title.group(1) if title else "MISSING")
    
    # Meta Description
    desc = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content)
    print("Description:", desc.group(1) if desc else "MISSING")
    
    # Canonical
    canon = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content)
    print("Canonical:", canon.group(1) if canon else "MISSING")
    
    # H1 count
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    print(f"H1 Count: {len(h1s)}")
    for h in h1s:
        clean_h = re.sub(r'<[^>]+>', '', h).strip()
        print(f"  H1: {clean_h}")
        
    # Local links check
    links = re.findall(r'href=["\']([^#"\':]+?\.html)["\']', content)
    broken = []
    for l in set(links):
        clean_l = l.lstrip('/')
        if not os.path.exists(clean_l):
            broken.append(l)
    print(f"Links count: {len(links)}, Broken: {broken}")
    print()

print("=== Auditing Footer Links in js/main.js ===")
with open('js/main.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

footer_match = re.search(r'function renderGlobalFooter\(\)\s*\{([\s\S]*?)\n\}', js_code)
if footer_match:
    footer_code = footer_match.group(1)
    footer_links = re.findall(r'href=["\']\$\{getSiteRoot\(\)\}([^"\'#]+)["\']', footer_code)
    print(f"Total dynamic links in footer: {len(footer_links)}")
    broken_footer = []
    for l in set(footer_links):
        clean_path = l.strip('/')
        if not os.path.exists(clean_path) and not os.path.exists(l):
            broken_footer.append(l)
    print(f"Broken links in footer: {broken_footer}")

