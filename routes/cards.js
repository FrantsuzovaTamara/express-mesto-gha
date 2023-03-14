const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().regex(/[a-z0-9]{24}/),
  })
}), deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^http[s]{0,1}:\/\/[a-z0-9@!$&\'-._~:\/?#[\]@!$&()*+,;=]{5,}/),
  })
}), createCard);
router.put('/:_id/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().regexp(/[a-z0-9]{24}/),
  })
}), likeCard);
router.delete('/:_id/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().regexp(/[a-z0-9]{24}/),
  })
}), dislikeCard);

module.exports = router;
