import React from 'react';

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    // list item
    <li className={`task-box ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
      />
      {/* Displays the todo */}
      <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      {/* Delete button */}
      <button onClick={() => onDeleteTodo(todo.id)} className="delete-btn">Delete</button>
    </li>
  );
}

export default TodoItem;
