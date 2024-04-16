import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  // Initialize todos state from localStorage if available, otherwise start with an empty array.
  // Sort todos alphabetically during initialization.
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
    return initialTodos.sort((a, b) => a.text.localeCompare(b.text));
  });

  // Save todos to localStorage whenever the todos state changes.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo and sort todos alphabetically.
  const addTodo = (todoText) => {
    const newTodo = { id: Date.now(), text: todoText, completed: false };
    const updatedTodos = [...todos, newTodo].sort((a, b) => a.text.localeCompare(b.text));
    setTodos(updatedTodos);
  };

  // Function to toggle the completion status of a todo and maintain sorting.
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ).sort((a, b) => a.text.localeCompare(b.text));
    setTodos(updatedTodos);
  };

  // Function to delete a todo and maintain sorting.
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
      .sort((a, b) => a.text.localeCompare(b.text));
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todos={todos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />
      </header>
    </div>
  );
}

export default App;
