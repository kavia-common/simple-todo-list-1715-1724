import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoInput - input field and add button for new todos.
 */
const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState("");
  // Pressing Enter triggers add
  const handleKeyDown = e => {
    if (e.key === "Enter" && text.trim()) {
      handleAdd();
    }
  };
  const handleAdd = () => {
    if (text.trim() !== "") {
      onAdd(text.trim());
      setText("");
    }
  };
  return (
    <div className="todo-input" role="form" aria-label="Add todo">
      <input
        className="todo-input-field"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        aria-label="Todo text"
        autoFocus
      />
      <button
        className="todo-input-add"
        onClick={handleAdd}
        aria-label="Add todo"
        disabled={!text.trim()}
        type="button"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
