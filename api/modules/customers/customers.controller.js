const customersService = require("./customers.service"); // Assuming you have a customers service

class CustomersController {
  static instance = null;

  constructor() {
    if (!CustomersController.instance) {
      CustomersController.instance = this;
    }

    return CustomersController.instance;
  }

  async createCustomer(req, res, next) {
    try {
      const customerData = req.body;
      const customerId = await customersService.create(customerData);
      res
        .status(201)
        .json({ id: customerId, message: "Customer created successfully" });
    } catch (error) {
      console.error("Error creating customer:", error);
      next(error);
    }
  }

  async getCustomers(req, res) {
    try {
      const customers = await customersService.list();
      res.status(200).json(customers);
    } catch (error) {
      console.error("Error listing customers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCustomerById(req, res) {
    const customerId = req.params.id;
    try {
      const customer = await customersService.show(customerId);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } catch (error) {
      console.error("Error retrieving customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCustomerById(req, res) {
    const customerId = req.params.id;
    const newData = req.body;
    try {
      await customersService.update(customerId, newData);
      res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
      console.error("Error updating customer:", error);
      next(error);
    }
  }

  async deleteCustomerById(req, res) {
    const customerId = req.params.id;
    try {
      await customersService.softDelete(customerId);
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new CustomersController();
