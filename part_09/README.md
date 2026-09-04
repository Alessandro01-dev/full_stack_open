# Full Stack Open - Part 9: TypeScript

This repository contains my solutions for **Part 9** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to introduce TypeScript into the stack: understanding its type system, typing an Express backend, typing a React frontend, and finally combining both into a complete full-stack application.

### 📚 Learning Objectives:

- **Background knowledge**: Understanding what TypeScript is and how it differs from plain JavaScript.
- **First steps with TypeScript**: Setting up a TypeScript project, configuring `tsconfig.json`, and writing typed utility functions.
- **Typing an Express app**: Building a typed Express API from scratch, starting with pure CLI functions before wrapping them in endpoints, then designing types for diagnoses and patients and validating incoming data with type guards.
- **React with types**: Rewriting a React application with TypeScript, from typed props and state to a fully typed form-based application.
- **Grand finale: Patientor**: Completing Patientor as a full-stack, type-safe application with a React frontend and an Express/TypeScript backend.

### 🛠️ Projects & Exercises:

- **[Health Metrics CLI](./healthapp)**  
  _Standalone, typed CLI utilities for computing BMI and calculating exercise statistics, written in plain TypeScript before being wrapped into Express endpoints._

- **[Health Metrics API Tests](./healthapp-tests)**  
  _Playwright test suite verifying the Express endpoints built on top of the health metrics utilities._

- **[Course Diagnostics App](./course)**  
  _A typed rewrite of the diagnostics application from Part 1, using React with TypeScript and Vite._

- **[Flight Diaries](./flightdiaries)**  
  _A full-stack application for logging flight diary entries, with a typed Express backend and a typed React frontend using conditional rendering and error handling._

- **[Patientor](./patientor)**  
  _The course's capstone project: a patient management system with a typed Express/MongoDB-style backend and a typed React frontend._
  - **Backend**: _Typed API for patients and diagnoses, including type guards for parsing and validating incoming entries (health check, hospital, and occupational healthcare entries) using discriminated unions._
  - **Frontend**: _Patient list and detail views, an entry-adding form with type-safe union handling, and diagnosis code lookups._

- **[Patientor Tests](./patientor-tests)** & **[Patientor API Tests](./patientor-api-tests)**  
  _Playwright test suites covering both the Patientor frontend (end-to-end) and backend API._

---

_Built with TypeScript, React, Vite, Express, and Playwright._

---

### ⚠️ Note on CI:

The Playwright test workflows for the `healthapp` and `patientor` exercises (`.yml` files) are located in `.github/workflows` at the root of the repository, alongside the workflows for the other parts of the course.
