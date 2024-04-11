import React, { useState } from 'react';
import './App.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoText) => {
    const newTodo = { id: Date.now(), text: todoText, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
