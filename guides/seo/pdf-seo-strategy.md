# 360tools.me — PDF Tools Search Engine Optimization (SEO) Strategy

## 1. Global SEO Architecture & Search Intent
The 360tools.me PDF suite is architected around **High-Intent Transactional Search Queries**. Users searching for terms like *"compress PDF to 1MB"*, *"merge multiple PDF files"*, or *"convert JPG to PDF online"* seek immediate, frictionless execution without login paywalls or software installation.

### Primary Global Target Markets
- United States (US)
- United Kingdom (UK)
- Canada (CA)
- Australia (AU)
- European Union (EU)

All copy is drafted in standard International English with clean typography and universally understandable metrics (MB, KB, DPI, A4, US Letter).

---

## 2. Topic Clusters & Internal Linking Network

The PDF ecosystem forms a topic cluster with bidirectional cross-linking:

```
                  /pdf-tools/ (Hub Landing Page)
                   /        |        \
       Organize Tools   Convert Tools   Security Tools
       - Merge PDF      - JPG to PDF    - Password Protect
       - Split PDF      - PDF to JPG    - Unlock PDF
       - Rotate PDF     - PNG to PDF    - Remove Metadata
       - Delete Pages   - PDF to PNG    - Watermark PDF
       - Extract Pages  - WebP to PDF
```

Every tool page contains:
1. **Breadcrumb Links**: Home → PDF Tools → Current Tool.
2. **Contextual In-Content Links**: Deep links within the feature and technical breakdown sections.
3. **Curated "Related Tools" Grid**: 4 related tools linking directly to neighboring tools in the same cluster.

---

## 3. Structured Data (JSON-LD) Specification

Each PDF tool implements 3 core JSON-LD schemas:

1. **`WebApplication`**:
   - `applicationCategory`: `UtilitiesApplication`
   - `operatingSystem`: `All`
   - `offers.price`: `0`
   - `offers.priceCurrency`: `USD`
2. **`BreadcrumbList`**:
   - Sequential 3-step hierarchy for rich snippets in Google Search results.
3. **`FAQPage`**:
   - Exact mirror of visible FAQs on the page to qualify for Google FAQ rich snippet enhancements.

---

## 4. Monetization & AdSense Layout Principles
1. **Zero CLS (Cumulative Layout Shift)**: Ad slots have pre-reserved container heights (`min-height: 90px`, `min-height: 250px`).
2. **Never Obstruct Tool Controls**: Ad units are strictly placed above the hero and below the tool wrapper, never directly adjacent to or covering file upload or download buttons.
3. **Clear Labelling**: All ad slots feature a discrete `"Advertisement"` label.
