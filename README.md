# Join-Up Server

A Node.js/Express REST API for event management, user registration, and authentication. Built with TypeScript and MongoDB.

## Features
- User registration and authentication (JWT-based)
- Event creation, update, and retrieval
- User-specific event management
- Input validation with Zod
- Centralized error handling
- Modular and scalable code structure

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
DATABASE_URL=your_mongodb_connection_string
SALT=10
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
```

### Running the Server
- Development: `npm run dev`
- Production: `npm run build && npm start`

## Project Structure
```
src/
  app.ts                # Express app setup
  server.ts             # Server bootstrap
  app/
    config/             # Configuration and env
    errors/             # Error handling
    interface/          # TypeScript interfaces
    middleware/         # Express middlewares
    module/             # Feature modules (auth, user, event)
    query/              # Query builder utilities
    routes/             # Main API router
    shared/             # Shared utilities (logger)
    utils/              # Utility functions
```

## API Documentation
All endpoints are prefixed with `/api/v1`.

### Auth
| Method | Endpoint           | Description         | Body Params           |
|--------|--------------------|---------------------|-----------------------|
| POST   | `/auth/sign-in`    | User login          | `{ email, password }` |

#### Example Request
```json
POST /api/v1/auth/sign-in
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Example Response
```json
{
  "success": true,
  "message": "User is logged in successfully!",
  "data": {
    "accessToken": "...",
    "user": { "name": "User", "email": "user@example.com", ... }
  }
}
```

### User
| Method | Endpoint           | Description         | Body Params                                 |
|--------|--------------------|---------------------|---------------------------------------------|
| POST   | `/users/sign-up`   | Register new user   | `{ name, email, password, photoURL }`       |

#### Example Request
```json
POST /api/v1/users/sign-up
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "photoURL": "https://example.com/photo.jpg"
}
```

### Event
| Method | Endpoint                | Description                | Auth Required | Body Params / Query |
|--------|-------------------------|----------------------------|---------------|--------------------|
| GET    | `/events/all-events`    | List all events            | Yes           | (optional filters) |
| GET    | `/events/single-event/:id` | Get event by ID         | No            | -                  |
| POST   | `/events/create-event`  | Create new event           | Yes           | `{ title, date, time, location, description }` |
| PUT    | `/events/update-event/:id` | Update event by ID      | Yes           | `{ ...fields }`    |
| GET    | `/events/my-events`     | List events by current user| Yes           | -                  |

#### Event Object Example
```json
{
  "_id": "...",
  "title": "Sample Event",
  "postedBy": "user_id",
  "date": "2024-06-01T00:00:00.000Z",
  "time": "18:00",
  "location": "City Hall",
  "description": "Event details...",
  "attendeeCount": 10,
  "joinedUsers": ["user_id1", "user_id2"],
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Data Models

### User
```ts
{
  name: string;
  email: string;
  password: string;
  photoURL: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Event
```ts
{
  title: string;
  postedBy: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  attendeeCount: number;
  joinedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Contribution
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request


