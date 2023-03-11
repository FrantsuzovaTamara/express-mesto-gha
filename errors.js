class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class MethodNotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 405;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  MethodNotAllowedError
};
