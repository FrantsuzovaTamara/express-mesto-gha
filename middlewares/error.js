const { CONFLICT_ERROR_CODE } = require('../errors');

module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: 'Пользователь с такой почтой уже зарегистрирован' });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  }

  next();
};
