const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { app: electronApp } = require('electron')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

/* ------------------ SQLITE DATABASE ------------------ */

// Safe database location (works in EXE)
// const dbPath = electronApp
//   ? path.join(electronApp.getPath('userData'), 'tasks.db')
//   : path.join(__dirname, 'tasks.db')

  const dbPath = path.join(__dirname, 'tasks.db')

const db = new sqlite3.Database(dbPath)

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    location TEXT,
    category TEXT,
    date TEXT
  )
`)

/* ------------------ STATIC FILES ------------------ */

// Serve frontend files (index.html, style.css, app.js)
app.use(express.static(__dirname))

/* ------------------ API ENDPOINTS ------------------ */

// Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json(err)
    res.json(rows)
  })
})

// Add new task
app.post('/tasks', (req, res) => {
  const { text, location, category, date } = req.body

  db.run(
    'INSERT INTO tasks (text, location, category, date) VALUES (?, ?, ?, ?)',
    [text, location, category, date],
    function (err) {
      if (err) return res.status(500).json(err)
      res.json({ id: this.lastID })
    },
  )
})

// Update existing task
app.put('/tasks/:id', (req, res) => {
  const { location, date } = req.body
  const id = req.params.id

  db.run(
    'UPDATE tasks SET location=?, date=? WHERE id=?',
    [location, date, id],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ success: true })
    },
  )
})

// Delete task
app.delete('/tasks/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ success: true })
  })
})

/* ------------------ START SERVER ------------------ */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`SQLite DB location: ${dbPath}`)
})
