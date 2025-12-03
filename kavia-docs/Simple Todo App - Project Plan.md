# Simple Todo App – Project Plan

## Project Overview and Goals

The Simple Todo App is a web-based application that enables users to efficiently manage their list of tasks. Users will be able to add new todos, mark them complete or active, filter and remove them, and easily visualize the current state of their todo list. The primary goal is to offer a responsive, accessible, and visually appealing task manager with a modern, professional interface, leveraging the Ocean Professional theme for a distinctive appearance.

## Scope and Assumptions

**Scope:**
- Single-page React frontend application targeting modern browsers (Chrome, Firefox, Edge, Safari).
- All functionality is implemented entirely client-side; backend APIs are optional for initial MVP, but the system is designed for easy integration with a backend if/when needed.
- Users can add, complete, delete, and filter todos.
- No user authentication or multi-user features in MVP.
- All data is persistent in localStorage unless configured otherwise via environment variables.

**Assumptions:**
- The audience is familiar with basic web usage; no onboarding required.
- Most users will interact with the app using desktop or mobile browsers.
- The Ocean Professional style is enforced throughout for brand consistency.
- If backend API URLs are provided as environment variables, the app will use them; if not, localStorage is used.
- Codebase follows best practices for accessibility, performance, and maintainability.

## Architecture Overview

- **Frontend:** React SPA, using function components and hooks, modern ECMAScript, CSS for styling (with possibility of CSS modules).
- **Single Container:** All code resides within the `frontend_reactjs` container (`simple-todo-list-1715-1724/frontend_reactjs`).
- **APIs (optional):** The app can interact with a backend API if the URL is given via environment variables. API endpoints assumed:  
  - `GET /todos`: List all todos  
  - `POST /todos`: Add new todo  
  - `PATCH /todos/:id`: Update completion status  
  - `DELETE /todos/:id`: Remove todo  
- **Fallback:** In the absence of API config, localStorage is the default persistence layer.
- No server-side rendering or SSR; everything is client-rendered.

## Feature List

### MVP Features
- Add new todo items (single input + submit).
- List all existing todos.
- Mark todos as completed or active.
- Remove (delete) todos.
- Filter view: All, Active, Completed.
- Counter indicating number of active (incomplete) todos.
- Responsive design (works on desktop and mobile).
- Persistence (localStorage unless API configured).
- Apply Ocean Professional theme consistently.

### Nice-to-have Features
- “Clear Completed” action (remove all completed todos at once).
- Keyboard shortcuts for quick actions.
- Editable todo text (inline editing).
- Bulk toggle for marking all todos complete/incomplete.
- Light/dark theme toggle.
- Simple animations for task add/complete/delete.
- Accessibility enhancements (skip links, focus management notifications).

## UI/UX Plan (Ocean Professional Theme)

- **Header:** App title, optional theme toggle (light/dark), and accent highlights using primary and secondary colors.
- **Input Area:** Prominent, centrally placed input box and add button.
- **List View:** Each todo rendered with clear separation, subtle shadow, rounded corners, and checkbox for completion. Delete icon appears on hover/focus.
- **Filters/Status Bar:** At the bottom of the list – filter buttons (All / Active / Completed), “Clear Completed” action, and active counter – using accent colors for emphasis.
- **Responsiveness:** Stacks vertically on mobile, uses max-width constraints on desktop.
- **Visual System:**  
  - Primary: #2563EB (blue for buttons, highlights)
  - Secondary: #F59E0B (amber for interactive/hover)
  - Error: #EF4444 (delete)
  - Gradients: Subtle backgrounds using `from-blue-500/10 to-gray-50`
  - Background: #f9fafb, Surface: #fff, Text: #111827
- **Aesthetic:** Modern, minimal, clean with subtle transitions and soft gradients for depth. All interactive elements have hover/focus visual feedback.

## State Management and Data Model

- **State Management:**  
  - React `useState` and `useEffect` for core state.  
  - All todos stored in a central state in `App.js` (or via Context if scaling out).
  - Syncs with localStorage or backend as appropriate.
  - Filters and UI status (loading, error) managed in component state.
- **Data Model:**  
  ```js
  {
    id: string,           // Unique identifier (uuid or timestamp-based)
    text: string,         // The task content
    completed: boolean,   // Completion status
    createdAt: string     // Optional: ISO date for sort/audit
  }
  ```
- **Persistence:**  
  - `localStorage` (MVP default)  
  - Swappable with backend via API methods if environment variables are configured.

## Routing

- **Routing Approach:**  
  - Single-page application – all core features accessible from the single main route (`/`).
  - No additional pages or complex routes in MVP.
  - If “nice-to-have” features are expanded (e.g., about/settings), could add React Router but not required for current scope.

## Environment Variables Usage Strategy

- All environment variables prefixed with `REACT_APP_` as per Create React App conventions and .env file in the container.
- Variables in use:
  - `REACT_APP_API_BASE`, `REACT_APP_BACKEND_URL`, `REACT_APP_FRONTEND_URL`, `REACT_APP_WS_URL`: Used to direct API calls to a backend if present.
  - `REACT_APP_NODE_ENV`, `REACT_APP_ENABLE_SOURCE_MAPS`, `REACT_APP_PORT`, `REACT_APP_TRUST_PROXY`, `REACT_APP_LOG_LEVEL`, `REACT_APP_HEALTHCHECK_PATH`: Used for build/runtime behaviors/logging/health in different environments.
  - `REACT_APP_FEATURE_FLAGS`, `REACT_APP_EXPERIMENTS_ENABLED`: Used for toggling features or experiments (for staging/prod).
- **Strategy:**  
  - On startup, app checks for presence of `REACT_APP_API_BASE` or relevant backend URL.
  - If present, all CRUD is done via the remote API (see endpoints above).
  - Otherwise, persists to localStorage.
  - Protects against accidental deployment of DEV endpoints to production by defaulting to local mode.

## Build, Deploy Approach & Preview Notes

- **Build:**  
  - Use `npm run build` for production; produces minified bundles in `/build`.
  - Modern static hosting (Vercel, Netlify, GitHub Pages, or custom server) or Docker container.
  - `REACT_APP_*` variables must be defined at build time for proper injection.
- **Deployment/Preview:**  
  - Default port 3000 for dev server; same as preview environment for consistency.
  - Healthcheck and liveness endpoints as per environment variables for container health management.
  - For backend mode: ensure CORS is configured on server.
- **Note:**  
  - If previewing on a new env/URL, ensure relevant hostnames/ports are added to config.

## Testing Strategy

- **Unit Testing:**  
  - Use Jest and React Testing Library (pre-installed with CRA) for core components: AddTodo, TodoList, FilterBar, etc.
- **Integration Testing:**  
  - Test flows like add-remove-complete todo, filter switching, persistence after reload.
- **Manual Testing:**
  - Confirm accessibility (keyboard, screen reader, focus).
  - Visual regression test for Ocean Professional theme integrity.
- **Automated/Nice-to-have:**  
  - E2E testing with Cypress or Playwright for core interactions (beyond MVP).

## Accessibility and Performance Considerations

- **Accessibility:**
  - All controls are keyboard accessible and have sensible ARIA labels.
  - High color contrast as per Ocean Professional palette.
  - Proper tab order, focus ring, and skip-to-content link.
  - Live regions/alerts for status changes where appropriate.
- **Performance:**
  - Lazy-load heavy dependencies if any appear.
  - Minimize re-renders using memoization where needed.
  - Leverage efficient updates for localStorage/API calls.
  - Optimize for bundle size; avoid excessive libraries.
  - Fast startup (<1s interactive in dev, <0.5s in prod).

## Risks and Mitigations

| Risk                                 | Mitigation                                                |
|---------------------------------------|-----------------------------------------------------------|
| Deployment misconfigured (API/local)  | Auto-detect mode, clear messaging if API unreachable      |
| Theme inconsistency                   | Use central CSS vars; audit UI at end of dev phase        |
| Accessibility issues                  | Test with screen readers, use Lighthouse, update early    |
| LocalStorage limits/corruption        | Clear on error, UX messaging for edge cases               |
| Unexpected build environment          | Log current env on app load, guard with default fallback  |

## Milestones with Rough Timeline

| Milestone                     | Est. Duration | Key Deliverables                             |
|-------------------------------|---------------|----------------------------------------------|
| Project Setup & Theme Base    | 0.5 days      | React app created, Ocean theme styles ready  |
| Core Todo Logic (MVP)         | 1 day         | Add/list/complete/remove/filter todos        |
| Persistence Layer (local/API) | 0.5 days      | localStorage+API implementation, env logic   |
| Responsive UI/UX Polish       | 0.5 days      | All layouts mobile-friendly, theme polish    |
| Accessibility & Testing       | 0.5 days      | Unit/integration tests, accessibility checks |
| Optional/Nice-to-have feats   | 0.5–1 day     | Edit todos, clear completed, shortcuts etc.  |
| Deployment & Review           | 0.25 days     | Build, deploy, preview, QA round            |

**Total:** ~3–4 dev days for robust MVP with polish.

---

**This plan serves as a practical, implementation-oriented blueprint for the creation and successful delivery of the Simple Todo App with the Ocean Professional look and feel.**

