const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ user }))
    .catch((err) => {
      res.status(400).send({ message: 'При создании пользователя были переданы некорректные данные' });
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

module.exports.getUsers = (req, res) => {

  User.find({})
    .then(users => res.send({ users }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.getUserById = (req, res) => {

  User.findById(req.params._id)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      };
      res.send({ user })
    })
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.changeProfileInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.params._id, { name, about }, { new: true	})
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      };
      res.send({ user })
    })
    .catch((err) => {
      res.status(400).send({message: 'При обновлении данных пользователя были переданы некорректные данные'});
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.params._id, { avatar }, { new: true	})
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      };
      res.send({ user })
    })
    .catch((err) => {
      res.status(400).send({message: 'При обновлении данных пользователя были переданы некорректные данные'});
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};