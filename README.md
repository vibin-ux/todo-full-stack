# 📝 To Do List – Full Stack Project (React + Django + MongoDB)

Welcome to **To Do List**, a fully functional and stylish full stack task manager app developed by **Vibin Raj**. This application allows users to create, update, and delete tasks efficiently with a user-friendly UI and real-time interaction with a Django REST API backend connected to MongoDB Atlas.

---

## 🌐 Live Stack

- 🔧 **Backend**: Django REST Framework (DRF)
- 💾 **Database**: MongoDB Atlas (via PyMongo)
- 💻 **Frontend**: React.js
- 🌍 **API Communication**: Axios
- 🎨 **UI Styling**: CSS + Animations

---

## 📸 Demo

> 🎥 [Watch the demo video – todo-list-project](https://drive.google.com/file/d/1_IGqQQUWqrWD04LDwa3yb15oaBFke39M/view?usp=drive_link)


---

## 🚀 Features

- ✅ Add, Edit, and Delete tasks
- 🔄 Real-time task update
- ☁️ MongoDB cloud storage (Atlas)
- 🎨 Visually appealing UI with animation
- 🧠 Motivational quote rotation every 5s
- ☑️ Mark tasks as complete (toggle functionality)

---

## 🔧 Getting Started

### 📁 Project Structure

```
full-stack/
│
├── backend/           # Django backend
│   └── demo/          # App with API logic
│
├── frontend/          # React frontend
│   └── src/           # Components and styling
```

### 🔌 Backend Setup

1. Navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Create virtual environment and activate:
    ```bash
    python -m venv .venv
    .venv\Scripts\activate  # For Windows
    ```

3. Install requirements:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure your MongoDB connection in `views.py`:
    ```python
    client = pymongo.MongoClient("your_mongodb_atlas_connection_string")
    ```

5. Run the server:
    ```bash
    python manage.py runserver
    ```

---

### ⚛️ Frontend Setup

1. Navigate to the frontend:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm start
    ```

---

## 🖼️ Screenshots

| Home Page | Task Editor |
|-----------|-------------|
| ![home](./screenshots/home.png) | ![editor](./screenshots/editor.png) |

---

## 💡 Developer

**Name**: Vibin Raj  
**Project**: To Do List Full Stack  
**Tech Stack**: React + Django + MongoDB  
**IDE**: Visual Studio Code

---

## 📜 License

This project is open-source and free to use.

---

## 🙌 Support

If you like this project, feel free to ⭐️ star the repo and share!
