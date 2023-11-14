const express = require("express");
const router = express.Router();
const BooksController = require("./books.controller"); // Adjust the path accordingly
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new book
router.post("/books", verifyToken, async (req, res) =>
  BooksController.createBook(req, res)
);

// Get all books
router.get("/books", verifyToken, async (req, res) =>
  BooksController.getBooks(req, res)
);

// Get a specific book by ID
router.get("/books/:id", verifyToken, async (req, res) =>
  BooksController.getBookById(req, res)
);

// Update a specific book by ID
router.put("/books/:id", verifyToken, async (req, res) =>
  BooksController.updateBookById(req, res)
);

// Delete a specific book by ID
router.delete("/books/:id", verifyToken, async (req, res) =>
  BooksController.deleteBookById(req, res)
);

module.exports = router;
