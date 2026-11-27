# Full Stack Open - Part 14: Next.js

This repository folder contains my solutions for **Part 14** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to build a full-stack application with **Next.js** and the App Router: moving from single page apps to server side rendering, using Server Components and Server Actions, storing data in a PostgreSQL database with **Drizzle ORM**, adding authentication, and testing the result with Playwright in GitHub Actions.

### 📚 Learning Objectives:

- **From single page apps to server side rendering (Chapter 2)**: Creating a Next.js app with the App Router, layouts and navigation with `Link`, Server Components, dynamic route segments (`/blogs/[id]`), Server Actions with forms and hidden fields, revalidating pages, and filtering a list with URL search parameters.
- **Databases, Migrations, and Relations (Chapter 3)**: Deploying to Vercel, replacing in-memory data with a Neon PostgreSQL database, accessing it with Drizzle ORM (schema, connection and migrations), adding a users table with a foreign key, and fetching related data with join queries.
- **Authentication and more (Chapter 4)**: Credentials login with NextAuth and JWT sessions, user registration with `bcrypt` password hashing, server-side validation with `useActionState`, notifications with React Context, styling with Tailwind CSS, API Route Handlers protected with a personal token, a reading list, a static homepage written in MDX, and end-to-end testing with Playwright in GitHub Actions.

### 🛠️ Projects & Exercises:

- **[Blogs Next](./blogs-next)**  
  _A Next.js version of the Blog List application, built with the App Router, TypeScript, Tailwind CSS, Drizzle ORM and a Neon PostgreSQL database, deployed on Vercel._
  - **Blogs**: _List ordered by number of likes, search by title through the `?filter=` URL parameter (a GET form handled by a Server Component), an individual blog page with a like button implemented as a Server Action, and a creation form with server-side validation that keeps the typed values after an error._
  - **Users**: _A users list and a `/users/[username]` page that loads the user and their blogs with a single Drizzle relational query._
  - **Authentication**: _Login with the NextAuth credentials provider and JWT sessions, and registration with validation (minimum lengths, password confirmation, unique username) and `bcrypt` password hashing._
  - **My Page**: _`/me` is available only to logged-in users and shows the profile, an API token that can be generated and regenerated, and the reading list._
  - **Reading List**: _Every blog a user creates is added to their list automatically, other users can add it with a button, and the list on `/me` is split into unread and read blogs with a "mark as read" action._
  - **API**: _`GET /api/me` is a Route Handler authenticated with an `Authorization: Bearer <token>` header. It returns the user's data and their created blogs as JSON, and answers `401` for any invalid token._
  - **Notifications and Styling**: _A notification shown through a React context after actions, and the whole app styled with Tailwind CSS._
  - **Homepage**: _A static homepage written in MDX._
  - **Testing support**: _`DELETE /api/testing/reset` and `POST /api/testing/users` prepare the database for the tests and answer `403` in production._
  - **Testing**: _The course-provided Playwright suite (28 end-to-end tests) runs against a dedicated test database, locally with `npm run test:e2e` and in GitHub Actions._

---

_Built with Next.js, React, TypeScript, Tailwind CSS, Drizzle ORM, Neon PostgreSQL, NextAuth, MDX, and Playwright._

---

### ⚠️ Note on Environment Variables:

To run the app, create a `.env.local` file in the `blogs-next` directory:
`DATABASE_URL=your_neon_database_connection_string`
`AUTH_SECRET=your_random_secret_string`
`AUTH_URL=http://localhost:3000`

Then install the dependencies, apply the migrations and start the app:
`npm install`
`npx drizzle-kit migrate`
`npm run dev`

The end-to-end tests (`npm run test:e2e`) call the reset route, which empties **all tables** of the database in `.env.local`. Use a dedicated development database for this, never the production one.

### ⚠️ Note on CI:

The Playwright workflow (`part14-e2e-tests.yml`) is located in `.github/workflows` at the root of the repository, alongside the workflows for the other parts of the course. It runs only when files in `part_14` change and uses a separate test database, configured through the `DATABASE_URL`, `NEXTAUTH_SECRET` and `NEXTAUTH_URL` repository secrets.
