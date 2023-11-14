const knex = require("../../db"); // Import your Knex.js instance

class AuthorsService {
  static instance = null;

  constructor() {
    if (!AuthorsService.instance) {
      AuthorsService.instance = this;
    }

    return AuthorsService.instance;
  }

  async create(data) {
    try {
      const [authorId] = await knex("authors").insert(data);
      return authorId;
    } catch (error) {
      console.error("Error creating author:", error);
      throw error;
    }
  }

  async delete(authorId) {
    try {
      await knex("authors").where("id", authorId).del();
    } catch (error) {
      console.error("Error deleting author:", error);
      throw error;
    }
  }

  async update(authorId, newData) {
    try {
      await knex("authors").where("id", authorId).update(newData);
    } catch (error) {
      console.error("Error updating author:", error);
      throw error;
    }
  }

  async show(authorId) {
    try {
      const author = await knex("authors").where("id", authorId).first();
      return author;
    } catch (error) {
      console.error("Error retrieving author:", error);
      throw error;
    }
  }

  async list() {
    try {
      const authors = await knex("authors").select("*");
      return authors;
    } catch (error) {
      console.error("Error listing authors:", error);
      throw error;
    }
  }
}

module.exports = new AuthorsService();
