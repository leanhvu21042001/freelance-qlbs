const knex = require("../../db"); // Import your Knex.js instance

class BookOrderService {
  static instance = null;

  constructor() {
    if (!BookOrderService.instance) {
      BookOrderService.instance = this;
    }

    return BookOrderService.instance;
  }

  async booksByOrderId(orderId) {
    try {
      const detailBooksByOrderId = await knex("book_order")
        .select("*")
        .where("book_order.order_id", orderId)
        .leftJoin("books", "book_order.book_id", "=", "books.id")
        .leftJoin("authors", "books.author_id", "=", "authors.id")
        .options({ nestTables: true });
      return detailBooksByOrderId;
    } catch (error) {
      console.error("Error listing orders:", error);
      throw error;
    }
  }
}

module.exports = new BookOrderService();
