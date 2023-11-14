const ordersService = require("./orders.service"); // Assuming you have an orders service

class OrdersController {
  static instance = null;

  constructor() {
    if (!OrdersController.instance) {
      OrdersController.instance = this;
    }

    return OrdersController.instance;
  }

  async createOrder(req, res) {
    try {
      const orderData = req.body;
      const orderId = await ordersService.create(orderData);
      res
        .status(201)
        .json({ id: orderId, message: "Order created successfully" });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await ordersService.list();
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error listing orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOrderById(req, res) {
    const orderId = req.params.id;
    try {
      const order = await ordersService.show(orderId);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      console.error("Error retrieving order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateOrderById(req, res) {
    const orderId = req.params.id;
    const newData = req.body;
    try {
      await ordersService.update(orderId, newData);
      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteOrderById(req, res) {
    const orderId = req.params.id;
    try {
      await ordersService.delete(orderId);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async loginUser(req, res) {
    // This method might not be relevant for orders; consider removing or modifying accordingly
    res.status(404).json({ error: "Not found" });
  }

  async getMe(req, res) {
    // This method might not be relevant for orders; consider removing or modifying accordingly
    res.status(404).json({ error: "Not found" });
  }
}

module.exports = new OrdersController();
