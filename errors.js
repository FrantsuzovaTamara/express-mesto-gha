const formatErrorMessage = (message, errors) => {
  const errorMessages = [];
  for (let i = 0; i < errors.length; i++) {
    errorMessages.push(message.split(`${errors[i]}: `)[1].split('.')[0]);
  }
  return errorMessages.join('. ');
};

const VALIDATION_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const OTHER_ERROR_CODE = 500;

module.exports = { formatErrorMessage, VALIDATION_ERROR_CODE, NOT_FOUND_ERROR_CODE, OTHER_ERROR_CODE };
