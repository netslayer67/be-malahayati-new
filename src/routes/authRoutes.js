const router = require('express').Router();
const {
    login,
    registerMany,
    register,
} = require('../controllers/authController');

router.post('/register', registerMany);
router.post('/login', login);
router.post('/register2', register);

module.exports = router;
