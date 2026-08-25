/**
 * 360Tools Core Image Engine (js/image-engine.js)
 * 100% Client-Side Canvas & Binary Search Quantization
 */

class ImageEngine {
  /**
   * Compress an image file using HTML5 Canvas & Blob APIs
   * @param {File|Blob} file 
   * @param {Object} options - { quality: 0.8, mimeType: 'image/jpeg', maxDimension: 0, bgColor: '#ffffff' }
   * @returns {Promise<{ blob: Blob, dataUrl: string, width: number, height: number, originalSize: number, compressedSize: number }>}
   */
  static async compress(file, options = {}) {
    const quality = options.quality !== undefined ? options.quality : 0.8;
    const targetMime = options.mimeType || file.type || 'image/jpeg';
    const maxDim = options.maxDimension || 0;
    const bgColor = options.bgColor || '#ffffff';

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Invalid image file format'));
        img.onload = () => {
          let width = img.naturalWidth;
          let height = img.naturalHeight;

          if (maxDim > 0 && (width > maxDim || height > maxDim)) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (targetMime === 'image/jpeg') {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Canvas toBlob failed'));
            const dataUrl = canvas.toDataURL(targetMime, quality);
            resolve({
              blob,
              dataUrl,
              width,
              height,
              originalSize: file.size,
              compressedSize: blob.size,
              mimeType: targetMime
            });
          }, targetMime, quality);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Binary search compression engine to strictly meet an exact KB/MB target limit
   * @param {File|Blob} file 
   * @param {number} targetBytes - Target max size in bytes
   * @param {Object} options - { mimeType: 'image/jpeg', maxIterations: 12 }
   */
  static async compressToTargetSize(file, targetBytes, options = {}) {
    const targetMime = options.mimeType || 'image/jpeg';
    const maxIterations = options.maxIterations || 12;

    const img = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    let width = img.naturalWidth;
    let height = img.naturalHeight;
    let minQuality = 0.05;
    let maxQuality = 0.98;
    let bestBlob = null;
    let bestQuality = 0.5;
    let iterations = 0;
    let currentScale = 1.0;

    for (let i = 0; i < maxIterations; i++) {
      iterations++;
      const testQuality = (minQuality + maxQuality) / 2;

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(width * currentScale));
      canvas.height = Math.max(1, Math.round(height * currentScale));
      const ctx = canvas.getContext('2d');

      if (targetMime === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise(r => canvas.toBlob(r, targetMime, testQuality));
      if (!blob) break;

      if (blob.size <= targetBytes) {
        bestBlob = blob;
        bestQuality = testQuality;
        minQuality = testQuality;
      } else {
        maxQuality = testQuality;
      }

      if (maxQuality - minQuality < 0.03 && (!bestBlob || bestBlob.size > targetBytes)) {
        currentScale *= 0.85;
        minQuality = 0.10;
        maxQuality = 0.95;
      }
    }

    return {
      blob: bestBlob,
      originalSize: file.size,
      achievedSize: bestBlob ? bestBlob.size : 0,
      targetBytes,
      iterations,
      quality: bestQuality,
      finalWidth: Math.round(width * currentScale),
      finalHeight: Math.round(height * currentScale)
    };
  }

  /**
   * Helper to format byte counts into human readable strings (e.g. 450 KB, 1.2 MB)
   */
  static formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Attach to window
if (typeof window !== 'undefined') {
  window.ImageEngine = ImageEngine;
}
