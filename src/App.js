import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import './App.css';

// API URL and API key
const API_URL = 'https://cse204.work/todos';
const API_KEY = 'cb1a13-9e96f7-bd95e1-7e07ab-beff4a';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await fetch(API_URL, {
          headers: {'x-api-key': API_KEY}
        });

        // if statement
        if (response.ok) {
          const todosData = await response.json();
          // alphabetically
          setTodos(todosData.sort((a, b) => a.text.localeCompare(b.text)));
        } else {
          throw new Error('Unable to fetch todos');
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }

    loadTodos();
  }, []);

  const handleAddTodo = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({ text })
      });
      if (response.ok) {
        const addedTodo = await response.json();
        // Update new todo
        setTodos(prev => [...prev, addedTodo].sort((a, b) => a.text.localeCompare(b.text)));
      } else {
        throw new Error('Failed to create todo');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify({ completed: !todoToUpdate.completed })
        });
        if (response.ok) {
          // completion
          setTodos(current =>
            current.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
          );
        } else {
          throw new Error('Failed to update todo');
        }
      } catch (error) {
        console.error('Error toggling todo:', error);
      }
    }
  };
// delete
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {'x-api-key': API_KEY}
      });
      if (response.ok) {
        // Remove
        setTodos(current => current.filter(todo => todo.id !== id));
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <AddTodoForm onAddTodo={handleAddTodo} />
        <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
      </header>
    </div>
  );
}

export default App;
