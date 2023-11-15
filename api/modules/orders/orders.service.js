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
      const orderData = {
        title: data.order_title,
        customer_id: data.customer_id,
      };
      const [order_id] = await knex("orders").insert(orderData);

      for (const book_id of data.book_ids) {
        const book_order_data = {
          book_id,
          order_id,
        };
        const [book_order_id] = await knex("book_order").insert(
          book_order_data
        );
      }
      return order_id;
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

  async softDelete(orderId) {
    try {
      await knex("orders").where("id", orderId).update({ deleted: true });
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
      const order = await knex("orders")
        .leftJoin("customers", "orders.customer_id", "=", "customers.id")
        .where("orders.id", orderId)
        .andWhere("orders.deleted", false)
        .options({ nestTables: true })
        .first();
      return order;
    } catch (error) {
      console.error("Error retrieving order:", error);
      throw error;
    }
  }

  async list() {
    try {
      const orders = await knex("orders")
        .select("*")
        .leftJoin("customers", "orders.customer_id", "=", "customers.id")
        .where("orders.deleted", false)
        .options({ nestTables: true });
      return orders;
    } catch (error) {
      console.error("Error listing orders:", error);
      throw error;
    }
  }
}

module.exports = new OrdersService();
