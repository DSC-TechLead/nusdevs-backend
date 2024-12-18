// Temporary template

const express = require('express');
const app = express();
const { Pool } = require('pg');

require('dotenv').config(); 

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false  
    }
});

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL RDS!');
  });

app.get('/db-test', async (req, res) => {
    console.log('Route /db-test called');
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Query successful:', result);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: err.message });
    }
});
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.get('/test', (req, res) => {
    res.send('This is the test page');
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
