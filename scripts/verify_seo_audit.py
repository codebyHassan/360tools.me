import os, re, json

all_html = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'scripts', '.git']]
    for f in files:
        if f.endswith('.html'):
            all_html.append(os.path.join(root, f).replace('\\', '/'))

print(f"Total HTML files to verify: {len(all_html)}")

invalid_jsonld = []
long_titles = []
long_descriptions = []
missing_canonicals = []
broken_links = []
keywords_found = []

for path in all_html:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Check JSON-LD
    scripts = re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', html)
    for s in scripts:
        try:
            json.loads(s)
        except Exception as e:
            invalid_jsonld.append((path, str(e)))

    # 2. Check Meta Keywords
    if '<meta name="keywords"' in html:
        keywords_found.append(path)

    # 3. Check Canonical
    can_match = re.search(r'<link rel="canonical" href="([^"]+)">', html)
    if not can_match:
        missing_canonicals.append(path)
    else:
        can_url = can_match.group(1)
        if 'index.html' in can_url:
            missing_canonicals.append(f"{path} (contains index.html in canonical: {can_url})")

    # 4. Check Title length
    title_match = re.search(r'<title>([\s\S]*?)</title>', html)
    if title_match:
        t = title_match.group(1).strip()
        if len(t) > 65:  # slight grace for branding
            long_titles.append((path, len(t), t))

    # 5. Check Description length
    desc_match = re.search(r'<meta name="description" content="([\s\S]*?)">', html)
    if desc_match:
        d = desc_match.group(1).strip()
        if len(d) > 165:  # slight grace
            long_descriptions.append((path, len(d), d[:60] + '...'))

print("\n--- AUDIT RESULTS ---")
print(f"Invalid JSON-LD blocks: {len(invalid_jsonld)}")
if invalid_jsonld:
    print(invalid_jsonld[:5])

print(f"Meta keywords found: {len(keywords_found)}")
if keywords_found:
    print(f"Files with meta keywords ({len(keywords_found)}): {keywords_found[:5]}")

print(f"Canonical issues: {len(missing_canonicals)}")
if missing_canonicals:
    print(missing_canonicals[:5])

print(f"Titles > 65 chars: {len(long_titles)}")
if long_titles:
    print("Sample long titles:", long_titles[:5])

print(f"Descriptions > 165 chars: {len(long_descriptions)}")
if long_descriptions:
    print("Sample long descriptions:", long_descriptions[:5])

