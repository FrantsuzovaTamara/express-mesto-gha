const User = require('../models/user');
const { formatErrorMessage, VALIDATION_ERROR_CODE, NOT_FOUND_ERROR_CODE, OTHER_ERROR_CODE } = require('../errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: formatErrorMessage(err.message, Object.keys(err.errors)) });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

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
    { new: true, runValidators: true },
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
        res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: formatErrorMessage(err.message, Object.keys(err.errors)) });
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
    { new: true, runValidators: true },
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
        res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: formatErrorMessage(err.message, Object.keys(err.errors)) });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
