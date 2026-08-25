# Full Stack Open - Part 8: GraphQL

This repository contains my solutions for **Part 8** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to build a full GraphQL stack from scratch, moving away from REST: designing a schema, implementing resolvers with Apollo Server, connecting a React frontend with Apollo Client, and adding authentication, real-time subscriptions, and testing.

### 📚 Learning Objectives:

- **Getting Started (Chapter 1)**: Understanding the core ideas behind GraphQL as an alternative to REST APIs.
- **GraphQL Server (Chapter 2)**: Setting up Apollo Server, defining a schema, and writing queries, mutations, and resolvers.
- **React and GraphQL (Chapter 3)**: Connecting a React frontend to the GraphQL API using Apollo Client, and managing local and remote state.
- **Database and user administration (Chapter 4)**: Persisting data with MongoDB and Mongoose, and implementing user registration.
- **Login and updating the cache (Chapter 5)**: Adding JWT-based authentication and keeping Apollo Client's cache in sync after mutations.
- **Fragments and subscriptions (Chapter 6)**: Reducing query duplication with fragments and implementing real-time updates with GraphQL subscriptions.

### 🛠️ Projects & Exercises:

- **[Library Backend](./fs-graphql/library-backend)**  
  _A GraphQL API for managing a book library, built with Apollo Server and MongoDB._
  - **Schema & Resolvers**: _Defined types for `Book`, `Author`, and `User`, with resolvers for filtering books by genre/author and computing an author's `bookCount` dynamically._
  - **Authentication**: _Implemented `login` and `createUser` mutations issuing JWT tokens, with a `me` query resolving the current user from request context._
  - **Authorization**: _Guarded `addBook` and `editAuthor` mutations behind authentication checks, throwing structured `GraphQLError`s with specific error codes (`BAD_USER_INPUT`, `UNAUTHENTICATED`)._
  - **Subscriptions**: _Implemented a `bookAdded` subscription using `graphql-subscriptions`' `PubSub`, publishing an event whenever a new book is created._
  - **Testing support**: _Added a test-only `_resetDatabase` mutation, gated behind `NODE_ENV`, to reset the database between test runs._

- **[Library Frontend](./fs-graphql/library-frontend)**  
  _A React client for the library API, built with Apollo Client._
  - **Components**: _`Authors`, `Books`, `NewBook`, `LoginForm`, and `Recommendations`, covering browsing, filtering by genre, adding books/authors, authentication, and personalized recommendations based on the logged-in user's favorite genre._
  - **Cache Management**: _Updated Apollo Client's cache after mutations and subscription events, keeping the UI in sync without unnecessary refetching._

- **[Test Suites (Chapters 4 & 5)](./fs-graphql/tests-chapter4)**  
  _Course-provided test suites used to verify the backend's correctness against the exercises in Chapters 4 and 5._
  - **CI Integration**: _Moved the provided `test-chapter4.yml` and `test-chapter5.yml` workflow files into `.github/workflows` at the repository root, since GitHub Actions only picks up workflow files from that location — running the tests from within the nested `part_8` folder was not possible otherwise._

---

_Built with GraphQL, Apollo Server, Apollo Client, React, MongoDB, Mongoose, JSON Web Tokens, and GraphQL Subscriptions._

---

### ⚠️ Note on Environment Variables:

To connect to the database and enable authentication, create a `.env` file inside the `fs-graphql/library-backend` directory:
`MONGODB_URI=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_token_secret_phrase`
`PORT=4000`
