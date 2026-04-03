const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});