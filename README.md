# remote-work-point-map

This project is a modern web application designed for digital nomads and remote workers to discover and share the perfect spots to work from. It features an interactive map view and a gallery with real photos.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Leaflet
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

---

## Installation and Setup

### 1. Database Configuration (PostgreSQL)
Execute the following commands in your SQL editor to set up the database structure:

```sql
CREATE DATABASE remote_point;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 2. Backend Setup (Node.js)
Create a .env file in the server folder:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=remote_point
PORT=5000
```
Start the server:
```
cd server
npm install
npm run dev
```
### 3. Frontend Setup (React)
```
cd client
npm install
npm run dev
```
