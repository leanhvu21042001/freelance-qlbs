const knex = require("../../db"); // Import your Knex.js instance

class BooksService {
  static instance = null;

  constructor() {
    if (!BooksService.instance) {
      BooksService.instance = this;
    }

    return BooksService.instance;
  }

  async create(data) {
    try {
      const [bookId] = await knex("books").insert(data);
      return bookId;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  }

  async delete(bookId) {
    try {
      await knex("books").where("id", bookId).del();
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  }

  async update(bookId, newData) {
    try {
      await knex("books").where("id", bookId).update(newData);
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  }

  async show(bookId) {
    try {
      const book = await knex("books").where("id", bookId).first();
      return book;
    } catch (error) {
      console.error("Error retrieving book:", error);
      throw error;
    }
  }

  async list() {
    try {
      const books = await knex("books").select("*");
      return books;
    } catch (error) {
      console.error("Error listing books:", error);
      throw error;
    }
  }
}

module.exports = new BooksService();
