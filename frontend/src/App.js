import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const motivationalQuotes = [
    "“Discipline is choosing between what you want now and what you want most.”",
    "“Productivity isn’t about doing more, it’s about doing what matters.”",
    "“Focus is the new IQ.”",
    "“Start where you are. Use what you have. Do what you can.”"
  ];

  useEffect(() => {
    fetchTodos();
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchTodos = () => {
    axios.get('http://127.0.0.1:8000/todos/')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoData = { title, description, completed: false };

    if (editingTodo) {
      axios.put(`http://127.0.0.1:8000/todos/${editingTodo.id}/`, todoData)
        .then(() => {
          resetForm();
          fetchTodos();
        })
        .catch(error => console.error('Error updating todo:', error));
    } else {
      axios.post('http://127.0.0.1:8000/todos/', todoData)
        .then(() => {
          resetForm();
          fetchTodos();
        })
        .catch(error => console.error('Error adding todo:', error));
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/todos/${id}/`)
      .then(() => fetchTodos())
      .catch(error => console.error('Error deleting todo:', error));
  };

  const handleToggleCompleted = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    axios.put(`http://127.0.0.1:8000/todos/${todo.id}/`, updatedTodo)
      .then(() => fetchTodos())
      .catch(error => console.error('Error toggling completion:', error));
  };

  return (
    <div className="App">
      <h1 className="title">To Do List</h1>
      <p className="tagline">“Organize like a strategist. Execute like an AI.”</p>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editingTodo ? "Update ToDo" : "Add ToDo"}</button>
        {editingTodo && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <div className="todo-scroll">
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <strong>{todo.title}</strong> – {todo.description}
              <br />
              Status: {todo.completed ? "✅ Completed" : "❌ Pending"}
              <br />
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <button onClick={() => handleToggleCompleted(todo)}>
                {todo.completed ? "Mark as Undone" : "Mark as Done"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="quote-box">
        {motivationalQuotes[quoteIndex]}
      </div>
    </div>
  );
}

export default App;
