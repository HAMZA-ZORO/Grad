const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "frontend" directory
app.use(express.static("frontend"));

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
        if (rows.length > 0) {
            res.send("Login successful");
        } else {
            res.status(401).send("Invalid email or password");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Register route
app.post("/register", async (req, res) => {
    const { name, email, password, level } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password, level) VALUES (?, ?, ?, ?)",
            [name, email, password, level]
        );
        res.send("Registration successful");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});