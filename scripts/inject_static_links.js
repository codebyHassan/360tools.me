const fs = require('fs');
const vm = require('vm');

// 1. Load TOOLS_REGISTRY from js/main.js
let mainJsContent = fs.readFileSync('js/main.js', 'utf8');
const sandbox = {};
vm.createContext(sandbox);
const match = mainJsContent.match(/const TOOLS_REGISTRY = (\[[\s\S]*?\]);/);
vm.runInContext('var TOOLS_REGISTRY = ' + match[1], sandbox);

const categoryConfig = {
  'pdf': { label: 'PDF Tool', iconBg: 'bg-red-50 text-red-600', color: 'text-red-500' },
  'developer': { label: 'Developer', iconBg: 'bg-emerald-50 text-emerald-600', color: 'text-emerald-600' },
  'image': { label: 'Image Tool', iconBg: 'bg-orange-50 text-orange-600', color: 'text-orange-500' },
  'video': { label: 'Video Tool', iconBg: 'bg-rose-50 text-rose-600', color: 'text-rose-500' },
  'audio': { label: 'AI Audio', iconBg: 'bg-sky-50 text-sky-600', color: 'text-sky-600' },
  'text': { label: 'Writing & Text', iconBg: 'bg-indigo-50 text-indigo-600', color: 'text-indigo-600' },
  'ecommerce': { label: 'E-Commerce', iconBg: 'bg-blue-50 text-blue-600', color: 'text-blue-600' },
  'finance': { label: 'Finance', iconBg: 'bg-emerald-50 text-emerald-600', color: 'text-emerald-600' },
  'calculators': { label: 'Real Estate & Tax', iconBg: 'bg-teal-50 text-teal-600', color: 'text-teal-600' },
  'security': { label: 'Security & Privacy', iconBg: 'bg-purple-50 text-purple-600', color: 'text-purple-600' },
  'design': { label: 'Design', iconBg: 'bg-pink-50 text-pink-600', color: 'text-pink-600' },
  'student': { label: 'Student', iconBg: 'bg-amber-50 text-amber-600', color: 'text-amber-600' },
  'games': { label: 'Free Game', iconBg: 'bg-violet-50 text-violet-600', color: 'text-violet-600' },
  'business': { label: 'Business', iconBg: 'bg-blue-50 text-blue-600', color: 'text-blue-600' }
};

function getToolCategoryKey(tool) {
  const catLower = (tool.category || '').toLowerCase();
  const urlLower = (tool.url || '').toLowerCase();

  if (catLower.includes('pdf') || urlLower.includes('pdf-tools/')) return 'pdf';
  if (catLower.includes('developer') || urlLower.includes('developer-tools/') || urlLower.includes('markdown') || urlLower.includes('minifier') || urlLower.includes('qr-code') || urlLower.includes('ats-resume') || urlLower.includes('shopify')) return 'developer';
  if (catLower.includes('video') || urlLower.includes('video-tools/')) return 'video';
  if (catLower.includes('image') || urlLower.includes('image-tools/') || urlLower.includes('background-remover') || urlLower.includes('image-compressor')) return 'image';
  if (catLower.includes('audio') || catLower.includes('voice') || urlLower.includes('audio-tools/') || urlLower.includes('speech')) return 'audio';
  if (catLower.includes('ecommerce') || urlLower.includes('ecommerce-tools/') || urlLower.includes('invoice') || urlLower.includes('etsy') || urlLower.includes('amazon') || urlLower.includes('tiktok') || urlLower.includes('pod-profit')) return 'ecommerce';
  if (catLower.includes('finance') || urlLower.includes('finance-tools/') || urlLower.includes('compound-interest') || urlLower.includes('loan') || urlLower.includes('crypto')) return 'finance';
  if (catLower.includes('calc') || urlLower.includes('calculators/') || urlLower.includes('section8') || urlLower.includes('stamp-duty') || urlLower.includes('1031') || urlLower.includes('str-cleaning') || urlLower.includes('eu-vat')) return 'calculators';
  if (catLower.includes('game') || urlLower.includes('games/') || urlLower.includes('2048') || urlLower.includes('snake') || urlLower.includes('memory') || urlLower.includes('tic-tac-toe') || urlLower.includes('bhabhi') || urlLower.includes('word-scramble')) return 'games';
  if (catLower.includes('design') || urlLower.includes('design-tools/') || urlLower.includes('color-palette') || urlLower.includes('aspect-ratio')) return 'design';
  if (catLower.includes('student') || urlLower.includes('student-tools/') || urlLower.includes('gpa') || urlLower.includes('unit-converter')) return 'student';
  if (catLower.includes('security') || urlLower.includes('security-tools/') || urlLower.includes('password') || urlLower.includes('hash') || urlLower.includes('base64') || urlLower.includes('uuid')) return 'security';
  if (catLower.includes('business') || urlLower.includes('business-tools/') || urlLower.includes('roi') || urlLower.includes('break-even') || urlLower.includes('freelance')) return 'business';
  if (catLower.includes('text') || urlLower.includes('text-tools/') || urlLower.includes('word-counter') || urlLower.includes('case-converter') || urlLower.includes('lorem') || urlLower.includes('text-cleaner')) return 'text';
  
  return 'developer';
}

function cleanUrl(url) {
  if (url === '/index.html') return '/';
  if (url.endsWith('/index.html')) {
    return url.replace(/\/index\.html$/, '/');
  }
  return url;
}

// 2. Generate Static Tool Cards HTML
const staticCardsHtml = sandbox.TOOLS_REGISTRY.map(tool => {
  const catKey = getToolCategoryKey(tool);
  const conf = categoryConfig[catKey] || { label: 'Utility', iconBg: 'bg-blue-50 text-[#0066ff]', color: 'text-blue-600' };
  const toolDesc = tool.desc || `Fast, 100% browser-based ${tool.name.toLowerCase()} utility on 360Tools. Zero cloud uploads.`;
  const rawKeywords = Array.isArray(tool.keywords) ? tool.keywords.join(' ') : (tool.keywords || '');
  const searchKeywordsBlob = `360tools ${tool.name} ${rawKeywords} ${tool.desc || ''} ${tool.category || ''} ${catKey}`.toLowerCase();
  const url = cleanUrl(tool.url);

  return `          <a href="${url}" class="tool-card tool-grid-card group" data-category="${catKey}" data-title="${searchKeywordsBlob}">
            <div>
              <div class="flex items-start justify-between gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl ${conf.iconBg} flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                  <i class="fa-solid ${tool.icon || 'fa-bolt'}"></i>
                </div>
                <span class="text-[10px] font-bold ${conf.color} uppercase tracking-wider">${conf.label}</span>
              </div>
              <h3 class="font-heading font-black text-base text-slate-900 group-hover:text-[#0066ff] transition-colors leading-snug">
                ${tool.name}
              </h3>
              <p class="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed line-clamp-2">
                ${toolDesc}
              </p>
            </div>
          </a>`;
}).join('\n');

// 3. Inject into index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace the empty toolsGrid div
const toolsGridRegex = /<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" id="toolsGrid">[\s\S]*?<\/div>/;
const newToolsGridHtml = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" id="toolsGrid">\n${staticCardsHtml}\n        </div>`;

if (toolsGridRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(toolsGridRegex, newToolsGridHtml);
  console.log('Successfully injected 94 static cards into index.html #toolsGrid');
} else {
  console.error('Failed to locate #toolsGrid in index.html');
}

// Update renderCatalogGrid in index.html to not overwrite if static cards already exist
indexHtml = indexHtml.replace(
  /grid\.innerHTML = TOOLS_REGISTRY\.map\(tool => \{[\s\S]*?\}\)\.join\(''\);/,
  `if (grid.children.length === 0) {
        grid.innerHTML = TOOLS_REGISTRY.map(tool => {
          const catKey = getToolCategoryKey(tool);
          counts[catKey] = (counts[catKey] || 0) + 1;
          const conf = categoryConfig[catKey] || { label: 'Utility', iconBg: 'bg-blue-50 text-[#0066ff]', color: 'text-blue-600' };
          const toolDesc = tool.desc || \`Fast, 100% browser-based \${tool.name.toLowerCase()} utility on 360Tools. Zero cloud uploads.\`;
          const rawKeywords = Array.isArray(tool.keywords) ? tool.keywords.join(' ') : (tool.keywords || '');
          const searchKeywordsBlob = \`360tools \${tool.name} \${rawKeywords} \${tool.desc || ''} \${tool.category || ''} \${catKey}\`.toLowerCase();
          const cleanUrl = tool.url.endsWith('/index.html') ? tool.url.replace(/\\/index\\.html$/, '/') : tool.url;
          return \`
            <a href="\${cleanUrl}" class="tool-card tool-grid-card group" data-category="\${catKey}" data-title="\${searchKeywordsBlob}">
              <div>
                <div class="flex items-start justify-between gap-3 mb-3">
                  <div class="w-10 h-10 rounded-xl \${conf.iconBg} flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                    <i class="fa-solid \${tool.icon || 'fa-bolt'}"></i>
                  </div>
                  <span class="text-[10px] font-bold \${conf.color} uppercase tracking-wider">\${conf.label}</span>
                </div>
                <h3 class="font-heading font-black text-base text-slate-900 group-hover:text-[#0066ff] transition-colors leading-snug">
                  \${tool.name}
                </h3>
                <p class="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed line-clamp-2">
                  \${toolDesc}
                </p>
              </div>
            </a>
          \`;
        }).join('');
      }`
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated index.html successfully.');

// 4. Update main.js and main.min.js tool URLs
let updatedMainJs = mainJsContent.replace(/(url:\s*['"])([^'"]+?)\/index\.html(['"])/g, '$1$2/$3');
fs.writeFileSync('js/main.js', updatedMainJs, 'utf8');
fs.writeFileSync('js/main.min.js', updatedMainJs, 'utf8');
console.log('Updated js/main.js and js/main.min.js with clean URLs.');

