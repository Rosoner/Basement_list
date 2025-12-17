# Task App SQLite - Inventory Management System

A desktop application built with Electron for managing inventory items with locations and categories. Features a modern interface with search functionality and SQLite database storage.

## 📋 Features

- ✅ Add, edit, and delete inventory items
- 📍 Track item locations
- 🗂️ Organize items by categories
- 🔍 Search functionality with highlighting
- 💾 SQLite database for persistent storage
- 🖥️ Cross-platform desktop application (Windows, Mac, Linux)
- 📝 Editable header title
- 🕒 Automatic timestamp tracking

## 🛠️ Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

To verify your installation:
```bash
node --version
npm --version
```

## 📥 Installation

### Step 1: Clone or Download the Repository

```bash
# If using Git
git clone <repository-url>
cd task_app_sqlite

# Or download and extract the ZIP file, then navigate to the folder
cd task_app_sqlite
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- `electron` - Desktop application framework
- `express` - Backend server
- `sqlite3` - Database driver
- `body-parser` - Request parsing
- `cors` - Cross-origin resource sharing

### Step 3: Start the Application

```bash
npm start
```

The application will:
1. Start an Express server on `http://localhost:3000`
2. Create the SQLite database (`tasks.db`) if it doesn't exist
3. Open the Electron desktop window

## 📁 Project Structure

```
task_app_sqlite/
├── app/
│   ├── app.js          # Frontend logic (UI interactions)
│   ├── server.js       # Backend server & database
│   ├── index.html      # Main HTML interface
│   ├── style.css       # Application styling
│   └── tasks.db        # SQLite database (created on first run)
├── main.js             # Electron main process
├── preload.js          # Electron preload script
├── package.json        # Project configuration
├── package-lock.json   # Dependency lock file
└── README.md           # This file
```

## 💾 Database Information

### Database Location

The database file `tasks.db` is stored in the `app/` folder:
```
app/tasks.db
```

### Database Schema

The application uses a single `tasks` table:

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,           -- Item name/article number
  location TEXT,       -- Storage location
  category TEXT,       -- Item category
  date TEXT           -- Creation/modification timestamp
)
```

### Working with the Database

**View/Edit Database:**
You can open and inspect the database using:
- [DB Browser for SQLite](https://sqlitebrowser.org/) (Recommended)
- [DBeaver](https://dbeaver.io/)
- SQLite VS Code extension

**Backup Database:**
```bash
# Copy the database file
cp app/tasks.db backup/tasks-backup.db
```

**Import Existing Database:**
1. Place your `tasks.db` file in the `app/` folder
2. Make sure it has the correct table structure
3. Restart the application

## 🚀 Usage Guide

### Adding Items

1. Enter the **article/item name** in the "Артикул" field
2. (Optional) Enter **location** in the "Местоположение" field
3. Select a **category** from the dropdown
4. Click **"Добави"** or press **Enter**

### Editing Locations

1. Click **"Редактирай"** button next to an item
2. Modify the location in the input field
3. Click **"Запази"** to save or **"Откажи"** to cancel

### Deleting Items

Click the **"Изтрий"** button next to the item you want to remove.

### Searching

1. Enter search term in the search box
2. Click **"Търси"** or press **Enter**
3. Matching items will be highlighted
4. Click **"Изчисти"** to clear search

### Customizing Header

Click on the header title "Списък Мазе - София" to edit it. Press **Enter** or click outside to save.

## 🔧 Development

### Available Scripts

```bash
# Start the application
npm start

# Build executable for distribution
npm run build
```

### Building Executables

To create a distributable application:

```bash
npm run build
```

This will create installers in the `dist/` folder:
- **Windows:** `.exe` installer in `dist/`
- **Mac:** `.dmg` file
- **Linux:** `.AppImage` or `.deb`

### Configuration

**Port Configuration:**
The server runs on port 3000 by default. To change it, edit `app/server.js`:
```javascript
const PORT = 3000; // Change to your preferred port
```

**Database Path:**
The database path is set in `app/server.js`:
```javascript
const dbPath = path.join(__dirname, 'tasks.db')
```

## 🐛 Troubleshooting

### Problem: "Cannot find module 'electron'"

**Solution:**
```bash
npm install
```

### Problem: Database file not found or data not showing

**Solution:**
1. Check that `app/tasks.db` exists
2. Verify the database path in `app/server.js`
3. Make sure the path points to `__dirname` (current location)

### Problem: Port 3000 already in use

**Solution:**
1. Close any application using port 3000
2. Or change the port in `app/server.js`

### Problem: SQLite errors on different OS

**Solution:**
```bash
npm rebuild sqlite3
```

### Problem: Application won't start

**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Run `npm start`

## 📦 Dependencies

### Production Dependencies
- **express** (^5.2.1) - Web server framework
- **sqlite3** (^5.1.7) - SQLite database driver
- **body-parser** (^2.2.1) - Request body parsing
- **cors** (^2.8.5) - Cross-origin resource sharing

### Development Dependencies
- **electron** (^39.2.7) - Desktop application framework
- **electron-builder** (^26.0.12) - Application packager

## 🔐 Data Privacy

- All data is stored **locally** on your computer
- No data is sent to external servers
- Database file is in plain SQLite format
- You have full control over your data

## 📝 API Endpoints

The application runs a REST API server:

```
GET    /tasks          # Get all tasks
POST   /tasks          # Create new task
PUT    /tasks/:id      # Update task location
DELETE /tasks/:id      # Delete task
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 👨‍💻 Author

**Ivan Stefanov**

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all dependencies are installed correctly
3. Make sure Node.js version is 16 or higher
4. Check that port 3000 is available

---
server.js

// const dbPath = electronApp
//   ? path.join(electronApp.getPath('userData'), 'tasks.db')
//   : path.join(__dirname, 'tasks.db')

  const dbPath = path.join(__dirname, 'tasks.db')

**Happy Inventory Management! 📦✨**