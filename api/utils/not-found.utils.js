const CustomError = require("./custom-error.utils");

function notFoundMiddleware(req, res, next) {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
}

module.exports = notFoundMiddleware;
