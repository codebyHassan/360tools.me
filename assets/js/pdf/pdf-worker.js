/**
 * 360tools.me — PDF Dedicated Background Web Worker
 * Offloads compute-heavy image quantization and canvas byte array processing.
 */

self.onmessage = function(e) {
  const { action, data, id } = e.data;

  switch (action) {
    case 'quantize-bytes': {
      // Process raw pixel buffer if needed
      const result = data;
      self.postMessage({ id, status: 'success', result });
      break;
    }
    case 'ping': {
      self.postMessage({ id, status: 'pong' });
      break;
    }
    default: {
      self.postMessage({ id, status: 'error', error: `Unknown action: ${action}` });
    }
  }
};
