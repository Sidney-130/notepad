# Notepad App

A simple, modern notepad application for saving and organizing your ideas.

## Features

- Create, edit, and delete notes
- User authentication (signup/login)
- Persistent data storage
- Clean, responsive Material Design UI
- Real-time updates

## Tech Stack

**Frontend:**
- React with Vite
- React Router for navigation
- TanStack Query for data fetching
- Tailwind CSS for styling

**Backend:**
- Node.js with Express
- JWT authentication
- File-based JSON storage
- bcrypt for password hashing

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd teams-notes-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```
   JWT_SECRET=your-secret-key-here
   ```

   Start the server:
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:3000`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## Deployment

### Backend (Render.com)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set root directory to `backend`
4. Add environment variables:
   - `JWT_SECRET`: Your secret key
   - `FRONTEND_URL`: Your Vercel frontend URL

### Frontend (Vercel)
1. Import project from GitHub
2. Set root directory to `frontend`
3. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-backend.onrender.com/api/v1`)
4. Deploy

## Environment Variables

**Backend (.env):**
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS (optional for local dev)

**Frontend:**
- `VITE_API_URL` - Backend API URL (defaults to `http://localhost:3000/api/v1`)

## License

MIT
