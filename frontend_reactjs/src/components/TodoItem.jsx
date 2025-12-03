import React, { useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoItem - shows a single todo with complete toggle, edit inline, delete.
 */
const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  tabIndex,
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  // Focus edit input when editing
  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Save changes on blur or Enter, cancel with Escape
  const finishEdit = () => {
    if (draft.trim() && draft.trim() !== todo.text) {
      onEdit(todo.id, draft.trim());
    }
    setEditing(false);
  };

  const handleKey = e => {
    if (e.key === "Enter") {
      finishEdit();
    } else if (e.key === "Escape") {
      setDraft(todo.text);
      setEditing(false);
    }
  };

  return (
    <li
      className={`todo-item${todo.completed ? " completed" : ""}${editing ? " editing" : ""}`}
      tabIndex={tabIndex}
      aria-label={`Todo: ${todo.text} ${todo.completed ? "(completed)" : ""}`}
      role="listitem"
    >
      <label className="todo-checkbox-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark todo as ${todo.completed ? "incomplete" : "complete"}`}
        />
        <span className="todo-checkbox-custom" />
      </label>
      {editing ? (
        <input
          className="todo-edit-input"
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={finishEdit}
          onKeyDown={handleKey}
          aria-label="Edit todo"
          maxLength={128}
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => setEditing(true)}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === "Enter") setEditing(true);
          }}
          aria-label={todo.text}
        >
          {todo.text}
        </span>
      )}
      <button
        className="todo-delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
        title="Delete"
        tabIndex={0}
      >
        &times;
      </button>
      {!editing &&
        <button
          className="todo-edit-btn"
          onClick={() => setEditing(true)}
          aria-label="Edit todo"
          title="Edit"
          tabIndex={0}
        >✏️</button>
      }
    </li>
  );
};

export default TodoItem;
