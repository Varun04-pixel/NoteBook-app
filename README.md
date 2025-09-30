# NoteBook App — NoteX

A full-stack note-taking web application built with React (frontend) and Node.js / Express / MongoDB (backend).  
Users can sign up, log in, add, view, and manage their notes.

---

## Demo

🔗 [Visit live Site](https://notex-05nv.onrender.com/home)
![App Screenshot](./Assets/Screenshot%202025-10-01%20004252.png)

---

## Tech Stack

| Layer          | Technology / Framework          |
| -------------- | ------------------------------- |
| Frontend       | React, Create React App, serve  |
| Backend        | Node.js, Express                |
| Database       | MongoDB Atlas (Mongoose)        |
| Authentication | JWT (JSON Web Tokens)           |
| Deployment     | Render.com (backend & frontend) |
| Others         | CORS, dotenv, etc.              |

---

## Features

- User registration & authentication
- Add notes (title, description)
- Retrieve notes for logged-in user
- Responsive UI
- Deployed online via Render

---

## Installation & Setup (Local)

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Varun04-pixel/NoteBook-app.git
cd NoteBook-app

# 2️⃣ Backend setup
cd Backend
npm install

# Create a .env file inside Backend/ with:
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=some_secret_code (combination of numbers, symbols, alphabets)

# Start backend
npm start   # or nodemon server.js

# 3️⃣ Frontend setup (in a new terminal, while backend is running)
cd note-app
npm install

# Create a .env file inside note-app/ with:
REACT_APP_HOST=http://localhost:5000

# In package.json, replace:
"start": "serve -s build"
# with:
"start": "react-scripts start"

# Start frontend
npm start

# 4️⃣ Open the app
Frontend → http://localhost:3000
Backend  → http://localhost:5000
