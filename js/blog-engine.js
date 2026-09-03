/**
 * 360tools.me — Dynamic Blog Engine (js/blog-engine.js)
 * Synchronizes client-side GitHub Pages with PythonAnywhere Django REST Backend
 * Features:
 * - Dynamic live Blog Fetching & CRUD synchronization
 * - Smart Video Embedder (YouTube, Instagram Reels, Facebook Video, TikTok)
 * - 1-Click Social Media Sharing (WhatsApp, Twitter/X, Facebook, LinkedIn, Telegram, Copy)
 * - Interactive Author Profile & Cross-Tool Callout Integration
 */

const BLOG_CONFIG = {
  // Primary and fallback endpoints
  LOCAL_API: 'http://127.0.0.1:8000',
  REMOTE_API: 'https://360tools.pythonanywhere.com',
  
  get API_BASE_URL() {
    // If opened via local development server or file://
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
      return this.LOCAL_API;
    }
    return this.REMOTE_API;
  },

  SITE_URL: 'https://360tools.me',
};

/**
 * Smart fetch with automatic failover between Localhost and PythonAnywhere
 */
async function fetchBlogApi(endpointPath) {
  const path = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
  
  // Try preferred endpoint first
  const primaryUrl = `${BLOG_CONFIG.API_BASE_URL}${path}`;
  try {
    const res = await fetch(primaryUrl);
    if (res.ok) return await res.json();
  } catch (primaryErr) {
    console.warn(`Primary API (${primaryUrl}) unreachable, trying fallback...`);
  }

  // If primary fails (e.g. localhost Django isn't running), try the other one
  const fallbackBase = (BLOG_CONFIG.API_BASE_URL === BLOG_CONFIG.LOCAL_API) 
    ? BLOG_CONFIG.REMOTE_API 
    : BLOG_CONFIG.LOCAL_API;
  
  const fallbackUrl = `${fallbackBase}${path}`;
  const fallbackRes = await fetch(fallbackUrl);
  if (!fallbackRes.ok) throw new Error(`HTTP ${fallbackRes.status}`);
  return await fallbackRes.json();
}

/**
 * Smart Media Parser for YouTube, Facebook, Instagram, TikTok & Vimeo
 */
function parseMediaEmbed(videoUrl) {
  if (!videoUrl || typeof videoUrl !== 'string') return null;
  const url = videoUrl.trim();

  // 1. YouTube (Watch, Shorts, Embed, youtu.be)
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      platform: 'YouTube',
      icon: 'fa-brands fa-youtube text-red-600',
      html: `
        <div class="relative w-full overflow-hidden rounded-2xl shadow-xl border border-slate-200 bg-black aspect-video my-6">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" 
            title="YouTube Video Player" 
            class="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        </div>`
    };
  }

  // 2. Instagram Reels & Posts
  const igMatch = url.match(/(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  if (igMatch && igMatch[1]) {
    const igId = igMatch[1];
    return {
      type: 'instagram',
      platform: 'Instagram',
      icon: 'fa-brands fa-instagram text-pink-600',
      html: `
        <div class="my-6 flex flex-col items-center">
          <div class="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
            <iframe 
              src="https://www.instagram.com/p/${igId}/embed/" 
              class="w-full min-h-[500px] border-0" 
              scrolling="no" 
              allowtransparency="true" 
              allow="encrypted-media">
            </iframe>
          </div>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="mt-2 text-xs font-bold text-pink-600 hover:underline inline-flex items-center gap-1.5">
            <i class="fa-brands fa-instagram"></i> View Reel on Instagram <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>`
    };
  }

  // 3. Facebook Video & Reels
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    const encodedFb = encodeURIComponent(url);
    return {
      type: 'facebook',
      platform: 'Facebook',
      icon: 'fa-brands fa-facebook text-blue-600',
      html: `
        <div class="my-6 flex flex-col items-center">
          <div class="w-full max-w-xl rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black aspect-video relative">
            <iframe 
              src="https://www.facebook.com/plugins/video.php?href=${encodedFb}&show_text=false&width=560" 
              class="absolute top-0 left-0 w-full h-full border-0" 
              scrolling="no" 
              allowfullscreen="true" 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
          </div>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="mt-2 text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1.5">
            <i class="fa-brands fa-facebook"></i> View on Facebook <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>`
    };
  }

  // 4. TikTok Embed
  const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tiktokMatch && tiktokMatch[1]) {
    const videoId = tiktokMatch[1];
    return {
      type: 'tiktok',
      platform: 'TikTok',
      icon: 'fa-brands fa-tiktok text-slate-900',
      html: `
        <div class="my-6 flex flex-col items-center">
          <div class="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
            <iframe 
              src="https://www.tiktok.com/embed/v2/${videoId}" 
              class="w-full min-h-[580px] border-0" 
              allowfullscreen 
              allow="encrypted-media">
            </iframe>
          </div>
        </div>`
    };
  }

  // 5. Generic HTML5 Video or Direct MP4 Link
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return {
      type: 'video',
      platform: 'Video',
      icon: 'fa-solid fa-play text-blue-600',
      html: `
        <div class="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black my-6">
          <video controls class="w-full h-auto max-h-[500px]">
            <source src="${url}" type="video/mp4">
            Your browser does not support HTML5 video tag.
          </video>
        </div>`
    };
  }

  return null;
}

/**
 * Generate 1-Click Social Sharing Links
 */
function createSocialShareButtons(title, currentUrl, excerpt = '') {
  const encUrl = encodeURIComponent(currentUrl);
  const encTitle = encodeURIComponent(title);

  return `
    <div class="bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200 rounded-2xl p-4 sm:p-5 my-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 class="text-sm font-black text-[#183153] flex items-center gap-2">
            <i class="fa-solid fa-share-nodes text-[#146ebe]"></i>
            <span>Share this article</span>
          </h4>
          <p class="text-xs text-slate-500 mt-0.5">Found this helpful? Spread the word with your network</p>
        </div>

        <!-- Social Icons Grid -->
        <div class="flex items-center flex-wrap gap-2">
          <!-- WhatsApp -->
          <a href="https://api.whatsapp.com/send?text=${encTitle}%20${encUrl}" target="_blank" rel="noopener noreferrer" 
             title="Share on WhatsApp"
             class="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center text-sm shadow-xs transition-all hover:scale-110">
            <i class="fa-brands fa-whatsapp"></i>
          </a>

          <!-- Twitter / X -->
          <a href="https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}" target="_blank" rel="noopener noreferrer" 
             title="Share on X (Twitter)"
             class="w-9 h-9 rounded-xl bg-black hover:bg-slate-800 text-white flex items-center justify-center text-sm shadow-xs transition-all hover:scale-110">
            <i class="fa-brands fa-x-twitter"></i>
          </a>

          <!-- Facebook -->
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encUrl}" target="_blank" rel="noopener noreferrer" 
             title="Share on Facebook"
             class="w-9 h-9 rounded-xl bg-[#1877F2] hover:bg-blue-700 text-white flex items-center justify-center text-sm shadow-xs transition-all hover:scale-110">
            <i class="fa-brands fa-facebook-f"></i>
          </a>

          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}" target="_blank" rel="noopener noreferrer" 
             title="Share on LinkedIn"
             class="w-9 h-9 rounded-xl bg-[#0A66C2] hover:bg-blue-800 text-white flex items-center justify-center text-sm shadow-xs transition-all hover:scale-110">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>

          <!-- Telegram -->
          <a href="https://t.me/share/url?url=${encUrl}&text=${encTitle}" target="_blank" rel="noopener noreferrer" 
             title="Share on Telegram"
             class="w-9 h-9 rounded-xl bg-[#229ED9] hover:bg-sky-600 text-white flex items-center justify-center text-sm shadow-xs transition-all hover:scale-110">
            <i class="fa-brands fa-telegram"></i>
          </a>

          <!-- Copy Link -->
          <button onclick="copyCurrentArticleUrl(this, '${currentUrl}')" 
                  title="Copy Link to Clipboard"
                  class="h-9 px-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 text-xs font-bold shadow-2xs transition-all cursor-pointer">
            <i class="fa-solid fa-link text-slate-500"></i>
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Copy to clipboard helper
 */
function copyCurrentArticleUrl(btnElem, url) {
  navigator.clipboard.writeText(url || window.location.href).then(() => {
    const originalContent = btnElem.innerHTML;
    btnElem.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i> <span class="text-emerald-600">Copied!</span>`;
    btnElem.classList.add('border-emerald-500', 'bg-emerald-50');
    setTimeout(() => {
      btnElem.innerHTML = originalContent;
      btnElem.classList.remove('border-emerald-500', 'bg-emerald-50');
    }, 2000);
  }).catch(() => {
    prompt('Copy URL:', url || window.location.href);
  });
}

/**
 * Render Linked Primary & Secondary Tools CTA Card
 */
function createToolCalloutCard(post) {
  if (!post.primary_tool_name && (!post.secondary_tools || post.secondary_tools.length === 0)) {
    return '';
  }

  let secondaryHtml = '';
  if (post.secondary_tools && Array.isArray(post.secondary_tools) && post.secondary_tools.length > 0) {
    secondaryHtml = `
      <div class="mt-4 pt-4 border-t border-blue-200/60 flex flex-wrap items-center gap-2">
        <span class="text-[11px] font-black uppercase tracking-wider text-slate-500">Also explore:</span>
        ${post.secondary_tools.map(tool => `
          <a href="${tool.url || '#'}" class="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:text-[#146ebe] transition-all">
            <i class="${tool.icon || 'fa-solid fa-bolt'} text-xs text-[#146ebe]"></i>
            <span>${tool.name}</span>
          </a>
        `).join('')}
      </div>
    `;
  }

  return `
    <div class="bg-gradient-to-br from-[#183153] to-[#146ebe] text-white rounded-3xl p-6 sm:p-8 shadow-xl my-8 relative overflow-hidden">
      <!-- Decorative Backdrop Graphic -->
      <div class="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd43b] text-[#183153] text-[10px] font-black uppercase tracking-wider">
            <i class="fa-solid fa-bolt"></i> Interactive Free Engine
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white leading-tight">
            ${post.primary_tool_name || 'Try Our Related Precision Tool'}
          </h3>
          <p class="text-xs sm:text-sm text-blue-100">
            Use our 100% private, client-side online tool directly in your browser. No signup or download required.
          </p>
        </div>

        <div class="shrink-0">
          <a href="${post.primary_tool_url || 'index.html'}" 
             class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#ffd43b] text-[#183153] font-black text-sm hover:bg-[#ffc107] hover:scale-105 active:scale-95 shadow-lg transition-all">
            <span>${post.primary_tool_cta || 'Launch Free Tool Now'}</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>
      </div>

      ${secondaryHtml}
    </div>
  `;
}

/**
 * Render Author Bio & Social Profiles Card
 */
function createAuthorBioCard(post) {
  const authorName = post.author_name || '360tools Editorial Team';
  const authorRole = post.author_role || 'Product Specialist';
  const authorAvatar = post.author_avatar || 'images/logo.jpg';

  let socialsHtml = '';
  if (post.author_twitter || post.author_linkedin || post.author_github || post.author_website) {
    socialsHtml = `
      <div class="flex items-center gap-2 mt-3">
        ${post.author_twitter ? `
          <a href="${post.author_twitter.startsWith('http') ? post.author_twitter : 'https://twitter.com/' + post.author_twitter.replace('@', '')}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-black hover:text-white text-slate-600 flex items-center justify-center text-xs transition-all" title="Twitter / X">
            <i class="fa-brands fa-x-twitter"></i>
          </a>` : ''}
        ${post.author_linkedin ? `
          <a href="${post.author_linkedin}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#0A66C2] hover:text-white text-slate-600 flex items-center justify-center text-xs transition-all" title="LinkedIn">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>` : ''}
        ${post.author_github ? `
          <a href="${post.author_github}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 flex items-center justify-center text-xs transition-all" title="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>` : ''}
        ${post.author_website ? `
          <a href="${post.author_website}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#146ebe] hover:text-white text-slate-600 flex items-center justify-center text-xs transition-all" title="Website">
            <i class="fa-solid fa-globe"></i>
          </a>` : ''}
      </div>
    `;
  }

  return `
    <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-start gap-4 my-8">
      <img src="${authorAvatar}" alt="${authorName}" class="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-base font-black text-[#183153]">${authorName}</h4>
            <p class="text-xs font-semibold text-slate-500">${authorRole}</p>
          </div>
          <span class="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600">Verified Author</span>
        </div>
        <p class="text-xs text-slate-600 mt-2 leading-relaxed">
          Specializing in privacy-first web utilities, data compression, and browser-native engines at 360tools.me.
        </p>
        ${socialsHtml}
      </div>
    </div>
  `;
}

// Export functions to window
window.BLOG_CONFIG = BLOG_CONFIG;
window.fetchBlogApi = fetchBlogApi;
window.parseMediaEmbed = parseMediaEmbed;
window.createSocialShareButtons = createSocialShareButtons;
window.createToolCalloutCard = createToolCalloutCard;
window.createAuthorBioCard = createAuthorBioCard;
window.copyCurrentArticleUrl = copyCurrentArticleUrl;
