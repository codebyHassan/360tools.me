import re

# Template builder helper
def build_editorial_section(h2_title, intro_p, cards, faqs):
    cards_html = ""
    for icon_class, card_title, card_desc in cards:
        cards_html += f'''
          <div class="fa-card p-6 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#146ebe] flex items-center justify-center text-lg">
              <i class="{icon_class}"></i>
            </div>
            <h3 class="font-bold text-[#3e2723] text-sm">{card_title}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              {card_desc}
            </p>
          </div>'''

    faqs_html = ""
    for q, a in faqs:
        faqs_html += f'''
          <details class="group fa-card p-5 bg-white border border-slate-200 rounded-xl transition-all cursor-pointer">
            <summary class="flex justify-between items-center font-bold text-sm text-[#3e2723] list-none">
              <span>{q}</span>
              <i class="fa-solid fa-chevron-down text-xs text-slate-400 group-open:rotate-180 transition-transform"></i>
            </summary>
            <p class="text-xs text-slate-600 mt-3 leading-relaxed">
              {a}
            </p>
          </details>'''

    return f'''
    <!-- Comprehensive Editorial Guide & FAQ Section (High Value Content for Users & AdSense) -->
    <section class="my-16 pt-12 border-t border-slate-200">
      <div class="max-w-4xl mx-auto space-y-12">
        <div class="space-y-4">
          <h2 class="text-2xl sm:text-3xl font-black text-[#3e2723] tracking-tight">
            {h2_title}
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            {intro_p}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards_html}
        </div>

        <div class="space-y-4">
          <h3 class="text-2xl font-black text-[#3e2723] mb-4">Frequently Asked Questions</h3>
          <div class="space-y-3">
            {faqs_html}
          </div>
        </div>
      </div>
    </section>
'''

# 1. developer-tools/html-minifier.html
html_minifier_section = build_editorial_section(
    "Free Online HTML Minifier & DOM Code Compressor",
    "HyperText Markup Language (HTML) forms the backbone of every website and web app. In development environments, HTML documents contain extensive indentation, redundant blank lines, developer annotations, and commented-out code blocks. While these elements aid readability during coding, they unnecessarily inflate bandwidth usage when served over the web. The 360Tools HTML Minifier parses your document's Abstract Syntax Tree, stripping bloat while preserving valid semantic tags, preformatted code blocks, and inline assets.",
    [
        ("fa-solid fa-compress", "Safe Whitespace Collapsing", "Intelligently collapses consecutive spaces, tabs, and newlines into single spaces without breaking inline text or typography flows."),
        ("fa-solid fa-shield-halved", "100% In-Browser Execution", "Your code never leaves your computer. Minification executes completely inside client-side JavaScript memory."),
        ("fa-solid fa-bolt", "Core Web Vitals Booster", "Lowering HTML document payload accelerates Time to First Byte (TTFB), DOM Interactive, and First Contentful Paint (FCP).")
    ],
    [
        ("Does HTML minification break <pre> or <code> blocks?", "No. The parser recognizes preformatted containers (<pre>, <code>, <textarea>) and preserves all internal spaces and line breaks exactly as intended."),
        ("How does HTML minification improve Google PageSpeed scores?", "Smaller HTML payloads download faster on mobile connections, reducing First Contentful Paint (FCP) and Largest Contentful Paint (LCP) times."),
        ("Can I restore or un-minify code if I need to edit it later?", "Yes, you can paste minified HTML into modern IDEs (such as VS Code or Sublime) or an online code beautifier to automatically format indentation."),
        ("Is it safe to minify private business HTML templates?", "Yes, 100%. Because computation occurs locally on your device without server communication, your private HTML templates, tokens, and data remain strictly confidential.")
    ]
)

# 2. developer-tools/code-minifier.html
code_minifier_section = build_editorial_section(
    "All-In-One Code Minifier for HTML, CSS & JavaScript",
    "Streamline your web development workflow with a universal browser-based code compressor. Whether you are packaging custom JavaScript functions, production stylesheets, or landing page HTML markup, this utility eliminates comments, collapses superfluous spacing, and calculates estimated Gzip bandwidth savings in real time.",
    [
        ("fa-solid fa-code", "Multi-Language Compatibility", "Seamlessly compress HTML markup, CSS style rules, and JavaScript functions in one streamlined interface."),
        ("fa-solid fa-chart-line", "Real-Time Byte Metrics", "Instant comparison showing original bytes, minified output, reduction percentage, and predicted Gzip payload sizes."),
        ("fa-solid fa-lock", "Zero Cloud Exposure", "Engineered with client-side privacy. Safe for proprietary business logic, internal scripts, and confidential applications.")
    ],
    [
        ("Why should I minify code if my web server uses Gzip compression?", "Minification and Gzip compression complement each other. Minification strips redundant syntax tokens before Gzip runs its LZ77 algorithm, resulting in even smaller network payloads."),
        ("Will minification rename my JavaScript functions or variables?", "This lightweight minifier removes whitespace and comments without mangling or obfuscating variable names, making it safe for production deployments without source maps."),
        ("Can I use this tool offline?", "Yes. Once the web application is loaded in your browser, the minification engine runs locally even without an active internet connection.")
    ]
)

# 3. image-tools/image-converter-compressor.html
image_converter_section = build_editorial_section(
    "In-Browser Image Converter & WebP Compression Suite",
    "Converting legacy raster formats (such as JPEG and PNG) into modern, next-generation containers like WebP is one of the most impactful optimizations recommended by Google Lighthouse. The 360Tools Image Converter allows you to convert, resize, and compress image files client-side with complete visual quality control and zero cloud data leaks.",
    [
        ("fa-solid fa-file-image", "Next-Gen WebP Conversion", "Convert standard JPG and PNG files into high-efficiency WebP format, reducing file sizes by 30% to 70% with identical visual clarity."),
        ("fa-solid fa-layer-group", "Alpha Transparency Preserved", "Preserve transparent PNG cutouts and background layers seamlessly when converting to WebP containers."),
        ("fa-solid fa-sliders", "Custom Quality Sliders", "Fine-tune compression levels to balance image sharpness against file size for fast e-commerce and blog loading.")
    ],
    [
        ("Why is WebP format recommended by Google PageSpeed Insights?", "WebP provides superior lossy and lossless compression compared to traditional JPEG and PNG, dramatically speeding up mobile page load times and reducing server bandwidth costs."),
        ("Does converting images here resize my pixel dimensions?", "By default, your original pixel dimensions are preserved intact. You can also adjust quality quantization sliders to reduce file weight without changing dimensions."),
        ("Are my private images uploaded to any remote server?", "Never. All compression and format conversion occurs inside your device's HTML5 Canvas memory buffer. No photos are ever uploaded or stored.")
    ]
)

# 4. pdf-tools/pdf-metadata-remover/index.html
pdf_metadata_section = build_editorial_section(
    "Protect Document Privacy by Stripping Hidden PDF Metadata",
    "Portable Document Format (PDF) files automatically embed extensive metadata dictionaries every time they are exported or edited. These hidden tags often contain sensitive corporate information, including author names, company names, creation timestamps, operating system versions, printer details, and full file system paths. The 360Tools PDF Metadata Remover scrubs this metadata locally before you share documents with clients, regulators, or the public.",
    [
        ("fa-solid fa-user-secret", "Complete Metadata Sanitization", "Strips document author, creator, producer, title, subject, keywords, and modifying software signatures."),
        ("fa-solid fa-eye-slash", "Zero Visual Layout Alteration", "Safely purges internal metadata streams without altering embedded fonts, vector illustrations, signatures, or page formatting."),
        ("fa-solid fa-shield-halved", "Confidential In-Browser Security", "Built on WebAssembly PDF-Lib technology. Your sensitive legal briefs, contracts, and medical records never leave your machine.")
    ],
    [
        ("What kind of hidden metadata does a PDF file contain?", "PDFs often store the author's real name, operating system version, software used (e.g. Adobe Acrobat, Microsoft Word), creation date, modification history, and printer settings."),
        ("Does removing metadata break digital signatures or form fields?", "Removing metadata cleans the document properties dictionary. Form fields and visual text remain completely intact, though cryptographically signed PDFs will indicate the file structure was sanitized."),
        ("Is there a limit on how large a PDF I can clean?", "Because processing utilizes your computer's local memory, you can clean documents of 50MB, 100MB, or more without daily upload quotas.")
    ]
)

# 5. pdf-tools/unlock-pdf/index.html
pdf_unlock_section = build_editorial_section(
    "Free In-Browser PDF Permissions Decryptor & Password Remover",
    "PDF files can be protected by two levels of security: user passwords (which require authorization to open) and owner permissions passwords (which prevent printing, copying text, or inserting annotations). When you have legitimate access to a document, the 360Tools Unlock PDF tool removes owner restrictions permanently so you can freely print, annotate, and share your PDF across all devices.",
    [
        ("fa-solid fa-unlock-keyhole", "Remove Print & Copy Locks", "Eliminate restrictions preventing you from highlighting text, copying snippets, or printing on office hardware."),
        ("fa-solid fa-laptop-code", "Client-Side Cryptography", "Decryption and re-encryption routines execute on your device CPU. No unencrypted files are ever transmitted across the internet."),
        ("fa-solid fa-universal-access", "Universal PDF Compatibility", "Produces standard, unlocked PDF documents that open smoothly in Adobe Acrobat, Google Chrome, macOS Preview, and mobile readers.")
    ],
    [
        ("Can this tool crack or recover an unknown master password?", "No. This tool is designed to decrypt and strip restriction locks when you know the password or when owner restrictions prevent standard printing and text copying."),
        ("Is it safe to unlock financial statements or legal contracts here?", "Yes, 100%. Everything runs locally inside your browser via WebAssembly. Zero document bytes or passwords are ever sent to external cloud servers."),
        ("Will unlocking a PDF degrade its resolution or quality?", "No. The unlocking process simply rewrites the encryption dictionary header. Vector text, images, embedded fonts, and page layouts are preserved at 100% original fidelity.")
    ]
)

# 6. image-tools/bulk-image-compressor.html
bulk_compress_section = build_editorial_section(
    "Batch Image Compression: Optimize Multiple Photos Concurrently",
    "Optimizing dozens or hundreds of product photos, blog images, or presentation slides individually is tedious and time-consuming. The 360Tools Bulk Image Compressor allows you to drop multiple JPG, PNG, and WebP files at once, compressing them in parallel using multi-threaded browser Web Workers with unified quality control and one-click ZIP download.",
    [
        ("fa-solid fa-bolt-lightning", "Multi-Threaded Batch Engine", "Processes multiple files simultaneously using your device's multi-core CPU and Web Workers for rapid turnaround."),
        ("fa-solid fa-sliders", "Custom Quality & Size Targets", "Apply consistent compression ratios across all images or target specific file sizes suitable for email attachments and web publishing."),
        ("fa-solid fa-file-zipper", "Instant ZIP Archive Download", "Automatically packages all compressed images into a single, clean ZIP folder with original filenames preserved.")
    ],
    [
        ("How many images can I compress in a single batch?", "You can comfortably compress 20, 50, or 100+ images in a single session depending on your device's available memory."),
        ("What is the difference between lossy and lossless compression?", "Lossy compression slightly adjusts invisible pixel data to achieve 50-80% file size cuts. Lossless compression rearranges data without altering a single pixel, yielding 10-30% reductions."),
        ("Does bulk compression consume my internet bandwidth?", "No! All image compression algorithms run directly on your computer hardware. Your bandwidth is not consumed by uploading and downloading large image files.")
    ]
)

# 7. video-tools/video-compressor.html
video_compress_section = build_editorial_section(
    "In-Browser Video Compressor: Reduce MP4 & WebM File Sizes",
    "High-resolution 4K and 1080p video files quickly overwhelm email attachment quotas and chat upload caps on platforms like Discord, Slack, and WhatsApp. The 360Tools Video Compressor adjusts video bitrates, audio frequency, and resolution containers client-side, reducing video file sizes by up to 60-80% while retaining clear audio and smooth frame rates.",
    [
        ("fa-solid fa-video", "H.264 & WebM Bitrate Optimization", "Dynamically adjusts variable bitrate (VBR) curves to compress video frames without introducing pixelation or audio sync lag."),
        ("fa-solid fa-compress", "Resolution Downscaling Presets", "Downscale oversized 4K or 1080p clips to compact 720p or 480p dimensions to guarantee files fit under 25MB attachment limits."),
        ("fa-solid fa-shield-halved", "Private Client-Side Encoding", "Video clips never upload to remote rendering farms. Processing happens securely in your browser using modern WebAssembly codecs.")
    ],
    [
        ("How much can video file size be reduced without noticeable quality loss?", "Most smartphone and screen-recorded videos can be compressed by 40% to 70% while maintaining crisp 1080p or 720p playback for web and mobile sharing."),
        ("Why is client-side video compression safer than cloud converters?", "Cloud converters upload your private camera roll, screen captures, or business recordings to third-party servers. 360Tools processes everything on your local device, guaranteeing 100% privacy."),
        ("What video container formats can I compress?", "The compressor supports popular web video formats including MP4, WebM, and MOV containers encoded with standard H.264 and VP8/VP9 codecs.")
    ]
)

# 8. pdf-tools/pdf-to-png/index.html
pdf_to_png_section = build_editorial_section(
    "Convert PDF Pages to High-Resolution Lossless PNG Images",
    "Need to extract diagrams, digital invoices, charts, or slides from a PDF document into editable image files? The 360Tools PDF to PNG Converter renders each PDF page into a crisp, high-DPI PNG image with preserved vector sharpness, transparent background support, and instant ZIP downloading.",
    [
        ("fa-solid fa-file-image", "Ultra-Sharp 150 & 300 DPI Rendering", "Render pages with crystal-clear typography and line art suitable for presentations, academic papers, and digital publishing."),
        ("fa-solid fa-layer-group", "Page-by-Page Selective Extraction", "Download specific key pages as standalone PNGs or export all pages simultaneously in an organized archive."),
        ("fa-solid fa-lock", "Zero Server Storage", "Powered by client-side PDF.js rendering technology. Your financial reports, tax filings, and legal agreements remain strictly on your device.")
    ],
    [
        ("What resolution should I select for PDF to PNG conversion?", "150 DPI is ideal for web viewing, email sharing, and social media. 300 DPI is recommended for printing, graphic design, and high-resolution displays."),
        ("Can I convert multi-page PDF documents into PNG images?", "Yes. The converter parses every page in sequence and gives you the option to download individual PNGs or a single ZIP file containing every page."),
        ("Are vector illustrations and text preserved clearly?", "Yes. PNG is a lossless format, so text characters, borders, icons, and diagrams are rendered with zero JPEG blur or compression artifacts.")
    ]
)

updates = [
    ('developer-tools/html-minifier.html', html_minifier_section),
    ('developer-tools/code-minifier.html', code_minifier_section),
    ('image-tools/image-converter-compressor.html', image_converter_section),
    ('pdf-tools/pdf-metadata-remover/index.html', pdf_metadata_section),
    ('pdf-tools/unlock-pdf/index.html', pdf_unlock_section),
    ('image-tools/bulk-image-compressor.html', bulk_compress_section),
    ('video-tools/video-compressor.html', video_compress_section),
    ('pdf-tools/pdf-to-png/index.html', pdf_to_png_section),
]

for fpath, section_html in updates:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Avoid duplicate injection
    if 'Comprehensive Editorial Guide & FAQ Section' in content:
        print(f"Skipping {fpath} (already has section)")
        continue

    # Look for insert point before Related Tools or before </main>
    if '<!-- Related' in content:
        new_content = content.replace('<!-- Related', f'{section_html}\n    <!-- Related')
    elif '</main>' in content:
        new_content = content.replace('</main>', f'{section_html}\n  </main>')
    else:
        new_content = content.replace('<footer', f'{section_html}\n<footer')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully added editorial guide & FAQs to: {fpath}")
