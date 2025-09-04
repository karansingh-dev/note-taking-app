# Note Taking App

🚀 **Live Demo:** [https://notes.invodrop.app/](https://notes.invodrop.app/)

A full-stack note-taking application with React frontend and Node.js backend featuring user authentication and Google OAuth integration.

## Features

- 📝 Create, edit, and delete notes
- 🔐 User authentication with OTP
- 🌐 Google OAuth integration
- 📱 Responsive design
- 🔒 Secure password management

## Prerequisites

- Node.js
- PostgreSQL database

## Backend Setup

### Install Dependencies
```bash
cd backend
npm install
```

### Environment Variables (.env)
Create `.env` file in backend directory:
```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"
NODE_MAILER_EMAIL=your-email@gmail.com
NODE_MAILER_EMAIL_PASSWORD=your-app-password
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

### Database Setup
```bash
npm run db:generate
npm run db:migrate
```

### Commands
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Frontend Setup

### Install Dependencies
```bash
cd frontend
npm install
```

### Environment Variables (.env)
Create `.env` file in frontend directory:
```env
VITE_GOOGLE_AUTH=your-google-login-auth-url
VITE_BASE_URL=http://localhost:5000
```

### Commands
```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Technology Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite  
**Backend:** Node.js, Express, TypeScript, Prisma  
**Database:** PostgreSQL  
**Auth:** JWT, Google OAuth 2.0

## Deployment

**Live App:** [https://notes.invodrop.app/](https://notes.invodrop.app/)  
- Frontend: Vercel
- Backend: AWS EC2
- Database: Cloud PostgreSQL

## Questions?
If you have any questions about the code implementation, setup process, or technical details, feel free to ask!