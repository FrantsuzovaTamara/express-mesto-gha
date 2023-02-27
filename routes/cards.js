const router = require('express').Router();
const { createCard, getCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:_id', deleteCard);
router.post('/', createCard);
router.put('/:_id/likes', likeCard);
router.put('/:_id/likes', dislikeCard);

module.exports = router;
