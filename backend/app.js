const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config.js");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const app = express();

// Security middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10kb" })); // Limit payload size

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use("/login", limiter);
app.use("/register", limiter);

// Serve static files from the "frontend" directory
app.use(express.static("frontend"));

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
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .withMessage("Password must contain at least 8 characters, one letter, one number, and one special character"),
    body("level").trim().notEmpty().escape()
];

// Login route
app.post("/login", validateLogin, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Get user from database
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (rows.length === 0) {
            // Use a generic message to prevent user enumeration
            return res.status(401).send("Invalid credentials");
        }

        // Compare password hash
        const match = await bcrypt.compare(password, rows[0].password);
        
        if (match) {
            // TODO: Implement proper session management here
            res.send("Login successful");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Register route
app.post("/register", validateRegistration, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, level } = req.body;

        // Check if user already exists
        const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).send("Email already registered");
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password, level) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, level]
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
