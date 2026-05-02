# Full Stack Open - Part 4: Testing Express Servers, User Administration

This repository contains my solutions for **Part 4** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to professionalize the backend development by implementing a robust **testing strategy**, managing **user accounts** with secure password hashing, and implementing **token-based authentication**.

### 📚 Learning Objectives:
- Structuring the backend into logical layers (**controllers, models, middleware, utils**).
- Writing integration tests using the **Node.js native test runner** and **SuperTest**.
- Implementing **User administration** and linking data between collections using Mongoose **Populate**.
- Securing user passwords using **bcrypt** (hashing).
- Implementing **Token-based authentication** using **JSON Web Tokens (JWT)**.
- Creating custom **Middleware** for token extraction and user identification.
- Mastering **async/await** for cleaner asynchronous code and native error handling in **Express 5**.

### 🛠️ Exercises:

- **[Blog List Backend](./)**  
  *A comprehensive backend for a blog management system. It features a complete REST API with the following capabilities:*
  - **Testing Suite**: *A full set of integration tests that verify API behavior, database consistency, and security rules.*
  - **User Management**: *Supports user creation with validated credentials (unique usernames and minimum password length).*
  - **Security**: *Restricts the ability to create or delete blogs only to authenticated users via JWT. Deletion is further protected, allowing only the original creator to remove a blog.*
  - **Data Relations**: *Utilizes Mongoose's `ref` and `populate` to link blogs to their creators, allowing the API to return enriched data objects.*

---
*Built with Node.js, Express 5, MongoDB, Mongoose, SuperTest, and JWT.*

---

### ⚠️ Note on Environment Variables:
To run the backend, create a `.env` file in the root directory and add the following variables:
`MONGODB_URI=your_development_db_uri`
`TEST_MONGODB_URI=your_test_db_uri`
`PORT=3003`
`SECRET=your_jwt_secret_string`