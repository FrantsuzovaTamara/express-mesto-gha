const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/', auth, getCards);
router.delete(
  '/:_id',
  auth,
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string()
        .required()
        .regex(/[a-z0-9]{24}/),
    }),
  }),
  deleteCard,
);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(/^http[s]{0,1}:\/\/[a-z0-9@!$&'-._~:/?#[\]@!$&()*+,;=]{5,}/),
    }),
  }),
  auth,
  createCard,
);
router.put(
  '/:_id/likes',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string()
        .required()
        .regex(/[a-z0-9]{24}/),
    }),
  }),
  auth,
  likeCard,
);
router.delete(
  '/:_id/likes',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string()
        .required()
        .regex(/[a-z0-9]{24}/),
    }),
  }),
  auth,
  dislikeCard,
);

module.exports = router;
