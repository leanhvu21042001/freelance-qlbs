const express = require("express");
const router = express.Router();
const BooksController = require("./books.controller"); // Adjust the path accordingly
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new book
router.post("/books", verifyToken, BooksController.createBook);

// Get all books
router.get("/books", verifyToken, BooksController.getBooks);

// Get a specific book by ID
router.get("/books/:id", verifyToken, BooksController.getBookById);

// Update a specific book by ID
router.put("/books/:id", verifyToken, BooksController.updateBookById);

// Delete a specific book by ID
router.delete("/books/:id", verifyToken, BooksController.deleteBookById);

module.exports = router;
