const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите название карточки.'],
    minlength: [2, 'Название карточки слишком короткое.'],
    maxlength: [30, 'Название карточки слишком длинноею'],
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  link: {
    type: String,
    required: [true, 'Введите ссылку на картинку.'],
  },
  likes: [
    {
      default: [],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
