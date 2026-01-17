import { exportToText, exportToCSV, exportToExcel } from '../features/export.js'

export function showExportModal() {
  const modal = document.createElement('div')
  modal.className = 'modal-overlay'
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Експортиране на отчет</h2>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div class="modal-body">
        <p>Изберете формат за експортиране:</p>
        <div class="export-options">
          <button class="export-option" id="exportExcel">
            <span class="export-icon">📊</span>
            <span class="export-label">Excel файл (.xls)</span>
            <span class="export-desc">Подходящ за анализ и обработка</span>
          </button>
          <button class="export-option" id="exportCSV">
            <span class="export-icon">📋</span>
            <span class="export-label">CSV файл (.csv)</span>
            <span class="export-desc">Универсален формат за таблици</span>
          </button>
          <button class="export-option" id="exportText">
            <span class="export-icon">📄</span>
            <span class="export-label">Текстов файл (.txt)</span>
            <span class="export-desc">Лесно четим формат</span>
          </button>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  // Event listeners
  document.getElementById('exportExcel').addEventListener('click', () => {
    exportToExcel()
    modal.remove()
  })

  document.getElementById('exportCSV').addEventListener('click', () => {
    exportToCSV()
    modal.remove()
  })

  document.getElementById('exportText').addEventListener('click', () => {
    exportToText()
    modal.remove()
  })

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      modal.remove()
      document.removeEventListener('keydown', handleEscape)
    }
  }
  document.addEventListener('keydown', handleEscape)
}