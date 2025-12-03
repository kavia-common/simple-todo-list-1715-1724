const TODOS_KEY = "todos";

/**
 * PUBLIC_INTERFACE
 * Loads todos from localStorage.
 *
 * @returns {Array} Fetched todos array.
 */
export function loadTodos() {
  try {
    const data = localStorage.getItem(TODOS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Saves todos array to localStorage.
 *
 * @param {Array} todos Todos array to persist.
 */
export function saveTodos(todos) {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch {
    // Fail silently for MVP
  }
}

export function uuid() {
  // Public, simple unique ID for MVP purposes
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substr(2, 5)
  );
}
