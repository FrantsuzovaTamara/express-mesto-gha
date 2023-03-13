const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const { JWT_SECRET } = process.env;

const extractBearerToken = (header) => {
  const token = header.replace('Bearer ', JWT_SECRET);
  return token;
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
