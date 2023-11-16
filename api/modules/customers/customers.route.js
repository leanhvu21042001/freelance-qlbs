const express = require("express");
const router = express.Router();
const CustomersController = require("./customers.controller"); // Adjust the path accordingly
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new customer
router.post("/customers", verifyToken, CustomersController.createCustomer);

// Get all customers
router.get("/customers", verifyToken, CustomersController.getCustomers);

// Get a specific customer by ID
router.get("/customers/:id", verifyToken, CustomersController.getCustomerById);

// Update a specific customer by ID
router.put(
  "/customers/:id",
  verifyToken,
  CustomersController.updateCustomerById
);

// Delete a specific customer by ID
router.delete(
  "/customers/:id",
  verifyToken,
  CustomersController.deleteCustomerById
);

module.exports = router;
