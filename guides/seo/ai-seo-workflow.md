# 360tools.me — AI-Assisted SEO Content Workflow

## Overview
This guide provides tested, high-precision prompt templates for **ChatGPT** and **Google Gemini** to produce original, human-quality SEO content, FAQs, and schema blueprints for 360tools.me without generating thin or low-quality content.

---

## 1. Master Content Generation Prompt Template

```markdown
SYSTEM INSTRUCTION:
You are a senior technical SEO copywriter and product UX writer for 360tools.me, a suite of free, private, 100% client-side online tools.

TASK:
Generate comprehensive, human-centric on-page content for a new browser-based utility:
[INSERT TOOL NAME, e.g., "PDF to WebP Converter"]

SPECIFIC RULES:
1. PRIVACY FOCUS: Emphasize that files are processed 100% locally in the user's browser memory (WebAssembly / Canvas / JavaScript) with zero cloud server uploads.
2. NO GENERIC AI FLUFF: Do not use clichés like "In today's digital fast-paced world...". Start directly with the user's problem and practical solution.
3. OUTPUT FORMAT:
   - Primary Search Intent & Keyword Cluster (Primary + 5 Secondary keywords)
   - SEO Title (50-60 characters, brand suffix "| 360Tools")
   - Meta Description (150-160 characters with CTA)
   - H1 Heading
   - Short Intro Paragraph (2-3 sentences max)
   - 4-Step "How to Use" Guide (concise, actionable)
   - 3 Key Technical Features / Benefits
   - Technical & Privacy Deep Dive (How in-browser processing works, supported formats, limitations)
   - 4 Practical FAQs with exact Schema JSON-LD representation
   - 4 Related Tools Recommendations with internal linking suggestions
```

---

## 2. Content Gap & Competitor Audit Prompt

```markdown
PROMPT:
Analyze the search engine results page (SERP) intent for the query: "[INSERT QUERY, e.g., 'merge PDF online free']".

Identify:
1. What specific user pain points do competitors fail to address? (e.g. file size limits, login gates, privacy concerns with tax/financial records).
2. What unique angles can 360Tools highlight? (e.g., instant local RAM processing, no queue delays, unlimited re-ordering, zero watermarks).
3. Suggest 3 high-intent FAQ questions that actual users ask on forums and Reddit regarding this tool.
```

---

## 3. Human Review & Quality Assurance Checklist

Before deploying any AI-assisted content:
- [ ] **Technical Accuracy**: Does the explanation reflect actual browser capabilities (e.g., PDF.js / PDF-Lib limitations)?
- [ ] **Privacy Integrity**: Is the "100% in-browser" statement verified for this specific tool?
- [ ] **No Keyword Stuffing**: Is keyword density natural (< 2%) and intent-driven?
- [ ] **JSON-LD Schema Verification**: Validate that all FAQs in JSON-LD match visible on-page text verbatim.
