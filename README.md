# GigFlow — Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript. Manage, filter, and track leads efficiently with role-based access control.

## Tech Stack

- **Frontend:** React.js, TypeScript, TailwindCSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Deployment:** Render

## Features

- JWT-based authentication (register/login)
- Role-based access control (Admin / Sales User)
- Full leads CRUD
- Advanced filtering by status, source, search, and sort
- Debounced search (300ms)
- Backend pagination (10 records/page)
- CSV export
- Responsive dark UI
- Docker support

## Project Structure

```
gigflow/
├── backend/
│   ├── src/
│   │   ├── config/        # Database connection
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth + RBAC middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── types/         # TypeScript interfaces
│   │   └── app.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── context/       # Auth context
│   │   ├── hooks/         # useDebounce
│   │   ├── pages/         # Login, Register, Dashboard
│   │   ├── services/      # Axios instance
│   │   └── types/
│   └── package.json
└── docker-compose.yml
```

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder (see `.env.example`):

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
npm start
```

Frontend runs on `http://localhost:3000`

### Docker

```bash
docker-compose up --build
```

## API Documentation

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |

### Leads

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/leads | Get all leads (with filters) | Yes |
| POST | /api/leads | Create a lead | Yes |
| GET | /api/leads/:id | Get single lead | Yes |
| PUT | /api/leads/:id | Update a lead | Yes |
| DELETE | /api/leads/:id | Delete a lead (admin only) | Yes |

### Query Parameters for GET /api/leads

| Param | Type | Description |
|-------|------|-------------|
| search | string | Search by name or email |
| status | string | Filter by status (New/Contacted/Qualified/Lost) |
| source | string | Filter by source (Website/Instagram/Referral) |
| sort | string | latest or oldest |
| page | number | Page number (default: 1) |
| limit | number | Records per page (default: 10) |

### Example Requests

**Register**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "admin"
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Create Lead**
```json
POST /api/leads
Authorization: Bearer <token>
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Instagram"
}
```

**Get Leads with Filters**
```
GET /api/leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1
Authorization: Bearer <token>
```

## Roles

| Action | Admin | Sales User |
|--------|-------|------------|
| View leads | ✅ | ✅ |
| Create lead | ✅ | ✅ |
| Edit lead | ✅ | ✅ |
| Delete lead | ✅ | ❌ |

## Environment Variables

See `.env.example` in the backend folder for all required variables.

## Deployment

- Backend: Render (Web Service)
- Frontend: Render (Static Site)
- Database: MongoDB Atlas