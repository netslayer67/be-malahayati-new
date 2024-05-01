const router = require('express').Router();
const { login, registerMany, logout } = require('../controllers/authController');

router.post('/register', registerMany);
router.post('/login', login);


module.exports = router;
