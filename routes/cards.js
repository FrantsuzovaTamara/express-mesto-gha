const router = require('express').Router();
const { createCard, getCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:_id', deleteCard);
router.post('/', createCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id/likes', dislikeCard);
router.use((req, res) => {
  res.status(404).send({ message: "Страница не найдена" });
});

module.exports = router;
