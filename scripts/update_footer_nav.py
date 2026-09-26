import re

with open('js/main.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update Mobile Drawer Company Links
old_mobile_company = '''          <div class="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-circle-info"></i> Company & Help</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <a href="${getSiteRoot()}appearance.html" onclick="toggleMobileAppDrawer(false)" class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-palette text-purple-600 text-sm"></i> Theme & Font Customizer
            </a>
            <a href="${getSiteRoot()}about.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-circle-info text-blue-600 text-sm"></i> About Us
            </a>
            <a href="${getSiteRoot()}contact.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-envelope text-teal-600 text-sm"></i> Contact Us
            </a>
            <a href="${getSiteRoot()}privacy-policy.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-shield-halved text-emerald-600 text-sm"></i> Privacy Policy
            </a>
            <a href="${getSiteRoot()}terms-and-conditions.html" onclick="toggleMobileAppDrawer(false)" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#183153]">
              <i class="fa-solid fa-file-contract text-amber-600 text-sm"></i> Terms of Use
            </a>
          </div>'''

new_mobile_company = '''          <div class="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
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
          </div>'''

# Normalize newlines
code = code.replace('\r\n', '\n')
old_mobile_company = old_mobile_company.replace('\r\n', '\n')
new_mobile_company = new_mobile_company.replace('\r\n', '\n')

if old_mobile_company in code:
    code = code.replace(old_mobile_company, new_mobile_company)
    print("Mobile company menu updated successfully.")
else:
    print("Warning: old_mobile_company not found directly.")

# 2. Update Header Company Dropdown
old_header_company = '''                <a href="${getSiteRoot()}about.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-blue-50 text-blue-600"><i class="fa-solid fa-circle-info"></i></div>
                  <div>
                    <div class="nav-tool-title">About 360Tools</div>
                    <div class="nav-tool-desc">Our mission & story</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}contact.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-teal-50 text-teal-600"><i class="fa-solid fa-envelope"></i></div>
                  <div>
                    <div class="nav-tool-title">Contact & Support</div>
                    <div class="nav-tool-desc">24/7 help desk</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}privacy-policy.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-emerald-50 text-emerald-600"><i class="fa-solid fa-shield-halved"></i></div>
                  <div>
                    <div class="nav-tool-title">Privacy Policy</div>
                    <div class="nav-tool-desc">Zero data collection</div>
                  </div>
                </a>
                <a href="${getSiteRoot()}terms-and-conditions.html" class="nav-tool-item">
                  <div class="nav-tool-icon bg-amber-50 text-amber-600"><i class="fa-solid fa-file-contract"></i></div>
                  <div>
                    <div class="nav-tool-title">Terms of Service</div>
                    <div class="nav-tool-desc">Usage & disclaimers</div>
                  </div>
                </a>'''

new_header_company = '''                <a href="${getSiteRoot()}about.html" class="nav-tool-item">
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
                </a>'''

old_header_company = old_header_company.replace('\r\n', '\n')
new_header_company = new_header_company.replace('\r\n', '\n')

if old_header_company in code:
    code = code.replace(old_header_company, new_header_company)
    print("Header company dropdown updated successfully.")
else:
    print("Warning: old_header_company not found directly.")

# 3. Update Global Footer
new_footer_func = '''function renderGlobalFooter() {
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
}'''

# Replace renderGlobalFooter definition
footer_pattern = re.compile(r'function renderGlobalFooter\(\)\s*\{[\s\S]*?\n\}', re.MULTILINE)
if footer_pattern.search(code):
    code = footer_pattern.sub(new_footer_func, code, count=1)
    print("renderGlobalFooter replaced successfully.")
else:
    print("Warning: renderGlobalFooter regex did not match.")

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(code)

with open('js/main.min.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Both js/main.js and js/main.min.js updated.")
