const fs = require('fs');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = dir + '/' + file;
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'scripts') {
        results = results.concat(walk(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk('.');
let imgCount = 0;
let updatedFiles = 0;

htmlFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace logo-icon img if missing width/height
  // e.g. <img src="/images/logo-icon.webp" alt="360Tools Logo" ...>
  content = content.replace(/<img([^>]*?)src=["'](\/images\/logo-icon\.webp|\.\.\/images\/logo-icon\.webp|images\/logo-icon\.webp)["']([^>]*?)>/g, (match, p1, p2, p3) => {
    let img = match;
    if (!img.includes('width=')) img = img.replace('<img', '<img width="40"');
    if (!img.includes('height=')) img = img.replace('<img', '<img height="40"');
    if (!img.includes('loading=') && !f.endsWith('index.html')) img = img.replace('<img', '<img loading="lazy"');
    return img;
  });

  // For any other img (except hero/above-the-fold on homepage), add loading="lazy" and decoding="async"
  content = content.replace(/<img\s+([^>]+)>/g, (match, attrs) => {
    let img = match;
    // Don't add loading=lazy if already present
    if (!attrs.includes('loading=')) {
      // Don't lazy load main logo in header on homepage
      if (f === './index.html' && attrs.includes('logo-icon.webp')) {
        // above-the-fold
      } else {
        img = img.replace('<img', '<img loading="lazy" decoding="async"');
      }
    }
    return img;
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    updatedFiles++;
  }
});

console.log(`Updated images across ${updatedFiles} files with loading=lazy and decoding=async.`);

