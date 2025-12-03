import React from "react";
import TodoItem from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * TodoList - renders a filtered list of todos with actions.
 */
const TodoList = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onEdit,
}) => {
  // Filter todos by selected tab
  const filtered = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Accessible empty state
  if (filtered.length === 0) {
    return (
      <ul className="todo-list" role="list" aria-live="polite">
        <li className="todo-empty" role="status">
          No {filter !== "all" ? filter : ""} todos.
        </li>
      </ul>
    );
  }

  return (
    <ul className="todo-list" role="list" aria-live="polite">
      {filtered.map((todo, idx) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          tabIndex={0}
        />
      ))}
    </ul>
  );
};

export default TodoList;
