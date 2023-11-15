const knex = require("../../db"); // Import your Knex.js instance

class UsersService {
  static instance = null;

  constructor() {
    if (!UsersService.instance) {
      UsersService.instance = this;
    }

    return UsersService.instance;
  }

  async create(data) {
    try {
      const [userId] = await knex("users").insert(data);
      return userId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async delete(userId) {
    try {
      await knex("users").where("id", userId).del();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async update(userId, newData) {
    try {
      await knex("users").where("id", userId).update(newData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async show(userId) {
    try {
      const user = await knex("users").where("id", userId).first();
      delete user.password;
      return user;
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw error;
    }
  }

  async list() {
    try {
      const users = await knex("users").select("*");
      return users;
    } catch (error) {
      console.error("Error listing users:", error);
      throw error;
    }
  }

  async authenticate(username, password) {
    try {
      const user = await knex("users")
        .select("*")
        .where("username", username)
        .andWhere("password", password)
        .first();
      return user;
    } catch (error) {
      console.error("Error listing users:", error);
      throw error;
    }
  }
}

module.exports = new UsersService();
