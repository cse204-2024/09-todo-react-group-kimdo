import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-write">
      <input
        type="text"
        className="newTask"
        placeholder="Add New Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="addButton">Add</button>
    </form>
  );
}

export default AddTodoForm;
