const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  changeProfileInfo,
  changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.post('/', createUser);
router.patch('/me', changeProfileInfo);
router.patch('/me/avatar', changeAvatar);

module.exports = router;
