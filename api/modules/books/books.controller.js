const booksService = require("./books.service"); // Assuming you have a books service

class BooksController {
  static instance = null;

  constructor() {
    if (!BooksController.instance) {
      BooksController.instance = this;
    }

    return BooksController.instance;
  }

  async createBook(req, res) {
    try {
      const bookData = req.body;
      const bookId = await booksService.create(bookData);
      res
        .status(201)
        .json({ id: bookId, message: "Book created successfully" });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getBooks(req, res) {
    try {
      const books = await booksService.list();
      res.status(200).json(books);
    } catch (error) {
      console.error("Error listing books:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getBookById(req, res) {
    const bookId = req.params.id;
    try {
      const book = await booksService.show(bookId);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      console.error("Error retrieving book:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateBookById(req, res) {
    const bookId = req.params.id;
    const newData = req.body;
    try {
      await booksService.update(bookId, newData);
      res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteBookById(req, res) {
    const bookId = req.params.id;
    try {
      await booksService.softDelete(bookId);
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new BooksController();
