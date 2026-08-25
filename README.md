# Full Stack Open - University of Helsinki

This repository contains my solutions for the Full Stack Open course curriculum from the University of Helsinki. The project goes from web basics to full-stack production-ready applications with automated tests.

---

### 📂 Repository Roadmap

- **[Part 0: Fundamentals of Web apps](./part_00)**
  - _Core Topics:_ HTTP GET/POST protocols, classic server-side rendering vs Single Page Applications (SPA), browser network traffic.
  - _Deliverables:_ Sequence diagrams showing how web pages load and send data (`04_New_note_diagram.md`, `05_Single_page_app_diagram.md`, `06_New_note_in_Single_page_app_diagram.md`).

- **[Part 1: Introduction to React](./part_01)**
  - _Core Topics:_ React components, managing state with `useState`, handling events, and basic page layouts.
  - _Deliverables:_ `anecdotes` voting app, `courseinfo` basic page structure, and `unicafe` feedback and statistics app.

- **[Part 2: Communicating with server](./part_02)**
  - _Core Topics:_ Fetching data from a server using Axios, React hooks (`useEffect`), and basic CRUD communication with REST APIs.
  - _Deliverables:_ `countries` data and weather app, `courseinfo` with server data integration, and `phonebook` frontend interface.

- **[Part 3: Programming a server with NodeJS and Express](./part_03)**
  - _Core Topics:_ Building RESTful APIs with Node.js and Express, connecting to MongoDB using Mongoose, and handling backend errors.
  - _Deliverables:_ `phonebook` full-stack app serving a static production build of the frontend directly from the backend server (Deployed on Render).

- **[Part 4: Testing Express servers, user administration](./part_04)**
  - _Core Topics:_ Organizing backend structure, password hashing with bcrypt, backend integration testing (SuperTest), and user login tokens (JWT).
  - _Deliverables:_ `bloglist` REST API backend with secure user login, database relations, and automated backend test suites.

- **[Part 5: Testing React apps, React Router](./part_05)**
  - _Core Topics:_ Saving user sessions in localStorage, using React Refs, component unit testing (Vitest), and browser testing (Playwright).
  - _Deliverables:_ `bloglist-frontend` with user login layers and `bloglist-e2e` browser automated test suites.

- **[Part 6: Advanced state management](./part_06)**
  - _Core Topics:_ Global state management with Zustand, handling server-state data with TanStack React Query, and asynchronous actions.
  - _Deliverables:_ `query-anecdotes` application using React Query, `unicafe-zustand` counter, and `zustand-anecdotes` utilizing global data storage.

- **[Part 7: Custom hooks, esbuild](./part_07)**
  - _Core Topics:_ Creating Custom React Hooks, understanding build tools (esbuild), Error Boundaries, and organizing projects into monorepos.
  - _Deliverables:_ `bloglist-app` client/server layout and `routed-anecdotes` featuring custom page navigation hooks.

- **[Part 8: GraphQL](./part_08)**
  - _Core Topics:_ Writing GraphQL schemas, queries, mutations, subscriptions, and using Apollo Server and Apollo Client.
  - _Deliverables:_ `fs-graphql` system including `library-backend` and `library-frontend` integrations with token-based user login.

- **[Part 9: TypeScript](./part_09)**
  - _Core Topics:_ Adding type safety to projects, using the TypeScript compiler, writing type guards, and structuring typed data.
  - _Deliverables:_ `course` platform, `flightdiaries` full-stack application, `healthapp` CLI calculators, and `patientor` backend/frontend systems backed by automated test environments.

- **[Part 10: React Native](./part_10)**
  - _Core Topics:_ Building cross-platform mobile apps for iOS and Android, layout styling with Flexbox, storing secure mobile data, and navigation.
  - _Deliverables:_ `rate-repository-app` mobile interface built with Expo, connecting to the locally containerized `rate-repository-api`.

---

### ⏳ Future Modules (Work in Progress)

- **Part 11: CI/CD**
- **Part 12: Containers**
- **Part 13: Using relational databases**
- **Part 14: Next.js**
