import { state } from '../state.js'

// ---------------------- EXPORT TO TEXT FILE ----------------------
export function exportToText() {
  const { tasks } = state
  
  if (tasks.length === 0) {
    alert('Няма данни за експортиране!')
    return
  }

  // Group by category
  const categories = {}
  tasks.forEach(task => {
    categories[task.category] ??= []
    categories[task.category].push(task)
  })

  // Build text content
  let content = '='.repeat(80) + '\n'
  content += `ОТЧЕТ - ${new Date().toLocaleString('bg-BG', { hour12: false })}\n`
  content += '='.repeat(80) + '\n\n'

  let totalItems = 0

  for (const category in categories) {
    const items = categories[category]
    totalItems += items.length

    content += `\n[${ category.toUpperCase() }] - ${items.length} артикул(а)\n`
    content += '-'.repeat(80) + '\n'

    items.forEach((task, index) => {
      content += `${index + 1}. ${task.text}\n`
      content += `   Местоположение: ${task.location}\n`
      content += `   Дата: ${task.date}\n\n`
    })
  }

  content += '\n' + '='.repeat(80) + '\n'
  content += `ОБЩО АРТИКУЛИ: ${totalItems}\n`
  content += `КАТЕГОРИИ: ${Object.keys(categories).length}\n`
  content += '='.repeat(80) + '\n'

  // Download file
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `report_${new Date().toISOString().split('T')[0]}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

// ---------------------- EXPORT TO CSV ----------------------
export function exportToCSV() {
  const { tasks } = state
  
  if (tasks.length === 0) {
    alert('Няма данни за експортиране!')
    return
  }

  // CSV Header
  let csv = '\uFEFF' // UTF-8 BOM for Excel
  csv += 'Категория,Артикул,Местоположение,Дата\n'

  // Group by category and add rows
  const categories = {}
  tasks.forEach(task => {
    categories[task.category] ??= []
    categories[task.category].push(task)
  })

  for (const category in categories) {
    categories[category].forEach(task => {
      // Escape commas and quotes
      const text = `"${task.text.replace(/"/g, '""')}"`
      const location = `"${task.location.replace(/"/g, '""')}"`
      const cat = `"${category.replace(/"/g, '""')}"`
      const date = `"${task.date}"`
      
      csv += `${cat},${text},${location},${date}\n`
    })
  }

  // Download file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `report_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

// ---------------------- EXPORT TO EXCEL (HTML TABLE) ----------------------
export function exportToExcel() {
  const { tasks } = state
  
  if (tasks.length === 0) {
    alert('Няма данни за експортиране!')
    return
  }

  // Group by category
  const categories = {}
  tasks.forEach(task => {
    categories[task.category] ??= []
    categories[task.category].push(task)
  })

  // Build HTML table
  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
      <meta charset="utf-8">
      <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; font-weight: bold; }
        .category-header { background-color: #2196F3; color: white; font-weight: bold; font-size: 14px; }
        .summary { background-color: #FFC107; font-weight: bold; }
      </style>
    </head>
    <body>
      <h2>Отчет - ${new Date().toLocaleString('bg-BG', { hour12: false })}</h2>
  `

  let totalItems = 0

  for (const category in categories) {
    const items = categories[category]
    totalItems += items.length

    html += `
      <h3>${category} (${items.length} артикул(а))</h3>
      <table>
        <thead>
          <tr>
            <th width="50">#</th>
            <th width="300">Артикул</th>
            <th width="200">Местоположение</th>
            <th width="180">Дата</th>
          </tr>
        </thead>
        <tbody>
    `

    items.forEach((task, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${task.text}</td>
          <td>${task.location}</td>
          <td>${task.date}</td>
        </tr>
      `
    })

    html += `
        </tbody>
      </table>
      <br>
    `
  }

  html += `
      <h3>Обобщение</h3>
      <table>
        <tr class="summary">
          <td><strong>Общо артикули:</strong></td>
          <td>${totalItems}</td>
        </tr>
        <tr class="summary">
          <td><strong>Категории:</strong></td>
          <td>${Object.keys(categories).length}</td>
        </tr>
      </table>
    </body>
    </html>
  `

  // Download as Excel file
  const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `report_${new Date().toISOString().split('T')[0]}.xls`
  link.click()
  URL.revokeObjectURL(url)
}