# Clinical Trial Management System

🧪 Clinical Trial Management System
A full-stack web application to manage doctors, participants, trials, and appointments in clinical research. Built with Angular and .NET, the system supports scheduling appointments with specific times and offers a modern, responsive UI.

A full-stack application for managing clinical trials, doctors, and participants.

## Project Structure

```
Clinical_Trial/
├── frontend/           # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── appointments/
│   │   │   ├── dialogs/
│   │   │   ├── statistics/
│   │   │   └── ...
│   │   ├── assets/
│   │   └── ...
│   └── package.json
│
└── backend/           # Node.js/Express backend application
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   ├── services/      # Business logic
    │   └── app.js        # Main application file
    ├── config/          # Configuration files
    └── package.json
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Backend
```bash
cd backend
npm install
npm run dev
```
