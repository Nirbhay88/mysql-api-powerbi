const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

require('dotenv').config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/data', (req, res) => {
    db.query('SELECT * FROM lung_disease_data', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}/data`);
});
