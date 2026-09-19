/**
 * 360tools.me — PDF Common Library & Orchestration
 * Dynamic CDN lazy-loader, drag & drop setup, file validation, and memory cleanup.
 */

const PDFCommon = (() => {
  // CDN URLs
  const CDN = {
    pdfLib: 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
    pdfJs: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    pdfJsWorker: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
    jszip: 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
    html2pdf: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
  };

  const loadedLibraries = new Set();

  /**
   * Dynamically loads a script on demand
   * @param {string} src 
   * @returns {Promise<void>}
   */
  function loadScript(src) {
    if (loadedLibraries.has(src)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        loadedLibraries.add(src);
        return resolve();
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        loadedLibraries.add(src);
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load dependency: ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Ensure PDF-Lib is loaded
   */
  async function requirePdfLib() {
    if (typeof window.PDFLib !== 'undefined') return window.PDFLib;
    await loadScript(CDN.pdfLib);
    return window.PDFLib;
  }

  /**
   * Ensure PDF.js is loaded
   */
  async function requirePdfJs() {
    if (typeof window.pdfjsLib !== 'undefined') return window.pdfjsLib;
    await loadScript(CDN.pdfJs);
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN.pdfJsWorker;
    }
    return window.pdfjsLib;
  }

  /**
   * Ensure JSZip is loaded
   */
  async function requireJsZip() {
    if (typeof window.JSZip !== 'undefined') return window.JSZip;
    await loadScript(CDN.jszip);
    return window.JSZip;
  }

  /**
   * Ensure html2pdf is loaded
   */
  async function requireHtml2Pdf() {
    if (typeof window.html2pdf !== 'undefined') return window.html2pdf;
    await loadScript(CDN.html2pdf);
    return window.html2pdf;
  }

  /**
   * Validates file format and size
   * @param {File} file 
   * @param {Array<string>} allowedTypes 
   * @param {number} maxSizeMB 
   * @returns {{valid: boolean, error?: string}}
   */
  function validateFile(file, allowedTypes = ['application/pdf'], maxSizeMB = 100) {
    if (!file) return { valid: false, error: 'No file selected.' };

    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    const isPdf = allowedTypes.includes('application/pdf') && (fileType === 'application/pdf' || fileName.endsWith('.pdf'));
    const isImage = allowedTypes.some(t => t.startsWith('image/')) && (fileType.startsWith('image/') || /\.(jpe?g|png|webp|gif|bmp)$/i.test(fileName));

    if (!isPdf && !isImage) {
      return {
        valid: false,
        error: `Unsupported format. Allowed types: ${allowedTypes.map(t => t.replace('image/', '.').replace('application/', '.')).join(', ')}`
      };
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return {
        valid: false,
        error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max limit is ${maxSizeMB}MB.`
      };
    }

    return { valid: true };
  }

  /**
   * Reads a file as ArrayBuffer
   * @param {File|Blob} file 
   * @returns {Promise<ArrayBuffer>}
   */
  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file from disk.'));
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Reads a file as DataURL
   * @param {File|Blob} file 
   * @returns {Promise<string>}
   */
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file image data.'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Initializes standard dropzone events
   */
  function setupDropzone(dropzoneEl, fileInputEl, onFilesSelected) {
    if (!dropzoneEl || !fileInputEl) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzoneEl.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneEl.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzoneEl.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneEl.classList.remove('dragover');
      });
    });

    dropzoneEl.addEventListener('drop', (e) => {
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0 && typeof onFilesSelected === 'function') {
        onFilesSelected(files);
      }
    });

    dropzoneEl.addEventListener('click', () => {
      fileInputEl.click();
    });

    fileInputEl.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0 && typeof onFilesSelected === 'function') {
        onFilesSelected(files);
      }
      // Reset input so re-selecting same file triggers change
      fileInputEl.value = '';
    });
  }

  /**
   * Triggers browser download of a Blob
   */
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  }

  return {
    requirePdfLib,
    requirePdfJs,
    requireJsZip,
    requireHtml2Pdf,
    validateFile,
    readFileAsArrayBuffer,
    readFileAsDataURL,
    setupDropzone,
    downloadBlob
  };
})();

window.PDFCommon = PDFCommon;
