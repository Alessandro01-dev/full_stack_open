# Full Stack Open - Part 13: Using Relational Databases

This repository folder contains my solutions for **Part 13** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to move the blog backend from MongoDB to a **relational database**: PostgreSQL accessed through the **Sequelize** ORM, with a schema managed by **migrations**, relationships between tables (one-to-many and many-to-many), advanced queries, server-side sessions, and an automated test suite running in GitHub Actions.

### 📚 Learning Objectives:

- **Using relational databases with Sequelize (Chapter 2)**: Comparing schemaless and schema-based databases, running PostgreSQL locally with Docker, accessing it with `psql`, and defining Sequelize models for a first REST API.
- **Join tables and queries (Chapter 3)**: Structuring the application into layers (controllers, models, util), adding users and token-based login, defining one-to-many relationships with a foreign key, and writing queries with `include`, `where`, `order`, `group by` and aggregate functions.
- **Migrations, many-to-many relationships (Chapter 4)**: Replacing `sync()` with versioned **migrations** (Umzug), adding columns and tables over time, modeling a many-to-many relationship with a join table, and implementing **server-side sessions** to revoke access.

### 🛠️ Projects & Exercises:

- **[Blogs SQL](./blogs-sql)**  
  _A relational version of the Blog List backend, built with Node.js, Express 5, PostgreSQL and Sequelize._
  - **Data Model**: _Tables for `users`, `blogs`, `reading_lists` (join table) and `sessions`, all created through migrations. Users and blogs have `created_at` / `updated_at` timestamps, and blogs have a validated `year` field (between 1991 and the current year)._
  - **Authentication & Sessions**: _Login issues a JWT that is also stored in the `sessions` table. A request is accepted only if the token is valid, its session exists, and the user is not disabled, so access can be revoked immediately. `DELETE /api/logout` removes the user's sessions._
  - **Authorization**: _Only logged-in users can create blogs, only the creator can delete a blog, and users can only mark entries in their own reading list as read._
  - **Queries**: _Blog search by keyword in title or author (case-insensitive, `ILIKE`), ordering by likes, a per-author statistics route computed in the database with `GROUP BY`, `COUNT` and `SUM`, and a user route that returns the reading list filtered by read status._
  - **Reading Lists**: _A many-to-many relationship between users and blogs through a join table, exposed with `POST /api/readinglists` and `PUT /api/readinglists/:id`._
  - **Error Handling**: _A centralized error-handling middleware that turns Sequelize validation, uniqueness and database errors into readable `400` responses._
  - **Console Scripts**: _`commands.sql` (the SQL used in the psql console for the first table) and `cli.js` (a script that prints all blogs using Sequelize)._
  - **Testing**: _The course-provided API tests (`node --test`) run against a separate test database, with a test-only `POST /api/reset` endpoint that empties all tables._

---

_Built with Node.js, Express 5, PostgreSQL, Sequelize, Umzug, JSON Web Tokens, Docker, and the Node.js test runner._

---

### ⚠️ Note on Environment Variables:

To run the backend, create a `.env` file in the `blogs-sql` directory:
`DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/postgres`
`TEST_DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/test_db`
`SECRET=your_jwt_secret_string`
`PORT=3001`
