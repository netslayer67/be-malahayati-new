const router = require('express').Router();
const InputNasabah = require('../controllers/inputNasbaahController');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/checkAuth');

router.get('/get-inputs', InputNasabah.getInputs);
router.post(
    '/create-input',
    auth,
    upload.single('file'),
    InputNasabah.createInput
);
router.get('/get-input/:id', InputNasabah.getDetailInput);

module.exports = router;
