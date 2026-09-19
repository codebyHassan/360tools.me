/**
 * 360tools.me — PDF Security, Privacy & Sanitization
 * Removes metadata, tests password encryption status, and manages client-side memory safety.
 */

const PDFSecurity = (() => {
  /**
   * Sanitizes all metadata fields from a PDF document
   * @param {object} pdfDoc PDFLib.PDFDocument
   */
  function stripMetadata(pdfDoc) {
    if (!pdfDoc) return;
    try {
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('360Tools In-Browser Sanitizer (360tools.me)');
      pdfDoc.setCreator('360Tools Privacy Engine');
      pdfDoc.setCreationDate(new Date(0));
      pdfDoc.setModificationDate(new Date(0));
    } catch (e) {
      console.warn('Metadata sanitization note:', e);
    }
  }

  /**
   * Checks if an ArrayBuffer is a password-encrypted PDF
   * @param {ArrayBuffer} buffer 
   * @returns {boolean}
   */
  function isEncrypted(buffer) {
    const bytes = new Uint8Array(buffer.slice(0, 10000));
    const str = new TextDecoder('latin1').decode(bytes);
    return str.includes('/Encrypt');
  }

  return {
    stripMetadata,
    isEncrypted
  };
})();

window.PDFSecurity = PDFSecurity;
