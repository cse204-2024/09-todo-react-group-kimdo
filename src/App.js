import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const API_KEY = 'cb1a13-9e96f7-bd95e1-7e07ab-beff4a';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the API and set them to state
    const fetchTodos = async () => {
      const response = await fetch('https://cse204.work/todos', {
        headers: {
          'x-api-key': API_KEY
        }
      });
      if (!response.ok) {
        // Handle errors here
        console.error('Failed to fetch todos:', response.statusText);
        return;
      }
      const data = await response.json();
      // Sort todos alphabetically by text
      const sortedData = data.sort((a, b) => a.text.localeCompare(b.text));
      setTodos(sortedData);
    };

    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    // API call
    const response = await fetch('https://cse204.work/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ text: text })
    });
    if (!response.ok) {
      console.error('Failed to add todo:', response.statusText);
      return;
    }
    const newTodo = await response.json();

    // new todo
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      return updatedTodos.sort((a, b) => a.text.localeCompare(b.text));
    });
  };
  

  const toggleTodo = async (id) => {
    // Find the current todo item
    const currentTodo = todos.find(todo => todo.id === id);
    
    // If the todo is found, proceed to toggle its completion status
    if (currentTodo) {
      try {
        const response = await fetch(`https://cse204.work/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify({ completed: !currentTodo.completed })
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const updatedTodo = await response.json();
  
        // Log the updated todo to see if it's correct
        console.log('Updated Todo:', updatedTodo);
  
        // Update the state with the new toggled todo item
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
      } catch (error) {
        console.error('Failed to toggle todo:', error);
      }
    }
  };
  

  const deleteTodo = async (id) => {
    // API
    const response = await fetch(`https://cse204.work/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY
      }
    });
    if (!response.ok) {
      console.error('Failed to delete todo:', response.statusText);
      return;
    }
    // Update deleted todo
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
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
