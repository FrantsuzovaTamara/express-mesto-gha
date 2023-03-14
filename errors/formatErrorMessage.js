module.exports.formatErrorMessage = (message, errors) => {
  const errorMessages = [];

  for (let i = 0; i < errors.length; i++) {
    errorMessages.push(message.split(`${errors[i]}: `)[1].split('.')[0]);
  }

  return errorMessages.join('. ');
};
