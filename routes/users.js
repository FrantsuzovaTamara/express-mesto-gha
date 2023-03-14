const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUser,
  getUsers,
  getUserById,
  changeProfileInfo,
  changeAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  })
}), auth, changeProfileInfo);
router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^http[s]{0,1}:\/\/[a-z0-9@!$&\'-._~:\/?#[\]@!$&()*+,;=]{5,}/).default(
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
    ),
    })
}), auth, changeAvatar);
router.get('/', auth, getUsers);
router.get('/:_id', auth, getUserById);

module.exports = router;
