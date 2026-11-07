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
let filesModified = 0;

htmlFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Clean /pdf-tools/tool-name/index.html -> /pdf-tools/tool-name/
  content = content.replace(/href=["'](https:\/\/360tools\.me)?(\/pdf-tools\/[a-zA-Z0-9_-]+)\/index\.html["']/g, 'href="$2/"');
  content = content.replace(/href=["'](https:\/\/360tools\.me)?(\/games\/[a-zA-Z0-9_-]+)\/index\.html["']/g, 'href="$2/"');
  
  // Clean category index.html links: /category/index.html -> /category/
  content = content.replace(/href=["'](https:\/\/360tools\.me)?(\/[a-zA-Z0-9_-]+-tools|calculators|games)\/index\.html["']/g, 'href="$2/"');

  // Clean root index.html links: /index.html -> /
  content = content.replace(/href=["'](https:\/\/360tools\.me)?\/index\.html["']/g, 'href="/"');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    filesModified++;
  }
});

console.log(`Cleaned internal links across ${filesModified} HTML files.`);

