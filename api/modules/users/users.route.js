const express = require("express");
const router = express.Router();
const UsersController = require("./users.controller");
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new user
router.post("/users", verifyToken, UsersController.createUser);

// Get all users (requires authentication)
router.get("/users", UsersController.getUsers);

// Get a specific user by ID (requires authentication)
router.get("/users/:id", verifyToken, UsersController.getUserById);

// Update a specific user by ID (requires authentication)
router.put("/users/:id", verifyToken, UsersController.updateUserById);

// Delete a specific user by ID (requires authentication)
router.delete("/users/:id", verifyToken, UsersController.deleteUserById);

// User login
router.post("/login", UsersController.loginUser);

// Get information about the currently authenticated user (requires authentication)
router.get("/me", verifyToken, UsersController.getMe);

module.exports = router;
