/**
 * 360tools.me — PDF Utility Helpers
 * Byte formatting, page range parsing, DPI rendering, Canvas extraction.
 */

const PDFUtils = (() => {
  /**
   * Formats raw bytes into readable string (e.g. 2.45 MB)
   * @param {number} bytes 
   * @returns {string}
   */
  function formatBytes(bytes, decimals = 2) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * Parses string page ranges (e.g. "1-3, 5, 7-10") into zero-indexed array
   * @param {string} rangeStr 
   * @param {number} totalPages 
   * @returns {Array<number>}
   */
  function parsePageRanges(rangeStr, totalPages) {
    if (!rangeStr || !rangeStr.trim()) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const indices = new Set();
    const parts = rangeStr.split(',').map(s => s.trim()).filter(Boolean);

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(totalPages, Math.max(start, end));
          for (let p = min; p <= max; p++) {
            indices.add(p - 1);
          }
        }
      } else {
        const p = parseInt(part, 10);
        if (!isNaN(p) && p >= 1 && p <= totalPages) {
          indices.add(p - 1);
        }
      }
    }

    return Array.from(indices).sort((a, b) => a - b);
  }

  /**
   * Renders a specific PDF page to a canvas
   * @param {object} pdfDocument PDF.js document
   * @param {number} pageNumber 1-based page number
   * @param {number} scale Zoom / DPI scale (1.0 = ~72-96 DPI, 2.0 = ~150-200 DPI)
   * @param {number} rotation Additional rotation in degrees (0, 90, 180, 270)
   * @returns {Promise<HTMLCanvasElement>}
   */
  async function renderPageToCanvas(pdfDocument, pageNumber, scale = 1.0, rotation = 0) {
    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale, rotation });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { alpha: false });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    return canvas;
  }

  /**
   * Converts Canvas to Blob with specified format and quality
   * @param {HTMLCanvasElement} canvas 
   * @param {string} mimeType 'image/jpeg' | 'image/png' | 'image/webp'
   * @param {number} quality 0.0 - 1.0
   * @returns {Promise<Blob>}
   */
  function canvasToBlob(canvas, mimeType = 'image/jpeg', quality = 0.92) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, mimeType, quality);
    });
  }

  /**
   * Extracts raw text from all or specified pages of a PDF
   * @param {object} pdfDocument PDF.js document
   * @param {function} onProgress (currentPage, totalPages)
   * @returns {Promise<{text: string, pageTexts: Array<string>}>}
   */
  async function extractText(pdfDocument, onProgress) {
    const totalPages = pdfDocument.numPages;
    const pageTexts = [];

    for (let i = 1; i <= totalPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      
      let lastY, text = '';
      for (const item of textContent.items) {
        if (lastY !== item.transform[5] && lastY !== undefined) {
          text += '\n';
        }
        text += item.str + ' ';
        lastY = item.transform[5];
      }

      pageTexts.push(text.trim());
      if (typeof onProgress === 'function') {
        onProgress(i, totalPages);
      }
    }

    return {
      text: pageTexts.join('\n\n--- [ Page Break ] ---\n\n'),
      pageTexts
    };
  }

  return {
    formatBytes,
    parsePageRanges,
    renderPageToCanvas,
    canvasToBlob,
    extractText
  };
})();

window.PDFUtils = PDFUtils;
