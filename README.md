# NoteBook App — NoteX

A full-stack note-taking web application built with React (frontend) and Node.js / Express / MongoDB (backend).  
Users can sign up, log in, add, view, and manage their notes.

---

## 🎥 Video Demo

[Watch the demo video](./Assets/Recording%202025-10-01%20000219.mp4)
[Visit the live Site](https://notex-05nv.onrender.com/home)

---

## 🧰 Tech Stack

| Layer         | Technology / Framework           |
|----------------|----------------------------------|
| Frontend       | React, Create React App, serve   |
| Backend        | Node.js, Express                 |
| Database       | MongoDB Atlas (Mongoose)        |
| Authentication | JWT (JSON Web Tokens)            |
| Deployment     | Render.com (backend & frontend) |
| Others         | CORS, dotenv, etc.               |

---

## 🚀 Features

- User registration & authentication  
- Add notes (title, description)  
- Retrieve notes for logged-in user  
- Responsive UI  
- Deployed online via Render  

---

## 🛠️ Installation & Setup (Local)

1. **Clone the repository**

   `
   git clone https://github.com/Varun04-pixel/NoteBook-app.git
   cd NoteBook-app`

2. **Backend setup**

    `cd Backend
    npm install`
    # create a `.env` file and add this:
    # MONGO_URI=your_mongodb_connection_string
    # PORT=5000
    # JWT_SECRET=some_secret_code (combination od numbers, symbols, alphabets)
    npm start   # or `nodemon server.js`

3. **Frontend setup**

    open new terminal let the backend run on curent terminal
    cd note-app
    npm install
    # create `.env` file in frontend and add this:
    # REACT_APP_HOST=https://localhost:5000
    in package.json change the `"start": "serve -s build",`  with `"start": "react-script start",`
    npm start     # for development

4. **Open browser at http://localhost:3000 (or whichever port React serves).**

    backend is served at port 5000
    frontend is served at port 3000