# Full Stack Open - Part 3: Programming a Server with NodeJS and Express

This repository contains my solutions for **Part 3** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to transition into **Full Stack development** by building a backend server with Node.js and Express, connecting it to a MongoDB database, and deploying the complete application to the web.

### 📚 Learning Objectives:
- Creating a RESTful API using **Node.js** and **Express**.
- Using **Morgan** middleware for request logging.
- Connecting the backend to a NoSQL database (**MongoDB Atlas**) using **Mongoose**.
- Implementing **CRUD** operations on a cloud database.
- Managing backend **error handling** with custom middleware.
- Enforcing code quality and style using **ESLint**.
- Deploying the full stack application to **Render** and serving the frontend as static files.
- Managing sensitive information using **environment variables** (`.env`).

### 🚀 Live Demo:
You can find the deployed application here:  
**[Phonebook App on Render](https://phonebook-nzsi.onrender.com/)**

### 🛠️ Exercises:

- **[Phonebook Backend](./backend)**  
  *A robust backend for the Phonebook application. It handles contact data through a MongoDB database, includes full validation (unique names, minimum lengths), and provides a clean API for the frontend to consume. The code is linted with ESLint according to the course standards.*

- **[Phonebook Frontend (Full Stack)](./frontend)**  
  *The updated version of the Part 2 frontend, now modified to communicate with the real Node.js backend. It supports permanent data storage and displays server-side validation error messages.*

---
*Built with Node.js, Express, MongoDB, Mongoose, and ESLint.*

---

### ⚠️ Note on Environment Variables:
The backend requires a connection string to MongoDB Atlas. Create a `.env` file in the `backend` directory and add:
`MONGODB_URI=your_mongodb_connection_string`
`PORT=3001`