import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header (AppBar) for the Todo app, shows app title and optional children (filters, stats etc).
 */
const Header = ({ children }) => (
  <header className="todo-header" role="banner">
    <h1 className="todo-title">Simple Todo App</h1>
    {children}
  </header>
);

export default Header;
