const router = require('express').Router();
const upload = require('../middlewares/upload');
const InputGestun = require('../controllers/inputGestunController');

router.get('/get-gestuns', InputGestun.getGestuns);
router.post('/create-gestun', upload.single('file'), InputGestun.createGestun);

module.exports = router;
