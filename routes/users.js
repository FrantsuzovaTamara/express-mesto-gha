const router = require('express').Router();
const {
  getUser,
  getUsers,
  getUserById,
  changeProfileInfo,
  changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.get('/me', getUser);
router.patch('/me', changeProfileInfo);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
