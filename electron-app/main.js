const { app, BrowserWindow } = require('electron')
const path = require('path')

// Start backend server
require('./app/server.js')

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadURL('http://localhost:3000')
}

app.whenReady().then(createWindow)
