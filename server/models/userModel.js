const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// 🔹 Find user by email
const getUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

// 🔹 Create new user
const addUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
    );
    return result.rows[0];
};

module.exports = { getUserByEmail, addUser };
