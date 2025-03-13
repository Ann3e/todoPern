const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail, addUser } = require("../models/userModel");
require("dotenv").config();

// 🔹 Register a new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await addUser(username, email, password);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        console.log("User found:", user); // ✅ Debugging log

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch); // ✅ Debugging log

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        console.log("🔹 JWT Secret:", process.env.JWT_SECRET);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};


// 🔹 Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// 🔹 Protected route example
const getProfile = (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
};

module.exports = { register, login, verifyToken, getProfile };
