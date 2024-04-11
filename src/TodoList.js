import React from 'react';

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
