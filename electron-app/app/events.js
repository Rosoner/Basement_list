import { dom } from './dom.js'
import { addTask } from './features/tasks.js'
import { searchTasks, clearSearch } from './features/search.js'
import { showExportModal } from './ui/exportModal.js'

export function initEvents() {
  dom.addBtn.addEventListener('click', addTask)
  dom.searchBtn.addEventListener('click', searchTasks)
  dom.clearSearchBtn.addEventListener('click', clearSearch)
  dom.exportBtn.addEventListener('click', showExportModal)

  dom.taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask()
  })

  dom.searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') searchTasks()
  })
}