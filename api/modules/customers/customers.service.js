const knex = require("../../db"); // Import your Knex.js instance

class CustomersService {
  static instance = null;

  constructor() {
    if (!CustomersService.instance) {
      CustomersService.instance = this;
    }

    return CustomersService.instance;
  }

  async create(data) {
    try {
      const [customerId] = await knex("customers").insert(data);
      return customerId;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  }

  async delete(customerId) {
    try {
      await knex("customers").where("id", customerId).del();
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  }

  async update(customerId, newData) {
    try {
      await knex("customers").where("id", customerId).update(newData);
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  }

  async show(customerId) {
    try {
      const customer = await knex("customers").where("id", customerId).first();
      return customer;
    } catch (error) {
      console.error("Error retrieving customer:", error);
      throw error;
    }
  }

  async list() {
    try {
      const customers = await knex("customers").select("*");
      return customers;
    } catch (error) {
      console.error("Error listing customers:", error);
      throw error;
    }
  }
}

module.exports = new CustomersService();
