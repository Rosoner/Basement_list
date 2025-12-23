import { state } from '../state.js'

export function highlightText(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}

export function renderCategories() {
  const { tasks, searchQuery, editingTaskId } = state
  const container = document.getElementById('categoriesContainer')
  const searchInfo = document.getElementById('searchInfo')

  let filteredTasks = tasks
  if (searchQuery) {
    filteredTasks = tasks.filter(t =>
      t.text.toLowerCase().includes(searchQuery),
    )

    searchInfo.textContent =
      `Намерени ${filteredTasks.length} артикул(а) за "${searchQuery}"`
    searchInfo.classList.remove('hidden')
  } else {
    searchInfo.classList.add('hidden')
  }

  container.innerHTML = ''

  if (filteredTasks.length === 0 && searchQuery) {
    container.innerHTML =
      '<div class="empty-message">Не са намерени артикули за това търсене.</div>'
    return
  }

  if (tasks.length === 0) {
    container.innerHTML =
      '<div class="empty-message">Все още няма артикули. Добавете нов!</div>'
    return
  }

  const categories = {}
  filteredTasks.forEach(task => {
    categories[task.category] ??= []
    categories[task.category].push(task)
  })

  for (const category in categories) {
    const section = document.createElement('div')
    section.className = 'category-section'

    let table = `
      <div class="category-header">
        <span class="category-title">${category}</span>
        <span class="category-count">${categories[category].length}</span>
      </div>
      <table>
        <tr>
          <th>#</th>
          <th>Артикул</th>
          <th>Местоположение</th>
          <th>Дата</th>
          <th>Действия</th>
        </tr>
    `

    categories[category].forEach((task, index) => {
      const isEditing = editingTaskId === task.id
      table += `
        <tr>
          <td>${index + 1}</td>
          <td>${highlightText(task.text, searchQuery)}</td>
          <td>
            ${
              isEditing
                ? `<input id="location-input-${task.id}" value="${task.location === 'Не е посочено' ? '' : task.location}">`
                : task.location
            }
          </td>
          <td>${task.date}</td>
          <td>
            ${
              isEditing
                ? `
                  <button onclick="saveLocation(${task.id})">Запази</button>
                  <button onclick="cancelEdit()">Откажи</button>
                `
                : `
                  <button onclick="editLocation(${task.id})">Редактирай</button>
                  <button onclick="deleteTask(${task.id})">Изтрий</button>
                `
            }
          </td>
        </tr>
      `
    })

    table += '</table>'
    section.innerHTML = table
    container.appendChild(section)
  }
}
