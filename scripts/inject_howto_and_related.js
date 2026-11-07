const fs = require('fs');
const vm = require('vm');

// 1. Load TOOLS_REGISTRY
const mainJs = fs.readFileSync('js/main.js', 'utf8');
const sandbox = {};
vm.createContext(sandbox);
const match = mainJs.match(/const TOOLS_REGISTRY = (\[[\s\S]*?\]);/);
vm.runInContext('var TOOLS_REGISTRY = ' + match[1], sandbox);
const tools = sandbox.TOOLS_REGISTRY;

// Group tools by category
const toolsByCategory = {};
tools.forEach(t => {
  const cat = t.category || 'other';
  if (!toolsByCategory[cat]) toolsByCategory[cat] = [];
  toolsByCategory[cat].push(t);
});

function getToolSteps(toolName, cat) {
  const nameLower = toolName.toLowerCase();
  if (nameLower.includes('compress') || nameLower.includes('converter') || nameLower.includes('remover') || nameLower.includes('pdf')) {
    return [
      { step: 1, title: 'Upload or Drop Files', desc: 'Select or drag your files into the secure in-browser processing container.' },
      { step: 2, title: 'Configure & Process', desc: 'Adjust optimization settings or compression parameters. Execution runs 100% in your browser RAM.' },
      { step: 3, title: 'Download Output', desc: 'Instantly download your optimized file with zero watermarks and no server storage.' }
    ];
  } else if (nameLower.includes('calculator') || nameLower.includes('tracker') || nameLower.includes('estimator') || nameLower.includes('splitter')) {
    return [
      { step: 1, title: 'Enter Your Values', desc: 'Input your financial amounts, rates, deadlines, or property parameters into the fields.' },
      { step: 2, title: 'Instant Calculation', desc: 'Formulas recalculate automatically in real time as you type with zero network lag.' },
      { step: 3, title: 'Review & Copy Breakdown', desc: 'Analyze the detailed itemized report, copy the numbers, or print the summary.' }
    ];
  } else if (nameLower.includes('generator') || nameLower.includes('encoder') || nameLower.includes('minifier') || nameLower.includes('counter')) {
    return [
      { step: 1, title: 'Input or Select Options', desc: 'Paste your raw source text, code, or configure desired generation rules.' },
      { step: 2, title: 'Generate in Real Time', desc: 'The client-side engine formats, encodes, minifies, or generates output instantly.' },
      { step: 3, title: 'One-Click Copy', desc: 'Copy the clean, sanitized results directly to your clipboard or download as a file.' }
    ];
  } else {
    return [
      { step: 1, title: 'Select Options or Input', desc: 'Enter your input data or configure settings using the interactive controls.' },
      { step: 2, title: 'Process Locally', desc: 'Algorithms execute client-side inside your browser with complete privacy.' },
      { step: 3, title: 'Save or Export', desc: 'Copy the results or export the final output directly to your device.' }
    ];
  }
}

function getRelatedTools(currentUrl, cat) {
  let siblings = toolsByCategory[cat] || [];
  let filtered = siblings.filter(t => t.url !== currentUrl && !t.url.endsWith(currentUrl));
  if (filtered.length < 4) {
    // Add tools from other categories
    const others = tools.filter(t => t.url !== currentUrl && !filtered.includes(t));
    filtered = filtered.concat(others);
  }
  return filtered.slice(0, 4);
}

// Find all tool HTML files
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

const allHtml = walk('.');
let howtoInjected = 0;
let relatedInjected = 0;
let metaKeywordsRemoved = 0;

allHtml.forEach(f => {
  // Skip non-tools: homepage, about, contact, 404, blogs, category root index.html
  if (f === './index.html' || f.includes('/blogs/') || f === './404.html' || f === './about.html' || f === './contact.html' || f === './privacy-policy.html' || f === './terms.html' || f === './disclaimer.html' || f === './appearance.html') {
    return;
  }
  // Check if it is a category index page like ./pdf-tools/index.html
  const parts = f.replace(/^\.\//, '').split('/');
  if (parts.length === 2 && parts[1] === 'index.html' && parts[0].endsWith('-tools')) {
    return;
  }
  if (parts.length === 2 && parts[1] === 'index.html' && (parts[0] === 'calculators' || parts[0] === 'games')) {
    return;
  }

  let html = fs.readFileSync(f, 'utf8');
  let original = html;

  // 1. Remove meta keywords tag
  if (html.includes('<meta name="keywords"')) {
    html = html.replace(/<meta name="keywords"[\s\S]*?>\n?/g, '');
    metaKeywordsRemoved++;
  }

  // Find tool in registry
  const cleanF = f.replace(/^\.\//, '');
  const urlCandidate = '/' + cleanF;
  const toolEntry = tools.find(t => t.url === urlCandidate || t.url === urlCandidate.replace(/\/index\.html$/, '/') || t.url.endsWith(cleanF));
  const toolName = toolEntry ? toolEntry.name : cleanF.replace(/.*\/([^\/]+)\.html$/, '$1').replace(/-/g, ' ');
  const cat = toolEntry ? toolEntry.category : parts[0];

  // 2. Inject "How to Use" if missing
  const hasHowTo = html.includes('How to') || html.includes('How To') || html.includes('How It Works') || html.includes('how-to');
  if (!hasHowTo) {
    const steps = getToolSteps(toolName, cat);
    const stepsHtml = `
    <!-- Step-by-Step How to Use Section -->
    <section class="my-12">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <span class="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">Easy 3-Step Guide</span>
          <h2 class="text-2xl sm:text-3xl font-black text-[#3e2723] tracking-tight mt-2">
            How to Use ${toolName}
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            Fast, client-side processing directly in your browser. 100% free with zero file uploads.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="fa-card p-6 bg-white border border-slate-200/90 rounded-2xl relative shadow-2xs">
            <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-sm">1</div>
            <h3 class="font-extrabold text-[#3e2723] text-sm mb-1.5">${steps[0].title}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">${steps[0].desc}</p>
          </div>

          <div class="fa-card p-6 bg-white border border-slate-200/90 rounded-2xl relative shadow-2xs">
            <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-sm">2</div>
            <h3 class="font-extrabold text-[#3e2723] text-sm mb-1.5">${steps[1].title}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">${steps[1].desc}</p>
          </div>

          <div class="fa-card p-6 bg-white border border-slate-200/90 rounded-2xl relative shadow-2xs">
            <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-3.5 shadow-sm">3</div>
            <h3 class="font-extrabold text-[#3e2723] text-sm mb-1.5">${steps[2].title}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">${steps[2].desc}</p>
          </div>
        </div>
      </div>
    </section>
`;
    // Insert before editorial article or FAQ or </main>
    if (html.includes('<article')) {
      html = html.replace('<article', `${stepsHtml}\n    <article`);
      howtoInjected++;
    } else if (html.includes('<section class="mb-16">')) {
      html = html.replace('<section class="mb-16">', `${stepsHtml}\n    <section class="mb-16">`);
      howtoInjected++;
    } else if (html.includes('</main>')) {
      html = html.replace('</main>', `${stepsHtml}\n  </main>`);
      howtoInjected++;
    }
  }

  // 3. Inject "Related Tools" if missing
  const hasRelated = html.includes('Related') || html.includes('related');
  if (!hasRelated) {
    const relatedList = getRelatedTools(urlCandidate, cat);
    const relatedCardsHtml = relatedList.map(r => {
      const cleanUrl = r.url.endsWith('/index.html') ? r.url.replace(/\/index\.html$/, '/') : r.url;
      return `          <a href="${cleanUrl}" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-[#146ebe] text-xs font-bold text-[#3e2723] hover:text-[#c27803] transition-all block shadow-2xs">
            <div class="flex items-center gap-2 mb-1.5">
              <i class="fa-solid ${r.icon || 'fa-bolt'} text-indigo-600"></i>
              <span class="font-extrabold text-sm">${r.name}</span>
            </div>
            <p class="text-[11px] text-slate-500 font-normal leading-relaxed">${r.desc || 'Fast, 100% client-side online utility.'}</p>
          </a>`;
    }).join('\n');

    const relatedSectionHtml = `
    <!-- Related Precision Utilities -->
    <section class="my-14 pt-8 border-t border-slate-200">
      <div class="max-w-4xl mx-auto space-y-6">
        <div>
          <span class="text-xs font-black uppercase tracking-wider text-slate-400">Discover More Tools</span>
          <h2 class="text-xl sm:text-2xl font-black text-[#3e2723] mt-1">Related Online Utilities</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
${relatedCardsHtml}
        </div>
      </div>
    </section>
`;
    if (html.includes('</main>')) {
      html = html.replace('</main>', `${relatedSectionHtml}\n  </main>`);
      relatedInjected++;
    }
  }

  if (html !== original) {
    fs.writeFileSync(f, html, 'utf8');
  }
});

console.log(`Summary of Tool Enhancements:`);
console.log(`- How-To Sections Injected: ${howtoInjected}`);
console.log(`- Related Tools Grids Injected: ${relatedInjected}`);
console.log(`- Meta Keywords Removed: ${metaKeywordsRemoved}`);

