const express = require("express");
const router = express.Router();
const AuthorsController = require("./authors.controller");
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new author
router.post("/authors", verifyToken, async (req, res) =>
  AuthorsController.createAuthor(req, res)
);

// Get all authors
router.get("/authors", verifyToken, async (req, res) =>
  AuthorsController.getAuthors(req, res)
);

// Get a specific author by ID
router.get("/authors/:id", verifyToken, async (req, res) =>
  AuthorsController.getAuthorById(req, res)
);

// Update a specific author by ID
router.put("/authors/:id", verifyToken, async (req, res) =>
  AuthorsController.updateAuthorById(req, res)
);

// Delete a specific author by ID
router.delete("/authors/:id", verifyToken, async (req, res) =>
  AuthorsController.deleteAuthorById(req, res)
);

module.exports = router;
