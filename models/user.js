const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { UnauthorizedError } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя пользователя слишком короткое.'],
    maxlength: [30, 'Имя пользователя слишком длинное.'],
  },
  about: {
    type: String,
    minlength: [2, 'Информация о себе слишком короткая.'],
    maxlength: [30, 'Информация о себе слишком длинная.'],
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    dropDups: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Пароль слишком короткий'],
    select: false
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
