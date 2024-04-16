import React, { useState } from 'react';
import './App.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

// adding new todo.
  const addTodo = (todoText) => {
    const newTodo = { id: Date.now(), text: todoText, completed: false };
    const newTodos = [...todos, newTodo].sort((a, b) => a.text.localeCompare(b.text)); // Sort when adding
    setTodos(newTodos);
  };
  // completed status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
// delete
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // alphabet
  const sortedTodos = todos.sort((a, b) => a.text.localeCompare(b.text));

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todos={sortedTodos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />
      </header>
    </div>
  );
}


export default App;
