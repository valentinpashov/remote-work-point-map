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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});