# Blog Platform with Comments

A full-stack blogging platform where users can register, log in, create, edit and delete blog posts, and comment on posts. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User registration, login and authentication (JWT + bcrypt password hashing)
- Create, edit and delete blog posts (only the post owner can edit or delete)
- Comment section on every post (logged-in users can comment and delete their own comments)
- Anyone can read posts and comments without logging in
- RESTful API with MongoDB database integration
- Protected routes on the frontend for creating and editing posts

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |

## Project Structure

```
blog-platform/
├── client/                 React frontend
│   └── src/
│       ├── components/     Navbar, ProtectedRoute
│       ├── pages/          Home, Login, Register, PostDetail, PostForm
│       └── api.js          Axios setup with token handling
└── server/                 Express backend
    ├── middleware/         auth.js (JWT check)
    ├── models/             User, Post, Comment
    ├── routes/             auth, posts, comments
    └── server.js
```

## API Endpoints

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create a new account |
| POST | `/api/auth/login` | No | Log in and receive a token |
| GET | `/api/posts` | No | List all posts |
| GET | `/api/posts/:id` | No | Get a single post |
| POST | `/api/posts` | Yes | Create a post |
| PUT | `/api/posts/:id` | Yes (owner) | Edit a post |
| DELETE | `/api/posts/:id` | Yes (owner) | Delete a post |
| GET | `/api/posts/:postId/comments` | No | List comments of a post |
| POST | `/api/posts/:postId/comments` | Yes | Add a comment |
| DELETE | `/api/posts/:postId/comments/:id` | Yes (owner) | Delete a comment |

## Setup Instructions

### Prerequisites

- Node.js (LTS version)
- A MongoDB Atlas account (free tier) or a local MongoDB installation

### 1. Clone the project

```
git clone <your-repository-url>
cd blog-platform
```

### 2. Set up the backend

```
cd server
npm install
```

Create a file named `.env` inside the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_text
PORT=5000
```

Start the backend:

```
npm run dev
```

You should see "Server running on port 5000" and "Database connected".

### 3. Set up the frontend

Open a second terminal:

```
cd client
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## How to Use

1. Click **Register** and create an account.
2. Log in with your email and password.
3. Click **New Post** to write a blog post.
4. Open any post to read it and add comments.
5. Use **Edit** and **Delete** on your own posts.

## Screenshots

Add your screenshots here:

- Home page
- Post with comments
- Register and Login pages
- New Post page
- API test response (Thunder Client)

## Author

Rishika MJ