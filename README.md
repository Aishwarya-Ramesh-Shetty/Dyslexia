# Dyslexia Learning Platform

A full-stack MERN application designed to support children with Dyslexia through interactive and gamified learning. The platform helps students improve reading, spelling, pronunciation, and word recognition using educational games, personalized learning paths, and progress tracking.

This project is fully containerized using Docker and Docker Compose, with CI/CD implemented using GitHub Actions and Docker Hub for automated image building and deployment.

---

## Features

### Authentication

- Secure student registration and login using JWT
- Protected routes for authorized access

### Educational Games

- Letter Recognition
- Alphabet Matching
- Picture Based MCQ
- Match the Column
- Match the Image
- Word Builder
- Jumbled Words
- Sound Identification
- Sentence Formation
- Fill in the Blanks
- Spelling Correction

### Pronunciation System

- Click on individual letters to hear pronunciation
- Full word pronunciation support using audio playback

### Personalized Learning

- Level-based game unlocking system
- Students must complete one level before moving to the next

### Progress Tracking

- Tracks attempts, scores, time taken, and completed levels
- Dashboard for monitoring student performance

---

## Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- React Router
- Context API

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose ODM

### Authentication

- JWT (JSON Web Token)
- bcrypt password hashing

### DevOps

- Docker
- Docker Compose
- GitHub Actions
- Docker Hub
- CI/CD Pipeline

---

## Project Structure

```bash
Dyslexia-Learning-Platform/
│
├── .github/
│   └── workflows/
│       └── docker.yml
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── .env
│
├── docker-compose.yml
│
└── README.md


# Run Backend Using Docker Image

## Step 1: Pull Backend Image

```bash
docker pull aishwaryashetty21/neuroread-backend:latest
docker run -p 5000:5000 --env-file .env aishwaryashetty21/neuroread-backend:latest


# Run Frontend Using Docker Image
## Step 1: Pull Frontend Image
```bash
docker pull aishwaryashetty21/neuroread-frontend:latest
docker run -p 5173:5173 aishwaryashetty21/neuroread-frontend:latest


# CI/CD Pipeline

## Whenever code is pushed to GitHub:
Git Push
↓
GitHub Actions Triggered
↓
Docker Images Built
↓
Images Pushed to Docker Hub
