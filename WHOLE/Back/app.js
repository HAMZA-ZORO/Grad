const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config.js");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10kb" }));

const cors = require('cors');
app.use(cors());


// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use("/api/login", limiter);
app.use("/api/register", limiter);

// Validation middleware
const validateLogin = [
    body("email").isEmail().normalizeEmail(),
    body("password").trim().notEmpty().isLength({ min: 8 })
];

const validateRegistration = [
    body("name").trim().notEmpty().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password")
        .trim()
        .isLength({ min: 8 })
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    body("level").trim().notEmpty().isInt({ min: 1, max: 3 })
];

// Login route
app.post("/api/login", validateLogin, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, rows[0].password);
        
        if (match) {
            res.json({
                message: "Login successful",
                level: parseInt(rows[0].level),
                name: rows[0].name // Optional: send back user's name
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Register route
app.post("/api/register", validateRegistration, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, level } = req.body;

        // Check if user exists
        const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user
        await pool.query(
            "INSERT INTO users (name, email, password, level) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, level]
        );
        
        res.json({ message: "Registration successful", level: parseInt(level) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});