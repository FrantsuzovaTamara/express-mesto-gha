class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class MethodNotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 405;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

CONFLICT_ERROR_CODE = 409;
UNAUTHORIZED_ERROR_CODE = 401;

module.exports = {
  CONFLICT_ERROR_CODE,
  NotFoundError,
  UNAUTHORIZED_ERROR_CODE,
  UnauthorizedError,
  MethodNotAllowedError
};
