# 🧪 ImagineX Tech Assessment Project

This project is a full-stack web application composed of a **Node.js backend** and a **React frontend**, containerized with Docker.

### Challenge Statement
```
The interviewee will develop an application using Node.js/TypeScript. Feel free to
propose any framework/library you find optimal for the solution.
It’s required to build a “Clock” application that will print messages on screen at
specific time intervals.

Acceptance criteria
- Print the following values at the intervals indicated:
    - “tick” every second.
    - “tock” every minute.
    - “bong” every hour.
- Only one value should be printed in a given second.
    i.e. when printing "bong" on the hour, the "tick" and "tock" values should not be printed.
- The app should run for three hours and then exit.
- A mechanism should exist for the user to alter any of the printed values while the program is running.
    i.e. after the clock has run for 10 minutes I should, without stopping
    the program, be able to change it so that it stops printing "tick"
    every second and starts printing "quack" instead.
- Provide appropriate test coverage.
- We encourage you to structure the project using the best practices that
  you know, preparing your project for a production-ready version that will
  support by another team.
```

---

## 📚 Additional Notes

- The `docker:up` script will automatically build images if they haven't been built already.
- All services run on well-defined ports for easy access:
  - Local development: `5173` (frontend), `3000` (backend)
  - Docker stack: `8080` (frontend), `3000` (backend)
- The backend functionality can be interacted through the command line without the need to run the frontend.
  - `Press "Ctrl+u" to update messages. Press "Ctrl+c" to exit`

---

## 📁 Project Structure

- **Backend**: Express app
    - `src/backend`
- **Frontend**: React single-page application
    - `src/frontend`
- **Shared**: Type definitions common to both the backend and the frontend
    - `src/shared`
- **CI/CD**: GitHub Actions (`test.yml`) for validating tests passing in the repository

---

## 🚀 Getting Started Locally

Install the necessary `node_modules`

```bash
npm install
```

### 🖥️ Backend

Start the backend development server:

```bash
npm run backend:dev
```

The command uses nodemon to automatically reload the backend on code changes.

Run the backend test suites:

```bash
npm run backend:test
```


### 🌐 Frontend

Start the frontend development server:

```bash
npm run frontend:dev
```

The command uses vite to automatically reload the frontend on code changes
- Frontend App: [http://localhost:5173/](http://localhost:5173/)

Run the frontend test suites:

```bash
npm run frontend:test
```

---

## 🐳 Dockerized Setup

You can run the containerized full stack using Docker.

### 🔧 Prerequisites
- [Docker](https://www.docker.com/) must be installed in your machine.

### 🔨 Build Docker Images

```bash
npm run docker:build
```

### 📦 Run Docker Stack

```bash
npm run docker:up
```

This command will:

- Build the images if they haven’t already been built
- Spin up the backend and frontend containers

Once running, the services will be available at:

- **Backend App**: [http://localhost:3000](http://localhost:3000)
- **Frontend App**: [http://localhost:8080/](http://localhost:8080/)

---

## 🛠️ Scripts Overview

| Script                         | Description                            |
|--------------------------------|----------------------------------------|
| `npm run backend:dev`          | Run backend locally with code reload   |
| `npm run backend:serve`        | Serves backend                         |
| `npm run backend:test`         | Runs backend tests                     |
| `npm run backend:test:watch`   | Runs backend tests with code reload    |
| `npm run frontend:dev`         | Runs frontend locally with code reload |
| `npm run frontend:build`       | Creates frontend compiled build        |
| `npm run frontend:test`        | Runs frontend tests                    |
| `npm run frontend:test:watch`  | Runs frontend tests with code reload   |
| `npm run docker:build`         | Build Docker images                    |
| `npm run docker:up`            | Start Docker stack                     |
