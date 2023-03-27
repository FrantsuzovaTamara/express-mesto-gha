const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const regex = require('./constants');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

router.use(requestLogger);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regex),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.use(auth);

router.use('/users', require('./routes/users'));
router.use('/cards', require('./routes/cards'));

router.use((req, res, next) => {
  next(
    new NotFoundError(
      'Страница не найдена! Проверьте правильно ли введена ссылка',
    ),
  );
});

router.use(errorLogger);

module.exports = router;
