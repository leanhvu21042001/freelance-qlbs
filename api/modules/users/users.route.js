const express = require("express");
const router = express.Router();
const UsersController = require("./users.controller");
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new user
router.post("/users", verifyToken, async (req, res) =>
  UsersController.createUser(req, res)
);

// Get all users (requires authentication)
router.get("/users", async (req, res) => UsersController.getUsers(req, res));

// Get a specific user by ID (requires authentication)
router.get("/users/:id", verifyToken, async (req, res) =>
  UsersController.getUserById(req, res)
);

// Update a specific user by ID (requires authentication)
router.put("/users/:id", verifyToken, async (req, res) =>
  UsersController.updateUserById(req, res)
);

// Delete a specific user by ID (requires authentication)
router.delete("/users/:id", verifyToken, async (req, res) =>
  UsersController.deleteUserById(req, res)
);

// User login
router.post("/login", async (req, res) => UsersController.loginUser(req, res));

// Get information about the currently authenticated user (requires authentication)
router.get("/me", verifyToken, async (req, res) =>
  UsersController.getMe(req, res)
);

module.exports = router;
