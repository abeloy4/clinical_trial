# Clinical Trial Management System

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
