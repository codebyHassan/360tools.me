# 360tools.me — PDF Tools Architecture & Engineering Guide

## 1. Executive Summary & Philosophy
The **360tools.me PDF Tools Ecosystem** is built on the core principle of **100% In-Browser Client-Side Processing**. User files, sensitive business contracts, invoices, and private photos are processed exclusively inside the local browser memory using WebAssembly, HTML5 Canvas, and modern JavaScript runtimes (`PDF-Lib`, `PDF.js`, `JSZip`, `html2pdf.js`). Files never touch external cloud servers.

---

## 2. Directory & Component Architecture
```
360tools.me/
├── assets/
│   ├── css/
│   │   ├── global.css        # Base design tokens, typography, dark mode
│   │   ├── components.css    # Badges, buttons, breadcrumbs, ad slots, FAQ
│   │   ├── tools.css         # Dropzones, thumbnail grids, file items, options panels
│   │   └── responsive.css    # Mobile-first breakpoints (<768px, <640px)
│   ├── js/
│   │   ├── main.js           # Header, footer, quick search, mobile drawer
│   │   └── pdf/
│   │       ├── pdf-common.js   # Dynamic CDN lazy-loader, dropzone, validation
│   │       ├── pdf-utils.js    # Canvas rendering, DPI downsampling, byte formatting
│   │       ├── pdf-ui.js       # File lists, reorderable items, thumbnail grids, progress
│   │       ├── pdf-security.js # Metadata sanitizer, encryption inspection
│   │       └── pdf-worker.js   # Background web worker for heavy quantization
│   └── data/
│       └── pdf-tools-seo.json  # Search intent metadata & cross-linking index
├── pdf-tools/
│   ├── index.html            # Category Hub Landing Page
│   ├── merge-pdf/index.html
│   ├── split-pdf/index.html
│   ├── compress-pdf/index.html
│   ├── jpg-to-pdf/index.html
│   ├── png-to-pdf/index.html
│   ├── webp-to-pdf/index.html
│   ├── pdf-to-jpg/index.html
│   ├── pdf-to-png/index.html
│   ├── pdf-to-webp/index.html
│   ├── rotate-pdf/index.html
│   ├── delete-pdf-pages/index.html
│   ├── extract-pdf-pages/index.html
│   ├── pdf-to-text/index.html
│   ├── add-page-numbers-to-pdf/index.html
│   ├── watermark-pdf/index.html
│   ├── password-protect-pdf/index.html
│   ├── unlock-pdf/index.html
│   ├── pdf-metadata-remover/index.html
│   └── html-to-pdf/index.html
└── guides/
    ├── development/pdf-tools-architecture.md
    ├── seo/ai-seo-workflow.md
    └── seo/pdf-seo-strategy.md
```

---

## 3. Core Libraries & Lazy-Loading Strategy
To maintain **90+ Lighthouse Performance Scores**, heavy third-party PDF processing bundles are **never loaded synchronously** on unrelated website pages. They are requested on-demand only when a user interacts with a tool via `PDFCommon.loadScript()`:

| Library | Primary Responsibility | Size | Loaded On Demand |
| :--- | :--- | :--- | :--- |
| **PDF-Lib** (1.17.1) | PDF creation, merging, splitting, page rotation, text watermarking, pagination stamping, metadata stripping | ~280 KB | Only on manipulation tools |
| **PDF.js** (3.11.174) | PDF rasterization to canvas, thumbnail generation, text stream extraction, compression downsampling | ~340 KB | Only on conversion & viewer tools |
| **JSZip** (3.10.1) | Client-side ZIP archiving for batch page and image downloads | ~95 KB | Only on batch export tools |
| **html2pdf.js** (0.10.1) | DOM and CSS vector rendering into PDF documents | ~310 KB | Only on `html-to-pdf` |

---

## 4. How to Add a New PDF Tool in 5 Steps

Adding future tools (e.g. `pdf-ocr`, `pdf-form-filler`, `pdf-signature`, `pdf-compare`, `pdf-grayscale`):

1. **Create the Folder & SEO Page**:
   Create `/pdf-tools/<new-tool-slug>/index.html` referencing `<base href="../../">`.
2. **Add Metadata Entry to SEO Dataset**:
   Add the tool's keyword cluster, primary intent, title, description, and related tools into `/assets/data/pdf-tools-seo.json`.
3. **Connect Tool UI**:
   Use `PDFCommon.setupDropzone()`, `PDFUI.showProgress()`, and `PDFUI.renderResult()`.
4. **Implement Engine Logic**:
   Call `PDFCommon.requirePdfLib()` or `PDFCommon.requirePdfJs()` to execute the in-memory operation.
5. **Update Sitemap**:
   Add `<loc>https://360tools.me/pdf-tools/<new-tool-slug>/</loc>` to `sitemap.xml`.

---

## 5. Performance & Core Web Vitals Best Practices
- **Zero Cumulative Layout Shift (CLS)**: All ad units use reserved container classes (`.ad-slot-leaderboard`, `.ad-slot-rectangle`) with fixed minimum heights.
- **Font Display**: Google Fonts (`Outfit` & `Plus Jakarta Sans`) load with `font-display: swap` and preconnected DNS endpoints.
- **FontAwesome Asynchronous Loading**: FontAwesome loads with `media="print" onload="this.media='all'"` to avoid blocking initial render.
