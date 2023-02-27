const router = require('express').Router();
const { createCard, getCards, deleteCard, likeCard, removeLike } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:_id', deleteCard);
router.post('/', createCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id/likes', removeLike);

module.exports = router;
