# Full Stack Open - Part 7: Custom hooks, esbuild

This repository contains my solutions for **Part 7** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to master advanced React abstractions, explore build tools, and finalize the development architecture by transforming a standalone application into a fully optimized production monorepo.

### 📚 Learning Objectives:

- **More about React hooks (Part 7a)**: Abstracting complex state and data interactions into highly reusable custom hooks.
- **Vite internals and esbuild (Part 7b)**: Understanding modern build tools, code transpilation, and performance bundlers like esbuild.
- **Miscellaneous (Part 7c)**: Implementing production-ready error trapping via React **Error Boundaries** and handling unmapped client paths using **Splat routes (404 Page Not Found)**.
- **Exercises: extending the bloglist (Part 7d)**: Transitioning an entire application architecture into a centralized monorepo while refactoring state management.

### 🛠️ Projects & Exercises:

- **[Blog List App](./bloglist-app)**  
  _A major production-level overhaul and structural extension of the complete Blog List application. Both the client and server code are consolidated into a synchronized monorepo workflow._
  - **Zustand State Refactoring**: _Replaced all legacy component-level states with global Zustand stores to manage notifications, live data mutation arrays (likes, deletions), and token-based persistent user sessions._
  - **Persistent Session Refactoring**: _Extracted explicit localStorage mechanisms into a standardized, reusable `persistentUser.js` service layer._
  - **Controlled Input Abstraction**: _Refactored user credentials and content submission forms to leverage the decoupled `useField` custom hook abstraction._
  - **Anonymous Discussion**: _Extended the database schema and controllers to implement a fully working anonymous comment system (`POST /api/blogs/:id/comments`)._
  - **UI & Error Modernization**: _Wrapped dynamic components inside a class-based Error Boundary to catch rendering bugs, and fully structured the interfaces with Material UI (MUI)._

- **[Routed Anecdotes](./routed-anecdotes)**  
  _A single-page application built around custom hooks and navigation. It uses dynamic routing paths to transition cleanly between different components (Anecdote List, Detail View, Creation Form, and Information Page) while utilizing centralized hook abstractions for controlled form processing._

---

_Built with React, Zustand, React Router, Material UI, Express, Node.js, and MongoDB._

---

### ⚠️ Note on Environment Variables:
To connect to the database infrastructure, create a `.env` file inside the `bloglist-app/server` directory:
`MONGODB_URI=your_development_mongodb_connection_string`
`TEST_MONGODB_URI=your_test_mongodb_connection_string`
`PORT=3003`
`SECRET=your_jwt_token_secret_phrase`
