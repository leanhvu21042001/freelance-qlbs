const authorsService = require("./authors.service");

class AuthorsController {
  static instance = null;

  constructor() {
    if (!AuthorsController.instance) {
      AuthorsController.instance = this;
    }

    return AuthorsController.instance;
  }

  async createAuthor(req, res) {
    try {
      const authorData = req.body;
      const authorId = await authorsService.create(authorData);
      res
        .status(201)
        .json({ id: authorId, message: "Author created successfully" });
    } catch (error) {
      console.error("Error creating author:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAuthors(req, res) {
    try {
      const authors = await authorsService.list();
      res.status(200).json(authors);
    } catch (error) {
      console.error("Error listing authors:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAuthorById(req, res) {
    const authorId = req.params.id;
    try {
      const author = await authorsService.show(authorId);
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).json({ error: "Author not found" });
      }
    } catch (error) {
      console.error("Error retrieving author:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateAuthorById(req, res) {
    const authorId = req.params.id;
    const newData = req.body;
    try {
      await authorsService.update(authorId, newData);
      res.status(200).json({ message: "Author updated successfully" });
    } catch (error) {
      console.error("Error updating author:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteAuthorById(req, res) {
    const authorId = req.params.id;
    try {
      await authorsService.delete(authorId);
      res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
      console.error("Error deleting author:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new AuthorsController();
