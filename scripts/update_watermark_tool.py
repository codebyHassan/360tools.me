import re

# 1. Update image-tools/watermark-remover.html
with open('image-tools/watermark-remover.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace title
c = re.sub(
    r'<title>.*?</title>',
    '<title>Free Photo Object & Blemish Remover Online | 360tools</title>',
    c,
    count=1
)

# Add meta robots noindex before canonical
if '<meta name="robots" content="noindex, follow">' not in c:
    c = re.sub(
        r'(<link\s+rel=["\']canonical["\'])',
        r'<meta name="robots" content="noindex, follow">\n  \1',
        c,
        count=1
    )

# Update description
c = re.sub(
    r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']',
    '<meta name="description" content="Erase unwanted objects, blemishes, text, and stamps from photos online for free. In-browser content-aware inpainting. 100% private.">',
    c,
    count=1
)

with open('image-tools/watermark-remover.html', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated image-tools/watermark-remover.html")

# 2. Update index.html featured card
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

# Replace "Watermark Remover" card text
idx = idx.replace(
    '<span>Watermark Remover</span>',
    '<span>Photo Object Remover</span>'
)
idx = idx.replace(
    'Erase logos, timestamps, and watermarks from images and videos. Interactive box selection, brush mask,\n                content-aware inpainting with zero API keys.',
    'Erase unwanted objects, blemishes, and text stamps from photos. Interactive box selection, brush mask, content-aware inpainting with zero API keys.'
)
idx = idx.replace(
    'Erase logos, timestamps, and watermarks from images and videos. Interactive box selection, brush mask,\r\n                content-aware inpainting with zero API keys.',
    'Erase unwanted objects, blemishes, and text stamps from photos. Interactive box selection, brush mask, content-aware inpainting with zero API keys.'
)
idx = idx.replace(
    '<span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Image & Video Delogo</span>',
    '<span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Photo Retouch & Eraser</span>'
)
idx = idx.replace(
    '<span>Remove Watermark</span>',
    '<span>Erase Object</span>'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)
print("Updated index.html featured card")

# 3. Update sitemap.xml to exclude watermark-remover during AdSense review
with open('sitemap.xml', 'r', encoding='utf-8') as f:
    sitemap = f.read()

# Remove the watermark-remover URL entry
sitemap = re.sub(
    r'\s*<url>\s*<loc>https://360tools\.me/image-tools/watermark-remover\.html</loc>[\s\S]*?</url>',
    '',
    sitemap
)

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap)
print("Removed watermark-remover from sitemap.xml")
