/**
 * 360tools.me — PDF UI Components & Interactive Widgets
 * Renders file list, reorderable items, thumbnail grids, progress bars, and result cards.
 */

const PDFUI = (() => {
  /**
   * Renders the selected files list with reordering and removal
   * @param {HTMLElement} containerEl 
   * @param {Array<File>} files 
   * @param {object} callbacks { onRemove, onMoveUp, onMoveDown }
   */
  function renderFileList(containerEl, files, callbacks = {}) {
    if (!containerEl) return;
    containerEl.innerHTML = '';

    if (!files || files.length === 0) {
      containerEl.style.display = 'none';
      return;
    }

    containerEl.style.display = 'flex';
    containerEl.className = 'pdf-file-list';

    files.forEach((file, index) => {
      const item = document.createElement('div');
      item.className = 'pdf-file-item';
      item.setAttribute('draggable', 'true');
      item.dataset.index = index;

      const isFirst = index === 0;
      const isLast = index === files.length - 1;

      const isImage = file.type.startsWith('image/');
      const iconClass = isImage ? 'fa-image' : 'fa-file-pdf';

      item.innerHTML = `
        <div class="pdf-file-item-left">
          <div class="pdf-file-item-icon">
            <i class="fa-solid ${iconClass}"></i>
          </div>
          <div class="pdf-file-item-meta">
            <div class="pdf-file-item-name" title="${file.name}">${file.name}</div>
            <div class="pdf-file-item-size">${PDFUtils.formatBytes(file.size)} • #${index + 1}</div>
          </div>
        </div>
        <div class="pdf-file-item-actions">
          ${files.length > 1 ? `
            <button type="button" class="pdf-action-btn move-up" title="Move Up" ${isFirst ? 'disabled style="opacity:0.3;"' : ''}>
              <i class="fa-solid fa-arrow-up text-xs"></i>
            </button>
            <button type="button" class="pdf-action-btn move-down" title="Move Down" ${isLast ? 'disabled style="opacity:0.3;"' : ''}>
              <i class="fa-solid fa-arrow-down text-xs"></i>
            </button>
          ` : ''}
          <button type="button" class="pdf-action-btn delete" title="Remove File">
            <i class="fa-solid fa-trash text-xs"></i>
          </button>
        </div>
      `;

      // Event listeners
      const btnUp = item.querySelector('.move-up');
      const btnDown = item.querySelector('.move-down');
      const btnDelete = item.querySelector('.delete');

      if (btnUp && !isFirst) {
        btnUp.addEventListener('click', (e) => {
          e.stopPropagation();
          if (callbacks.onMoveUp) callbacks.onMoveUp(index);
        });
      }

      if (btnDown && !isLast) {
        btnDown.addEventListener('click', (e) => {
          e.stopPropagation();
          if (callbacks.onMoveDown) callbacks.onMoveDown(index);
        });
      }

      if (btnDelete) {
        btnDelete.addEventListener('click', (e) => {
          e.stopPropagation();
          if (callbacks.onRemove) callbacks.onRemove(index);
        });
      }

      containerEl.appendChild(item);
    });
  }

  /**
   * Renders a thumbnail grid of PDF pages for interactive selection or rotation
   * @param {HTMLElement} containerEl 
   * @param {object} pdfDocument 
   * @param {object} options { selectable, rotatable, deletable, onSelectionChange, onRotate }
   */
  async function renderPagesGrid(containerEl, pdfDocument, options = {}) {
    if (!containerEl || !pdfDocument) return;
    containerEl.innerHTML = '';
    containerEl.className = 'pdf-pages-grid';

    const totalPages = pdfDocument.numPages;
    const pageStates = [];

    for (let i = 1; i <= totalPages; i++) {
      const state = {
        pageNumber: i,
        rotation: 0,
        selected: true,
        deleted: false
      };
      pageStates.push(state);

      const card = document.createElement('div');
      card.className = 'pdf-page-card selected';
      card.dataset.page = i;

      card.innerHTML = `
        <span class="pdf-page-card-badge">Page ${i}</span>
        <div class="pdf-page-card-canvas-wrap" style="width:100%; min-height:140px; display:flex; align-items:center; justify-content:center; background:#f8fafc; border-radius:6px; overflow:hidden;">
          <div class="loading-spinner text-slate-400 text-xs"><i class="fa-solid fa-circle-notch fa-spin"></i></div>
        </div>
        <div class="pdf-page-card-actions">
          ${options.rotatable ? `
            <button type="button" class="pdf-action-btn rotate-btn" title="Rotate 90° Clockwise">
              <i class="fa-solid fa-rotate-right text-xs"></i>
            </button>
          ` : ''}
          ${options.deletable ? `
            <button type="button" class="pdf-action-btn delete-page-btn" title="Delete Page">
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
          ` : ''}
        </div>
      `;

      containerEl.appendChild(card);

      // Render thumbnail asynchronously
      PDFUtils.renderPageToCanvas(pdfDocument, i, 0.35, 0).then(canvas => {
        canvas.className = 'pdf-page-card-canvas';
        const wrap = card.querySelector('.pdf-page-card-canvas-wrap');
        if (wrap) {
          wrap.innerHTML = '';
          wrap.appendChild(canvas);
        }
      });

      // Card selection toggle
      if (options.selectable) {
        card.addEventListener('click', (e) => {
          if (e.target.closest('button')) return;
          state.selected = !state.selected;
          card.classList.toggle('selected', state.selected);
          if (options.onSelectionChange) options.onSelectionChange(pageStates);
        });
      }

      // Rotate action
      if (options.rotatable) {
        const rotateBtn = card.querySelector('.rotate-btn');
        if (rotateBtn) {
          rotateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            state.rotation = (state.rotation + 90) % 360;
            const canvas = card.querySelector('canvas');
            if (canvas) {
              canvas.style.transform = `rotate(${state.rotation}deg)`;
              canvas.style.transition = 'transform 0.2s ease';
            }
            if (options.onRotate) options.onRotate(i, state.rotation, pageStates);
          });
        }
      }

      // Delete action
      if (options.deletable) {
        const delBtn = card.querySelector('.delete-page-btn');
        if (delBtn) {
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            state.deleted = !state.deleted;
            card.classList.toggle('deleted', state.deleted);
            delBtn.innerHTML = state.deleted ? '<i class="fa-solid fa-rotate-left text-xs"></i>' : '<i class="fa-solid fa-trash text-xs"></i>';
            delBtn.title = state.deleted ? 'Restore Page' : 'Delete Page';
            if (options.onSelectionChange) options.onSelectionChange(pageStates);
          });
        }
      }
    }

    return pageStates;
  }

  /**
   * Updates or renders progress bar
   */
  function showProgress(containerEl, percentage, statusText) {
    if (!containerEl) return;
    containerEl.style.display = 'block';
    containerEl.innerHTML = `
      <div class="pdf-progress-container">
        <div class="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
          <span>Processing Document</span>
          <span>${Math.round(percentage)}%</span>
        </div>
        <div class="pdf-progress-bar-bg">
          <div class="pdf-progress-bar-fill" style="width: ${Math.min(100, Math.max(0, percentage))}%;"></div>
        </div>
        <div class="pdf-progress-status">${statusText || 'Executing client-side processing...'}</div>
      </div>
    `;
  }

  /**
   * Hides progress container
   */
  function hideProgress(containerEl) {
    if (containerEl) containerEl.style.display = 'none';
  }

  /**
   * Renders the final download screen
   * @param {HTMLElement} containerEl 
   * @param {object} data { filename, blob, originalSize, newSize, onReset }
   */
  function renderResult(containerEl, data) {
    if (!containerEl) return;
    containerEl.style.display = 'block';

    let metaHtml = '';
    if (data.originalSize && data.newSize) {
      const savedBytes = data.originalSize - data.newSize;
      const pct = Math.round((savedBytes / data.originalSize) * 100);
      if (pct > 0) {
        metaHtml = `<div class="pdf-result-meta">Reduced from <strong>${PDFUtils.formatBytes(data.originalSize)}</strong> to <strong>${PDFUtils.formatBytes(data.newSize)}</strong> (<span class="text-emerald-700 font-bold">-${pct}% Saved</span>)</div>`;
      } else {
        metaHtml = `<div class="pdf-result-meta">Output file size: <strong>${PDFUtils.formatBytes(data.newSize)}</strong></div>`;
      }
    } else if (data.newSize) {
      metaHtml = `<div class="pdf-result-meta">Output file size: <strong>${PDFUtils.formatBytes(data.newSize)}</strong></div>`;
    }

    containerEl.innerHTML = `
      <div class="pdf-result-card animate-in fade-in duration-300">
        <div class="pdf-result-icon">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 class="pdf-result-title">Your PDF is Ready!</h3>
        ${metaHtml}
        <div class="pdf-result-actions">
          <button type="button" id="pdfDownloadBtn" class="pdf-btn-primary">
            <i class="fa-solid fa-download"></i>
            <span>Download ${data.filename || 'Document'}</span>
          </button>
          <button type="button" id="pdfResetBtn" class="pdf-btn-secondary">
            <i class="fa-solid fa-rotate-left"></i>
            <span>Process Another File</span>
          </button>
        </div>
      </div>
    `;

    const downloadBtn = containerEl.querySelector('#pdfDownloadBtn');
    if (downloadBtn && data.blob) {
      downloadBtn.addEventListener('click', () => {
        PDFCommon.downloadBlob(data.blob, data.filename || 'document.pdf');
      });
    }

    const resetBtn = containerEl.querySelector('#pdfResetBtn');
    if (resetBtn && data.onReset) {
      resetBtn.addEventListener('click', data.onReset);
    }
  }

  /**
   * Shows error banner
   */
  function showError(containerEl, message) {
    if (!containerEl) return;
    containerEl.style.display = 'block';
    containerEl.innerHTML = `
      <div class="pdf-alert pdf-alert-error animate-in fade-in duration-200">
        <i class="fa-solid fa-circle-exclamation text-base"></i>
        <div class="flex-1">${message || 'An error occurred while processing the PDF.'}</div>
      </div>
    `;
  }

  /**
   * Clears error banner
   */
  function clearError(containerEl) {
    if (containerEl) {
      containerEl.innerHTML = '';
      containerEl.style.display = 'none';
    }
  }

  return {
    renderFileList,
    renderPagesGrid,
    showProgress,
    hideProgress,
    renderResult,
    showError,
    clearError
  };
})();

window.PDFUI = PDFUI;
