/**
 * 360tools.me Root Forwarder (main.js -> js/main.min.js)
 */
if (typeof showToast === 'undefined') {
  const script = document.createElement('script');
  script.src = '/js/main.min.js';
  document.head.appendChild(script);
}
