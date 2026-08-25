# Full Stack Open - Part 6: Advanced State Management

This repository contains my solutions for Part 6 of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to implement state management paradigms in React applications using Zustand for client state, React Query for server-state synchronization and the native Context API for UI management.

### 📚 Learning Objectives:
- Implementing global client state using Zustand.
- Splitting application logic by separating UI presentation from store actions.
- Synchronizing, caching, and managing asynchronous server state using React Query (TanStack Query).
- Executing CRUD operations via asynchronous mutations and managing cache invalidation.
- Creating application-wide UI states using React's native Context API combined with custom hooks.

### 🛠️ Exercises:

- **[Unicafe with Zustand](./unicafe-zustand)**  
  *A refactoring of the Part 1 feedback application. The component state is moved into a global store powered by Zustand to handle state transitions and action dispatches.*

- **[Anecdotes with Zustand](./zustand-anecdotes)**  
  *An implementation of the anecdote voting and creation system. This application leverages Zustand to handle multiple state layers:*
  - **Anecdote Management**: *Data syncing and state mapping for votes and creation.*
  - **Notification Subsystem**: *An action handler that manages the display and cleanup of user feedback banners using timers.*
  - **Filtering**: *Real-time anecdote list filtering separated from the main view components.*

- **[Anecdotes with React Query](./query-anecdotes)**  
  *An implementation that splits state responsibilities into two layers:*
  - **Server State**: *Managed via React Query, handling data mutations and invalidations against the JSON server backend.*
  - **UI Notification State**: *Managed via the native React Context API. It features a custom `useNotification` hook that encapsulates the 5-second `setTimeout` cleanup and handles server-side length validation errors through mutation callbacks (`onSuccess`/`onError`).*

---
*Built with React, Vite, Zustand, TanStack React Query, React Context API and json-server.*