
// Universal Asset & URL Resolver for Local file:// and Production HTTP/HTTPS
function getSiteRoot() {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
      if (s.src && (s.src.includes('main.min.js') || s.src.includes('main.js'))) {
        const idx = s.src.indexOf('js/main');
        if (idx !== -1) {
          return s.src.substring(0, idx);
        }
      }
    }
  }
  return '/';
}

/**
 * 360tools.me — Master Shared Utilities (js/main.js)
 * FontAwesome Style Interactive Engine & Quick Tool Finder (Ctrl + K)
 */

// ==========================================================================
// 360tools.me — Global User Theme & Typography Auto-Loader
// Automatically applies customized font family, base size & colors from localStorage
// ==========================================================================
(function initGlobalUserTheme() {
  try {
    const saved = localStorage.getItem('360tools_user_theme');
    if (!saved) return;
    const theme = JSON.parse(saved);
    if (!theme) return;
    const root = document.documentElement;

    if (theme.fontSans) root.style.setProperty('--font-sans', theme.fontSans);
    if (theme.fontHeading) root.style.setProperty('--font-heading', theme.fontHeading);
    if (theme.baseFontSize) root.style.setProperty('--base-font-size', theme.baseFontSize + 'px');
    if (theme.lineHeight) root.style.setProperty('--line-height-scale', theme.lineHeight);
    if (theme.letterSpacing) root.style.setProperty('--letter-spacing-scale', theme.letterSpacing + 'px');

    if (theme.bg) root.style.setProperty('--fa-bg', theme.bg);
    if (theme.bgSubtle) root.style.setProperty('--fa-bg-subtle', theme.bgSubtle);
    if (theme.card) root.style.setProperty('--fa-card', theme.card);
    if (theme.border) root.style.setProperty('--fa-border', theme.border);
    if (theme.textMain) root.style.setProperty('--fa-text-main', theme.textMain);
    if (theme.textSub) root.style.setProperty('--fa-text-sub', theme.textSub);
    if (theme.primary) {
      root.style.setProperty('--fa-blue', theme.primary);
      root.style.setProperty('--fa-blue-hover', theme.primaryHover || theme.primary);
    }
    if (theme.navy) root.style.setProperty('--fa-navy', theme.navy);
    if (theme.yellow) root.style.setProperty('--fa-yellow', theme.yellow);
    if (theme.radiusMd) root.style.setProperty('--radius-md', theme.radiusMd + 'px');

    if (theme.isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    }
  } catch (e) {
    console.warn('360tools: Theme auto-load error', e);
  }
})();

// All Available Tools Registry for Quick Search & Cards
const TOOLS_REGISTRY = [
  {
    name: "Merge PDF",
    url: "/pdf-tools/merge-pdf/index.html",
    category: "pdf-tools",
    subcategory: "organization",
    icon: "fa-object-group",
    color: "text-red-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Combine multiple PDF files into one single document with custom ordering. 100% client-side.",
    featured: true,
    keywords: ["merge pdf","combine pdf","join pdfs","document binder"]
  },
  {
    name: "Split PDF",
    url: "/pdf-tools/split-pdf/index.html",
    category: "pdf-tools",
    subcategory: "organization",
    icon: "fa-scissors",
    color: "text-orange-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Extract separate pages or custom ranges into individual PDFs or a ZIP archive.",
    featured: true,
    keywords: ["split pdf","separate pages","extract pages","pdf cutter"]
  },
  {
    name: "Compress PDF",
    url: "/pdf-tools/compress-pdf/index.html",
    category: "pdf-tools",
    subcategory: "compression",
    icon: "fa-file-zipper",
    color: "text-emerald-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Shrink PDF file size locally in your browser with adjustable compression presets.",
    featured: true,
    keywords: ["compress pdf","reduce pdf size","shrink document","pdf optimizer"]
  },
  {
    name: "JPG to PDF Converter",
    url: "/pdf-tools/jpg-to-pdf/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-file-image",
    color: "text-blue-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Convert JPEG/JPG images to high-quality PDF documents with orientation controls.",
    featured: false,
    keywords: ["jpg to pdf","jpeg to pdf","image to pdf"]
  },
  {
    name: "PNG to PDF Converter",
    url: "/pdf-tools/png-to-pdf/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-file-image",
    color: "text-teal-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Convert transparent PNG images to clean PDF documents instantly.",
    featured: false,
    keywords: ["png to pdf","transparent image to pdf"]
  },
  {
    name: "WebP to PDF Converter",
    url: "/pdf-tools/webp-to-pdf/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-file-image",
    color: "text-cyan-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Convert modern WebP images to standard PDF format client-side.",
    featured: false,
    keywords: ["webp to pdf","convert webp to pdf"]
  },
  {
    name: "PDF to JPG Converter",
    url: "/pdf-tools/pdf-to-jpg/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-image",
    color: "text-amber-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Render PDF pages into high-resolution JPG photos and download as a ZIP.",
    featured: false,
    keywords: ["pdf to jpg","extract images from pdf","pdf to photo"]
  },
  {
    name: "PDF to PNG Converter",
    url: "/pdf-tools/pdf-to-png/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-image",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Extract lossless PNG images from PDF pages with crystal clear rendering.",
    featured: false,
    keywords: ["pdf to png","lossless pdf converter"]
  },
  {
    name: "PDF to WebP Converter",
    url: "/pdf-tools/pdf-to-webp/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-bolt",
    color: "text-blue-500",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Convert PDF pages directly to lightweight, high-performance WebP images.",
    featured: false,
    keywords: ["pdf to webp","fast pdf export"]
  },
  {
    name: "Rotate PDF",
    url: "/pdf-tools/rotate-pdf/index.html",
    category: "pdf-tools",
    subcategory: "editing",
    icon: "fa-rotate",
    color: "text-purple-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Rotate individual or all PDF pages 90, 180, or 270 degrees with live preview.",
    featured: false,
    keywords: ["rotate pdf","turn pdf pages","landscape portrait pdf"]
  },
  {
    name: "Delete PDF Pages",
    url: "/pdf-tools/delete-pdf-pages/index.html",
    category: "pdf-tools",
    subcategory: "editing",
    icon: "fa-trash-can",
    color: "text-rose-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Select and remove unwanted pages from any PDF document visually.",
    featured: false,
    keywords: ["delete pdf pages","remove pages","trim pdf"]
  },
  {
    name: "Extract PDF Pages",
    url: "/pdf-tools/extract-pdf-pages/index.html",
    category: "pdf-tools",
    subcategory: "editing",
    icon: "fa-file-export",
    color: "text-sky-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Isolate specific pages or custom ranges into a new standalone PDF.",
    featured: false,
    keywords: ["extract pdf pages","save specific pages"]
  },
  {
    name: "PDF to Text Extractor",
    url: "/pdf-tools/pdf-to-text/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-file-lines",
    color: "text-slate-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Extract clean raw text from PDF files with word count and one-click copy.",
    featured: false,
    keywords: ["pdf to text","extract text from pdf","pdf txt reader"]
  },
  {
    name: "Add Page Numbers to PDF",
    url: "/pdf-tools/add-page-numbers-to-pdf/index.html",
    category: "pdf-tools",
    subcategory: "editing",
    icon: "fa-arrow-down-1-9",
    color: "text-violet-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Insert custom page numbers, header/footer labels, and positioning into your PDF.",
    featured: false,
    keywords: ["add page numbers pdf","pdf pagination","number pdf"]
  },
  {
    name: "Watermark PDF",
    url: "/pdf-tools/watermark-pdf/index.html",
    category: "pdf-tools",
    subcategory: "security",
    icon: "fa-stamp",
    color: "text-pink-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Stamp confidential or draft text watermarks diagonally across your PDF pages.",
    featured: false,
    keywords: ["watermark pdf","pdf stamp","confidential draft overlay"]
  },
  {
    name: "Password Protect PDF",
    url: "/pdf-tools/password-protect-pdf/index.html",
    category: "pdf-tools",
    subcategory: "security",
    icon: "fa-lock",
    color: "text-emerald-700",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Secure PDF files with strong client-side encryption and password protection.",
    featured: false,
    keywords: ["protect pdf","password protect pdf","encrypt pdf"]
  },
  {
    name: "Unlock PDF",
    url: "/pdf-tools/unlock-pdf/index.html",
    category: "pdf-tools",
    subcategory: "security",
    icon: "fa-unlock",
    color: "text-amber-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Remove passwords and permissions from unlocked PDF files in your browser.",
    featured: false,
    keywords: ["unlock pdf","remove password pdf","decrypt pdf"]
  },
  {
    name: "PDF Metadata Remover",
    url: "/pdf-tools/pdf-metadata-remover/index.html",
    category: "pdf-tools",
    subcategory: "security",
    icon: "fa-user-shield",
    color: "text-purple-700",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Inspect and wipe author, title, producer, and timestamp metadata from PDF files.",
    featured: false,
    keywords: ["pdf metadata remover","clean pdf author","pdf privacy"]
  },
  {
    name: "HTML to PDF Converter",
    url: "/pdf-tools/html-to-pdf/index.html",
    category: "pdf-tools",
    subcategory: "conversion",
    icon: "fa-code",
    color: "text-blue-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Render HTML and CSS markup into styled PDF documents client-side.",
    featured: false,
    keywords: ["html to pdf","web to pdf","render html invoice"]
  },
  {
    name: "PDF Tools Hub",
    url: "/pdf-tools/index.html",
    category: "pdf-tools",
    subcategory: "hub",
    icon: "fa-file-pdf",
    color: "text-red-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "All-in-one suite of 19 private, 100% in-browser PDF utilities.",
    featured: true,
    keywords: ["pdf tools suite","online pdf editor","free pdf tools"]
  },
  {
    name: "Text to Speech Converter",
    url: "/audio-tools/text-to-speech.html",
    category: "audio-tools",
    subcategory: "speech",
    icon: "fa-volume-high",
    color: "text-blue-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Convert any written text to natural human speech with live word tracking and pitch controls.",
    featured: true,
    keywords: ["tts","text to speech","read aloud","natural reader"]
  },
  {
    name: "Text to MP3 Converter",
    url: "/audio-tools/text-to-mp3.html",
    category: "audio-tools",
    subcategory: "speech",
    icon: "fa-file-audio",
    color: "text-emerald-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Synthesize speech and export directly to downloadable MP3 or WAV audio tracks.",
    featured: true,
    keywords: ["text to mp3","audio downloader","mp3 generator"]
  },
  {
    name: "AI Voice Generator",
    url: "/audio-tools/ai-voice-generator.html",
    category: "audio-tools",
    subcategory: "speech",
    icon: "fa-wand-magic-sparkles",
    color: "text-purple-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Generate studio-grade narration with persona avatars, dynamic waveforms, and audio FX.",
    featured: true,
    keywords: ["ai voice generator","realistic voiceover","audio studio"]
  },
  {
    name: "PDF to Speech Reader",
    url: "/audio-tools/pdf-to-speech.html",
    category: "audio-tools",
    subcategory: "speech",
    icon: "fa-file-pdf",
    color: "text-red-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Listen to eBooks and multi-page PDF documents read aloud page-by-page in memory.",
    featured: false,
    keywords: ["pdf to speech","audiobook reader","listen pdf"]
  },
  {
    name: "YouTube Voiceover Generator",
    url: "/audio-tools/youtube-voiceover-generator.html",
    category: "audio-tools",
    subcategory: "speech",
    icon: "fa-youtube",
    color: "text-rose-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Auto-split video scripts into sequential scenes, insert pauses, and render narration.",
    featured: false,
    keywords: ["youtube voiceover","script narrator","scene splitter"]
  },
  {
    name: "Urdu Text to Speech",
    url: "/audio-tools/urdu-text-to-speech.html",
    category: "audio-tools",
    subcategory: "speech",
    icon: "fa-feather",
    color: "text-emerald-700",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Authentic Pakistani Urdu voice engine supporting Urdu Nastaliq script and Roman Urdu.",
    featured: false,
    keywords: ["urdu tts","urdu speech","pakistani voice","اردو"]
  },
  {
    name: "Article to Speech Reader",
    url: "/audio-tools/article-to-speech.html",
    category: "audio-tools",
    subcategory: "speech",
    icon: "fa-newspaper",
    color: "text-amber-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Paste any article or blog post to strip web clutter and listen hands-free.",
    featured: false,
    keywords: ["article to speech","web reader","blog cleaner"]
  },
  {
    name: "Free Watermark Remover (Image & Video)",
    url: "/image-tools/watermark-remover.html",
    category: "image-tools",
    subcategory: "editing",
    icon: "fa-eraser",
    color: "text-purple-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Remove logos, timestamps, and watermarks from images and videos with client-side inpainting.",
    featured: true,
    keywords: ["watermark remover","erase logo","delete watermark","inpainting"]
  },
  {
    name: "Free AI Background Remover",
    url: "/image-tools/background-remover.html",
    category: "image-tools",
    subcategory: "editing",
    icon: "fa-wand-magic-sparkles",
    color: "text-teal-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Erase photo backgrounds automatically with client-side AI and export transparent PNGs.",
    featured: true,
    keywords: ["ai background remover","bg eraser","transparent png","cutout"]
  },
  {
    name: "Universal Image Compressor",
    url: "/image-tools/image-compressor.html",
    category: "image-tools",
    subcategory: "compression",
    icon: "fa-image",
    color: "text-emerald-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Compress JPG, PNG, and WebP photos by up to 90% with zero server uploads.",
    featured: true,
    keywords: ["image compressor","photo optimizer","shrink image"]
  },
  {
    name: "JPG Compressor",
    url: "/image-tools/jpg-compressor.html",
    category: "image-tools",
    subcategory: "compression",
    icon: "fa-camera",
    color: "text-amber-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Lossy JPEG quantization, visual comparison slider, and target file size presets.",
    featured: false,
    keywords: ["jpg compressor","jpeg compress","photo quality"]
  },
  {
    name: "PNG Compressor",
    url: "/image-tools/png-compressor.html",
    category: "image-tools",
    subcategory: "compression",
    icon: "fa-file-image",
    color: "text-emerald-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Lossless PNG compression preserving transparent alpha channels and crisp edges.",
    featured: false,
    keywords: ["png compressor","transparent png compress"]
  },
  {
    name: "WebP Compressor",
    url: "/image-tools/webp-compressor.html",
    category: "image-tools",
    subcategory: "compression",
    icon: "fa-bolt",
    color: "text-blue-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Convert photos to next-gen WebP format for 30%+ bandwidth savings.",
    featured: false,
    keywords: ["webp compressor","google webp converter"]
  },
  {
    name: "Compress Image to 100KB",
    url: "/image-tools/compress-image-to-100kb.html",
    category: "image-tools",
    subcategory: "target-size",
    icon: "fa-bullseye",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Target exact 100KB file size for government forms, passport photos, and job exams.",
    featured: false,
    keywords: ["100kb image compressor","passport photo 100kb"]
  },
  {
    name: "Compress Image to 200KB",
    url: "/image-tools/compress-image-to-200kb.html",
    category: "image-tools",
    subcategory: "target-size",
    icon: "fa-bullseye",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Fast 200KB optimizer for avatar uploads, admissions portals, and online forms.",
    featured: false,
    keywords: ["200kb image compressor","avatar portal form"]
  },
  {
    name: "Compress Image to 500KB",
    url: "/image-tools/compress-image-to-500kb.html",
    category: "image-tools",
    subcategory: "target-size",
    icon: "fa-bullseye",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Optimize banners and large attachments to fit strictly under 500KB without blurring.",
    featured: false,
    keywords: ["500kb image compressor","email banner optimize"]
  },
  {
    name: "Bulk Image Compressor",
    url: "/image-tools/bulk-image-compressor.html",
    category: "image-tools",
    subcategory: "batch",
    icon: "fa-layer-group",
    color: "text-purple-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Compress batches of 50+ photos simultaneously and download as a single ZIP archive.",
    featured: false,
    keywords: ["bulk image compressor","batch compress zip"]
  },
  {
    name: "Video Compressor",
    url: "/video-tools/video-compressor.html",
    category: "video-tools",
    subcategory: "compression",
    icon: "fa-video",
    color: "text-rose-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Reduce MP4 and WebM video size client-side with resolution scaling and bitrate controls.",
    featured: true,
    keywords: ["video compressor","mp4 compress","reduce video size"]
  },
  {
    name: "Video Frame Extractor",
    url: "/video-tools/video-frame-extractor.html",
    category: "video-tools",
    subcategory: "extraction",
    icon: "fa-film",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Extract high-res image frames from video by FPS, interval, or count with instant ZIP export.",
    featured: true,
    keywords: ["video frame extractor","video to images","mp4 to png"]
  },
  {
    name: "HTML Minifier",
    url: "/developer-tools/html-minifier.html",
    category: "developer-tools",
    subcategory: "minifiers",
    icon: "fa-html5",
    color: "text-orange-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Minify HTML markup, strip comments, collapse whitespace, and view Gzip savings.",
    featured: true,
    keywords: ["html minifier","minify html","collapse whitespace"]
  },
  {
    name: "CSS Minifier",
    url: "/developer-tools/css-minifier.html",
    category: "developer-tools",
    subcategory: "minifiers",
    icon: "fa-css3-alt",
    color: "text-blue-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Compress stylesheets, shorten hex color codes, and eliminate redundant rules.",
    featured: true,
    keywords: ["css minifier","minify stylesheet"]
  },
  {
    name: "JavaScript Minifier",
    url: "/developer-tools/javascript-minifier.html",
    category: "developer-tools",
    subcategory: "minifiers",
    icon: "fa-js",
    color: "text-yellow-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Minify JS code, remove console logs and comments, and inspect compression ratios.",
    featured: true,
    keywords: ["javascript minifier","js minifier","compress js"]
  },
  {
    name: "Shopify CSV Validator",
    url: "/developer-tools/shopify-csv-validator.html",
    category: "developer-tools",
    subcategory: "ecommerce",
    icon: "fa-shopify",
    color: "text-emerald-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Audit product CSV files for schema errors, missing headers, and invalid handles.",
    featured: false,
    keywords: ["shopify csv validator","product csv checker"]
  },
  {
    name: "Free ATS Resume Checker",
    url: "/developer-tools/ats-resume-checker.html",
    category: "developer-tools",
    subcategory: "career",
    icon: "fa-file-circle-check",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Audit your CV for ATS compatibility, keyword match percentage, power verbs, and formatting errors.",
    featured: true,
    keywords: ["ats resume checker","cv checker","resume score"]
  },
  {
    name: "Free Online Invoice Generator",
    url: "/ecommerce-tools/invoice-generator.html",
    category: "ecommerce-tools",
    subcategory: "billing",
    icon: "fa-file-invoice-dollar",
    color: "text-blue-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Generate printable A4 PDF invoices with custom branding, tax calculation, and currencies.",
    featured: true,
    keywords: ["invoice generator","pdf invoice maker","receipt creator"]
  },
  {
    name: "Etsy Fee Calculator",
    url: "/ecommerce-tools/etsy-fee-calculator.html",
    category: "ecommerce-tools",
    subcategory: "sellers",
    icon: "fa-etsy",
    color: "text-orange-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Calculate Etsy 6.5% transaction cuts, listing fees, offsite ads, and net profit margins.",
    featured: true,
    keywords: ["etsy fee calculator","etsy profit calculator"]
  },
  {
    name: "Amazon FBA Dim Weight Checker",
    url: "/ecommerce-tools/amazon-fba-calculator.html",
    category: "ecommerce-tools",
    subcategory: "sellers",
    icon: "fa-amazon",
    color: "text-amber-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Determine billable dimensional weight (L×W×H/139) and verify Amazon fulfillment size tiers.",
    featured: false,
    keywords: ["amazon fba calculator","dimensional weight checker"]
  },
  {
    name: "TikTok Shop Payout Estimator",
    url: "/ecommerce-tools/tiktok-shop-payout-calculator.html",
    category: "ecommerce-tools",
    subcategory: "sellers",
    icon: "fa-tiktok",
    color: "text-pink-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Estimate TikTok Shop creator commissions, referral fees, and net bank deposits.",
    featured: false,
    keywords: ["tiktok shop payout","tiktok affiliate calculator"]
  },
  {
    name: "Print-on-Demand Profit Grid",
    url: "/ecommerce-tools/pod-profit-calculator.html",
    category: "ecommerce-tools",
    subcategory: "sellers",
    icon: "fa-shirt",
    color: "text-blue-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Compare production costs and profit margins across Printify, Printful, and Gelato.",
    featured: false,
    keywords: ["pod profit calculator","printify profit","printful margins"]
  },
  {
    name: "Section 8 Max Rent Estimator",
    url: "/calculators/section8-estimator.html",
    category: "calculators",
    subcategory: "real-estate",
    icon: "fa-house-user",
    color: "text-[#146ebe]",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Estimate HUD Fair Market Rent voucher limits and landlord payment standard caps.",
    featured: true,
    keywords: ["section 8 calculator","hud fair market rent"]
  },
  {
    name: "UK Stamp Duty Calculator",
    url: "/calculators/uk-stamp-duty-calculator.html",
    category: "calculators",
    subcategory: "tax",
    icon: "fa-landmark",
    color: "text-amber-700",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Compute SDLT property tax tiers for England & Northern Ireland residential homes.",
    featured: true,
    keywords: ["uk stamp duty calculator","sdlt calculator"]
  },
  {
    name: "1031 Exchange Timeline Tracker",
    url: "/calculators/1031-exchange-tracker.html",
    category: "calculators",
    subcategory: "real-estate",
    icon: "fa-clock-rotate-left",
    color: "text-purple-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Track 45-day identification and 180-day closing deadlines for tax-deferred exchanges.",
    featured: false,
    keywords: ["1031 exchange tracker","45 day identification deadline"]
  },
  {
    name: "STR Cleaning Fee Splitter",
    url: "/calculators/str-cleaning-splitter.html",
    category: "calculators",
    subcategory: "real-estate",
    icon: "fa-broom",
    color: "text-teal-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Split turnover cleaning fees, turnover payroll, and co-host payouts for Airbnb & VRBO.",
    featured: false,
    keywords: ["str cleaning fee splitter","airbnb co-host split"]
  },
  {
    name: "EU VAT OSS Calculator",
    url: "/calculators/eu-vat-oss-calculator.html",
    category: "calculators",
    subcategory: "tax",
    icon: "fa-percent",
    color: "text-blue-700",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Determine one-stop-shop VAT rates across 27 EU member states for digital products.",
    featured: false,
    keywords: ["eu vat oss calculator","vat rates europe digital goods"]
  },
  {
    name: "2048 Puzzle Game",
    url: "/games/2048/index.html",
    category: "games",
    subcategory: "puzzle",
    icon: "fa-cubes",
    color: "text-amber-500",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Slide and merge numbered tiles on a 4x4 grid to reach the elusive 2048 tile.",
    featured: true,
    keywords: ["2048 game","slide tiles","math puzzle"]
  },
  {
    name: "Classic Retro Snake",
    url: "/games/snake/index.html",
    category: "games",
    subcategory: "arcade",
    icon: "fa-worm",
    color: "text-emerald-500",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Classic Nokia-style arcade game with smooth 60fps movement, apples, and sound effects.",
    featured: true,
    keywords: ["snake game","retro arcade","nokia snake"]
  },
  {
    name: "Memory Card Match",
    url: "/games/memory-game/index.html",
    category: "games",
    subcategory: "puzzle",
    icon: "fa-brain",
    color: "text-purple-500",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Test concentration with 3D card flips, tech icon pairs, timer, and high score board.",
    featured: false,
    keywords: ["memory game","card match","brain flip"]
  },
  {
    name: "Tic Tac Toe (XO vs AI)",
    url: "/games/tic-tac-toe/index.html",
    category: "games",
    subcategory: "board",
    icon: "fa-xmark",
    color: "text-rose-500",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Play classic 3x3 XO matches against smart Minimax AI or challenge a friend locally.",
    featured: false,
    keywords: ["tic tac toe","xo game","noughts crosses"]
  },
  {
    name: "Word Scramble Puzzle",
    url: "/games/word-scramble/index.html",
    category: "games",
    subcategory: "puzzle",
    icon: "fa-spell-check",
    color: "text-blue-500",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Unscramble mixed letters with smart hints, combo streaks, timer, and score levels.",
    featured: false,
    keywords: ["word scramble","anagram solver","vocabulary puzzle"]
  },
  {
    name: "Bhabhi Thulla Card Game",
    url: "/games/bhabhi-thulla/index.html",
    category: "games",
    subcategory: "card",
    icon: "fa-spade",
    color: "text-emerald-600",
    bg: "bg-indigo-50 border-indigo-200/80",
    desc: "Classic 4-player traditional South Asian trick-taking card game. Shed your cards to escape!",
    featured: false,
    keywords: ["bhabhi thulla","bhabi get away","card game"]
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
    <a href="${getSiteRoot()}${t.url.replace(/^\/+/, '')}" class="flex items-center justify-between p-3 rounded-2xl hover:bg-blue-50/70 group transition-all">
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
    <a href="${getSiteRoot()}" class="mobile-nav-item ${isHome ? 'active' : ''}">
      <i class="fa-solid fa-house"></i>
      <span>Home</span>
    </a>
    <a href="${getSiteRoot()}audio-tools/" class="mobile-nav-item ${isAudio ? 'active' : ''}">
      <i class="fa-solid fa-volume-high"></i>
      <span>Audio</span>
    </a>
    <button onclick="openQuickSearch()" class="mobile-nav-item mobile-nav-item-highlight" aria-label="Search tools">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Search</span>
    </button>
    <a href="${getSiteRoot()}image-tools/" class="mobile-nav-item ${isCompress ? 'active' : ''}">
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
          <img src="${getSiteRoot()}images/logo-icon.webp" alt="360Tools Logo" width="32" height="32" class="w-8 h-8 rounded-xl">
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
          <div class="text-[11px] font-black text-red-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-file-pdf"></i> PDF & Documents</span>
            <a href="${getSiteRoot()}pdf-tools/" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All 19 &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="${getSiteRoot()}pdf-tools/merge-pdf/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-red-50/80 hover:bg-red-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-object-group text-red-600 text-sm"></i> Merge PDF
            </a>
            <a href="${getSiteRoot()}pdf-tools/split-pdf/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-red-50/80 hover:bg-red-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-scissors text-orange-600 text-sm"></i> Split PDF
            </a>
            <a href="${getSiteRoot()}pdf-tools/compress-pdf/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-red-50/80 hover:bg-red-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-zipper text-emerald-600 text-sm"></i> Compress PDF
            </a>
            <a href="${getSiteRoot()}pdf-tools/pdf-to-jpg/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-red-50/80 hover:bg-red-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-image text-amber-600 text-sm"></i> PDF to JPG
            </a>
            <a href="${getSiteRoot()}pdf-tools/jpg-to-pdf/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-red-50/80 hover:bg-red-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-image text-blue-600 text-sm"></i> JPG to PDF
            </a>
            <a href="${getSiteRoot()}pdf-tools/rotate-pdf/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-red-50/80 hover:bg-red-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-rotate text-purple-600 text-sm"></i> Rotate PDF
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-purple-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-volume-high"></i> AI Voice & Audio</span>
            <a href="${getSiteRoot()}audio-tools/" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="${getSiteRoot()}audio-tools/text-to-speech.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-volume-high text-[#146ebe] text-sm"></i> Text to Speech
            </a>
            <a href="${getSiteRoot()}audio-tools/text-to-mp3.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-audio text-emerald-600 text-sm"></i> Text to MP3
            </a>
            <a href="${getSiteRoot()}audio-tools/ai-voice-generator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-wand-magic-sparkles text-purple-600 text-sm"></i> AI Voice Studio
            </a>
            <a href="${getSiteRoot()}audio-tools/pdf-to-speech.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-pdf text-red-600 text-sm"></i> PDF Reader
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-emerald-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-compress"></i> Media Compression</span>
            <a href="${getSiteRoot()}image-tools/" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="${getSiteRoot()}image-tools/watermark-remover.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-eraser text-purple-600 text-sm"></i> Watermark Remover (Img & Video)
            </a>
            <a href="${getSiteRoot()}image-tools/background-remover.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-wand-magic-sparkles text-teal-600 text-sm"></i> BG Remover
            </a>
            <a href="${getSiteRoot()}video-tools/video-frame-extractor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-film text-indigo-600 text-sm"></i> Frame Extractor
            </a>
            <a href="${getSiteRoot()}image-tools/image-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-image text-emerald-600 text-sm"></i> Image Compressor
            </a>
            <a href="${getSiteRoot()}video-tools/video-compressor.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-video text-rose-600 text-sm"></i> Video Compressor
            </a>
            <a href="${getSiteRoot()}pdf-tools/compress-pdf/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-pdf text-red-600 text-sm"></i> PDF Compressor
            </a>
            <a href="${getSiteRoot()}image-tools/compress-image-to-100kb.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-bullseye text-indigo-600 text-sm"></i> 100KB Target
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-cyan-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-code"></i> Developer & Web Tools</span>
            <a href="${getSiteRoot()}developer-tools/" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="${getSiteRoot()}developer-tools/html-minifier.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-html5 text-orange-600 text-sm"></i> HTML Minifier
            </a>
            <a href="${getSiteRoot()}developer-tools/css-minifier.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-css3-alt text-blue-600 text-sm"></i> CSS Minifier
            </a>
            <a href="${getSiteRoot()}developer-tools/javascript-minifier.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-js text-yellow-500 text-sm"></i> JS Minifier
            </a>
            <a href="${getSiteRoot()}developer-tools/shopify-csv-validator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-shopify text-emerald-600 text-sm"></i> Shopify CSV
            </a>
            <a href="${getSiteRoot()}developer-tools/ats-resume-checker.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-circle-check text-indigo-600 text-sm"></i> Free ATS Resume Checker
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-[#f1641e] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-calculator"></i> E-Commerce & Finance</span>
            <a href="${getSiteRoot()}ecommerce-tools/" onclick="toggleMobileAppDrawer(false)" class="text-[10px] text-[#146ebe] hover:underline font-bold">View All &rarr;</a>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="${getSiteRoot()}ecommerce-tools/etsy-fee-calculator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-etsy text-[#f1641e] text-sm"></i> Etsy Fee Calc
            </a>
            <a href="${getSiteRoot()}ecommerce-tools/amazon-fba-calculator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-amazon text-amber-600 text-sm"></i> Amazon FBA
            </a>
            <a href="${getSiteRoot()}ecommerce-tools/tiktok-shop-payout-calculator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-brands fa-tiktok text-pink-600 text-sm"></i> TikTok Payout
            </a>
            <a href="${getSiteRoot()}calculators/section8-estimator.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
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
            <a href="${getSiteRoot()}games/2048/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-cubes text-amber-500 text-sm"></i> 2048 Classic
            </a>
            <a href="${getSiteRoot()}games/snake/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-worm text-emerald-500 text-sm"></i> Retro Snake
            </a>
            <a href="${getSiteRoot()}games/memory-game/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-brain text-purple-500 text-sm"></i> Memory Card
            </a>
            <a href="${getSiteRoot()}games/tic-tac-toe/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-xmark text-rose-500 text-sm"></i> Tic Tac Toe
            </a>
            <a href="${getSiteRoot()}games/word-scramble/index.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-spell-check text-blue-500 text-sm"></i> Word Scramble
            </a>
            <a href="${getSiteRoot()}games/bhabhi-thulla/index.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-spade text-emerald-600 text-sm"></i> Bhabhi Thulla Card Game
            </a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-circle-info"></i> Company & Legal</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="${getSiteRoot()}appearance.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-palette text-purple-600 text-sm"></i> Theme & Font Customizer
            </a>
            <a href="${getSiteRoot()}about.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-circle-info text-blue-600 text-sm"></i> About 360Tools
            </a>
            <a href="${getSiteRoot()}contact.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-envelope text-teal-600 text-sm"></i> Contact Us
            </a>
            <a href="${getSiteRoot()}privacy-policy.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-shield-halved text-emerald-600 text-sm"></i> Privacy Policy
            </a>
            <a href="${getSiteRoot()}terms.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-contract text-amber-600 text-sm"></i> Terms of Use
            </a>
            <a href="${getSiteRoot()}disclaimer.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-triangle-exclamation text-amber-600 text-sm"></i> Legal Disclaimer
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
        <a href="${getSiteRoot()}" class="flex items-center gap-2.5 group shrink-0">
          <img src="${getSiteRoot()}images/logo-icon.webp" alt="360Tools Logo" width="36" height="36" class="w-9 h-9 rounded-full object-cover border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-transform">
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
                      <!-- Category 0: PDF & Documents (NEW) -->
                      <button type="button" onmouseenter="switchNavCategory('nav-cat-pdf')" onclick="switchNavCategory('nav-cat-pdf')" class="nav-cat-tab" data-cat="nav-cat-pdf">
                        <div class="flex items-center gap-2.5">
                          <div class="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs shrink-0">
                            <i class="fa-solid fa-file-pdf"></i>
                          </div>
                          <div class="text-left">
                            <div class="text-xs font-bold leading-tight">PDF & Documents</div>
                            <div class="text-[10px] text-slate-400 font-medium">19 Tools</div>
                          </div>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px] nav-cat-chevron opacity-40 transition-all"></i>
                      </button>

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
                  
                  <!-- PANEL 0: PDF & Documents -->
                  <div id="nav-cat-pdf" class="nav-cat-panel hidden flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-red-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-red-800">PDF & Document Suite</span>
                          <span class="bg-red-100 text-red-700 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">100% Client-Side</span>
                        </div>
                        <a href="${getSiteRoot()}pdf-tools/" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All 19 Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="${getSiteRoot()}pdf-tools/merge-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-red-50 text-red-600"><i class="fa-solid fa-object-group"></i></div>
                          <div>
                            <div class="nav-tool-title">Merge PDF</div>
                            <div class="nav-tool-desc">Combine multiple PDFs in custom order</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}pdf-tools/split-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-orange-50 text-orange-600"><i class="fa-solid fa-scissors"></i></div>
                          <div>
                            <div class="nav-tool-title">Split PDF</div>
                            <div class="nav-tool-desc">Extract pages & ranges to PDF/ZIP</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}pdf-tools/compress-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-file-zipper"></i></div>
                          <div>
                            <div class="nav-tool-title">Compress PDF</div>
                            <div class="nav-tool-desc">Shrink PDF size locally in browser</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}pdf-tools/pdf-to-jpg/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-image"></i></div>
                          <div>
                            <div class="nav-tool-title">PDF to JPG / PNG</div>
                            <div class="nav-tool-desc">Convert PDF pages into high-res images</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}pdf-tools/jpg-to-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-file-image"></i></div>
                          <div>
                            <div class="nav-tool-title">JPG / PNG to PDF</div>
                            <div class="nav-tool-desc">Turn images and photos into PDFs</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}pdf-tools/rotate-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-rotate"></i></div>
                          <div>
                            <div class="nav-tool-title">Rotate PDF</div>
                            <div class="nav-tool-desc">Rotate pages 90°/180° with preview</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}pdf-tools/password-protect-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-700"><i class="fa-solid fa-lock"></i></div>
                          <div>
                            <div class="nav-tool-title">Protect & Unlock PDF</div>
                            <div class="nav-tool-desc">Client-side encryption & decryption</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}pdf-tools/html-to-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-indigo-50 text-indigo-600"><i class="fa-solid fa-code"></i></div>
                          <div>
                            <div class="nav-tool-title">HTML to PDF</div>
                            <div class="nav-tool-desc">Render web code & templates to PDF</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- PANEL 1: Audio & AI Voice -->
                  <div id="nav-cat-audio" class="nav-cat-panel flex flex-col justify-between h-full space-y-3">
                    <div>
                      <div class="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-purple-600"></span>
                          <span class="text-xs font-black uppercase tracking-wider text-purple-800">AI Voice & Audio Tools</span>
                        </div>
                        <a href="${getSiteRoot()}audio-tools/" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All Audio Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="${getSiteRoot()}audio-tools/text-to-speech.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-[#146ebe]"><i class="fa-solid fa-volume-high"></i></div>
                          <div>
                            <div class="nav-tool-title">Text to Speech</div>
                            <div class="nav-tool-desc">Natural voices with live word highlight</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}audio-tools/text-to-mp3.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-file-audio"></i></div>
                          <div>
                            <div class="nav-tool-title">Text to MP3 Converter</div>
                            <div class="nav-tool-desc">Direct MP3 & WAV audio export</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}audio-tools/ai-voice-generator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                          <div>
                            <div class="nav-tool-title">AI Voice Generator</div>
                            <div class="nav-tool-desc">Studio avatars & dynamic waveforms</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}audio-tools/pdf-to-speech.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-red-50 text-red-600"><i class="fa-solid fa-file-pdf"></i></div>
                          <div>
                            <div class="nav-tool-title">PDF to Speech Reader</div>
                            <div class="nav-tool-desc">Listen to multi-page eBooks & documents</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}audio-tools/youtube-voiceover-generator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-brands fa-youtube"></i></div>
                          <div>
                            <div class="nav-tool-title">YouTube Voiceover</div>
                            <div class="nav-tool-desc">Scene splitter & timing narration</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}audio-tools/urdu-text-to-speech.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-700"><i class="fa-solid fa-feather"></i></div>
                          <div>
                            <div class="nav-tool-title">Urdu TTS (اردو)</div>
                            <div class="nav-tool-desc">Nastaliq script & Roman Urdu synthesis</div>
                          </div>
                        </a>
                        <a href="${getSiteRoot()}audio-tools/article-to-speech.html" class="nav-tool-item col-span-2">
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
                        <a href="${getSiteRoot()}image-tools/" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All Media Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="${getSiteRoot()}image-tools/watermark-remover.html" class="nav-tool-item bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200/60">
                          <div class="nav-tool-icon bg-purple-600 text-white"><i class="fa-solid fa-eraser"></i></div>
                          <div>
                            <div class="nav-tool-title text-purple-950 flex items-center gap-1.5">
                              <span>Watermark Remover</span>
                              <span class="bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-purple-700">Erase logos from image & video</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}image-tools/background-remover.html" class="nav-tool-item bg-teal-50/70 hover:bg-teal-100/70 border border-teal-200/60">
                          <div class="nav-tool-icon bg-teal-600 text-white"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                          <div>
                            <div class="nav-tool-title text-teal-950 flex items-center gap-1.5">
                              <span>AI Background Remover</span>
                              <span class="bg-teal-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-teal-700">Client-side AI cutout & PNG</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}video-tools/video-frame-extractor.html" class="nav-tool-item bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/60">
                          <div class="nav-tool-icon bg-indigo-600 text-white"><i class="fa-solid fa-film"></i></div>
                          <div>
                            <div class="nav-tool-title text-indigo-950 flex items-center gap-1.5">
                              <span>Video Frame Extractor</span>
                              <span class="bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-indigo-700">Parse frames to ZIP & storyboard</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}video-tools/video-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-solid fa-video"></i></div>
                          <div>
                            <div class="nav-tool-title">Video Compressor</div>
                            <div class="nav-tool-desc">Reduce MP4 & WebM without watermarks</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}image-tools/image-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-image"></i></div>
                          <div>
                            <div class="nav-tool-title">Universal Image Compressor</div>
                            <div class="nav-tool-desc">JPG, PNG, WebP up to 90% savings</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}image-tools/bulk-image-compressor.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-layer-group"></i></div>
                          <div>
                            <div class="nav-tool-title">Bulk Image Compressor (ZIP)</div>
                            <div class="nav-tool-desc">Batch compress 50+ images at once</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}pdf-tools/compress-pdf/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-red-50 text-red-600"><i class="fa-solid fa-file-pdf"></i></div>
                          <div>
                            <div class="nav-tool-title">PDF Compressor</div>
                            <div class="nav-tool-desc">Multi-page DPI reduction for portals</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}image-tools/compress-image-to-100kb.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-indigo-50 text-indigo-600"><i class="fa-solid fa-bullseye"></i></div>
                          <div>
                            <div class="nav-tool-title">Target Size (100KB / 500KB)</div>
                            <div class="nav-tool-desc">Exact file size limits for job & passport forms</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}image-tools/webp-compressor.html" class="nav-tool-item">
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
                        <a href="${getSiteRoot()}developer-tools/" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All Dev Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="${getSiteRoot()}developer-tools/html-minifier.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-orange-50 text-orange-600"><i class="fa-brands fa-html5"></i></div>
                          <div>
                            <div class="nav-tool-title">HTML Minifier</div>
                            <div class="nav-tool-desc">Strip comments, collapse whitespace & check Gzip</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}developer-tools/css-minifier.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-brands fa-css3-alt"></i></div>
                          <div>
                            <div class="nav-tool-title">CSS Minifier</div>
                            <div class="nav-tool-desc">Compress stylesheets & eliminate dead rules</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}developer-tools/javascript-minifier.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-yellow-50 text-yellow-600"><i class="fa-brands fa-js"></i></div>
                          <div>
                            <div class="nav-tool-title">JavaScript Minifier</div>
                            <div class="nav-tool-desc">Minify JS scripts & strip console.logs</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}developer-tools/shopify-csv-validator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-brands fa-shopify"></i></div>
                          <div>
                            <div class="nav-tool-title">Shopify CSV Validator</div>
                            <div class="nav-tool-desc">Audit product CSVs for schema & handle errors</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}developer-tools/ats-resume-checker.html" class="nav-tool-item bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/60 col-span-2">
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
                        <a href="${getSiteRoot()}ecommerce-tools/" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All E-Commerce Tools</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="${getSiteRoot()}ecommerce-tools/invoice-generator.html" class="nav-tool-item bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/60 col-span-2">
                          <div class="nav-tool-icon bg-[#146ebe] text-white"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                          <div>
                            <div class="nav-tool-title text-blue-950 flex items-center gap-1.5">
                              <span>Free Online Invoice Generator</span>
                              <span class="bg-[#146ebe] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">NEW</span>
                            </div>
                            <div class="nav-tool-desc text-blue-700">Printable A4 PDF invoices with logo, tax & multi-currency</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}ecommerce-tools/etsy-fee-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-orange-50 text-orange-600"><i class="fa-brands fa-etsy"></i></div>
                          <div>
                            <div class="nav-tool-title">Etsy Fee Calculator</div>
                            <div class="nav-tool-desc">6.5% transaction, listing & net profit</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}ecommerce-tools/amazon-fba-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-brands fa-amazon"></i></div>
                          <div>
                            <div class="nav-tool-title">Amazon FBA Checker</div>
                            <div class="nav-tool-desc">Billable dim weight divisor 139 tiers</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}ecommerce-tools/tiktok-shop-payout-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-pink-50 text-pink-600"><i class="fa-brands fa-tiktok"></i></div>
                          <div>
                            <div class="nav-tool-title">TikTok Shop Payout</div>
                            <div class="nav-tool-desc">Creator affiliate commissions & payouts</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}ecommerce-tools/pod-profit-calculator.html" class="nav-tool-item">
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
                        <a href="${getSiteRoot()}#tools-catalog" class="text-xs font-bold text-[#146ebe] hover:underline flex items-center gap-1">
                          <span>View All in Catalog</span>
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <a href="${getSiteRoot()}calculators/section8-estimator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-[#146ebe]"><i class="fa-solid fa-house-user"></i></div>
                          <div>
                            <div class="nav-tool-title">Section 8 Max Rent Estimator</div>
                            <div class="nav-tool-desc">HUD FMR voucher limits & landlord caps</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}calculators/uk-stamp-duty-calculator.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-amber-50 text-amber-700"><i class="fa-solid fa-landmark"></i></div>
                          <div>
                            <div class="nav-tool-title">UK Stamp Duty Calculator</div>
                            <div class="nav-tool-desc">SDLT property tax tiers for England & NI</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}calculators/1031-exchange-tracker.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-clock-rotate-left"></i></div>
                          <div>
                            <div class="nav-tool-title">1031 Exchange Timeline Tracker</div>
                            <div class="nav-tool-desc">45-day identification & 180-day closing</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}calculators/str-cleaning-splitter.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-teal-50 text-teal-600"><i class="fa-solid fa-broom"></i></div>
                          <div>
                            <div class="nav-tool-title">STR Cleaning Fee Splitter</div>
                            <div class="nav-tool-desc">Airbnb & VRBO turnover co-host payouts</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}calculators/eu-vat-oss-calculator.html" class="nav-tool-item col-span-2">
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
                        <a href="${getSiteRoot()}games/2048/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-cubes"></i></div>
                          <div>
                            <div class="nav-tool-title">2048 Classic</div>
                            <div class="nav-tool-desc">Slide & join numbered tiles to reach 2048</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}games/snake/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-worm"></i></div>
                          <div>
                            <div class="nav-tool-title">Retro Snake Arcade</div>
                            <div class="nav-tool-desc">Classic 60fps movement & bonus apples</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}games/memory-game/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-brain"></i></div>
                          <div>
                            <div class="nav-tool-title">Memory Card Match</div>
                            <div class="nav-tool-desc">3D card flip brain trainer with timers</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}games/tic-tac-toe/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-solid fa-xmark"></i></div>
                          <div>
                            <div class="nav-tool-title">Tic Tac Toe (XO vs AI)</div>
                            <div class="nav-tool-desc">Play vs smart Minimax AI or 2-player</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}games/word-scramble/index.html" class="nav-tool-item">
                          <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-spell-check"></i></div>
                          <div>
                            <div class="nav-tool-title">Word Scramble Master</div>
                            <div class="nav-tool-desc">Unscramble mixed letters & combo streaks</div>
                          </div>
                        </a>

                        <a href="${getSiteRoot()}games/bhabhi-thulla/index.html" class="nav-tool-item">
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
                    <a href="${getSiteRoot()}#tools-catalog" class="text-[#146ebe] hover:underline flex items-center gap-1 font-black">
                      <span>Explore All 30+ Tools</span>
                      <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <!-- 2. PDF Tools Link (Direct Hub Link) -->
          <a href="${getSiteRoot()}pdf-tools/" class="nav-link-btn">
            <i class="fa-solid fa-file-pdf text-red-600 text-xs"></i>
            <span>PDF Tools</span>
            <span class="bg-red-100 text-red-700 text-[9px] px-1.5 py-0.2 rounded-md font-black">NEW</span>
          </a>

          <!-- 3. Free Games Dropdown -->
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
                <a href="${getSiteRoot()}games/2048/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-cubes"></i></div>
                  <div>
                    <div class="nav-tool-title">2048 Classic</div>
                    <div class="nav-tool-desc">Join tiles to reach 2048</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}games/snake/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-worm"></i></div>
                  <div>
                    <div class="nav-tool-title">Retro Snake Arcade</div>
                    <div class="nav-tool-desc">60 FPS canvas with bonus apples</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}games/memory-game/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-purple-50 text-purple-600"><i class="fa-solid fa-brain"></i></div>
                  <div>
                    <div class="nav-tool-title">Memory Card Match</div>
                    <div class="nav-tool-desc">3D card flip brain trainer</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}games/tic-tac-toe/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-solid fa-xmark"></i></div>
                  <div>
                    <div class="nav-tool-title">Tic Tac Toe (XO vs AI)</div>
                    <div class="nav-tool-desc">Unbeatable Minimax arena</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}games/word-scramble/index.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-spell-check"></i></div>
                  <div>
                    <div class="nav-tool-title">Word Scramble Master</div>
                    <div class="nav-tool-desc">100+ vocabulary anagrams</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}games/bhabhi-thulla/index.html" class="nav-tool-item">
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
          <a href="${getSiteRoot()}blog.html" class="nav-link-btn">
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
                <a href="${getSiteRoot()}about.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-circle-info"></i></div>
                  <div>
                    <div class="nav-tool-title">About 360Tools</div>
                    <div class="nav-tool-desc">Our mission & tools</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}contact.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-teal-50 text-teal-600"><i class="fa-solid fa-envelope"></i></div>
                  <div>
                    <div class="nav-tool-title">Contact & Support</div>
                    <div class="nav-tool-desc">Feedback & inquiries</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}privacy-policy.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-shield-halved"></i></div>
                  <div>
                    <div class="nav-tool-title">Privacy Policy</div>
                    <div class="nav-tool-desc">Data protection standards</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}terms.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-file-contract"></i></div>
                  <div>
                    <div class="nav-tool-title">Terms & Conditions</div>
                    <div class="nav-tool-desc">Usage rules & guidelines</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}disclaimer.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-rose-50 text-rose-600"><i class="fa-solid fa-triangle-exclamation"></i></div>
                  <div>
                    <div class="nav-tool-title">Disclaimer</div>
                    <div class="nav-tool-desc">Calculators & estimates</div>
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
          <span class="hidden xl:inline font-bold">Search 40+ tools...</span>
          <span class="hidden md:inline xl:hidden font-bold">Search...</span>
          <kbd class="hidden md:inline-block px-1.5 py-0.5 bg-white border border-slate-300 rounded-md text-[9px] text-slate-500 font-mono font-bold">Ctrl K</kbd>
        </button>

        <!-- Theme & Appearance Quick Customizer Trigger -->
        <a href="${getSiteRoot()}appearance.html" class="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-purple-600 bg-slate-100/90 hover:bg-purple-50 px-3 py-2 rounded-xl border border-slate-200/80 shadow-2xs transition-all cursor-pointer" title="Customize Fonts & Theme">
          <i class="fa-solid fa-palette text-purple-600 text-xs"></i>
          <span class="hidden md:inline">Theme</span>
        </a>

        <!-- All Tools Catalog Quick Link -->
        <a href="${getSiteRoot()}#tools-catalog" class="fa-btn-primary px-4 py-2 text-xs font-black shadow-xs hidden sm:inline-flex items-center gap-1.5 rounded-xl">
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
    <!-- Top Feature Highlight Strip -->
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

    <!-- Main Footer Links Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        
        <!-- Brand Info Column (Span 4) -->
        <div class="sm:col-span-2 lg:col-span-4 space-y-5">
          <a href="${getSiteRoot()}" class="inline-flex items-center gap-3 group">
            <img src="${getSiteRoot()}images/logo-icon.webp" alt="360Tools Logo" width="36" height="36" class="w-9 h-9 object-contain rounded-xl border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
            <span class="text-2xl font-black text-[#183153] tracking-tight">360Tools<span class="text-[#146ebe]">.me</span></span>
          </a>
          
          <p class="text-xs text-slate-600 font-medium leading-relaxed max-w-sm">
            Free online tools for everyday digital tasks. High-precision client-side audio voiceovers, media compressors, PDF workflows, code minifiers, and seller calculators.
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

        <!-- Column 2: PDF & Compression (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-file-pdf text-red-600 text-[11px]"></i>
            <span>PDF & Media</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="${getSiteRoot()}pdf-tools/" class="text-red-700 hover:text-red-900 transition-colors flex items-center gap-1.5 font-black"><i class="fa-solid fa-file-pdf text-[9px] text-red-600"></i> PDF Tools (19 Tools)</a></li>
            <li><a href="${getSiteRoot()}pdf-tools/merge-pdf/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Merge PDF</a></li>
            <li><a href="${getSiteRoot()}pdf-tools/split-pdf/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Split PDF</a></li>
            <li><a href="${getSiteRoot()}pdf-tools/compress-pdf/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Compress PDF</a></li>
            <li><a href="${getSiteRoot()}image-tools/image-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Image Compressor</a></li>
            <li><a href="${getSiteRoot()}image-tools/background-remover.html" class="text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1.5 font-bold"><i class="fa-solid fa-wand-magic-sparkles text-[9px] text-teal-600"></i> AI BG Remover</a></li>
            <li><a href="${getSiteRoot()}image-tools/watermark-remover.html" class="text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1.5 font-bold"><i class="fa-solid fa-eraser text-[9px] text-purple-600"></i> Watermark Remover</a></li>
          </ul>
        </div>

        <!-- Column 3: Audio & Developer (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-volume-high text-purple-600 text-[11px]"></i>
            <span>Audio & Dev</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="${getSiteRoot()}audio-tools/text-to-speech.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Text to Speech</a></li>
            <li><a href="${getSiteRoot()}audio-tools/text-to-mp3.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Text to MP3</a></li>
            <li><a href="${getSiteRoot()}audio-tools/ai-voice-generator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> AI Voice Studio</a></li>
            <li><a href="${getSiteRoot()}video-tools/video-compressor.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Video Compressor</a></li>
            <li><a href="${getSiteRoot()}developer-tools/html-minifier.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> HTML Minifier</a></li>
            <li><a href="${getSiteRoot()}developer-tools/javascript-minifier.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> JS Minifier</a></li>
            <li><a href="${getSiteRoot()}developer-tools/ats-resume-checker.html" class="text-indigo-700 hover:text-indigo-900 transition-colors flex items-center gap-1.5 font-black"><i class="fa-solid fa-file-circle-check text-[9px] text-indigo-600"></i> ATS Resume Checker</a></li>
          </ul>
        </div>

        <!-- Column 4: Calculators & E-Commerce (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-calculator text-amber-600 text-[11px]"></i>
            <span>Calculators</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="${getSiteRoot()}calculators/" class="text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1.5 font-black"><i class="fa-solid fa-calculator text-[9px] text-amber-600"></i> All Calculators</a></li>
            <li><a href="${getSiteRoot()}ecommerce-tools/invoice-generator.html" class="text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1.5 font-bold"><i class="fa-solid fa-file-invoice-dollar text-[9px] text-blue-600"></i> Invoice Maker</a></li>
            <li><a href="${getSiteRoot()}ecommerce-tools/etsy-fee-calculator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Etsy Calculator</a></li>
            <li><a href="${getSiteRoot()}ecommerce-tools/amazon-fba-calculator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Amazon FBA</a></li>
            <li><a href="${getSiteRoot()}calculators/section8-estimator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> Section 8 Rent</a></li>
            <li><a href="${getSiteRoot()}calculators/uk-stamp-duty-calculator.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-chevron-right text-[8px] text-slate-300"></i> UK Stamp Duty</a></li>
            <li><a href="${getSiteRoot()}games/2048/index.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-cubes text-amber-500 text-[9px]"></i> 2048 Game</a></li>
          </ul>
        </div>

        <!-- Column 5: Company & Legal (Span 2) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-black text-[#183153] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-scale-balanced text-teal-600 text-[11px]"></i>
            <span>Company & Legal</span>
          </h4>
          <ul class="text-xs font-bold text-slate-600 space-y-2">
            <li><a href="${getSiteRoot()}about.html" class="text-blue-600 font-bold hover:underline flex items-center gap-1.5"><i class="fa-solid fa-circle-info text-[9px]"></i> About 360Tools</a></li>
            <li><a href="${getSiteRoot()}contact.html" class="text-teal-700 font-bold hover:underline flex items-center gap-1.5"><i class="fa-solid fa-envelope text-[9px]"></i> Contact Support</a></li>
            <li><a href="${getSiteRoot()}blog.html" class="text-indigo-600 font-bold hover:underline flex items-center gap-1.5"><i class="fa-solid fa-newspaper text-[9px]"></i> Editorial Blog</a></li>
            <li class="pt-2 border-t border-slate-100"><a href="${getSiteRoot()}privacy-policy.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-shield-halved text-[9px] text-emerald-600"></i> Privacy Policy</a></li>
            <li><a href="${getSiteRoot()}terms.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-file-contract text-[9px] text-amber-600"></i> Terms of Use</a></li>
            <li><a href="${getSiteRoot()}disclaimer.html" class="hover:text-[#146ebe] transition-colors flex items-center gap-1.5"><i class="fa-solid fa-triangle-exclamation text-[9px] text-rose-500"></i> Disclaimer</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
        <div class="flex items-center gap-2 text-center md:text-left">
          <span>© 2026 <a href="${getSiteRoot()}" class="font-bold text-[#183153] hover:text-[#146ebe] transition-colors">360Tools (360tools.me)</a>. All rights reserved.</span>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-600 text-[11px] font-bold">
          <a href="${getSiteRoot()}pdf-tools/" class="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"><i class="fa-solid fa-file-pdf text-[10px]"></i> PDF Suite</a>
          <span>•</span>
          <a href="${getSiteRoot()}appearance.html" class="text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"><i class="fa-solid fa-palette text-[10px]"></i> Theme Customizer</a>
          <span>•</span>
          <a href="${getSiteRoot()}about.html" class="hover:text-[#146ebe] transition-colors">About</a>
          <span>•</span>
          <a href="${getSiteRoot()}contact.html" class="hover:text-[#146ebe] transition-colors">Contact</a>
          <span>•</span>
          <a href="${getSiteRoot()}privacy-policy.html" class="hover:text-[#146ebe] transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="${getSiteRoot()}terms.html" class="hover:text-[#146ebe] transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="${getSiteRoot()}disclaimer.html" class="hover:text-[#146ebe] transition-colors">Disclaimer</a>
          <span>•</span>
          <a href="${getSiteRoot()}sitemap.xml" class="hover:text-[#146ebe] transition-colors">Sitemap</a>
        </div>

        <div class="text-[10px] text-slate-400 text-center md:text-right">
          Zero Cloud Logging • 100% Client-Side Private
        </div>
      </div>
    </div>
  `;
}

// Cookie & Privacy Consent (Auto-Accepted by Default for seamless 0-click UX)
function initCookieConsent() {
  try {
    if (!localStorage.getItem('360tools_cookie_consent')) {
      localStorage.setItem('360tools_cookie_consent', 'true');
    }
  } catch (e) {
    // Local storage fallback
  }
}

function acceptCookieConsent() {
  try {
    localStorage.setItem('360tools_cookie_consent', 'true');
  } catch (e) {}
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


