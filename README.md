# Task Management System

A full-stack task manager with JWT authentication.

- Backend: Node.js, Express, Sequelize, PostgreSQL
- Frontend: React, Vite, Tailwind CSS, Axios

## Features

- User signup and login
- Protected task APIs with JWT Bearer token
- Create, list, update, delete single task
- Delete all tasks for logged-in user
- Frontend route protection for dashboard

## Project Structure

```text
TaskManagementSystem/
  backend/
    config/
    controllers/
    middlewares/
    models/
    routes/
    server.js
  frontend/
    src/
      components/
      pages/
      services/
```

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL

## Environment Variables

Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/taskManager
PORT=5000
JWT_SECRET_KEY=replace_with_a_long_random_secret
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Notes:

- Backend only uses `DATABASE_URL`, `PORT`, `JWT_SECRET_KEY`.
- Frontend only uses `VITE_API_URL`.
- Use `backend/.env.example` as a template.

## Install and Run

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Alternative production-style run:

```bash
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

## How Authentication Works

1. User logs in with email/password.
2. Backend returns a JWT.
3. Frontend stores token in `localStorage`.
4. Axios sends `Authorization: Bearer <token>` automatically.
5. Backend middleware verifies token and also checks if user still exists in DB.

If token is invalid/expired or user no longer exists, APIs return `401` and frontend redirects to login.

## API Reference

Base URL: `http://localhost:5000`

### Auth

- `POST /auth/signup`
  - Body: `{ "name": "...", "email": "...", "password": "..." }`
  - Success: `201`

- `POST /auth/login`
  - Body: `{ "email": "...", "password": "..." }`
  - Success: `200` with `{ token }`

### Tasks (Protected)

Send header: `Authorization: Bearer <token>`

- `GET /tasks`
  - Returns all tasks of the logged-in user

- `POST /tasks/create`
  - Body: `{ "title": "...", "status": "pending" | "completed" }`

- `GET /tasks/:id`
  - Returns one task if it belongs to logged-in user

- `PUT /tasks/:id`
  - Body: `{ "title"?: "...", "status"?: "pending" | "completed" }`

- `DELETE /tasks/:id`
  - Deletes one task

- `DELETE /tasks/delete`
  - Deletes all tasks for logged-in user

## Development Notes

- Backend startup calls `sequelize.sync({ alter: true })` in `backend/server.js`.
- This is convenient for local development, but do not use this strategy in production.
- Use migrations for production schema changes.

## Common Issues and Fixes

### 1) Foreign key error when creating task

Error example:

```text
violates foreign key constraint "tasks_userId_fkey"
```

Cause:

- Token contains a user id that does not exist in `users` table (stale token or deleted user).

Fix:

1. Logout (or clear `localStorage` token).
2. Login again.
3. If needed, signup again, then login.

### 2) Backend starts but frontend cannot call API

Check:

- `frontend/.env` has correct `VITE_API_URL`
- Backend is running on same port in `backend/.env`

### 3) Database connection error

Check:

- `DATABASE_URL` format
- PostgreSQL server running
- DB user permissions

## Scripts

Backend (`backend/package.json`):

- `npm run dev` -> `nodemon server.js`
- `npm start` -> `node server.js`

Frontend (`frontend/package.json`):

- `npm run dev` -> Vite dev server
- `npm run build` -> production build
- `npm run preview` -> preview production build
- `npm run lint` -> ESLint

## Next Improvements

1. Add request validation for all payloads.
2. Add tests (unit + API integration).
3. Replace `localStorage` token strategy with secure cookies for production.
4. Add Helmet and rate limiting.
5. Replace `sequelize.sync({ alter: true })` with migrations.

