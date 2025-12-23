import { initHeader } from './ui/header.js'
import { initEvents } from './events.js'
import { loadTasks } from './features/tasks.js'

// expose actions for inline buttons
import * as taskActions from './features/tasks.js'
window.editLocation = taskActions.editLocation
window.saveLocation = taskActions.saveLocation
window.cancelEdit = taskActions.cancelEdit
window.deleteTask = taskActions.deleteTask

initHeader()
initEvents()
loadTasks()
