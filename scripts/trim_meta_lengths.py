import os, re

all_tools = []
categories = ['audio-tools', 'business-tools', 'calculators', 'design-tools', 'developer-tools', 'ecommerce-tools', 'finance-tools', 'image-tools', 'pdf-tools', 'security-tools', 'student-tools', 'text-tools', 'video-tools', 'games']

for cat in categories:
    for root, dirs, files in os.walk(cat):
        for f in files:
            if f.endswith('.html'):
                all_tools.append(os.path.join(root, f).replace('\\', '/'))

all_tools.append('index.html')

updated_titles = 0
updated_descs = 0

for t in all_tools:
    if not os.path.exists(t): continue
    with open(t, 'r', encoding='utf-8', errors='ignore') as fp:
        html = fp.read()
    orig = html

    # Title optimization
    m_title = re.search(r'<title>(.*?)</title>', html)
    if m_title:
        title = m_title.group(1).strip()
        if len(title) > 60:
            # Shorten title intelligently
            # Replace common verbose suffixes
            new_title = title
            new_title = new_title.replace(' | 360tools.me', ' | 360tools')
            new_title = new_title.replace(' | 360Tools.me', ' | 360tools')
            new_title = new_title.replace(' | 360Tools', ' | 360tools')
            new_title = new_title.replace(' — 100% Client-Side Private', '')
            new_title = new_title.replace(' — 100% In-Browser Privacy', '')
            new_title = new_title.replace(' — Free Realistic Voiceover & MP3 Downloader', ' — Free Voice Studio')
            new_title = new_title.replace(' — Free AI Speech Studio & MP3 Downloader', ' — Free Online Voice Generator')
            new_title = new_title.replace(' (2026 Updated) - Free HUD Voucher Calculator', ' & HUD Rent Calculator')
            new_title = new_title.replace(' (2026 Updated) - SDLT Relief Tool', ' & SDLT Relief Calculator')
            new_title = new_title.replace(' (2026 Updated)', '')
            new_title = new_title.replace(' - Free Online Calculator', '')
            new_title = new_title.replace(' - Free Tool', '')

            # If still > 60, trim at pipe or dash
            if len(new_title) > 60:
                if ' | 360tools' in new_title:
                    base = new_title.split(' | 360tools')[0]
                    # fit base + ' | 360tools' (11 chars)
                    allowed = 60 - 11
                    if len(base) > allowed:
                        base = base[:allowed].rsplit(' ', 1)[0]
                    new_title = f"{base} | 360tools"
                elif ' | ' in new_title:
                    parts = new_title.split(' | ')
                    new_title = f"{parts[0][:48]} | 360tools"
                else:
                    new_title = new_title[:57].rsplit(' ', 1)[0] + '...'

            if new_title != title and len(new_title) <= 60:
                html = html.replace(f'<title>{title}</title>', f'<title>{new_title}</title>')
                html = re.sub(r'<meta name="title" content="[^"]*">', f'<meta name="title" content="{new_title}">', html)
                updated_titles += 1

    # Description optimization
    m_desc = re.search(r'<meta name="description" content="([^"]*)">', html)
    if m_desc:
        desc = m_desc.group(1).strip()
        if len(desc) > 160:
            # Trim cleanly to <= 160 at last sentence or word
            new_desc = desc[:157].rsplit(' ', 1)[0] + '.'
            html = html.replace(f'<meta name="description" content="{desc}">', f'<meta name="description" content="{new_desc}">')
            updated_descs += 1

    if html != orig:
        with open(t, 'w', encoding='utf-8') as fp:
            fp.write(html)

print(f"Titles optimized to <60 chars: {updated_titles}")
print(f"Descriptions optimized to <160 chars: {updated_descs}")

