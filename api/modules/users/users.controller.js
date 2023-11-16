const jwt = require("jsonwebtoken");
const usersService = require("./users.service"); // Assuming you have a users service
const { secretKey } = require("../../constants");

class UsersController {
  static instance = null;

  constructor() {
    if (!UsersController.instance) {
      UsersController.instance = this;
    }

    return UsersController.instance;
  }

  async createUser(req, res, next) {
    try {
      const userData = req.body;
      const userId = await usersService.create(userData);
      res
        .status(201)
        .json({ id: userId, message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      next(error);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await usersService.list();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error listing users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await usersService.show(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateUserById(req, res, next) {
    const userId = req.params.id;
    const newData = req.body;
    try {
      await usersService.update(userId, newData);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      next(error);
    }
  }

  async deleteUserById(req, res) {
    const userId = req.params.id;
    try {
      await usersService.softDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async loginUser(req, res) {
    const { username, password } = req.body;

    // Authenticate user (you might want to improve this based on your actual authentication logic)
    const user = await usersService.authenticate(username, password);

    if (user) {
      // User authenticated, generate and send a JWT token
      const token = jwt.sign({ userId: user.id }, secretKey);

      res.status(200).json({ token, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }

  async getMe(req, res) {
    const userId = req.userId;

    try {
      const user = await usersService.show(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UsersController();
