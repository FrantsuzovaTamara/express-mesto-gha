const formatErrorMessage = (message, errors) => {

  const errorMessages = [];

  for (let i = 0; i < errors.length; i++) {

    errorMessages.push(message.split(`${errors[i]}: `)[1].split('.')[0]);

  }

  return errorMessages.join('. ');

};

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

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

const CONFLICT_ERROR_CODE = 409;

module.exports = {
  ValidationError,
  CONFLICT_ERROR_CODE,
  NotFoundError,
  UnauthorizedError,
  MethodNotAllowedError,
  formatErrorMessage
};
