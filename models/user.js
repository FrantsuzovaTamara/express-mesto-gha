const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите имя пользователя.'],
    minlength: [2, 'Имя пользователя слишком короткое.'],
    maxlength: [30, 'Имя пользователя слишком длинное.'],
  },
  about: {
    type: String,
    required: [true, 'Введите информацию о себе.'],
    minlength: [2, 'Информация о себе слишком короткая.'],
    maxlength: [30, 'Информация о себе слишком длинная.'],
  },
  avatar: {
    type: String,
    required: [true, 'Введите ссылку на картинку.'],
  },
});

module.exports = mongoose.model('user', userSchema);
