const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'users.db'), (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            res.status(500).send('Server error');
        } else if (row) {
            res.send('<h2>Login successful!</h2>');
        } else {
            res.send('<h2>Invalid username or password.</h2>');
        }
    });
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.send('<h2>Username already exists.</h2>');
            } else {
                res.status(500).send('Server error');
            }
        } else {
            res.send('<h2>Signup successful! You can now <a href="login.html">login</a>.</h2>');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});