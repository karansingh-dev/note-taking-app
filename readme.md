# Note Taking App

A full-stack note-taking application with React frontend and Node.js backend featuring user authentication and Google OAuth integration.

## Project Structure

```
note-taking-app/
├── backend/           # Node.js/TypeScript API server
├── frontend/          # React application (Vite)
└── README.md
```

## Prerequisites

- Node.js
- npm
- PostgreSQL database

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

**Environment Configuration:**
Copy `.env.example` to `.env` and configure:

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

**Database Setup:**

```bash
npm run db:generate
npm run db:migrate
```

**Start Development Server:**

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Build Commands

### Backend

```bash
# Development
npm run dev

# Production Build
npm run build

# Production Start
npm start
```

### Frontend

```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

## Production Deployment

### Backend

1. Set production environment variables
2. Run `npm run build`
3. Start with `npm start` (uses PM2)

### Frontend

1. Run `npm run build`
2. Deploy `dist` folder to hosting service

## Required Services

- **Database:** PostgreSQL instance
- **Google OAuth:** Google Cloud Console project with OAuth credentials
- **Email:** Gmail account with app password for NodeMailer

## Notes

- Backend runs on port 5000 (configurable via PORT env var)
- Frontend runs on port 5173 during development
- Database migrations are handled by Prisma
- Authentication uses JWT tokens and Google OAuth

## Questions?

If you have any questions about the code implementation, setup process, or technical details, feel free to ask!
