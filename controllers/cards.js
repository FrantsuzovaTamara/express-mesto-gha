const Card = require('../models/card');
const {
  NotFoundError,
  MethodNotAllowedError
} = require('../errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, owner: req.user._id, link })
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      if (card.owner._id != req.user._id) {
        throw new MethodNotAllowedError('Вы не можете удалить карточку другого пользователя');
      }
      res.send({ card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ card });
    })
    .catch(next);
};
