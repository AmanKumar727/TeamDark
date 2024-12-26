// server.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TeamDark',
  database: 'TeamDark'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// Define the login route
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Query the database to find the user
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error logging in' });
    } else if (results.length === 0) {
      res.status(401).send({ message: 'Invalid username or password' });
    } else {
      const user = results[0];
      // Compare the password with the hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error logging in' });
        } else if (result) {
          // Redirect the user to the dashboard
          res.send({ success: true });
        } else {
          res.status(401).send({ message: 'Invalid username or password' });
        }
      });
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});