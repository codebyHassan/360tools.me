import re
import glob

# 1. Update js/main.js and js/main.min.js
for js_path in ['js/main.js', 'js/main.min.js']:
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    # Replace Watermark Remover with Photo Object Eraser in footer
    js = js.replace(
        'image-tools/watermark-remover.html',
        'image-tools/background-remover.html' # Keep background remover or safe tool
    )
    js = js.replace(
        'Watermark Remover',
        'Photo Object Eraser'
    )

    # In renderGlobalFooter, check if already rendered
    old_footer_check = 'function renderGlobalFooter() {\n  const footerElem = document.getElementById(\'globalFooter\');\n  if (!footerElem) return;'
    new_footer_check = '''function renderGlobalFooter() {
  const footerElem = document.getElementById('globalFooter');
  if (!footerElem) return;
  if (footerElem.innerHTML && footerElem.innerHTML.trim().length > 100) return;'''

    if old_footer_check in js:
        js = js.replace(old_footer_check, new_footer_check)
    else:
        # Try CRLF version
        old_footer_check_crlf = old_footer_check.replace('\n', '\r\n')
        new_footer_check_crlf = new_footer_check.replace('\n', '\r\n')
        if old_footer_check_crlf in js:
            js = js.replace(old_footer_check_crlf, new_footer_check_crlf)

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)

print("Updated js/main.js and js/main.min.js")

# 2. Extract clean static footer HTML
with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

m = re.search(r'footerElem\.innerHTML\s*=\s*`([\s\S]*?)`;', js)
if not m:
    raise Exception("Could not find footerElem.innerHTML in js/main.js")

footer_inner_template = m.group(1).replace('${getSiteRoot()}', '/')

# Clean up indentation and wrap in standard tags
full_footer_html = f'''<footer id="globalFooter" class="no-print bg-white text-slate-700 border-t border-slate-200/80 mt-20">
{footer_inner_template.strip()}
</footer>'''

# 3. Inject static footer across all HTML files
html_files = [f for f in glob.glob('**/*.html', recursive=True) if not f.startswith('.')]
updated_count = 0

footer_tag_regex = re.compile(r'<footer id=["\']globalFooter["\'][^>]*>[\s\S]*?</footer>', re.IGNORECASE)

for fpath in html_files:
    if fpath == 'google0af4db396aa23bef.html':
        continue # Verification tag only
        
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    if footer_tag_regex.search(content):
        new_content = footer_tag_regex.sub(full_footer_html, content)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_count += 1
    else:
        # If file has </body> but no footer tag, inject before </body> or main scripts
        if '</body>' in content and '<footer' not in content:
            new_content = content.replace('</body>', f'{full_footer_html}\n</body>')
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated_count += 1

print(f"Successfully injected static footer into {updated_count} HTML files!")
