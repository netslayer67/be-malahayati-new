const router = require('express').Router();
const { login, registerMany } = require('../controllers/authController');

router.post('/register', registerMany);
router.post('/login', login);

module.exports = router;
