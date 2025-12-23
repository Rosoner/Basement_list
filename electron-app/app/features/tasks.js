import { state } from '../state.js'
import { dom } from '../dom.js'
import { renderCategories } from '../ui/render.js'
import {
  fetchTasks,
  createTask,
  deleteTaskApi,
  updateTaskApi,
} from '../api/tasksApi.js'

// ---------------------- LOAD TASKS ----------------------
export async function loadTasks() {
  try {
    state.tasks = await fetchTasks()
    renderCategories()
  } catch (err) {
    console.error('Failed to load tasks:', err)
  }
}

// ---------------------- ADD NEW TASK ----------------------
export async function addTask() {
  const text = dom.taskInput.value.trim()
  const location = dom.locationInput.value.trim()
  const category = dom.categorySelect.value

  if (!text) {
    alert('Моля въведете артикул!')
    return
  }

  const task = {
    text,
    location: location || 'Не е посочено',
    category,
    date: new Date().toLocaleString('bg-BG', { hour12: false }),
  }

  try {
    const result = await createTask(task)
    task.id = result.id

    state.tasks.push(task)

    // Clear inputs
    dom.taskInput.value = ''
    dom.locationInput.value = ''

    renderCategories()
  } catch (err) {
    console.error('Failed to add task:', err)
  }
}

// ---------------------- DELETE TASK ----------------------
export async function deleteTask(id) {
  try {
    await deleteTaskApi(id)
    state.tasks = state.tasks.filter(t => t.id !== id)
    renderCategories()
  } catch (err) {
    console.error('Failed to delete task:', err)
  }
}

// ---------------------- ENABLE EDIT MODE ----------------------
export function editLocation(id) {
  state.editingTaskId = id
  renderCategories()
}

// ---------------------- SAVE LOCATION ----------------------
export async function saveLocation(id) {
  const input = document.getElementById(`location-input-${id}`)
  if (!input) return

  const newLocation = input.value.trim() || 'Не е посочено'
  const newDate = new Date().toLocaleString('bg-BG', { hour12: false })

  try {
    await updateTaskApi(id, {
      location: newLocation,
      date: newDate,
    })

    const task = state.tasks.find(t => t.id === id)
    if (task) {
      task.location = newLocation
      task.date = newDate
    }

    state.editingTaskId = null
    renderCategories()
  } catch (err) {
    console.error('Failed to save location:', err)
  }
}

// ---------------------- CANCEL EDIT ----------------------
export function cancelEdit() {
  state.editingTaskId = null
  renderCategories()
}
