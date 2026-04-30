# College Discovery Platform

A full-stack college discovery and comparison platform where users can:

- Register & Login
- Browse Colleges
- Search & Filter Colleges
- Save Favorite Colleges
- Compare Multiple Colleges
- View Detailed College Information

Built using:

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL + Prisma ORM
- Deployment: Vercel + Render + NeonDB

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React

## Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- Cookie Parser
- CORS

## Database
- NeonDB PostgreSQL

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# Features

## Authentication
- User Signup
- User Login
- Logout
- JWT Cookie Authentication

## Colleges
- View All Colleges
- Search Colleges
- Filter Colleges
- Pagination
- College Details Page

## Saved Colleges
- Save Colleges
- Remove Saved Colleges

## Compare Colleges
- Compare up to 3 colleges
- Floating compare bar
- Responsive comparison table

---

# Folder Structure

## Frontend

```txt
client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
```

## Backend

```txt
server/
│
├── controllers/
├── routes/
├── middleware/
├── prisma/
├── server.js
└── package.json
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_REPO_URL
```

---

# Backend Setup

```bash
cd server
npm install
```

## Create `.env`

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

## Run Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

## Start Backend

```bash
npm start
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

## Frontend

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

## Backend

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

---

# Deployment

## Frontend
Deploy on Vercel

## Backend
Deploy on Render

## Database
Use Neon PostgreSQL

---

# Author

Adam Ali
