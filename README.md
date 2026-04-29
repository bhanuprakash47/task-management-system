# Task Management System

This is a full-stack task management application where users can register, log in, and manage their own tasks securely.

## Tech Stack

Backend:
- Node.js
- Express
- Sequelize ORM
- PostgreSQL (Supabase)

Frontend:
- React (Vite)
- Tailwind CSS
- Axios

Deployment:
- Frontend: Vercel
- Backend: Render
- Database: Supabase

## Features

- User signup and login
- JWT-based authentication
- Protected APIs
- Create, read, update, delete tasks
- Delete all tasks of a user
- Each user can access only their own tasks
- Simple and clean UI

## Project Structure

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

## Environment Variables

Backend (.env)

DATABASE_URL=your_supabase_postgres_url  
PORT=5000  
JWT_SECRET_KEY=your_secret_key  

Frontend (.env)

VITE_API_URL=http://localhost:5000  

## How to Run Locally

Backend

cd backend  
npm install  
npm run dev  

Frontend

cd frontend  
npm install  
npm run dev  

Open in browser:
http://localhost:5173

## How Authentication Works

1. User logs in using email and password
2. Server returns a JWT token
3. Token is stored in localStorage
4. Every request sends token in Authorization header
5. Backend verifies token before giving access

If token is invalid or expired, user is logged out.

## API Endpoints

Base URL:
http://localhost:5000/api

Auth:

POST /api/auth/signup  
POST /api/auth/login  

Tasks (Protected):

Authorization: Bearer <token>

GET /api/tasks  
POST /api/tasks/create  
GET /api/tasks/:id  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  
DELETE /api/tasks  

## Deployment

Backend (Render):
- Build: npm install
- Start: node server.js
- Add env variables: DATABASE_URL, JWT_SECRET_KEY

Frontend (Vercel):
- Build: npm run build
- Output: dist
- Add env: VITE_API_URL=https://your-backend-url/

Database (Supabase):
- Use PostgreSQL connection string
- Enable SSL in Sequelize config

## Notes

- Do not use sequelize.sync({ alter: true }) in production
- Use migrations for production database changes
- Make sure CORS is enabled in backend
- Always use correct API URL in frontend

## Common Issues

1. Tasks not creating  
Check if user is logged in and token is valid

2. API not working  
Check backend URL and frontend env file

3. Database error  
Check DATABASE_URL and connection

## Scripts

Backend:
npm run dev  
npm start  

Frontend:
npm run dev  
npm run build  
npm run preview  

## Future Improvements

- Add validation for inputs
- Add pagination and filtering
- Improve UI
- Add tests
- Use secure cookies instead of localStorage

## Summary

This project shows how to build a complete full-stack application with authentication, database integration, and deployment.