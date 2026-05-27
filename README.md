# AI Academic Workspace SaaS

An AI-powered academic workspace platform built for students, institutions, and academic productivity.

This project combines:
- assignment management
- AI-assisted writing workflows
- workspace organization
- template systems
- authentication
- draft persistence
- SaaS architecture principles

The platform is being built progressively from MVP to production-ready software.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- CSS Modules / Custom CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication
- JWT
- bcryptjs

---

# Features Implemented

## Authentication
- User registration
- User login
- Password hashing
- JWT generation
- Nested auth routes

### Current Auth Routes

/auth/login
/auth/signup

---

## Assignment System
- Create assignments
- Template-generated assignments
- Workspace editor
- Draft persistence
- Assignment metadata rendering
- MongoDB persistence
- Local storage fallback

---

## Workspace
- Dynamic workspace routing
- Assignment loading
- Assignment editing
- Metadata display
- Persistent updates

---

## Dashboard
- Assignment statistics
- Recent assignments
- Assignment status handling

---

# Current Architecture

## Frontend Structure

app/
├── auth/
│   ├── login/
│   └── signup/
│
├── dashboard/
├── assignments/
├── workspace/[id]/
└── templates/

---

## Backend Structure

backend/
├── models/
│   ├── User.js
│   └── Assignment.js
│
├── routes/
│   ├── auth.routes.js
│   └── assignment.routes.js
│
├── controllers/
│
├── middleware/
│
└── server.js

---

# Database

MongoDB is used for persistence.

Current collections:
- users
- assignments

---

# User Model

The user schema currently supports:

- firstName
- lastName
- username
- email
- password
- role
- subscription
- verified

---

# Assignment Model

Assignments currently support:
- title
- content
- status
- course
- courseCode
- lecturer
- category
- createdAt

---

# Authentication

Authentication is handled using:
- bcrypt password hashing
- JWT tokens
- REST APIs

---

# REST API Endpoints

## Auth

POST /api/auth/register
POST /api/auth/login

---

# Development Philosophy

This project is intentionally being built:
- incrementally
- modularly
- with scalable architecture principles

The goal is to evolve from:
- MVP
to:
- production SaaS platform

---

# Future Plans

## Authentication
- Auth context
- Protected routes
- Email verification
- Password reset
- Role authorization

## SaaS Features
- Premium subscriptions
- Institutional plans
- Classroom access
- Admin dashboard

## AI Features
- AI-assisted assignment generation
- Smart templates
- Productivity insights

## Infrastructure
- Cloud deployment
- Docker
- Caching
- Analytics
- Rate limiting

---

# Current Project Status

The platform is currently transitioning from:
Frontend MVP

to:
Authenticated fullstack SaaS architecture.

Core systems are operational and under active development.

---

# Author

Built progressively as a fullstack academic productivity platform using modern SaaS architecture principles.
