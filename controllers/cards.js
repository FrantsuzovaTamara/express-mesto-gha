const Card = require('../models/card');
const {
  formatErrorMessage,
  VALIDATION_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  OTHER_ERROR_CODE,
} = require('../errors');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, owner: req.user._id, link })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(VALIDATION_ERROR_CODE)
          .send({
            message: formatErrorMessage(err.message, Object.keys(err.errors)),
          });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => {
      res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: 'Введён некорректный id карточки' });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({
          message: 'При обновлении карточки были переданы некорректные данные',
        });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({
          message: 'При обновлении карточки были переданы некорректные данные',
        });
      } else {
        res.status(OTHER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
