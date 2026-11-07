import os, re

cleaned = 0
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'scripts', '.git']]
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
            if '<meta name="keywords"' in content:
                new_content = re.sub(r'[ \t]*<meta name="keywords"[\s\S]*?>\n?', '', content)
                with open(path, 'w', encoding='utf-8') as fp:
                    fp.write(new_content)
                cleaned += 1

print(f"Removed meta keywords from {cleaned} HTML files.")

