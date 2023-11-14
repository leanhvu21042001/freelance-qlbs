const express = require("express");
const router = express.Router();
const OrdersController = require("./orders.controller");
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new order
router.post("/orders", verifyToken, async (req, res) =>
  OrdersController.createOrder(req, res)
);

// Get all orders (requires authentication)
router.get("/orders", verifyToken, async (req, res) =>
  OrdersController.getOrders(req, res)
);

// Get a specific order by ID (requires authentication)
router.get("/orders/:id", verifyToken, async (req, res) =>
  OrdersController.getOrderById(req, res)
);

// Update a specific order by ID (requires authentication)
router.put("/orders/:id", verifyToken, async (req, res) =>
  OrdersController.updateOrderById(req, res)
);

// Delete a specific order by ID (requires authentication)
router.delete("/orders/:id", verifyToken, async (req, res) =>
  OrdersController.deleteOrderById(req, res)
);

module.exports = router;
