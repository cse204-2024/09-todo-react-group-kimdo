import React from 'react';
import TodoItem from './TodoItem'; // Assuming TodoItem is a separate component

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <ul className="task-box">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;