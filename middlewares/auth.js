const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR_CODE } = require('../errors');

const { JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res
    .status(UNAUTHORIZED_ERROR_CODE)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => {
  const token = header.replace('Bearer ', JWT_SECRET);
  return token;
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, );
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
