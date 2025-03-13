const express = require("express");
const { register, login, verifyToken, getProfile } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile); // Protected route

module.exports = router;
