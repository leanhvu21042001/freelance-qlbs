const knex = require("../../db"); // Import your Knex.js instance

class OrdersService {
  static instance = null;

  constructor() {
    if (!OrdersService.instance) {
      OrdersService.instance = this;
    }

    return OrdersService.instance;
  }

  async create(data) {
    try {
      const [orderId] = await knex("orders").insert(data);
      return orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async delete(orderId) {
    try {
      await knex("orders").where("id", orderId).del();
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  async update(orderId, newData) {
    try {
      await knex("orders").where("id", orderId).update(newData);
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  async show(orderId) {
    try {
      const order = await knex("orders").where("id", orderId).first();
      return order;
    } catch (error) {
      console.error("Error retrieving order:", error);
      throw error;
    }
  }

  async list() {
    try {
      const orders = await knex("orders").select("*");
      return orders;
    } catch (error) {
      console.error("Error listing orders:", error);
      throw error;
    }
  }
}

module.exports = new OrdersService();
