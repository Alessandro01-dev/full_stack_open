# Full Stack Open - Part 2: Communicating with Server

This repository contains my solutions for **Part 2** of the Full Stack Open course from the University of Helsinki.

The focus of these exercises is to learn how to fetch and store data on a **backend server**, manage side effects with hooks, and style React applications using CSS.

### 📚 Learning Objectives:
- Rendering **collections** and using the `key` attribute correctly.
- Communicating with a backend server using **Axios** and the `useEffect` hook.
- Performing **CRUD** operations (Create, Read, Update, Delete) against a JSON API.
- Implementing **Promises** and handling asynchronous code with `then` and `catch`.
- Managing **application notifications** (success and error messages).
- Integrating **external APIs** (OpenWeather) and managing environment variables with `.env`.

### 🛠️ Exercises:

- **[Course Info](./courseinfo)**  
  *An extension of the Part 1 app, now refactored to handle an array of courses with multiple sub-modules using the `.map()` function and calculating totals with `.reduce()`.*

- **[Phonebook](./phonebook)**  
  *A full-featured contact management app. It allows users to add, update, and delete entries, syncing all changes with a `db.json` file. It features real-time filtering and custom notification components for user feedback.*

- **[Data for Countries](./countries)**  
  *A search tool that fetches data from the Rest Countries API. It displays country details, flags, and languages, and integrates with the OpenWeather API to show real-time weather data for the capitals.*

---
*Built with React, Vite, Axios, and styled with custom CSS.*

### ⚠️ Note on Environment Variables:
The **Data for Countries** app requires an API key from OpenWeatherMap. Create a `.env` file in the root directory and add your key:
`VITE_API_KEY=your_key_here`