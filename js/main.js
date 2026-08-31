/**
 * 360tools.me — Master Shared Utilities (js/main.js)
 * FontAwesome Style Interactive Engine & Quick Tool Finder (Ctrl + K)
 */

// All Available Tools Registry for Quick Search
const TOOLS_REGISTRY = [
  // Audio & Voice
  { name: 'Text to Speech Converter', url: 'text-to-speech.html', category: 'Audio & Voice', icon: 'fa-volume-high', color: 'text-blue-600', keywords: 'tts read aloud speech natural reader voice' },
  { name: 'Text to MP3 Converter', url: 'text-to-mp3.html', category: 'Audio & Voice', icon: 'fa-file-audio', color: 'text-emerald-600', keywords: 'audio downloader mp3 download wav sound generator' },
  { name: 'AI Voice Generator', url: 'ai-voice-generator.html', category: 'Audio & Voice', icon: 'fa-wand-magic-sparkles', color: 'text-purple-600', keywords: 'voiceover realistic avatar waveform studio narrator' },
  { name: 'PDF to Speech Reader', url: 'pdf-to-speech.html', category: 'Audio & Voice', icon: 'fa-file-pdf', color: 'text-red-600', keywords: 'audiobook read pdf listen ebook document pdfjs' },
  { name: 'YouTube Voiceover Generator', url: 'youtube-voiceover-generator.html', category: 'Audio & Voice', icon: 'fa-youtube', color: 'text-rose-600', keywords: 'video script narrator scene splitter pauses' },
  { name: 'Urdu Text to Speech', url: 'urdu-text-to-speech.html', category: 'Audio & Voice', icon: 'fa-feather', color: 'text-emerald-700', keywords: 'urdu tts nastaliq pakistani voice roman urdu اردو' },
  { name: 'Article to Speech Reader', url: 'article-to-speech.html', category: 'Audio & Voice', icon: 'fa-newspaper', color: 'text-amber-600', keywords: 'url reader web news blog cleaner' },

  // Compression & AI Image
  { name: 'Free AI Background Remover', url: 'background-remover.html', category: 'AI & Image', icon: 'fa-wand-magic-sparkles', color: 'text-blue-600', keywords: 'ai background remover bg eraser transparent png cutout photo object removal' },
  { name: 'Universal Image Compressor', url: 'image-compressor.html', category: 'Compression', icon: 'fa-image', color: 'text-emerald-600', keywords: 'compress photo resize shrink optimizer' },
  { name: 'JPG Compressor', url: 'jpg-compressor.html', category: 'Compression', icon: 'fa-camera', color: 'text-amber-600', keywords: 'jpeg compress photo quality scale' },
  { name: 'PNG Compressor', url: 'png-compressor.html', category: 'Compression', icon: 'fa-file-image', color: 'text-emerald-600', keywords: 'transparent alpha lossless png logo' },
  { name: 'WebP Compressor', url: 'webp-compressor.html', category: 'Compression', icon: 'fa-bolt', color: 'text-blue-600', keywords: 'webp core web vitals lcp google speed' },
  { name: 'PDF Compressor', url: 'pdf-compressor.html', category: 'Compression', icon: 'fa-file-pdf', color: 'text-red-600', keywords: 'compress pdf shrink document dpi reduce size' },
  { name: 'Video Compressor', url: 'video-compressor.html', category: 'Compression', icon: 'fa-video', color: 'text-rose-600', keywords: 'mp4 webm reduce video size client side' },
  { name: 'Compress Image to 100KB', url: 'compress-image-to-100kb.html', category: 'Compression', icon: 'fa-bullseye', color: 'text-indigo-600', keywords: '100kb exam passport photo signature' },
  { name: 'Compress Image to 200KB', url: 'compress-image-to-200kb.html', category: 'Compression', icon: 'fa-bullseye', color: 'text-indigo-600', keywords: '200kb avatar portal form job' },
  { name: 'Compress Image to 500KB', url: 'compress-image-to-500kb.html', category: 'Compression', icon: 'fa-bullseye', color: 'text-indigo-600', keywords: '500kb banner email attachment' },
  { name: 'Bulk Image Compressor', url: 'bulk-image-compressor.html', category: 'Compression', icon: 'fa-layer-group', color: 'text-purple-600', keywords: 'batch zip archive export multiple photos' },

  // Developer
  { name: 'HTML Minifier', url: 'html-minifier.html', category: 'Developer', icon: 'fa-html5', color: 'text-orange-600', keywords: 'minify html collapse strip comments gzip' },
  { name: 'CSS Minifier', url: 'css-minifier.html', category: 'Developer', icon: 'fa-css3-alt', color: 'text-blue-600', keywords: 'minify css stylesheet short hex' },
  { name: 'JavaScript Minifier', url: 'javascript-minifier.html', category: 'Developer', icon: 'fa-js', color: 'text-yellow-500', keywords: 'minify js script compress code' },
  { name: 'Shopify CSV Validator', url: 'shopify-csv-validator.html', category: 'Developer', icon: 'fa-shopify', color: 'text-emerald-600', keywords: 'shopify products csv schema error fix' },

  // E-Commerce & Financial
  { name: 'Free Online Invoice Generator', url: 'invoice-generator.html', category: 'E-Commerce & Financial', icon: 'fa-file-invoice-dollar', color: 'text-blue-600', keywords: 'invoice generator pdf maker bill receipt tax quote freelancer client billing' },
  { name: 'Etsy Fee Calculator', url: 'etsy-fee-calculator.html', category: 'E-Commerce', icon: 'fa-etsy', color: 'text-orange-600', keywords: 'etsy fees listing transaction offsite ads profit' },
  { name: 'Amazon FBA Dim Weight Checker', url: 'amazon-fba-calculator.html', category: 'E-Commerce', icon: 'fa-amazon', color: 'text-amber-600', keywords: 'fba dimensional weight divisor 139 tier' },
  { name: 'TikTok Shop Payout Estimator', url: 'tiktok-shop-payout-calculator.html', category: 'E-Commerce', icon: 'fa-tiktok', color: 'text-pink-600', keywords: 'tiktok shop affiliate commission net deposit' },
  { name: 'Print-on-Demand Profit Grid', url: 'pod-profit-calculator.html', category: 'E-Commerce', icon: 'fa-shirt', color: 'text-blue-600', keywords: 'printify printful gelato margin comparison' },
  { name: 'Section 8 Max Rent Estimator', url: 'section8-estimator.html', category: 'Real Estate & Tax', icon: 'fa-house-user', color: 'text-[#146ebe]', keywords: 'hud voucher fmr payment standard landlord' },
  { name: 'UK Stamp Duty Calculator', url: 'uk-stamp-duty-calculator.html', category: 'Real Estate & Tax', icon: 'fa-landmark', color: 'text-amber-700', keywords: 'sdlt england northern ireland property tax' },
  { name: '1031 Exchange Timeline Tracker', url: '1031-exchange-tracker.html', category: 'Real Estate & Tax', icon: 'fa-clock-rotate-left', color: 'text-purple-600', keywords: '1031 exchange 45 day 180 day deadline' },
  { name: 'STR Cleaning Fee Splitter', url: 'str-cleaning-splitter.html', category: 'Real Estate & Tax', icon: 'fa-broom', color: 'text-teal-600', keywords: 'airbnb vrbo cleaning fee co-host commission' },
  { name: 'EU VAT OSS Calculator', url: 'eu-vat-oss-calculator.html', category: 'Real Estate & Tax', icon: 'fa-percent', color: 'text-blue-700', keywords: 'eu vat oss cross border 27 countries digital' }
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
            <h3 class="text-sm font-black text-[#183153]">360tools<span class="text-[#146ebe]">.me</span></h3>
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
            <a href="image-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-image text-emerald-600 text-sm"></i> Image Compressor
            </a>
            <a href="pdf-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-pdf text-red-600 text-sm"></i> PDF Compressor
            </a>
            <a href="video-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-video text-rose-600 text-sm"></i> Video Compressor
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

// ==========================================
// Centralized Pure JS Header & Footer Component Injector
// Single Source of Truth across 360tools.me
// ==========================================

function renderGlobalHeader() {
  const headerElem = document.getElementById('globalHeader');
  if (!headerElem) return;

  headerElem.className = 'no-print max-w-7xl mx-auto w-full sticky top-3 z-50 px-4 sm:px-6 my-2';
  headerElem.innerHTML = `
    <div class="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-sm px-5 py-2.5 flex items-center justify-between transition-all">
      
      <!-- Brand Logo & Desktop Nav -->
      <div class="flex items-center gap-6">
        <a href="index.html" class="flex items-center gap-2.5 group">
          <img src="images/logo.jpg" alt="360tools.me Logo" class="w-8 h-8 object-contain rounded-xl group-hover:scale-105 transition-transform">
          <span class="text-xl font-black text-[#183153] tracking-tight">360tools<span class="text-[#146ebe]">.me</span></span>
        </a>

        <!-- Professional Desktop Navigation Mega Dropdowns -->
        <nav class="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-700">
          
          <!-- Category 1: AI Voice & Audio -->
          <div class="relative group">
            <button class="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-[#146ebe] hover:bg-slate-50 transition-all cursor-pointer">
              <i class="fa-solid fa-microphone-lines text-purple-600 text-xs"></i>
              <span>Audio & Voice</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:rotate-180 transition-transform"></i>
            </button>
            <div class="absolute top-full left-0 pt-2 w-80 hidden group-hover:block transition-all z-50">
              <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 space-y-1 max-h-[85vh] overflow-y-auto">
                <div class="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 rounded-lg flex items-center justify-between">
                  <span>Voice Synthesis Engines</span>
                  <i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i>
                </div>
                <a href="text-to-speech.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50 hover:text-purple-700 transition-all">
                  <i class="fa-solid fa-volume-high text-[#146ebe] w-4 text-center"></i> Text to Speech Converter
                </a>
                <a href="text-to-mp3.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50 hover:text-purple-700 transition-all">
                  <i class="fa-solid fa-file-audio text-emerald-600 w-4 text-center"></i> Text to MP3 Converter
                </a>
                <a href="ai-voice-generator.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50 hover:text-purple-700 transition-all">
                  <i class="fa-solid fa-user-astronaut text-purple-600 w-4 text-center"></i> AI Voice Generator Studio
                </a>
                <a href="pdf-to-speech.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50 hover:text-purple-700 transition-all">
                  <i class="fa-solid fa-file-pdf text-red-600 w-4 text-center"></i> PDF to Speech Reader
                </a>
                <a href="youtube-voiceover-generator.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50 hover:text-purple-700 transition-all">
                  <i class="fa-brands fa-youtube text-rose-600 w-4 text-center"></i> YouTube Voiceover Narrator
                </a>
                <a href="urdu-text-to-speech.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50 hover:text-purple-700 transition-all">
                  <i class="fa-solid fa-feather text-emerald-700 w-4 text-center"></i> Urdu TTS (اردو)
                </a>
                <a href="article-to-speech.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50 hover:text-purple-700 transition-all">
                  <i class="fa-solid fa-newspaper text-amber-600 w-4 text-center"></i> Article to Speech Reader
                </a>
                <div class="border-t border-slate-100 pt-1 mt-1">
                  <a href="audio-voice-tools.html" class="flex items-center justify-between p-2 rounded-xl text-[11px] font-black text-purple-700 hover:bg-purple-50">
                    <span>View All Audio Tools</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Category 2: AI & Media Suite -->
          <div class="relative group">
            <button class="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-[#146ebe] hover:bg-slate-50 transition-all cursor-pointer">
              <i class="fa-solid fa-wand-magic-sparkles text-teal-600 text-xs"></i>
              <span>AI & Media</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:rotate-180 transition-transform"></i>
            </button>
            <div class="absolute top-full left-0 pt-2 w-80 hidden group-hover:block transition-all z-50">
              <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 space-y-1 max-h-[85vh] overflow-y-auto">
                
                <!-- Highlighted AI Cutout Card -->
                <a href="background-remover.html" class="flex items-center justify-between p-2.5 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 rounded-xl text-xs font-black text-teal-800 hover:scale-[1.01] transition-transform">
                  <div class="flex items-center gap-2.5">
                    <i class="fa-solid fa-wand-magic-sparkles text-teal-600 text-sm"></i>
                    <div>
                      <div class="leading-none">AI Background Remover</div>
                      <div class="text-[10px] text-teal-600 font-semibold mt-0.5">100% In-Browser Eraser</div>
                    </div>
                  </div>
                  <span class="bg-teal-600 text-white text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase">NEW</span>
                </a>

                <div class="pt-1">
                  <div class="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">Media Compressors</div>
                  <a href="image-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-image text-emerald-600 w-4 text-center"></i> Universal Image Compressor
                  </a>
                  <a href="jpg-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-camera text-amber-600 w-4 text-center"></i> JPG Compressor
                  </a>
                  <a href="png-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-file-image text-emerald-600 w-4 text-center"></i> PNG Compressor
                  </a>
                  <a href="webp-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-bolt text-blue-600 w-4 text-center"></i> WebP Compressor
                  </a>
                  <a href="pdf-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-file-pdf text-red-600 w-4 text-center"></i> PDF Compressor
                  </a>
                  <a href="video-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-video text-rose-600 w-4 text-center"></i> Video Compressor
                  </a>
                  <a href="compress-image-to-100kb.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-bullseye text-indigo-600 w-4 text-center"></i> Compress to 100KB / 200KB / 500KB
                  </a>
                  <a href="bulk-image-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50 hover:text-teal-700 transition-all">
                    <i class="fa-solid fa-layer-group text-purple-600 w-4 text-center"></i> Bulk Image Compressor
                  </a>
                </div>

                <div class="border-t border-slate-100 pt-1 mt-1">
                  <a href="compression-tools.html" class="flex items-center justify-between p-2 rounded-xl text-[11px] font-black text-teal-700 hover:bg-teal-50">
                    <span>View All Media & AI Tools</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>

              </div>
            </div>
          </div>

          <!-- Category 3: Developer Tools -->
          <div class="relative group">
            <button class="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-[#146ebe] hover:bg-slate-50 transition-all cursor-pointer">
              <i class="fa-solid fa-code text-cyan-600 text-xs"></i>
              <span>Developer</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:rotate-180 transition-transform"></i>
            </button>
            <div class="absolute top-full left-0 pt-2 w-80 hidden group-hover:block transition-all z-50">
              <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 space-y-1 max-h-[85vh] overflow-y-auto">
                <div class="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-700 bg-cyan-50 rounded-lg">Code Optimization</div>
                <a href="html-minifier.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50 hover:text-cyan-700 transition-all">
                  <i class="fa-brands fa-html5 text-orange-600 w-4 text-center"></i> HTML Minifier
                </a>
                <a href="css-minifier.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50 hover:text-cyan-700 transition-all">
                  <i class="fa-brands fa-css3-alt text-blue-600 w-4 text-center"></i> CSS Minifier
                </a>
                <a href="javascript-minifier.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50 hover:text-cyan-700 transition-all">
                  <i class="fa-brands fa-js text-yellow-500 w-4 text-center"></i> JavaScript Minifier
                </a>
                <a href="code-minifier.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50 hover:text-cyan-700 transition-all">
                  <i class="fa-solid fa-code text-cyan-600 w-4 text-center"></i> Universal Code Minifier
                </a>
                <a href="shopify-csv-validator.html" class="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50 hover:text-cyan-700 transition-all">
                  <i class="fa-brands fa-shopify text-emerald-600 w-4 text-center"></i> Shopify CSV Validator
                </a>
                <div class="border-t border-slate-100 pt-1 mt-1">
                  <a href="developer-tools.html" class="flex items-center justify-between p-2 rounded-xl text-[11px] font-black text-cyan-700 hover:bg-cyan-50">
                    <span>View All Dev Tools</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Category 4: Finance & Business -->
          <div class="relative group">
            <button class="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-[#146ebe] hover:bg-slate-50 transition-all cursor-pointer">
              <i class="fa-solid fa-briefcase text-amber-600 text-xs"></i>
              <span>Finance & Business</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:rotate-180 transition-transform"></i>
            </button>
            <div class="absolute top-full left-0 pt-2 w-80 hidden group-hover:block transition-all z-50">
              <div class="bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 space-y-1 max-h-[85vh] overflow-y-auto">
                
                <!-- Highlighted Invoice Card -->
                <a href="invoice-generator.html" class="flex items-center justify-between p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl text-xs font-black text-[#146ebe] hover:scale-[1.01] transition-transform">
                  <div class="flex items-center gap-2.5">
                    <i class="fa-solid fa-file-invoice-dollar text-[#146ebe] text-sm"></i>
                    <div>
                      <div class="leading-none">Free Invoice Generator</div>
                      <div class="text-[10px] text-blue-600 font-semibold mt-0.5">Printable A4 PDF Maker</div>
                    </div>
                  </div>
                  <span class="bg-[#146ebe] text-white text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase">NEW</span>
                </a>

                <div class="pt-1">
                  <div class="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">E-Commerce & Tax</div>
                  <a href="etsy-fee-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-brands fa-etsy text-[#f1641e] w-4 text-center"></i> Etsy Fee Calculator
                  </a>
                  <a href="amazon-fba-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-brands fa-amazon text-amber-600 w-4 text-center"></i> Amazon FBA Dim Weight
                  </a>
                  <a href="tiktok-shop-payout-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-brands fa-tiktok text-pink-600 w-4 text-center"></i> TikTok Shop Payout
                  </a>
                  <a href="pod-profit-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-solid fa-shirt text-blue-600 w-4 text-center"></i> Print-on-Demand Margin Grid
                  </a>
                  <a href="section8-estimator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-solid fa-house-user text-[#146ebe] w-4 text-center"></i> Section 8 Max Rent Estimator
                  </a>
                  <a href="uk-stamp-duty-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-solid fa-landmark text-amber-700 w-4 text-center"></i> UK Stamp Duty Calculator
                  </a>
                  <a href="1031-exchange-tracker.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-solid fa-clock-rotate-left text-purple-600 w-4 text-center"></i> 1031 Exchange Tracker
                  </a>
                  <a href="str-cleaning-splitter.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-solid fa-broom text-teal-600 w-4 text-center"></i> STR Cleaning Splitter
                  </a>
                  <a href="eu-vat-oss-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50 hover:text-[#146ebe] transition-all">
                    <i class="fa-solid fa-percent text-blue-700 w-4 text-center"></i> EU VAT OSS Calculator
                  </a>
                </div>

                <div class="border-t border-slate-100 pt-1 mt-1">
                  <a href="ecommerce-tools.html" class="flex items-center justify-between p-2 rounded-xl text-[11px] font-black text-[#146ebe] hover:bg-blue-50">
                    <span>View All Business Tools</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </nav>
      </div>

      <!-- Right Header Actions -->
      <div class="flex items-center gap-2">
        
        <!-- Interactive Quick Search Bar Trigger -->
        <button onclick="openQuickSearch()" class="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs transition-all cursor-pointer">
          <i class="fa-solid fa-magnifying-glass text-[#146ebe]"></i>
          <span class="hidden sm:inline">Search...</span>
          <kbd class="hidden sm:inline-block px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[9px] text-slate-500 font-mono font-bold">Ctrl K</kbd>
        </button>

        <!-- All Tools Catalog Quick Link -->
        <a href="index.html#tools-catalog" class="fa-btn-primary px-3 py-1.5 text-xs font-black shadow-xs hidden sm:inline-flex items-center gap-1.5">
          <i class="fa-solid fa-grip"></i>
          <span>All Tools</span>
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors" aria-label="Toggle menu">
          <i class="fa-solid fa-bars text-base"></i>
        </button>

      </div>
    </div>

    <!-- Mobile Drawer Menu (Full Categorized Mobile Navigation) -->
    <div id="mobileMenuDrawer" class="hidden lg:hidden mt-2 p-5 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-4 transition-all max-h-[80vh] overflow-y-auto">
      
      <!-- Audio & Voice -->
      <div class="space-y-1">
        <div class="text-[11px] font-black text-purple-700 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
          <i class="fa-solid fa-volume-high"></i> AI Voice & Audio
        </div>
        <a href="text-to-speech.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50">Text to Speech</a>
        <a href="text-to-mp3.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50">Text to MP3 Converter</a>
        <a href="ai-voice-generator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50">AI Voice Studio</a>
        <a href="pdf-to-speech.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50">PDF Reader Aloud</a>
        <a href="youtube-voiceover-generator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50">YouTube Voiceovers</a>
        <a href="urdu-text-to-speech.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50">Urdu TTS (اردو)</a>
        <a href="article-to-speech.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-purple-50">Article Reader</a>
      </div>

      <!-- AI & Media -->
      <div class="space-y-1 pt-2 border-t border-slate-100">
        <div class="text-[11px] font-black text-teal-700 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
          <i class="fa-solid fa-wand-magic-sparkles"></i> AI & Media Suite
        </div>
        <a href="background-remover.html" class="flex items-center gap-2.5 p-1.5 bg-teal-50 rounded-xl text-xs font-black text-teal-700">AI Background Remover (New)</a>
        <a href="image-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50">Universal Image Compressor</a>
        <a href="jpg-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50">JPG Compressor</a>
        <a href="png-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50">PNG Compressor</a>
        <a href="webp-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50">WebP Compressor</a>
        <a href="pdf-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50">PDF Compressor</a>
        <a href="video-compressor.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50">Video Compressor</a>
        <a href="compress-image-to-100kb.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-teal-50">Compress to 100KB / 200KB / 500KB</a>
      </div>

      <!-- Developer -->
      <div class="space-y-1 pt-2 border-t border-slate-100">
        <div class="text-[11px] font-black text-cyan-700 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
          <i class="fa-solid fa-code"></i> Developer & Minifiers
        </div>
        <a href="html-minifier.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50">HTML Minifier</a>
        <a href="css-minifier.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50">CSS Minifier</a>
        <a href="javascript-minifier.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50">JavaScript Minifier</a>
        <a href="code-minifier.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50">Universal Code Minifier</a>
        <a href="shopify-csv-validator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-cyan-50">Shopify CSV Validator</a>
      </div>

      <!-- Finance & Business -->
      <div class="space-y-1 pt-2 border-t border-slate-100">
        <div class="text-[11px] font-black text-blue-700 uppercase tracking-wider px-2 mb-1 flex items-center gap-1.5">
          <i class="fa-solid fa-briefcase"></i> Finance & E-Commerce
        </div>
        <a href="invoice-generator.html" class="flex items-center gap-2.5 p-1.5 bg-blue-50 rounded-xl text-xs font-black text-[#146ebe]">Invoice Generator (New)</a>
        <a href="etsy-fee-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">Etsy Fee Calculator</a>
        <a href="amazon-fba-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">Amazon FBA Calculator</a>
        <a href="tiktok-shop-payout-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">TikTok Shop Calculator</a>
        <a href="pod-profit-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">POD Margin Grid</a>
        <a href="section8-estimator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">Section 8 Estimator</a>
        <a href="uk-stamp-duty-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">UK Stamp Duty</a>
        <a href="1031-exchange-tracker.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">1031 Exchange Tracker</a>
        <a href="str-cleaning-splitter.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">STR Cleaning Splitter</a>
        <a href="eu-vat-oss-calculator.html" class="flex items-center gap-2.5 p-1.5 rounded-xl text-xs font-bold text-[#183153] hover:bg-blue-50">EU VAT OSS</a>
      </div>

    </div>
  `;
}

function renderGlobalFooter() {
  const footerElem = document.getElementById('globalFooter');
  if (!footerElem) return;

  footerElem.className = 'no-print bg-white border-t border-slate-200/80 pt-12 pb-8 mt-16';
  footerElem.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        
        <!-- Brand Info -->
        <div class="space-y-4">
          <a href="index.html" class="flex items-center gap-3">
            <img src="images/logo.jpg" alt="360tools.me Logo" class="w-8 h-8 object-contain rounded-xl">
            <span class="text-xl font-black text-[#183153] tracking-tight">360tools<span class="text-[#146ebe]">.me</span></span>
          </a>
          <p class="text-xs text-slate-500 font-medium leading-relaxed">
            High-precision client-side AI image tools, speech synthesis engines, media compressors, and developer utilities. 100% free & private.
          </p>
          <div class="flex items-center gap-2">
            <span class="fa-badge-blue text-[10px]"><i class="fa-solid fa-shield-halved"></i> 100% In-Browser Private</span>
          </div>
        </div>

        <!-- Audio & Voice -->
        <div class="space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider">Audio & Voice</h4>
          <ul class="text-xs font-bold text-slate-600 space-y-1.5">
            <li><a href="text-to-speech.html" class="hover:text-[#146ebe]">Text to Speech</a></li>
            <li><a href="text-to-mp3.html" class="hover:text-[#146ebe]">Text to MP3</a></li>
            <li><a href="ai-voice-generator.html" class="hover:text-[#146ebe]">AI Voice Generator</a></li>
            <li><a href="pdf-to-speech.html" class="hover:text-[#146ebe]">PDF to Speech</a></li>
            <li><a href="youtube-voiceover-generator.html" class="hover:text-[#146ebe]">YouTube Voiceovers</a></li>
            <li><a href="urdu-text-to-speech.html" class="hover:text-[#146ebe]">Urdu TTS (اردو)</a></li>
            <li><a href="article-to-speech.html" class="hover:text-[#146ebe]">Article Reader</a></li>
          </ul>
        </div>

        <!-- AI & Media -->
        <div class="space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider">AI & Media</h4>
          <ul class="text-xs font-bold text-slate-600 space-y-1.5">
            <li><a href="background-remover.html" class="text-teal-700 font-black hover:underline">AI Background Remover (New)</a></li>
            <li><a href="image-compressor.html" class="hover:text-[#146ebe]">Image Compressor</a></li>
            <li><a href="jpg-compressor.html" class="hover:text-[#146ebe]">JPG Compressor</a></li>
            <li><a href="png-compressor.html" class="hover:text-[#146ebe]">PNG Compressor</a></li>
            <li><a href="webp-compressor.html" class="hover:text-[#146ebe]">WebP Compressor</a></li>
            <li><a href="pdf-compressor.html" class="hover:text-[#146ebe]">PDF Compressor</a></li>
            <li><a href="video-compressor.html" class="hover:text-[#146ebe]">Video Compressor</a></li>
            <li><a href="compress-image-to-100kb.html" class="hover:text-[#146ebe]">Compress to 100KB / 500KB</a></li>
          </ul>
        </div>

        <!-- Developer Tools -->
        <div class="space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider">Developer & Minifiers</h4>
          <ul class="text-xs font-bold text-slate-600 space-y-1.5">
            <li><a href="html-minifier.html" class="hover:text-[#146ebe]">HTML Minifier</a></li>
            <li><a href="css-minifier.html" class="hover:text-[#146ebe]">CSS Minifier</a></li>
            <li><a href="javascript-minifier.html" class="hover:text-[#146ebe]">JavaScript Minifier</a></li>
            <li><a href="code-minifier.html" class="hover:text-[#146ebe]">Universal Code Minifier</a></li>
            <li><a href="shopify-csv-validator.html" class="hover:text-[#146ebe]">Shopify CSV Validator</a></li>
            <li><a href="developer-tools.html" class="hover:text-[#146ebe]">All Dev Tools</a></li>
          </ul>
        </div>

        <!-- Finance & Legal -->
        <div class="space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider">Finance & E-Commerce</h4>
          <ul class="text-xs font-bold text-slate-600 space-y-1.5">
            <li><a href="invoice-generator.html" class="text-[#146ebe] font-black hover:underline">Invoice Generator (New)</a></li>
            <li><a href="etsy-fee-calculator.html" class="hover:text-[#146ebe]">Etsy Fee Calculator</a></li>
            <li><a href="amazon-fba-calculator.html" class="hover:text-[#146ebe]">Amazon FBA Calculator</a></li>
            <li><a href="tiktok-shop-payout-calculator.html" class="hover:text-[#146ebe]">TikTok Shop Payout</a></li>
            <li><a href="section8-estimator.html" class="hover:text-[#146ebe]">Section 8 Estimator</a></li>
            <li><a href="uk-stamp-duty-calculator.html" class="hover:text-[#146ebe]">UK Stamp Duty</a></li>
            <li><a href="privacy-policy.html" class="hover:text-[#146ebe]">Privacy Policy</a></li>
            <li><a href="terms-and-conditions.html" class="hover:text-[#146ebe]">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Copyright Bar -->
      <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
        <div>© 2026 <a href="index.html" class="font-bold text-[#183153] hover:text-[#146ebe]">360tools.me</a>. All rights reserved.</div>
        <div class="text-[11px] text-slate-400">Client-side browser processing • Zero cloud data harvesting</div>
      </div>
    </div>
  `;
}

// Auto Inject Header and Footer on DOM Content Loaded
function initGlobalComponents() {
  renderGlobalHeader();
  renderGlobalFooter();
  initMobileAppNavigation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalComponents);
} else {
  initGlobalComponents();
}

