import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { loadTodos, saveTodos, uuid } from "./utils";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main App component for Simple Todo App.
 */
function App() {
  // Theme logic (optional, basic MVP)
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Core state logic
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load todos from localStorage on mount
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Add/exported for accessibility: focus input after add
  const inputRef = React.useRef();

  const handleAddTodo = text => {
    if (!text) return;
    setTodos([
      ...todos,
      {
        id: uuid(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
    ]);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleToggle = id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleDelete = id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id, newText) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleFilter = key => setFilter(key);

  const handleClearCompleted = () => {
    setTodos(todos => todos.filter(todo => !todo.completed));
  };

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.length - activeCount;

  return (
    <div className="App">
      <Header>
        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(prev => (prev === "light" ? "dark" : "light"))
          }
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </Header>
      <main className="todo-main" role="main">
        <TodoInput
          onAdd={handleAddTodo}
          inputRef={inputRef}
        />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <Footer
          count={activeCount}
          filter={filter}
          onFilter={handleFilter}
          onClearCompleted={handleClearCompleted}
          completedTodos={completedTodos}
        />
      </main>
    </div>
  );
}

export default App;
