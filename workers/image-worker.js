/**
 * 360Tools Web Worker for Background Image Processing
 * Offloads canvas processing & quantization from the main UI thread.
 */

self.onmessage = async function(e) {
  const { id, file, quality, mimeType, maxDim } = e.data;

  try {
    const bitmap = await createImageBitmap(file);
    let width = bitmap.width;
    let height = bitmap.height;

    if (maxDim > 0 && (width > maxDim || height > maxDim)) {
      if (width > height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }

    const offscreen = new OffscreenCanvas(width, height);
    const ctx = offscreen.getContext('2d');

    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await offscreen.convertToBlob({
      type: mimeType || 'image/jpeg',
      quality: quality || 0.8
    });

    self.postMessage({
      id,
      success: true,
      blob,
      originalSize: file.size,
      compressedSize: blob.size,
      width,
      height
    });
  } catch (err) {
    self.postMessage({
      id,
      success: false,
      error: err.message
    });
  }
};
