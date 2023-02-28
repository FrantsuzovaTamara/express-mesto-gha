const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, owner: req.user._id, link })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({message: 'При создании карточки были переданы некорректные данные'});
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({message: 'Введён некорректный id карточки'});
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({message: 'При обновлении карточки были переданы некорректные данные'});
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
        return;
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({message: 'При обновлении карточки были переданы некорректные данные'});
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
};