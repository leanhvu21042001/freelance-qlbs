/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex("book_order")
      .del()
      .then(() => knex("orders").del())
      .then(() => knex("books").del())
      .then(() => knex("authors").del())
      .then(() => knex("customers").del())
      .then(() => knex("users").del())

      // Insert seed entries for authors
      .then(() =>
        knex("authors").insert([
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
          // Add more authors as needed
        ])
      )

      // Insert seed entries for books
      .then(() =>
        knex("books").insert([
          { id: 1, title: "Book 1", author_id: 1 },
          { id: 2, title: "Book 2", author_id: 1 },
          { id: 3, title: "Book 3", author_id: 2 },
          // Add more books as needed
        ])
      )

      // Insert seed entries for customers
      .then(() =>
        knex("customers").insert([
          {
            id: 1,
            name: "Customer 1",
            email: "customer1@example.com",
            phone: "123-456-7890",
          },
          {
            id: 2,
            name: "Customer 2",
            email: "customer2@example.com",
            phone: "987-654-3210",
          },
          // Add more customers as needed
        ])
      )

      // Insert seed entries for users
      .then(() =>
        knex("users").insert([
          { id: 1, username: "admin@gmail.com", password: "123123" },
          // Add more users as needed
        ])
      )

      // Insert seed entries for orders
      .then(() =>
        knex("orders").insert([
          { id: 1, title: "Order 1", customer_id: 1 },
          { id: 2, title: "Order 2", customer_id: 2 },
          // Add more orders as needed
        ])
      )

      // Insert seed entries for book_order
      .then(() =>
        knex("book_order").insert([
          { id: 1, book_id: 1, order_id: 1 },
          { id: 2, book_id: 2, order_id: 1 },
          { id: 3, book_id: 3, order_id: 2 },
          // Add more book_order entries as needed
        ])
      )
  );
};
