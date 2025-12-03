# Simple Todo App (Ocean Professional Theme)

A modern, accessible, single-page todo application built with React and styled with the Ocean Professional palette.

## Features

- Add, edit (inline), and delete todo items
- Mark todos as complete/incomplete with a checkbox
- Filter by All, Active, Completed
- Clear all completed todos
- Local persistence (uses browser localStorage, no backend needed)
- Clean, responsive design, mobile friendly
- Accessibility: semantic elements, proper labels, keyboard and screen-reader friendly
- Ocean Professional styling: blue/amber accents, subtle gradients, light/dark mode toggle

## Usage

1. Install dependencies:
   ```
   npm install
   ```

2. Start the app locally:
   ```
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. (Optional) Run tests:
   ```
   npm test
   ```

4. Build for production:
   ```
   npm run build
   ```

## App Structure

- `src/components/`
  - `Header.jsx`: App title, theme toggle
  - `TodoInput.jsx`: Add new todo
  - `TodoList.jsx`: Renders todos (uses `TodoItem`)
  - `TodoItem.jsx`: Inline edit/toggle/delete single todo
  - `Footer.jsx`: Filter tabs, stats, clear completed
- `src/utils.js`: Pure functions for loading/saving todos (for testing)
- `src/App.css`: Styles using Ocean Professional palette (`#2563EB`, `#F59E0B`, `#EF4444`, etc)

## Environment Variables

The app works out of the box using browser localStorage.
Optionally, you may set the following environment variables (see `.env.example`):

- `REACT_APP_API_BASE`, `REACT_APP_BACKEND_URL`, ...
- `REACT_APP_NODE_ENV`, `REACT_APP_PORT`, etc

If no backend URL is detected, all data is saved in localStorage.

## Accessibility

- All controls are keyboard accessible.
- Proper tab order and ARIA attributes where needed.

## License

MIT

## Credits

Styled per Ocean Professional theme.
