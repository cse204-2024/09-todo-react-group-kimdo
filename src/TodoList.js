import React from 'react';

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
      return (
        <ul className="task-box">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => onDeleteTodo(todo.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      );
    }


export default TodoList;
