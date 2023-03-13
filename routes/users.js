const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUser,
  getUsers,
  getUserById,
  changeProfileInfo,
  changeAvatar,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  })
}), changeProfileInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp('^https:\/\/+')).default(
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
    ),
    })
}), changeAvatar);
router.get('/', getUsers);
router.get('/:_id', getUserById);

module.exports = router;
