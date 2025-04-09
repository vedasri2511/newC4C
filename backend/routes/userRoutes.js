const express = require("express");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();
router.get("/", getAllUsers); // Route to get all users

module.exports = router;
