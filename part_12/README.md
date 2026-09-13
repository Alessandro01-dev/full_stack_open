# Full Stack Open - Part 12: Containers

This repository folder documents **Part 12** of the Full Stack Open course from the University of Helsinki.

Unlike the other parts, the exercises in this module center on Docker rather than application code: containerizing a Node/Express backend and a React frontend, orchestrating multi-service environments with Docker Compose, setting up an Nginx reverse proxy, and building both development (hot-reload) and production configurations, including an automated CI pipeline running end-to-end tests against the production build. For that reason, this part was completed in a dedicated repository instead of the main monorepo.

### 📚 Learning Objectives:

- **Introduction to Containers**: Understanding what containers and images are, and running/inspecting containers with the Docker CLI.
- **Building and configuring environments**: Writing Dockerfiles, using Docker Compose to orchestrate a Node backend alongside MongoDB and Redis, and persisting data with volumes.
- **Basics of Container Orchestration**: Containerizing a React frontend with multi-stage builds, running tests during the image build, setting up a full development environment (frontend + backend + Nginx reverse proxy) with hot-reload via bind mounts, and building a production `docker-compose.yml` with optimized images and a single Nginx entry point.

### 🛠️ Projects & Exercises:

- **[full_stack_open_containers](https://github.com/Alessandro01-dev/full_stack_open_containers)**
  _All exercises for this part: the course-provided todo application (Express + MongoDB + Redis backend, React + Vite frontend) taken from local Docker basics through a full dev/production setup with an Nginx reverse proxy and a GitHub Actions CI pipeline running Playwright end-to-end tests, plus a second containerized environment (dev and production) built from scratch for the GraphQL library application from Part 8._

---

_Built with Docker, Docker Compose, Nginx, Node.js, Express, MongoDB, Redis, React, Vite, and Playwright._

---

### ⚠️ Note on repository structure:

This folder intentionally does not contain application code. The exercise repository is public; see its own README for further details and a link to the library application's source.
