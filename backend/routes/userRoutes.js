const router = require('express').Router();

const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
