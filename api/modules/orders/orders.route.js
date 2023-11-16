const express = require("express");
const router = express.Router();
const OrdersController = require("./orders.controller");
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new order
router.post("/orders", verifyToken, OrdersController.createOrder);

// Get all orders (requires authentication)
router.get("/orders", verifyToken, OrdersController.getOrders);

// Get a specific order by ID (requires authentication)
router.get("/orders/:id", verifyToken, OrdersController.getOrderById);

// Update a specific order by ID (requires authentication)
router.put("/orders/:id", verifyToken, OrdersController.updateOrderById);

// Delete a specific order by ID (requires authentication)
router.delete("/orders/:id", verifyToken, OrdersController.deleteOrderById);

module.exports = router;
