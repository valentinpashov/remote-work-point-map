const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();

// Middleware: receive information from React
app.use(cors());
app.use(express.json());

// Connect with PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

app.get('/', (req, res) => {
    res.send('The Server WorkStation works successfully!');
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Грешка в сървъра');
    }
});

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(401).json({ error: "User with this email already exists!" });
        }

        // Password hashing
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [username, email, bcryptPassword]
        );

        res.json({
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        // If no user with that email exists => error
        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password!" });
        }

        // 3. Check the password 
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        
        // If the password doesn't match
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password!" });
        }

        // 4. Everything is successful
        res.json({
            message: "Successful login!",
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get all locations from the database
app.get('/api/locations', async (req, res) => {
    try {
        const allLocations = await pool.query('SELECT * FROM locations');
        res.json(allLocations.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error while fetching locations');
    }
});

// Save a new location to the database
app.post('/api/locations', async (req, res) => {
    try {
        const { user_id, title, description, latitude, longitude, image_url, city, street } = req.body;

        if (!user_id || !title || !latitude || !longitude) {
            return res.status(400).json({ error: "Please fill in all required fields!" });
        }

        const newLocation = await pool.query(
            "INSERT INTO locations (user_id, title, description, latitude, longitude, image_url, city, street) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [user_id, title, description, latitude, longitude, image_url, city, street]
        );
        res.json(newLocation.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error while saving the location');
    }
});

// Delete a location
app.delete('/api/locations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        const location = await pool.query("SELECT * FROM locations WHERE id = $1", [id]);
        
        if (location.rows.length === 0) {
            return res.status(404).json({ error: "Location not found!" });
        }

        if (location.rows[0].user_id !== user_id) {
            return res.status(403).json({ error: "Unauthorized! You can only delete your own workspaces." });
        }

        await pool.query("DELETE FROM locations WHERE id = $1", [id]);
        res.json({ message: "Workspace deleted successfully!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while deleting");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});