import glob
import re

files = glob.glob('**/*.html', recursive=True)
count = 0

pattern = re.compile(
    r'\s*<!--\s*(?:AdSense Placement|Advertisement Placeholder|Google AdSense Banner)\s*-->\s*<div[^>]*>[\s\S]*?Advertisement Area[\s\S]*?</div>',
    re.IGNORECASE
)

pattern2 = re.compile(
    r'\s*<div[^>]*border-dashed[^>]*>[\s\S]*?Advertisement Area[\s\S]*?</div>',
    re.IGNORECASE
)

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, n1 = pattern.subn('', content)
    new_content, n2 = pattern2.subn('', new_content)
    
    if n1 + n2 > 0:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed placeholder ad from: {fpath} ({n1+n2} matches)")
        count += 1

print(f"Total files updated: {count}")
