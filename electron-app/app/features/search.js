import { state } from '../state.js'
import { renderCategories } from '../ui/render.js'

export function searchTasks() {
  state.searchQuery = searchInput.value.trim().toLowerCase()
  renderCategories()
}

export function clearSearch() {
  state.searchQuery = ''
  searchInput.value = ''
  renderCategories()
}
