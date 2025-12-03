import React from "react";

/**
 * PUBLIC_INTERFACE
 * Footer/status bar for filtering, stats, and clear completed.
 */
const FILTER_OPTIONS = [
  { key: "all", text: "All" },
  { key: "active", text: "Active" },
  { key: "completed", text: "Completed" },
];

const Footer = ({
  count,
  filter,
  onFilter,
  onClearCompleted,
  completedTodos,
}) => (
  <footer className="todo-footer" aria-label="Todo filters and status">
    <div className="todo-count" aria-live="polite">
      {count} item{count !== 1 && "s"} left
    </div>
    <div className="todo-filters" role="tablist" aria-label="Filters">
      {FILTER_OPTIONS.map(opt => (
        <button
          key={opt.key}
          className={`todo-filter-btn${filter === opt.key ? " selected" : ""}`}
          aria-selected={filter === opt.key}
          aria-label={`Show ${opt.text} todos`}
          role="tab"
          onClick={() => onFilter(opt.key)}
          tabIndex={0}
        >
          {opt.text}
        </button>
      ))}
    </div>
    <button
      className="todo-clear-btn"
      style={{ display: completedTodos > 0 ? "inline-block" : "none" }}
      onClick={onClearCompleted}
      aria-label="Clear completed todos"
      disabled={completedTodos === 0}
      tabIndex={0}
    >
      Clear completed
    </button>
  </footer>
);

export default Footer;
