let tasks = []
let editingTaskId = null
let searchQuery = ''

// ---------------------- LOAD TASKS FROM DATABASE ----------------------
async function loadTasks() {
  const res = await fetch('http://localhost:3000/tasks')
  tasks = await res.json()
  renderCategories()
}

// ---------------------- ADD NEW TASK ----------------------
async function addTask() {
  const text = document.getElementById('taskInput').value.trim()
  const location = document.getElementById('locationInput').value.trim()
  const category = document.getElementById('categorySelect').value

  if (!text) return alert('Моля въведете артикул!')

  const task = {
    text,
    location: location || 'Не е посочено',
    category,
    date: new Date().toLocaleString('bg-BG', { hour12: false }),
  }

  const res = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })

  const result = await res.json()
  task.id = result.id // assign DB id

  tasks.push(task)

  // Clear inputs
  document.getElementById('taskInput').value = ''
  document.getElementById('locationInput').value = ''

  renderCategories()
}

// ---------------------- DELETE TASK ----------------------
async function deleteTask(id) {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  })

  tasks = tasks.filter((t) => t.id !== id)
  renderCategories()
}

// ---------------------- ENABLE EDIT MODE ----------------------
function editLocation(id) {
  editingTaskId = id
  renderCategories()
}

// ---------------------- SAVE LOCATION UPDATE ----------------------
async function saveLocation(id) {
  const input = document.getElementById(`location-input-${id}`)
  const newLocation = input.value.trim() || 'Не е посочено'

  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: newLocation,
      date: new Date().toLocaleString('bg-BG', { hour12: false }),
    }),
  })

  const task = tasks.find((t) => t.id === id)
  task.location = newLocation
  task.date = new Date().toLocaleString('bg-BG', { hour12: false })

  editingTaskId = null
  renderCategories()
}

// ---------------------- CANCEL EDIT ----------------------
function cancelEdit() {
  editingTaskId = null
  renderCategories()
}

// ---------------------- SEARCH FUNCTIONS ----------------------
function searchTasks() {
  searchQuery = document
    .getElementById('searchInput')
    .value.trim()
    .toLowerCase()
  renderCategories()
}

function clearSearch() {
  searchQuery = ''
  document.getElementById('searchInput').value = ''
  renderCategories()
}

function highlightText(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}

// ---------------------- RENDER UI ----------------------
function renderCategories() {
  const container = document.getElementById('categoriesContainer')
  const searchInfo = document.getElementById('searchInfo')

  // Filter tasks by search query
  let filteredTasks = tasks
  if (searchQuery) {
    filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery),
    )

    searchInfo.textContent = `Намерени ${filteredTasks.length} артикул(а) за "${searchQuery}"`
    searchInfo.classList.remove('hidden')
  } else {
    searchInfo.classList.add('hidden')
  }

  container.innerHTML = ''

  const categories = {}

  filteredTasks.forEach((task) => {
    if (!categories[task.category]) {
      categories[task.category] = []
    }
    categories[task.category].push(task)
  })

  // Check if no results
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

  for (const category in categories) {
    const tasksInCategory = categories[category]

    const section = document.createElement('div')
    section.className = 'category-section'

    const header = `
      <div class="category-header">
        <span class="category-title">${category}</span>
        <span class="category-count">${tasksInCategory.length}</span>
      </div>
    `

    let table = `
      <table>
        <tr>
          <th style="width: 60px">#</th>
          <th>Артикул</th>
          <th style="width: 150px">Местоположение</th>
          <th style="width: 180px">Дата създаване/промяна</th>
          <th style="width: 160px">Действия</th>
        </tr>
    `

    tasksInCategory.forEach((task, index) => {
      const isEditing = editingTaskId === task.id

      table += `
        <tr>
          <td>${index + 1}</td>
          <td>${highlightText(task.text, searchQuery)}</td>
          <td>
            ${
              isEditing
                ? `<input id="location-input-${
                    task.id
                  }" class="location-input" value="${
                    task.location === 'Не е посочено' ? '' : task.location
                  }">`
                : task.location
            }
          </td>
          <td>${task.date}</td>
          <td>
            ${
              isEditing
                ? `
                  <button class="save-btn" onclick="saveLocation(${task.id})">Запази</button>
                  <button class="cancel-btn" onclick="cancelEdit()">Откажи</button>
                `
                : `
                  <button class="edit-btn" onclick="editLocation(${task.id})">Редактирай</button>
                  <button class="delete-btn" onclick="deleteTask(${task.id})">Изтрий</button>
                `
            }
          </td>
        </tr>
      `
    })

    table += '</table>'

    section.innerHTML = header + table
    container.appendChild(section)
  }
}

// ---------------------- EVENT LISTENERS ----------------------
document.getElementById('addBtn').addEventListener('click', addTask)
document.getElementById('searchBtn').addEventListener('click', searchTasks)
document.getElementById('clearSearchBtn').addEventListener('click', clearSearch)

document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask()
  }
})

document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchTasks()
  }
})

/* ---------- Editable Header ---------- */

const headerTitle = document.getElementById('headerTitle')

// Load saved title
const savedTitle = localStorage.getItem('headerTitle')
if (savedTitle) {
  headerTitle.textContent = savedTitle
}

// Enable editing on click
headerTitle.addEventListener('click', () => {
  headerTitle.contentEditable = true
  headerTitle.classList.add('editing')
  headerTitle.focus()
})

// Save on blur or Enter
headerTitle.addEventListener('blur', saveHeaderTitle)
headerTitle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    headerTitle.blur()
  }
})

function saveHeaderTitle() {
  headerTitle.contentEditable = false
  headerTitle.classList.remove('editing')

  const text = headerTitle.textContent.trim() || 'Списък Мазе - София'
  headerTitle.textContent = text

  localStorage.setItem('headerTitle', text)
}

// Load tasks at start
loadTasks()
