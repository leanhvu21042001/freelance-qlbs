const express = require("express");
const cors = require("cors");

const authorsRoute = require("./modules/authors/authors.route");
const booksRoute = require("./modules/books/books.route");
const customersRoute = require("./modules/customers/customers.route");
const usersRoute = require("./modules/users/users.route");
const errorHandler = require("./utils/error-handler.utils");
const notFoundMiddleware = require("./utils/not-found.utils");

const app = express();
const port = 5000;

// setup middleware
app.use(cors());
app.use(express.json());

// setup routes
app.use(authorsRoute);
app.use(booksRoute);
app.use(customersRoute);
app.use(usersRoute);

// error handling
app.use(notFoundMiddleware);
app.use(errorHandler);

// run app
app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});
