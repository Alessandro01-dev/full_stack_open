# Full Stack Open - Part 11: Continuous Integration

This repository folder documents **Part 11** of the Full Stack Open course from the University of Helsinki.

Unlike the other parts, the exercises in this module center on GitHub-native workflows: branch protection rules, pull requests, GitHub Actions permissions, and third-party integrations (Render, Discord, MongoDB Atlas). Working through these exercises inside the main monorepo would have meant applying CI/CD, branch protection, and deployment configuration to a repository that also hosts unrelated coursework from parts 0-10, which isn't practical. For that reason, this part was completed in two dedicated repositories instead.

### 📚 Learning Objectives:

- **Deployment principles**: Designing a deployment system that fails gracefully, never leaves the app broken, and always allows a rollback.
- **Versioning**: Comparing semantic versioning and hash versioning, and combining both in a single pipeline.
- **GitHub Actions pipelines**: Structuring a workflow into logical, parallelizable jobs (build/test, deploy, notify, tag release).
- **Health checks**: Application-level health check endpoints, both as a deployment gate (Render) and as a scheduled external ping (GitHub Actions cron).
- **Notifications**: Sending build success/failure notifications to Discord via a third-party GitHub Action.
- **Branch protection**: Requiring status checks and pull request reviews before merging, including preventing administrators from bypassing review.
- **Testing pyramid**: Backend integration tests (Node test runner + Supertest), frontend unit tests (Vitest + Testing Library), and end-to-end tests (Playwright), all wired into the same pipeline.

### 🛠️ Projects & Exercises:

- **[full_stack_open_ci](https://github.com/Alessandro01-dev/full_stack_open_ci)**
  _Exercises 1-20: a Pokedex application (provided by the course) used to build the CI/CD pipeline step by step — deployment, versioning and tagging, notifications, periodic health checks, and branch protection._

- **[full_stack_open_ci_phonebook](https://github.com/Alessandro01-dev/full_stack_open_ci_phonebook)**
  _Exercises 21-22: the Phonebook application from Parts 2-3, restructured into a single repository (Express backend at the root, React frontend as a subdirectory) and equipped with its own equivalent CI/CD pipeline, including backend/frontend/e2e tests, deployment, notifications, periodic health checks, and stricter branch protection requiring a reviewed pull request before merging._

---

_Built with Node.js, Express, React, MongoDB, GitHub Actions, Render, and Playwright._

---

### ⚠️ Note on repository structure:

This folder intentionally does not contain application code. Both exercise repositories are public; see each repository's own README for deploy links and further details.
