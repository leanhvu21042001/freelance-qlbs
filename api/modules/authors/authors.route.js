const express = require("express");
const router = express.Router();
const AuthorsController = require("./authors.controller");
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new author
router.post("/authors", verifyToken, AuthorsController.createAuthor);

// Get all authors
router.get("/authors", verifyToken, AuthorsController.getAuthors);

// Get a specific author by ID
router.get("/authors/:id", verifyToken, AuthorsController.getAuthorById);

// Update a specific author by ID
router.put("/authors/:id", verifyToken, AuthorsController.updateAuthorById);

// Delete a specific author by ID
router.delete("/authors/:id", verifyToken, AuthorsController.deleteAuthorById);

module.exports = router;
