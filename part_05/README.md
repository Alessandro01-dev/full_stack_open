# Full Stack Open - Part 5: Testing React Apps

This repository contains my solutions for **Part 5** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to complete the **Blog List** application by implementing the frontend logic, managing user authentication, and ensuring application reliability through **unit, integration, and end-to-end (E2E) testing**.

### 📚 Learning Objectives:
- Implementing **Token-based authentication** on the frontend and managing user sessions with `localStorage`.
- Handling complex application states, including **conditional rendering** of forms and components.
- Using **React Refs** and the `useImperativeHandle` hook to manage component visibility (Togglable).
- Implementing **React Router** to create a multi-page feel with dynamic routing (`/blogs/:id`, `/login`, `/create`).
- Writing unit and integration tests for React components using **Vitest** and **React Testing Library**.
- Developing robust **End-to-End (E2E) tests** using **Playwright** to simulate real user interactions in the browser.
- Professionalizing the UI using **Material UI (MUI)** components, custom layouts, and responsive design.

### 🛠️ Exercises:

- **[Blog List Frontend](./bloglist-frontend)**  
  *A fully featured React application that allows users to manage a collection of blog posts. Key features include:*
  - **Authentication**: *Secure login/logout flow with persistent sessions.*
  - **Blog Management**: *Users can create, like, and delete blog posts (with creator-only permission for deletion).*
  - **Routing**: *A complete navigation system using React Router, featuring a dedicated view for single blog details and a separate creation form.*
  - **Modern UI**: *Styled with Material UI, featuring a centered layout (Container), a professional navigation bar (AppBar), and a polished single-blog view (Paper).*

- **[Blog List E2E Tests](./bloglist-e2e)**  
  *A comprehensive end-to-end testing suite built with Playwright. It covers critical user flows such as login success/failure, blog creation, liking functionality, and permission-based deletion.*

---
*Built with React, Vite, React Router, Material UI, Vitest, and Playwright.*