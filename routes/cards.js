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
router.delete('/:_id', deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp('^https:\/\/+')),
  })
}), createCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id/likes', dislikeCard);

module.exports = router;
