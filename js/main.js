/**
 * 360tools.me — Master Shared Utilities (js/main.js)
 * FontAwesome Style Interactive Engine & Quick Tool Finder (Ctrl + K)
 */

// All Available Tools Registry for Quick Search & Cards
// All Available Tools Registry for Quick Search & Cards
const TOOLS_REGISTRY = [
  // Audio & Voice
  { 
    name: 'Text to Speech Converter', 
    url: 'text-to-speech.html', 
    category: 'Audio & Voice', 
    icon: 'fa-volume-high', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Convert any written text to natural human speech with live word tracking and pitch controls.',
    keywords: 'tts read aloud speech natural reader voice' 
  },
  { 
    name: 'Text to MP3 Converter', 
    url: 'text-to-mp3.html', 
    category: 'Audio & Voice', 
    icon: 'fa-file-audio', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50 border-emerald-200/80',
    desc: 'Synthesize speech and export directly to downloadable MP3 or WAV audio tracks in seconds.',
    keywords: 'audio downloader mp3 download wav sound generator' 
  },
  { 
    name: 'AI Voice Generator', 
    url: 'ai-voice-generator.html', 
    category: 'Audio & Voice', 
    icon: 'fa-wand-magic-sparkles', 
    color: 'text-purple-600', 
    bg: 'bg-purple-50 border-purple-200/80',
    desc: 'Generate studio-grade narration with persona avatars, dynamic waveforms, and audio FX.',
    keywords: 'voiceover realistic avatar waveform studio narrator' 
  },
  { 
    name: 'PDF to Speech Reader', 
    url: 'pdf-to-speech.html', 
    category: 'Audio & Voice', 
    icon: 'fa-file-pdf', 
    color: 'text-red-600', 
    bg: 'bg-red-50 border-red-200/80',
    desc: 'Listen to eBooks and multi-page PDF documents read aloud page-by-page in memory.',
    keywords: 'audiobook read pdf listen ebook document pdfjs' 
  },
  { 
    name: 'YouTube Voiceover Generator', 
    url: 'youtube-voiceover-generator.html', 
    category: 'Audio & Voice', 
    icon: 'fa-youtube', 
    color: 'text-rose-600', 
    bg: 'bg-rose-50 border-rose-200/80',
    desc: 'Auto-split video scripts into sequential scenes, insert pauses, and render narration.',
    keywords: 'video script narrator scene splitter pauses' 
  },
  { 
    name: 'Urdu Text to Speech', 
    url: 'urdu-text-to-speech.html', 
    category: 'Audio & Voice', 
    icon: 'fa-feather', 
    color: 'text-emerald-700', 
    bg: 'bg-emerald-50 border-emerald-200/80',
    desc: 'Authentic Pakistani Urdu voice engine supporting Urdu Nastaliq script and Roman Urdu.',
    keywords: 'urdu tts nastaliq pakistani voice roman urdu اردو' 
  },
  { 
    name: 'Article to Speech Reader', 
    url: 'article-to-speech.html', 
    category: 'Audio & Voice', 
    icon: 'fa-newspaper', 
    color: 'text-amber-600', 
    bg: 'bg-amber-50 border-amber-200/80',
    desc: 'Paste any article or blog post to strip web clutter and listen hands-free.',
    keywords: 'url reader web news blog cleaner' 
  },

  // Compression & AI Image
  { 
    name: 'Free AI Background Remover', 
    url: 'background-remover.html', 
    category: 'AI & Image', 
    icon: 'fa-wand-magic-sparkles', 
    color: 'text-teal-600', 
    bg: 'bg-teal-50 border-teal-200/80',
    desc: 'Erase photo backgrounds automatically with client-side AI and export transparent PNGs.',
    keywords: 'ai background remover bg eraser transparent png cutout photo object removal' 
  },
  { 
    name: 'Universal Image Compressor', 
    url: 'image-compressor.html', 
    category: 'Compression', 
    icon: 'fa-image', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50 border-emerald-200/80',
    desc: 'Compress JPG, PNG, and WebP photos by up to 90% with zero server uploads or quality loss.',
    keywords: 'compress photo resize shrink optimizer' 
  },
  { 
    name: 'JPG Compressor', 
    url: 'jpg-compressor.html', 
    category: 'Compression', 
    icon: 'fa-camera', 
    color: 'text-amber-600', 
    bg: 'bg-amber-50 border-amber-200/80',
    desc: 'Lossy JPEG quantization, visual comparison slider, and target file size presets.',
    keywords: 'jpeg compress photo quality scale' 
  },
  { 
    name: 'PNG Compressor', 
    url: 'png-compressor.html', 
    category: 'Compression', 
    icon: 'fa-file-image', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50 border-emerald-200/80',
    desc: 'Lossless PNG compression preserving transparent alpha channels and crisp edges.',
    keywords: 'transparent alpha lossless png logo' 
  },
  { 
    name: 'WebP Compressor', 
    url: 'webp-compressor.html', 
    category: 'Compression', 
    icon: 'fa-bolt', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Convert photos to next-gen WebP format for 30%+ bandwidth savings and faster Core Web Vitals.',
    keywords: 'webp core web vitals lcp google speed' 
  },
  { 
    name: 'PDF Compressor', 
    url: 'pdf-compressor.html', 
    category: 'Compression', 
    icon: 'fa-file-pdf', 
    color: 'text-red-600', 
    bg: 'bg-red-50 border-red-200/80',
    desc: 'Compress multi-page PDF documents locally with DPI presets for email & job portals.',
    keywords: 'compress pdf shrink document dpi reduce size' 
  },
  { 
    name: 'Video Compressor', 
    url: 'video-compressor.html', 
    category: 'Compression', 
    icon: 'fa-video', 
    color: 'text-rose-600', 
    bg: 'bg-rose-50 border-rose-200/80',
    desc: 'Reduce MP4 and WebM video size client-side with resolution scaling and bitrate controls.',
    keywords: 'mp4 webm reduce video size client side' 
  },
  { 
    name: 'Video Frame Extractor', 
    url: 'video-frame-extractor.html', 
    category: 'AI & Image', 
    icon: 'fa-film', 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50 border-indigo-200/80',
    desc: 'Extract high-res image frames from video by FPS, interval, or count with instant ZIP & storyboard export.',
    keywords: 'video to frames parse video extract frames mp4 to png jpg sequence storyboard snapshot' 
  },
  { 
    name: 'Compress Image to 100KB', 
    url: 'compress-image-to-100kb.html', 
    category: 'Compression', 
    icon: 'fa-bullseye', 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50 border-indigo-200/80',
    desc: 'Target exact 100KB file size for government forms, passport photos, and job exams.',
    keywords: '100kb exam passport photo signature' 
  },
  { 
    name: 'Compress Image to 200KB', 
    url: 'compress-image-to-200kb.html', 
    category: 'Compression', 
    icon: 'fa-bullseye', 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50 border-indigo-200/80',
    desc: 'Fast 200KB optimizer for avatar uploads, admissions portals, and online forms.',
    keywords: '200kb avatar portal form job' 
  },
  { 
    name: 'Compress Image to 500KB', 
    url: 'compress-image-to-500kb.html', 
    category: 'Compression', 
    icon: 'fa-bullseye', 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50 border-indigo-200/80',
    desc: 'Optimize banners and large attachments to fit strictly under 500KB without blurring.',
    keywords: '500kb banner email attachment' 
  },
  { 
    name: 'Bulk Image Compressor', 
    url: 'bulk-image-compressor.html', 
    category: 'Compression', 
    icon: 'fa-layer-group', 
    color: 'text-purple-600', 
    bg: 'bg-purple-50 border-purple-200/80',
    desc: 'Compress batches of 50+ photos simultaneously and download as a single ZIP archive.',
    keywords: 'batch zip archive export multiple photos' 
  },

  // Developer
  { 
    name: 'HTML Minifier', 
    url: 'html-minifier.html', 
    category: 'Developer', 
    icon: 'fa-html5', 
    color: 'text-orange-600', 
    bg: 'bg-orange-50 border-orange-200/80',
    desc: 'Minify HTML markup, strip comments, collapse whitespace, and view Gzip savings.',
    keywords: 'minify html collapse strip comments gzip' 
  },
  { 
    name: 'CSS Minifier', 
    url: 'css-minifier.html', 
    category: 'Developer', 
    icon: 'fa-css3-alt', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Compress stylesheets, shorten hex color codes, and eliminate redundant rules.',
    keywords: 'minify css stylesheet short hex' 
  },
  { 
    name: 'JavaScript Minifier', 
    url: 'javascript-minifier.html', 
    category: 'Developer', 
    icon: 'fa-js', 
    color: 'text-yellow-600', 
    bg: 'bg-yellow-50 border-yellow-200/80',
    desc: 'Minify JS code, remove console logs and comments, and inspect compression ratios.',
    keywords: 'minify js script compress code' 
  },
  { 
    name: 'Shopify CSV Validator', 
    url: 'shopify-csv-validator.html', 
    category: 'Developer', 
    icon: 'fa-shopify', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50 border-emerald-200/80',
    desc: 'Audit product CSV files for schema errors, missing headers, and invalid handles.',
    keywords: 'shopify products csv schema error fix' 
  },
  { 
    name: 'Free ATS Resume Checker', 
    url: 'ats-resume-checker.html', 
    category: 'Career & Productivity', 
    icon: 'fa-file-circle-check', 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50 border-indigo-200/80',
    desc: 'Audit your CV for ATS compatibility, keyword match percentage, power verbs, and formatting errors.',
    keywords: 'ats resume checker cv score keyword gap scanner resume parser job description match' 
  },

  // E-Commerce & Financial
  { 
    name: 'Free Online Invoice Generator', 
    url: 'invoice-generator.html', 
    category: 'E-Commerce & Financial', 
    icon: 'fa-file-invoice-dollar', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Generate printable A4 PDF invoices with custom branding, tax calculation, and currencies.',
    keywords: 'invoice generator pdf maker bill receipt tax quote freelancer client billing' 
  },
  { 
    name: 'Etsy Fee Calculator', 
    url: 'etsy-fee-calculator.html', 
    category: 'E-Commerce', 
    icon: 'fa-etsy', 
    color: 'text-orange-600', 
    bg: 'bg-orange-50 border-orange-200/80',
    desc: 'Calculate Etsy 6.5% transaction cuts, listing fees, offsite ads, and net profit margins.',
    keywords: 'etsy fees listing transaction offsite ads profit' 
  },
  { 
    name: 'Amazon FBA Dim Weight Checker', 
    url: 'amazon-fba-calculator.html', 
    category: 'E-Commerce', 
    icon: 'fa-amazon', 
    color: 'text-amber-600', 
    bg: 'bg-amber-50 border-amber-200/80',
    desc: 'Determine billable dimensional weight (L×W×H/139) and verify Amazon fulfillment size tiers.',
    keywords: 'fba dimensional weight divisor 139 tier' 
  },
  { 
    name: 'TikTok Shop Payout Estimator', 
    url: 'tiktok-shop-payout-calculator.html', 
    category: 'E-Commerce', 
    icon: 'fa-tiktok', 
    color: 'text-pink-600', 
    bg: 'bg-pink-50 border-pink-200/80',
    desc: 'Estimate TikTok Shop creator commissions, referral fees, and net bank deposits.',
    keywords: 'tiktok shop affiliate commission net deposit' 
  },
  { 
    name: 'Print-on-Demand Profit Grid', 
    url: 'pod-profit-calculator.html', 
    category: 'E-Commerce', 
    icon: 'fa-shirt', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Compare production costs and profit margins across Printify, Printful, and Gelato.',
    keywords: 'printify printful gelato margin comparison' 
  },
  { 
    name: 'Section 8 Max Rent Estimator', 
    url: 'section8-estimator.html', 
    category: 'Real Estate & Tax', 
    icon: 'fa-house-user', 
    color: 'text-[#146ebe]', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Estimate HUD Fair Market Rent voucher limits and landlord payment standard caps.',
    keywords: 'hud voucher fmr payment standard landlord' 
  },
  { 
    name: 'UK Stamp Duty Calculator', 
    url: 'uk-stamp-duty-calculator.html', 
    category: 'Real Estate & Tax', 
    icon: 'fa-landmark', 
    color: 'text-amber-700', 
    bg: 'bg-amber-50 border-amber-200/80',
    desc: 'Compute SDLT property tax tiers for England & Northern Ireland residential homes.',
    keywords: 'sdlt england northern ireland property tax' 
  },
  { 
    name: '1031 Exchange Timeline Tracker', 
    url: '1031-exchange-tracker.html', 
    category: 'Real Estate & Tax', 
    icon: 'fa-clock-rotate-left', 
    color: 'text-purple-600', 
    bg: 'bg-purple-50 border-purple-200/80',
    desc: 'Track 45-day identification and 180-day closing deadlines for tax-deferred exchanges.',
    keywords: '1031 exchange 45 day 180 day deadline' 
  },
  { 
    name: 'STR Cleaning Fee Splitter', 
    url: 'str-cleaning-splitter.html', 
    category: 'Real Estate & Tax', 
    icon: 'fa-broom', 
    color: 'text-teal-600', 
    bg: 'bg-teal-50 border-teal-200/80',
    desc: 'Split turnover cleaning fees, turnover payroll, and co-host payouts for Airbnb & VRBO.',
    keywords: 'airbnb vrbo cleaning fee co-host commission' 
  },
  { 
    name: 'EU VAT OSS Calculator', 
    url: 'eu-vat-oss-calculator.html', 
    category: 'Real Estate & Tax', 
    icon: 'fa-percent', 
    color: 'text-blue-700', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Determine one-stop-shop VAT rates across 27 EU member states for digital products.',
    keywords: 'eu vat oss cross border 27 countries digital' 
  },
  
  // Free Mini Games & Puzzles
  { 
    name: '2048 Puzzle Game', 
    url: '2048/index.html', 
    category: 'Games & Puzzles', 
    icon: 'fa-cubes', 
    color: 'text-amber-500', 
    bg: 'bg-amber-50 border-amber-200/80',
    desc: 'Slide and merge numbered tiles on a 4x4 grid to reach the elusive 2048 tile.',
    keywords: '2048 game play puzzle numbers math slide join blocks tiles' 
  },
  { 
    name: 'Classic Retro Snake', 
    url: 'snake/index.html', 
    category: 'Games & Puzzles', 
    icon: 'fa-worm', 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-50 border-emerald-200/80',
    desc: 'Classic Nokia-style arcade game with smooth 60fps movement, apples, and sound effects.',
    keywords: 'snake game classic retro arcade eat apple nokia 60fps' 
  },
  { 
    name: 'Memory Card Match', 
    url: 'memory-game/index.html', 
    category: 'Games & Puzzles', 
    icon: 'fa-brain', 
    color: 'text-purple-500', 
    bg: 'bg-purple-50 border-purple-200/80',
    desc: 'Test concentration with 3D card flips, tech icon pairs, timer, and high score board.',
    keywords: 'memory game cards matching brain flip concentration 3d' 
  },
  { 
    name: 'Tic Tac Toe (XO vs AI)', 
    url: 'tic-tac-toe/index.html', 
    category: 'Games & Puzzles', 
    icon: 'fa-xmark', 
    color: 'text-rose-500', 
    bg: 'bg-rose-50 border-rose-200/80',
    desc: 'Play classic 3x3 XO matches against smart Minimax AI or challenge a friend locally.',
    keywords: 'tic tac toe xo noughts crosses minimax ai 2 player arena' 
  },
  { 
    name: 'Word Scramble Puzzle', 
    url: 'word-scramble/index.html', 
    category: 'Games & Puzzles', 
    icon: 'fa-spell-check', 
    color: 'text-blue-500', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Unscramble mixed letters with smart hints, combo streaks, timer, and score levels.',
    keywords: 'word scramble anagram unscramble letters vocabulary puzzle brain' 
  },
  { 
    name: 'Bhabhi Thulla Card Game', 
    url: 'bhabhi-thulla/index.html', 
    category: 'Games & Puzzles', 
    icon: 'fa-spade', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50 border-emerald-200/80',
    desc: 'Classic 4-player traditional South Asian trick-taking card game. Shed your cards to escape!',
    keywords: 'bhabhi thulla bhabi get away donkey pabho card game 4 player spades' 
  },

  { 
    name: 'Blog & Editorial Guides', 
    url: 'blog.html', 
    category: 'Guides & Articles', 
    icon: 'fa-newspaper', 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50 border-indigo-200/80',
    desc: 'Comprehensive step-by-step guides, audio synthesis tips, and developer deep-dives.',
    keywords: 'blog guide article tutorial howto documentation help' 
  },
  { 
    name: 'About 360Tools', 
    url: 'about.html', 
    category: 'Company', 
    icon: 'fa-circle-info', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50 border-blue-200/80',
    desc: 'Learn how 360tools delivers 100% private, client-side web utilities for global users.',
    keywords: 'about us mission story privacy client side' 
  },
  { 
    name: 'Contact & Support', 
    url: 'contact.html', 
    category: 'Company', 
    icon: 'fa-envelope', 
    color: 'text-teal-600', 
    bg: 'bg-teal-50 border-teal-200/80',
    desc: 'Get in touch for technical support, feature requests, bug reports, or business inquiries.',
    keywords: 'contact us email support help bug feedback feature request' 
  }
];

// Quick Tool Finder Modal Manager
function openQuickSearch() {
  let modal = document.getElementById('quickSearchModal');
  if (!modal) {
    createQuickSearchModal();
    modal = document.getElementById('quickSearchModal');
  }
  modal.classList.remove('hidden');
  const input = document.getElementById('quickSearchModalInput');
  if (input) {
    input.value = '';
    renderQuickSearchResults('');
    setTimeout(() => input.focus(), 50);
  }
}

function closeQuickSearch() {
  const modal = document.getElementById('quickSearchModal');
  if (modal) modal.classList.add('hidden');
}

function createQuickSearchModal() {
  const div = document.createElement('div');
  div.id = 'quickSearchModal';
  div.className = 'fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all';
  div.onclick = (e) => { if (e.target === div) closeQuickSearch(); };

  div.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150" onclick="event.stopPropagation()">
      <div class="p-4 border-b border-slate-100 flex items-center gap-3">
        <i class="fa-solid fa-magnifying-glass text-slate-400 text-lg"></i>
        <input 
          type="text" 
          id="quickSearchModalInput" 
          placeholder="Search 30+ precision tools (e.g., text to speech, image, etsy)..." 
          class="w-full bg-transparent border-0 outline-hidden text-slate-800 text-sm sm:text-base font-bold placeholder-slate-400"
          oninput="renderQuickSearchResults(this.value)"
        >
        <kbd class="hidden sm:inline-block px-2 py-1 bg-slate-100 border border-slate-300 rounded-lg text-[10px] text-slate-500 font-mono font-bold">ESC</kbd>
        <button onclick="closeQuickSearch()" class="sm:hidden p-1.5 text-slate-400 hover:text-slate-700">
          <i class="fa-solid fa-xmark text-base"></i>
        </button>
      </div>

      <div id="quickSearchResultsList" class="p-2 max-h-96 overflow-y-auto space-y-1">
        <!-- Results rendered dynamically -->
      </div>

      <div class="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold px-4">
        <span>360tools.me • 100% In-Browser Private</span>
        <span>Use arrow keys or click to open</span>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

function renderQuickSearchResults(query) {
  const container = document.getElementById('quickSearchResultsList');
  if (!container) return;

  query = (query || '').toLowerCase().trim();
  const matched = TOOLS_REGISTRY.filter(t => {
    if (!query) return true;
    return t.name.toLowerCase().includes(query) || 
           t.category.toLowerCase().includes(query) || 
           t.keywords.toLowerCase().includes(query);
  });

  if (matched.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <i class="fa-solid fa-circle-question text-3xl mb-2"></i>
        <p class="text-xs font-bold">No tools found matching "${query}"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = matched.map(t => `
    <a href="${t.url}" class="flex items-center justify-between p-3 rounded-2xl hover:bg-blue-50/70 group transition-all">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm ${t.color} group-hover:scale-105 transition-transform">
          <i class="fa-solid ${t.icon}"></i>
        </div>
        <div>
          <span class="text-xs sm:text-sm font-black text-[#183153] group-hover:text-[#146ebe] block">${t.name}</span>
          <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${t.category}</span>
        </div>
      </div>
      <i class="fa-solid fa-arrow-right text-xs text-slate-300 group-hover:text-[#146ebe] group-hover:translate-x-1 transition-all"></i>
    </a>
  `).join('');
}

// Global Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openQuickSearch();
  } else if (e.key === 'Escape') {
    closeQuickSearch();
  }
});

// Mobile Navigation Drawer Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const icon = document.getElementById('mobileMenuIcon');
  if (!drawer) return;
  
  if (drawer.classList.contains('hidden')) {
    drawer.classList.remove('hidden');
    if (icon) icon.className = 'fa-solid fa-xmark text-lg';
  } else {
    drawer.classList.add('hidden');
    if (icon) icon.className = 'fa-solid fa-bars text-lg';
  }
}

// Global Toast Notification Manager
function showToast(message, icon = 'fa-circle-check', type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-800 text-sm font-bold';
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-blue-600 text-lg" id="toastIcon"></i>
      <span id="toastMessage">${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    if (toastIcon) toastIcon.className = `fa-solid ${icon} text-blue-600 text-lg`;
    if (toastMessage) toastMessage.textContent = message;
  }

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2400);
}

// Universal Copy to Clipboard
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'fa-copy');
    }).catch(() => {
      fallbackCopyText(text, successMsg);
    });
  } else {
    fallbackCopyText(text, successMsg);
  }
}

function fallbackCopyText(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg, 'fa-copy');
  } catch (err) {
    showToast('Failed to copy', 'fa-triangle-exclamation');
  }
  document.body.removeChild(textArea);
}

// Currency Formatters
function formatUSD(num) {
  return '$' + Number(num || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// ==========================================================================
// Mobile Native App Bottom Navigation & Slide-up Sheet Drawer Controller
// ==========================================================================
function initMobileAppNavigation() {
  if (document.getElementById('mobileAppBottomNav')) return;

  const currentPath = window.location.pathname.toLowerCase();
  
  const isHome = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '' || currentPath.endsWith('360tools.me');
  const isAudio = currentPath.includes('speech') || currentPath.includes('voice') || currentPath.includes('audio') || currentPath.includes('mp3');
  const isCompress = currentPath.includes('compress') || currentPath.includes('jpg') || currentPath.includes('png') || currentPath.includes('webp') || currentPath.includes('pdf');

  // Create Bottom Nav Bar
  const nav = document.createElement('nav');
  nav.id = 'mobileAppBottomNav';
  nav.className = 'mobile-bottom-nav';
  nav.setAttribute('aria-label', 'Mobile App Bottom Navigation');

  nav.innerHTML = `
    <a href="index.html" class="mobile-nav-item ${isHome ? 'active' : ''}">
      <i class="fa-solid fa-house"></i>
      <span>Home</span>
    </a>
    <a href="audio-voice-tools.html" class="mobile-nav-item ${isAudio ? 'active' : ''}">
      <i class="fa-solid fa-volume-high"></i>
      <span>Audio</span>
    </a>
    <button onclick="openQuickSearch()" class="mobile-nav-item mobile-nav-item-highlight" aria-label="Search tools">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Search</span>
    </button>
    <a href="compression-tools.html" class="mobile-nav-item ${isCompress ? 'active' : ''}">
      <i class="fa-solid fa-compress"></i>
      <span>Compress</span>
    </a>
    <button onclick="toggleMobileAppDrawer()" class="mobile-nav-item" aria-label="More tools menu">
      <i class="fa-solid fa-grip"></i>
      <span>Menu</span>
    </button>
  `;

  document.body.appendChild(nav);

  // Create Mobile App Slide-up Drawer
  createMobileAppDrawer();
}

function createMobileAppDrawer() {
  if (document.getElementById('mobileAppDrawerModal')) return;

  const drawer = document.createElement('div');
  drawer.id = 'mobileAppDrawerModal';
  drawer.className = 'mobile-app-drawer';
  drawer.onclick = (e) => {
    if (e.target === drawer) toggleMobileAppDrawer(false);
  };

  drawer.innerHTML = `
    <div class="mobile-app-drawer-content" onclick="event.stopPropagation()">
      <div class="mobile-drawer-handle"></div>
      
      <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div class="flex items-center gap-2.5">
          <img src="images/logo.jpg" alt="Logo" class="w-8 h-8 rounded-xl">
          <div>
            <h3 class="text-sm font-black text-[#183153]">360Tools<span class="text-[#146ebe]">.me</span></h3>
            <p class="text-[10px] text-slate-400 font-bold">100% Free & Private Online Suite</p>
          </div>
        </div>
        <button onclick="toggleMobileAppDrawer(false)" class="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Quick Search Trigger Input -->
      <button onclick="toggleMobileAppDrawer(false); openQuickSearch();" class="w-full mb-4 p-3 bg-slate-100 hover:bg-slate-200/80 rounded-2xl border border-slate-200 text-left flex items-center justify-between text-xs font-bold text-slate-500">
        <span class="flex items-center gap-2">
          <i class="fa-solid fa-magnifying-glass text-[#146ebe]"></i>
          Search all 30+ tools...
        </span>
        <span class="px-2 py-0.5 bg-white rounded-lg border border-slate-200 text-[10px] text-slate-400 font-mono">Tap</span>
      </button>

      <!-- Tool Categories Grid -->
      <div class="space-y-4">
        <div>
          <div class="text-[11px] font-black text-purple-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-volume-high"></i> AI Voice & Audio</span>
            <a href="audio-voice-tools.html" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="text-to-speech.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-volume-high text-[#146ebe] text-sm"></i> Text to Speech
            </a>
            <a href="text-to-mp3.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-audio text-emerald-600 text-sm"></i> Text to MP3
            </a>
            <a href="ai-voice-generator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-wand-magic-sparkles text-purple-600 text-sm"></i> AI Voice Studio
            </a>
            <a href="pdf-to-speech.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-pdf text-red-600 text-sm"></i> PDF Reader
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-emerald-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-compress"></i> Media Compression</span>
            <a href="compression-tools.html" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="background-remover.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-wand-magic-sparkles text-teal-600 text-sm"></i> BG Remover
            </a>
            <a href="video-frame-extractor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-film text-indigo-600 text-sm"></i> Frame Extractor
            </a>
            <a href="image-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-image text-emerald-600 text-sm"></i> Image Compressor
            </a>
            <a href="video-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-video text-rose-600 text-sm"></i> Video Compressor
            </a>
            <a href="pdf-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-pdf text-red-600 text-sm"></i> PDF Compressor
            </a>
            <a href="compress-image-to-100kb.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-bullseye text-indigo-600 text-sm"></i> 100KB Target
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-cyan-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-code"></i> Developer & Web Tools</span>
            <a href="developer-tools.html" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="html-minifier.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-html5 text-orange-600 text-sm"></i> HTML Minifier
            </a>
            <a href="css-minifier.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-css3-alt text-blue-600 text-sm"></i> CSS Minifier
            </a>
            <a href="javascript-minifier.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-js text-yellow-500 text-sm"></i> JS Minifier
            </a>
            <a href="shopify-csv-validator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-shopify text-emerald-600 text-sm"></i> Shopify CSV
            </a>
            <a href="ats-resume-checker.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-circle-check text-indigo-600 text-sm"></i> Free ATS Resume Checker
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-[#f1641e] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-calculator"></i> E-Commerce & Finance</span>
            <a href="ecommerce-tools.html" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="etsy-fee-calculator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-etsy text-[#f1641e] text-sm"></i> Etsy Fee Calc
            </a>
            <a href="amazon-fba-calculator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-amazon text-amber-600 text-sm"></i> Amazon FBA
            </a>
            <a href="tiktok-shop-payout-calculator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-tiktok text-pink-600 text-sm"></i> TikTok Payout
            </a>
            <a href="section8-estimator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-house-user text-[#146ebe] text-sm"></i> Section 8
            </a>
          </div>
        </div>
        <div>
          <div class="text-[11px] font-black text-purple-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-gamepad"></i> Free Browser Games</span>
            <span class="text-[9px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-black">POPULAR</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="2048/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-cubes text-amber-500 text-sm"></i> 2048 Classic
            </a>
            <a href="snake/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-worm text-emerald-500 text-sm"></i> Retro Snake
            </a>
            <a href="memory-game/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-brain text-purple-500 text-sm"></i> Memory Card
            </a>
            <a href="tic-tac-toe/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-xmark text-rose-500 text-sm"></i> Tic Tac Toe
            </a>
            <a href="word-scramble/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-spell-check text-blue-500 text-sm"></i> Word Scramble
            </a>
            <a href="bhabhi-thulla/index.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-spade text-emerald-600 text-sm"></i> Bhabhi Thulla Card Game
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-circle-info"></i> Company & Help</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="about.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-circle-info text-blue-600 text-sm"></i> About Us
            </a>
            <a href="contact.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-envelope text-teal-600 text-sm"></i> Contact Us
            </a>
            <a href="privacy-policy.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-shield-halved text-emerald-600 text-sm"></i> Privacy Policy
            </a>
            <a href="terms-and-conditions.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-contract text-amber-600 text-sm"></i> Terms of Use
            </a>
          </div>
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(drawer);
}

function toggleMobileAppDrawer(forceState) {
  const drawer = document.getElementById('mobileAppDrawerModal');
  if (!drawer) {
    createMobileAppDrawer();
    return toggleMobileAppDrawer(forceState);
  }

  const isOpen = drawer.classList.contains('open');
  const nextState = (typeof forceState === 'boolean') ? forceState : !isOpen;

  if (nextState) {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Upgrade existing mobile hamburger button handler to trigger the mobile app drawer smoothly
if (typeof toggleMobileMenu === 'function') {
  const prevToggle = toggleMobileMenu;
  toggleMobileMenu = function() {
    toggleMobileAppDrawer();
  };
} else {
  function toggleMobileMenu() {
    toggleMobileAppDrawer();
  }
}

// Category-Hover Mega Menu Submenu Controller
function switchNavCategory(catId) {
  // 1. Update Category Sidebar active states
  const tabs = document.querySelectorAll('.nav-cat-tab');
  tabs.forEach(tab => {
    const isTarget = tab.getAttribute('data-cat') === catId;
    if (isTarget) {
      tab.classList.add('active');
      const chev = tab.querySelector('.nav-cat-chevron');
      if (chev) {
        chev.classList.remove('opacity-40');
        chev.classList.add('opacity-100', 'text-indigo-600');
      }
    } else {
      tab.classList.remove('active');
      const chev = tab.querySelector('.nav-cat-chevron');
      if (chev) {
        chev.classList.remove('opacity-100', 'text-indigo-600');
        chev.classList.add('opacity-40');
      }
    }
  });

  // 2. Hide all panels and show the targeted category tools panel
  const panels = document.querySelectorAll('.nav-cat-panel');
  panels.forEach(panel => {
    if (panel.id === catId) {
      panel.classList.remove('hidden');
      panel.classList.add('flex');
    } else {
      panel.classList.add('hidden');
      panel.classList.remove('flex');
    }
  });
}

// ==========================================
// Centralized Pure JS Header & Footer Component Injector
// Single Source of Truth across 360tools.me
// ==========================================

function renderGlobalHeader() {
  const headerElem = document.getElementById('globalHeader');
  if (!headerElem) return;

  headerElem.className = 'no-print max-w-7xl mx-auto w-full sticky top-3 z-50 px-4 sm:px-6 my-2';
  headerElem.innerHTML = `
    <div class="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-sm px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
      
      <!-- Brand Logo & Desktop Nav -->
      <div class="flex items-center gap-8">
        <a href="index.html" class="flex items-center gap-2.5 group shrink-0">
          <img src="images/logo.jpg" alt="360Tools Logo" class="w-9 h-9 rounded-full object-cover border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-transform">
          <div class="flex flex-col">
            <span class="text-lg font-black text-[#183153] leading-none tracking-tight group-hover:text-[#146ebe] transition-colors">360Tools<span class="text-[#146ebe]">.me</span></span>
            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mt-1 hidden sm:block">Private Online Suite</span>
          </div>
        </a>

        <!-- Professional Desktop Navigation: Clean, Spacious & Uncluttered -->
        <nav class="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700">
          
          <!-- 1. All Tools Mega Menu (Category Sidebar with Hover-Activated Tools Submenu) -->
          <div class="nav-dropdown">
            <button class="nav-link-btn">
              <i class="fa-solid fa-screwdriver-wrench text-[#146ebe] text-xs"></i>
              <span>All Tools</span>
              <i class="fa-solid fa-chevron-down text-[9px] text-slate-400 ml-0.5"></i>
            </button>
            <div class="nav-dropdown-content nav-dropdown-mega w-[820px]">
              <div class="nav-dropdown-card p-0 overflow-hidden shadow-2xl border border-slate-200 flex">
                
                <!-- LEFT COLUMN: Categories Navigation Sidebar -->
                <div class="w-[260px] bg-slate-50/80 p-3 border-r border-slate-200/80 flex flex-col justify-between shrink-0">
                  <div>
                    <div class="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      <span>Tool Categories</span>
                      <span class="text-[9px] font-bold text-slate-400">Hover Category</span>
                    </div>

                    <div class="space-y-1" id="navCategorySidebar">
                      <!-- Category 1: Audio & AI Voice -->
                      <button type="button" onmouseenter="switchNavCategory('nav-cat-audio')" onclick="switchNavCategory('nav-cat-audio')" class="nav-cat-tab active" data-cat="nav-cat-audio">
                        <div class="flex items-center gap-2.5">
                          <div class="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0">
                            <i class="fa-solid fa-volume-high"></i>
                          </div>
                          <div class="text-left">
                            <div class="text-xs font-bold leading-tight">Audio & AI Voice</div>
                            <div class="text-[10px] text-slate-400 font-medium">7 Tools</div>
                          </div>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px] nav-cat-chevron opacity-100 text-indigo-600 transition-all"></i>
                      </button>

                      <!-- Category 2: Media & Compression -->
                      <button type="button" onmouseenter="switchNavCategory('nav-cat-media')" onclick="switchNavCategory('nav-cat-media')" class="nav-cat-tab" data-cat="nav-cat-media">
                        <div class="flex items-center gap-2.5">
                          <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0">
                            <i class="fa-solid fa-compress"></i>
                          </div>
                          <div class="text-left">
                            <div class="text-xs font-bold leading-tight">Media & Compression</div>
                            <div class="text-[10px] text-slate-400 font-medium">12 Tools</div>
                          </div>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px] nav-cat-chevron opacity-40 transition-all"></i>
                      </button>

                      <!-- Category 3: Developer & Minifiers -->
                      <button type="button" onmouseenter="switchNavCategory('nav-cat-dev')" onclick="switchNavCategory('nav-cat-dev')" class="nav-cat-tab" data-cat="nav-cat-dev">
                        <div class="flex items-center gap-2.5">
                          <div class="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs shrink-0">
                            <i class="fa-solid fa-code"></i>
                          </div>
                          <div class="text-left">
                            <div class="text-xs font-bold leading-tight">Developer & Web</div>
                            <div class="text-[10px] text-slate-400 font-medium">5 Tools</div>
                          </div>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px] nav-cat-chevron opacity-40 transition-all"></i>
                      </button>

                      <!-- Category 4: E-Commerce & Finance -->
                      <button type="button" onmouseenter="switchNavCategory('nav-cat-ecom')" onclick="switchNavCategory('nav-cat-ecom')" class="nav-cat-tab" data-cat="nav-cat-ecom">
                        <div class="flex items-center gap-2.5">
                          <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">
                            <i class="fa-solid fa-calculator"></i>
                          </div>
                          <div class="text-left">
                            <div class="text-xs font-bold leading-tight">E-Commerce & POD</div>
                            <div class="text-[10px] text-slate-400 font-medium">5 Tools</div>
                          </div>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px] nav-cat-chevron opacity-40 transition-all"></i>
                      </button>

                      <!-- Category 5: Real Estate & Tax -->
                      <button type="button" onmouseenter="switchNavCategory('nav-cat-re')" onclick="switchNavCategory('nav-cat-re')" class="nav-cat-tab" data-cat="nav-cat-re">
                        <div class="flex items-center gap-2.5">
                          <div class="w-7 h-7 rounded-lg bg-blue-100 text-[#146ebe] flex items-center justify-center text-xs shrink-0">
                            <i class="fa-solid fa-house-user"></i>
                          </div>
                          <div class="text-left">
                            <div class="text-xs font-bold leading-tight">Real Estate & Tax</div>
                            <div class="text-[10px] text-slate-400 font-medium">5 Tools</div>
                          </div>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px] nav-cat-chevron opacity-40 transition-all"></i>
                      </button>

                      <!-- Category 6: Free Games & Puzzles -->
                      <button type="button" onmouseenter="switchNavCategory('nav-cat-games')" onclick="switchNavCategory('nav-cat-games')" class="nav-cat-tab" data-cat="nav-cat-games">
                        <div class="flex items-center gap-2.5">
                          <div class="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0">
                            <i class="fa-solid fa-gamepad"></i>
                          </div>
                          <div class="text-left">
                            <div class="text-xs font-bold leading-tight">Mini Games & Fun</div>
                            <div class="text-[10px] text-slate-400 font-medium">6 Games</div>
                          </div>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px] nav-cat-chevron opacity-40 transition-all"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Left Sidebar Bottom Badge -->
                  <div class="pt-3 border-t border-slate-200/70 mt-2 px-1 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                    <i class="fa-solid fa-shield-halved text-emerald-600"></i>
                    <span>100% In-Browser Privacy</span>
                  </div>
                </div>

                <!-- RIGHT COLUMN: Dynamic Tools Panels Display -->
                <div class="flex-1 p-5 min-h-[420px] flex flex-col justify-between bg-white overflow-hidden">
                  
                  <!-- PANEL 1: Audio & AI Voice -->
                  <div id="nav-cat-audio" class="nav-cat-panel flex flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-purple-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-purple-800">AI Voice & Audio Tools</span>
                        </div>
                        <a href="audio-voice-tools.html" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All Audio Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="text-to-speech.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-[#146ebe]"><i class="fa-solid fa-volume-high"></i></div>
                          <div>
                            <div class="nav-tool-title">Text to Speech</div>
                            <div class="nav-tool-desc">Natural voices with live word highlight</div>
                          </div>
                        </a>
                        <a href="text-to-mp3.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-file-audio"></i></div>
                          <div>
                            <div class="nav-tool-title">Text to MP3 Converter</div>
                            <div class="nav-tool-desc">Direct MP3 & WAV audio export</div>
                          </div>
                        </a>
                        <a href="ai-voice-generator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                          <div>
                            <div class="nav-tool-title">AI Voice Generator</div>
                            <div class="nav-tool-desc">Studio avatars & dynamic waveforms</div>
                          </div>
                        </a>
                        <a href="pdf-to-speech.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-red-50 text-red-600"><i class="fa-solid fa-file-pdf"></i></div>
                          <div>
                            <div class="nav-tool-title">PDF to Speech Reader</div>
                            <div class="nav-tool-desc">Listen to multi-page eBooks & documents</div>
                          </div>
                        </a>
                        <a href="youtube-voiceover-generator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-brands fa-youtube"></i></div>
                          <div>
                            <div class="nav-tool-title">YouTube Voiceover</div>
                            <div class="nav-tool-desc">Scene splitter & timing narration</div>
                          </div>
                        </a>
                        <a href="urdu-text-to-speech.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-700"><i class="fa-solid fa-feather"></i></div>
                          <div>
                            <div class="nav-tool-title">Urdu TTS (اردو)</div>
                            <div class="nav-tool-desc">Nastaliq script & Roman Urdu synthesis</div>
                          </div>
                        </a>
                        <a href="article-to-speech.html" class="nav-tool-item col-span-2">
                          <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-newspaper"></i></div>
                          <div>
                            <div class="nav-tool-title">Article to Speech Reader</div>
                            <div class="nav-tool-desc">Strip clutter from blog posts & listen hands-free</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- PANEL 2: Media & Compression -->
                  <div id="nav-cat-media" class="nav-cat-panel hidden flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-emerald-800">Media, AI Image & Video Tools</span>
                        </div>
                        <a href="compression-tools.html" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All Media Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="background-remover.html" class="nav-tool-item bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200/60">
                          <div class="nav-tool-icon bg-teal-600 text-white"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                          <div>
                            <div class="nav-tool-title text-teal-950 flex items-center gap-1.5">
                              <span>AI Background Remover</span>
                              <span class="bg-teal-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-teal-700">Client-side AI cutout & transparent PNG</div>
                          </div>
                        </a>

                        <a href="video-frame-extractor.html" class="nav-tool-item bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/60">
                          <div class="nav-tool-icon bg-indigo-600 text-white"><i class="fa-solid fa-film"></i></div>
                          <div>
                            <div class="nav-tool-title text-indigo-950 flex items-center gap-1.5">
                              <span>Video Frame Extractor</span>
                              <span class="bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-indigo-700">Parse frames to ZIP & storyboard</div>
                          </div>
                        </a>

                        <a href="video-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-solid fa-video"></i></div>
                          <div>
                            <div class="nav-tool-title">Video Compressor</div>
                            <div class="nav-tool-desc">Reduce MP4 & WebM without watermarks</div>
                          </div>
                        </a>

                        <a href="image-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-image"></i></div>
                          <div>
                            <div class="nav-tool-title">Universal Image Compressor</div>
                            <div class="nav-tool-desc">JPG, PNG, WebP up to 90% savings</div>
                          </div>
                        </a>

                        <a href="bulk-image-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-layer-group"></i></div>
                          <div>
                            <div class="nav-tool-title">Bulk Image Compressor (ZIP)</div>
                            <div class="nav-tool-desc">Batch compress 50+ images at once</div>
                          </div>
                        </a>

                        <a href="pdf-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-red-50 text-red-600"><i class="fa-solid fa-file-pdf"></i></div>
                          <div>
                            <div class="nav-tool-title">PDF Compressor</div>
                            <div class="nav-tool-desc">Multi-page DPI reduction for portals</div>
                          </div>
                        </a>

                        <a href="compress-image-to-100kb.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-indigo-50 text-indigo-600"><i class="fa-solid fa-bullseye"></i></div>
                          <div>
                            <div class="nav-tool-title">Target Size (100KB / 500KB)</div>
                            <div class="nav-tool-desc">Exact file size limits for job & passport forms</div>
                          </div>
                        </a>

                        <a href="webp-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-bolt"></i></div>
                          <div>
                            <div class="nav-tool-title">WebP Compressor</div>
                            <div class="nav-tool-desc">Convert photos to next-gen WebP</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- PANEL 3: Developer & Minifiers -->
                  <div id="nav-cat-dev" class="nav-cat-panel hidden flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-cyan-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-cyan-800">Developer & Web Tools</span>
                        </div>
                        <a href="developer-tools.html" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All Dev Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="html-minifier.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-orange-50 text-orange-600"><i class="fa-brands fa-html5"></i></div>
                          <div>
                            <div class="nav-tool-title">HTML Minifier</div>
                            <div class="nav-tool-desc">Strip comments, collapse whitespace & check Gzip</div>
                          </div>
                        </a>

                        <a href="css-minifier.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-brands fa-css3-alt"></i></div>
                          <div>
                            <div class="nav-tool-title">CSS Minifier</div>
                            <div class="nav-tool-desc">Compress stylesheets & eliminate dead rules</div>
                          </div>
                        </a>

                        <a href="javascript-minifier.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-yellow-50 text-yellow-600"><i class="fa-brands fa-js"></i></div>
                          <div>
                            <div class="nav-tool-title">JavaScript Minifier</div>
                            <div class="nav-tool-desc">Minify JS scripts & strip console.logs</div>
                          </div>
                        </a>

                        <a href="shopify-csv-validator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-brands fa-shopify"></i></div>
                          <div>
                            <div class="nav-tool-title">Shopify CSV Validator</div>
                            <div class="nav-tool-desc">Audit product CSVs for schema & handle errors</div>
                          </div>
                        </a>

                        <a href="ats-resume-checker.html" class="nav-tool-item bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/60 col-span-2">
                          <div class="nav-tool-icon bg-indigo-600 text-white"><i class="fa-solid fa-file-circle-check"></i></div>
                          <div>
                            <div class="nav-tool-title text-indigo-950 flex items-center gap-1.5">
                              <span>Free ATS Resume Checker</span>
                              <span class="bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-indigo-700">Audit CV compatibility, power verbs & keyword match score</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- PANEL 4: E-Commerce & Finance -->
                  <div id="nav-cat-ecom" class="nav-cat-panel hidden flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-amber-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-amber-800">E-Commerce, POD & Seller Tools</span>
                        </div>
                        <a href="ecommerce-tools.html" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All E-Commerce Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="invoice-generator.html" class="nav-tool-item bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/60 col-span-2">
                          <div class="nav-tool-icon bg-[#146ebe] text-white"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                          <div>
                            <div class="nav-tool-title text-blue-950 flex items-center gap-1.5">
                              <span>Free Online Invoice Generator</span>
                              <span class="bg-[#146ebe] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-blue-700">Printable A4 PDF invoices with logo, tax & multi-currency</div>
                          </div>
                        </a>

                        <a href="etsy-fee-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-orange-50 text-orange-600"><i class="fa-brands fa-etsy"></i></div>
                          <div>
                            <div class="nav-tool-title">Etsy Fee Calculator</div>
                            <div class="nav-tool-desc">6.5% transaction, listing & net profit</div>
                          </div>
                        </a>

                        <a href="amazon-fba-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-brands fa-amazon"></i></div>
                          <div>
                            <div class="nav-tool-title">Amazon FBA Checker</div>
                            <div class="nav-tool-desc">Billable dim weight divisor 139 tiers</div>
                          </div>
                        </a>

                        <a href="tiktok-shop-payout-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-pink-50 text-pink-600"><i class="fa-brands fa-tiktok"></i></div>
                          <div>
                            <div class="nav-tool-title">TikTok Shop Payout</div>
                            <div class="nav-tool-desc">Creator affiliate commissions & payouts</div>
                          </div>
                        </a>

                        <a href="pod-profit-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-shirt"></i></div>
                          <div>
                            <div class="nav-tool-title">Print-on-Demand Profit Grid</div>
                            <div class="nav-tool-desc">Printify, Printful & Gelato margins</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- PANEL 5: Real Estate & Tax -->
                  <div id="nav-cat-re" class="nav-cat-panel hidden flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-blue-800">Real Estate & Tax Calculators</span>
                        </div>
                        <a href="index.html#tools-catalog" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All in Catalog</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="section8-estimator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-[#146ebe]"><i class="fa-solid fa-house-user"></i></div>
                          <div>
                            <div class="nav-tool-title">Section 8 Max Rent Estimator</div>
                            <div class="nav-tool-desc">HUD FMR voucher limits & landlord caps</div>
                          </div>
                        </a>

                        <a href="uk-stamp-duty-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-amber-50 text-amber-700"><i class="fa-solid fa-landmark"></i></div>
                          <div>
                            <div class="nav-tool-title">UK Stamp Duty Calculator</div>
                            <div class="nav-tool-desc">SDLT property tax tiers for England & NI</div>
                          </div>
                        </a>

                        <a href="1031-exchange-tracker.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-clock-rotate-left"></i></div>
                          <div>
                            <div class="nav-tool-title">1031 Exchange Timeline Tracker</div>
                            <div class="nav-tool-desc">45-day identification & 180-day closing</div>
                          </div>
                        </a>

                        <a href="str-cleaning-splitter.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-teal-50 text-teal-600"><i class="fa-solid fa-broom"></i></div>
                          <div>
                            <div class="nav-tool-title">STR Cleaning Fee Splitter</div>
                            <div class="nav-tool-desc">Airbnb & VRBO turnover co-host payouts</div>
                          </div>
                        </a>

                        <a href="eu-vat-oss-calculator.html" class="nav-tool-item col-span-2">
                          <div class="nav-tool-icon bg-blue-50 text-blue-700"><i class="fa-solid fa-percent"></i></div>
                          <div>
                            <div class="nav-tool-title">EU VAT OSS Calculator</div>
                            <div class="nav-tool-desc">One-stop-shop VAT rates across 27 EU member states</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- PANEL 6: Free Games & Puzzles -->
                  <div id="nav-cat-games" class="nav-cat-panel hidden flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-purple-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-purple-800">Free Browser Games & Brain Puzzles</span>
                        </div>
                        <span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">100% Free & No Ads</span>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="2048/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-cubes"></i></div>
                          <div>
                            <div class="nav-tool-title">2048 Classic</div>
                            <div class="nav-tool-desc">Slide & join numbered tiles to reach 2048</div>
                          </div>
                        </a>

                        <a href="snake/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-worm"></i></div>
                          <div>
                            <div class="nav-tool-title">Retro Snake Arcade</div>
                            <div class="nav-tool-desc">Classic 60fps movement & bonus apples</div>
                          </div>
                        </a>

                        <a href="memory-game/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-brain"></i></div>
                          <div>
                            <div class="nav-tool-title">Memory Card Match</div>
                            <div class="nav-tool-desc">3D card flip brain trainer with timers</div>
                          </div>
                        </a>

                        <a href="tic-tac-toe/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-solid fa-xmark"></i></div>
                          <div>
                            <div class="nav-tool-title">Tic Tac Toe (XO vs AI)</div>
                            <div class="nav-tool-desc">Play vs smart Minimax AI or 2-player</div>
                          </div>
                        </a>

                        <a href="word-scramble/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-spell-check"></i></div>
                          <div>
                            <div class="nav-tool-title">Word Scramble Master</div>
                            <div class="nav-tool-desc">Unscramble mixed letters & combo streaks</div>
                          </div>
                        </a>

                        <a href="bhabhi-thulla/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-spade"></i></div>
                          <div>
                            <div class="nav-tool-title">Bhabhi Thulla Card Game</div>
                            <div class="nav-tool-desc">4-player classic trick-taking evasion</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- Mega Menu Sub-Footer Bar -->
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold px-1 mt-3">
                    <span class="text-slate-400 text-[11px] flex items-center gap-1.5">
                      <i class="fa-solid fa-bolt text-amber-500"></i> Instant processing with zero server delays
                    </span>
                    <a href="index.html#tools-catalog" class="text-[#146ebe] hover:underline flex items-center gap-1 font-black">
                      <span>Explore All 30+ Tools</span>
                      <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <!-- 2. Free Games Dropdown -->
          <div class="nav-dropdown">
            <button class="nav-link-btn">
              <i class="fa-solid fa-gamepad text-purple-600 text-xs"></i>
              <span>Games</span>
              <span class="bg-purple-100 text-purple-800 text-[9px] px-1.5 py-0.2 rounded-md font-black">NEW</span>
              <i class="fa-solid fa-chevron-down text-[9px] text-slate-400 ml-0.5"></i>
            </button>
            <div class="nav-dropdown-content w-72">
              <div class="nav-dropdown-card p-2.5 space-y-1">
                <div class="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50/80 rounded-lg flex items-center justify-between mb-1">
                  <span>Free Browser Games</span>
                  <i class="fa-solid fa-bolt text-[10px]"></i>
                </div>
                <a href="2048/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-cubes"></i></div>
                  <div>
                    <div class="nav-tool-title">2048 Classic</div>
                    <div class="nav-tool-desc">Join tiles to reach 2048</div>
                  </div>
                </a>
                <a href="snake/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-worm"></i></div>
                  <div>
                    <div class="nav-tool-title">Retro Snake Arcade</div>
                    <div class="nav-tool-desc">60 FPS canvas with bonus apples</div>
                  </div>
                </a>
                <a href="memory-game/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-brain"></i></div>
                  <div>
                    <div class="nav-tool-title">Memory Card Match</div>
                    <div class="nav-tool-desc">3D card flip brain trainer</div>
                  </div>
                </a>
                <a href="tic-tac-toe/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-solid fa-xmark"></i></div>
                  <div>
                    <div class="nav-tool-title">Tic Tac Toe (XO vs AI)</div>
                    <div class="nav-tool-desc">Unbeatable Minimax arena</div>
                  </div>
                </a>
                <a href="word-scramble/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-spell-check"></i></div>
                  <div>
                    <div class="nav-tool-title">Word Scramble Master</div>
                    <div class="nav-tool-desc">100+ vocabulary anagrams</div>
                  </div>
                </a>
                <a href="bhabhi-thulla/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-spade"></i></div>
                  <div>
                    <div class="nav-tool-title">Bhabhi Thulla (Get Away)</div>
                    <div class="nav-tool-desc">4-player classic card evasion</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- 3. Blog Link -->
          <a href="blog.html" class="nav-link-btn">
            <i class="fa-solid fa-newspaper text-indigo-600 text-xs"></i>
            <span>Blog</span>
          </a>

          <!-- 4. Company & Help Dropdown -->
          <div class="nav-dropdown">
            <button class="nav-link-btn">
              <i class="fa-solid fa-circle-info text-blue-600 text-xs"></i>
              <span>Company</span>
              <i class="fa-solid fa-chevron-down text-[9px] text-slate-400 ml-0.5"></i>
            </button>
            <div class="nav-dropdown-content w-60">
              <div class="nav-dropdown-card p-2.5 space-y-1">
                <a href="about.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-circle-info"></i></div>
                  <div>
                    <div class="nav-tool-title">About 360Tools</div>
                    <div class="nav-tool-desc">Our mission & story</div>
                  </div>
                </a>
                <a href="contact.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-teal-50 text-teal-600"><i class="fa-solid fa-envelope"></i></div>
                  <div>
                    <div class="nav-tool-title">Contact & Support</div>
                    <div class="nav-tool-desc">24/7 help desk</div>
                  </div>
                </a>
                <a href="privacy-policy.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-shield-halved"></i></div>
                  <div>
                    <div class="nav-tool-title">Privacy Policy</div>
                    <div class="nav-tool-desc">Zero data collection</div>
                  </div>
                </a>
                <a href="terms-and-conditions.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-file-contract"></i></div>
                  <div>
                    <div class="nav-tool-title">Terms of Service</div>
                    <div class="nav-tool-desc">Usage & disclaimers</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </nav>
      </div>

      <!-- Right Header Actions -->
      <div class="flex items-center gap-2.5">
        
        <!-- Interactive Quick Search Bar Trigger -->
        <button onclick="openQuickSearch()" class="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80 px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs transition-all cursor-pointer" aria-label="Quick tool search">
          <i class="fa-solid fa-magnifying-glass text-[#146ebe] text-xs"></i>
          <span class="hidden xl:inline font-bold">Search 30+ tools...</span>
          <span class="hidden md:inline xl:hidden font-bold">Search...</span>
          <kbd class="hidden md:inline-block px-1.5 py-0.5 bg-white border border-slate-300 rounded-md text-[9px] text-slate-500 font-mono font-bold">Ctrl K</kbd>
        </button>

        <!-- All Tools Catalog Quick Link -->
        <a href="index.html#tools-catalog" class="fa-btn-primary px-4 py-2 text-xs font-black shadow-xs hidden sm:inline-flex items-center gap-1.5 rounded-xl">
          <i class="fa-solid fa-grip text-xs"></i>
          <span>Catalog</span>
        </a>

        <!-- Mobile Drawer Trigger Button -->
        <button onclick="toggleMobileAppDrawer()" class="lg:hidden w-9 h-9 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" aria-label="Open mobile menu">
          <i class="fa-solid fa-bars text-sm"></i>
        </button>

      </div>
    </div>
  `;
}

function renderGlobalFooter() {
  const footerElem = document.getElementById('globalFooter');
  if (!footerElem) return;

  footerElem.className = 'no-print bg-white text-slate-700 border-t border-slate-200/80 mt-20';
  footerElem.innerHTML = `
    <!-- Top Feature Highlight Strip (Clean Light) -->
    <div class="border-b border-slate-200/80 bg-slate-50/70 py-6 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        <div class="flex items-center justify-center md:justify-start gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-[#146ebe] flex items-center justify-center text-lg shrink-0 shadow-2xs">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h4 class="text-xs font-black uppercase tracking-wider text-[#183153]">100% In-Browser Privacy</h4>
            <p class="text-[11px] text-slate-500 font-medium mt-0.5">Files & scripts stay in local RAM. Zero cloud uploads.</p>
          </div>
        </div>

        <div class="flex items-center justify-center md:justify-start gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center text-lg shrink-0 shadow-2xs">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <div>
            <h4 class="text-xs font-black uppercase tracking-wider text-[#183153]">Superfast Execution</h4>
            <p class="text-[11px] text-slate-500 font-medium mt-0.5">WebAssembly & HTML5 Canvas engines with zero queue delay.</p>
          </div>
        </div>

        <div class="flex items-center justify-center md:justify-start gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center text-lg shrink-0 shadow-2xs">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <h4 class="text-xs font-black uppercase tracking-wider text-[#183153]">100% Free & Unlimited</h4>
            <p class="text-[11px] text-slate-500 font-medium mt-0.5">No credit cards, no login gates, and zero watermarks.</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Main Footer Links Grid (Balanced 5 Columns) -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        
        <!-- Brand Info Column (Span 4) -->
        <div class="sm:col-span-2 lg:col-span-4 space-y-5">
          <a href="index.html" class="inline-flex items-center gap-3 group">
            <img src="images/logo.jpg" alt="360Tools Logo" class="w-9 h-9 object-contain rounded-xl border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
            <span class="text-2xl font-black text-[#183153] tracking-tight">360Tools<span class="text-[#146ebe]">.me</span></span>
          </a>
          
          <p class="text-xs text-slate-600 font-medium leading-relaxed max-w-sm">
            High-precision client-side audio voiceovers, media compressors, code minifiers, business calculators, and browser mini-games engineered for creators and developers.
          </p>

          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold shadow-2xs">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All 35+ Tools Operational
            </span>
          </div>

          <!-- Social Links -->
          <div class="pt-2 space-y-2">
            <span class="text-[11px] font-black uppercase tracking-wider text-slate-400 block">Connect With Us</span>
            <div class="flex items-center gap-2.5">
              <a href="https://www.youtube.com/@360tools" target="_blank" rel="noopener noreferrer" 
                class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 flex items-center justify-center text-sm transition-all shadow-2xs hover:scale-110 border border-slate-200" 
                title="YouTube" aria-label="YouTube Channel">
                <i class="fa-brands fa-youtube"></i>
              </a>
              <a href="https://www.facebook.com/360tools.me" target="_blank" rel="noopener noreferrer" 
                class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#1877f2] flex items-center justify-center text-sm transition-all shadow-2xs hover:scale-110 border border-slate-200" 
                title="Facebook" aria-label="Facebook Page">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/360tools.me" target="_blank" rel="noopener noreferrer" 
                class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-[#e1306c] flex items-center justify-center text-sm transition-all shadow-2xs hover:scale-110 border border-slate-200" 
                title="Instagram" aria-label="Instagram Profile">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="https://360tools.me" 
                class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#146ebe] flex items-center justify-center text-sm transition-all shadow-2xs hover:scale-110 border border-slate-200" 
                title="360tools.me Website" aria-label="360tools.me Official Website">
                <i class="fa-solid fa-globe"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Column 2: Audio & Voice (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-volume-high text-purple-600 text-[11px]"></i>
            <span>Audio & Voice</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="text-to-speech.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Text to Speech</a></li>
            <li><a href="text-to-mp3.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Text to MP3</a></li>
            <li><a href="ai-voice-generator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> AI Voice Studio</a></li>
            <li><a href="pdf-to-speech.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> PDF to Speech</a></li>
            <li><a href="youtube-voiceover-generator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> YouTube Voiceover</a></li>
            <li><a href="urdu-text-to-speech.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Urdu TTS (اردو)</a></li>
            <li><a href="audio-voice-tools.html" class="text-[#146ebe] hover:underline font-black mt-1 inline-block">Explore All Audio →</a></li>
          </ul>
        </div>

        <!-- Column 3: Media & Compression (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-compress text-emerald-600 text-[11px]"></i>
            <span>Compression & AI</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="background-remover.html" class="text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1.5 font-black"><i class="fa-solid fa-wand-magic-sparkles text-[9px] text-teal-600"></i> AI BG Remover</a></li>
            <li><a href="video-frame-extractor.html" class="text-indigo-700 hover:text-indigo-900 transition-colors flex items-center gap-1.5 font-bold"><i class="fa-solid fa-film text-[9px] text-indigo-600"></i> Frame Extractor</a></li>
            <li><a href="image-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Universal Compressor</a></li>
            <li><a href="jpg-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> JPG Compressor</a></li>
            <li><a href="png-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> PNG Compressor</a></li>
            <li><a href="webp-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> WebP Compressor</a></li>
            <li><a href="pdf-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> PDF Compressor</a></li>
            <li><a href="video-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Video Compressor</a></li>
          </ul>
        </div>

        <!-- Column 4: Dev & Business (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-code text-cyan-600 text-[11px]"></i>
            <span>Dev & Career</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="ats-resume-checker.html" class="text-indigo-700 hover:text-indigo-900 transition-colors flex items-center gap-1.5 font-black"><i class="fa-solid fa-file-circle-check text-[9px] text-indigo-600"></i> ATS Resume Checker</a></li>
            <li><a href="invoice-generator.html" class="text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1.5 font-black"><i class="fa-solid fa-file-invoice-dollar text-[9px] text-blue-600"></i> Invoice Maker</a></li>
            <li><a href="html-minifier.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> HTML Minifier</a></li>
            <li><a href="css-minifier.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> CSS Minifier</a></li>
            <li><a href="javascript-minifier.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> JS Minifier</a></li>
            <li><a href="etsy-fee-calculator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Etsy Fee Calculator</a></li>
            <li><a href="amazon-fba-calculator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Amazon FBA</a></li>
            <li><a href="tiktok-shop-payout-calculator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> TikTok Payout</a></li>
          </ul>
        </div>

        <!-- Column 5: Games & Company (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-gamepad text-purple-600 text-[11px]"></i>
            <span>Games & Company</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="2048/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-cubes text-amber-500 text-[9px]"></i> 2048 Game</a></li>
            <li><a href="snake/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-worm text-emerald-500 text-[9px]"></i> Retro Snake</a></li>
            <li><a href="memory-game/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-brain text-purple-500 text-[9px]"></i> Memory Game</a></li>
            <li><a href="tic-tac-toe/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-xmark text-rose-500 text-[9px]"></i> Tic Tac Toe</a></li>
            <li><a href="word-scramble/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-spell-check text-blue-500 text-[9px]"></i> Word Scramble</a></li>
            <li class="pt-2 border-t border-slate-100"><a href="about.html" class="text-blue-600 font-bold hover:underline">About 360Tools</a></li>
            <li><a href="contact.html" class="text-teal-700 font-bold hover:underline">Contact Support</a></li>
            <li><a href="blog.html" class="text-indigo-600 font-bold hover:underline">Editorial Blog</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
        <div class="flex items-center gap-2 text-center md:text-left">
          <span>© 2026 <a href="index.html" class="font-bold text-[#183153] hover:text-[#146ebe] transition-colors">360Tools (360tools.me)</a>. All rights reserved.</span>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-600 text-[11px] font-bold">
          <a href="about.html" class="hover:text-[#146ebe] transition-colors">About</a>
          <span>•</span>
          <a href="contact.html" class="hover:text-[#146ebe] transition-colors">Contact</a>
          <span>•</span>
          <a href="privacy-policy.html" class="hover:text-[#146ebe] transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="terms-and-conditions.html" class="hover:text-[#146ebe] transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="sitemap.xml" class="hover:text-[#146ebe] transition-colors">Sitemap</a>
        </div>

        <div class="text-[10px] text-slate-400 text-center md:text-right">
          Zero Cloud Logging • 100% Client-Side Private
        </div>
      </div>
    </div>
  `;
}

// Cookie & Privacy Consent Banner
function initCookieConsent() {
  if (localStorage.getItem('360tools_cookie_consent')) return;

  const banner = document.createElement('div');
  banner.id = 'cookieConsentBanner';
  banner.className = 'no-print fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300';
  banner.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#146ebe] flex items-center justify-center shrink-0 text-base">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wide">Privacy & Cookie Notice</h4>
          <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">100% In-Browser</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed font-medium">
          360Tools processes your files and calculations locally. We use minimal cookies to remember your preferences and deliver our free tools.
        </p>
        <div class="pt-2 flex items-center gap-2">
          <button onclick="acceptCookieConsent()" class="fa-btn-primary py-1.5 px-4 text-xs font-black rounded-lg shadow-xs">
            Accept & Continue
          </button>
          <a href="privacy-policy.html" class="text-xs font-bold text-slate-500 hover:text-[#146ebe] underline px-2 py-1">
            Learn More
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(banner);
}

function acceptCookieConsent() {
  localStorage.setItem('360tools_cookie_consent', 'true');
  const banner = document.getElementById('cookieConsentBanner');
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(10px)';
    banner.style.transition = 'all 0.25s ease';
    setTimeout(() => banner.remove(), 250);
  }
}

// Auto Inject Header and Footer on DOM Content Loaded
function initGlobalComponents() {
  renderGlobalHeader();
  renderGlobalFooter();
  initMobileAppNavigation();
  initCookieConsent();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalComponents);
} else {
  initGlobalComponents();
}


