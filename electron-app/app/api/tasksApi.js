const BASE_URL = 'http://localhost:3000/tasks'

export async function fetchTasks() {
  const res = await fetch(BASE_URL)
  return res.json()
}

export async function createTask(task) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
  return res.json()
}

export async function deleteTaskApi(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
}

export async function updateTaskApi(id, data) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
