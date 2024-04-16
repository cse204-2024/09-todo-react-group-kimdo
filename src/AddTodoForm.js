import React, { useState } from 'react';
// input new todo items
function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState('');
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTodo(text);
    setText('');
  };

  return (
    // submit button
    <form onSubmit={handleSubmit} id="todo-form" className="task-write">
    <input
      type="text"
      id="new-task"
      className="new-task"
      placeholder="Write in your new todo"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button type="submit" id="add-todo" className="add-todo">Add</button>
  </form>
  
  );
}

export default AddTodoForm;

