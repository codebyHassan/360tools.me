/**
 * 360tools.me Root Forwarder (main.js -> js/main.js)
 */
// Re-export or forward
if (typeof showToast === 'undefined') {
  const script = document.createElement('script');
  script.src = 'js/main.js';
  document.head.appendChild(script);
}
