const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  formatErrorMessage,
  UNAUTHORIZED_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  OTHER_ERROR_CODE,
} = require('../errors');

module.exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
      });
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({
          message: formatErrorMessage(err.message, Object.keys(err.errors)),
        });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', {
          expiresIn: '7d',
        }),
      });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.message });
    });
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => {
      res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: 'Введён некорректный id пользователя' });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: 'Введён некорректный id пользователя' });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.changeProfileInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({
          message: formatErrorMessage(err.message, Object.keys(err.errors)),
        });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({
          message: formatErrorMessage(err.message, Object.keys(err.errors)),
        });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
