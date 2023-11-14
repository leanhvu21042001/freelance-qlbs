const express = require("express");
const router = express.Router();
const CustomersController = require("./customers.controller"); // Adjust the path accordingly
const verifyToken = require("../../middlewares/verify-token.middleware");

// Create a new customer
router.post("/customers", verifyToken, async (req, res) =>
  CustomersController.createCustomer(req, res)
);

// Get all customers
router.get("/customers", verifyToken, async (req, res) =>
  CustomersController.getCustomers(req, res)
);

// Get a specific customer by ID
router.get("/customers/:id", verifyToken, async (req, res) =>
  CustomersController.getCustomerById(req, res)
);

// Update a specific customer by ID
router.put("/customers/:id", verifyToken, async (req, res) =>
  CustomersController.updateCustomerById(req, res)
);

// Delete a specific customer by ID
router.delete("/customers/:id", verifyToken, async (req, res) =>
  CustomersController.deleteCustomerById(req, res)
);

module.exports = router;
