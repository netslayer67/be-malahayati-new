const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
    createGestun,
    getGestunById,
    getGestunByTanggal,
    getGestuns,
} = require('../controllers/inputGestunController');
const auth = require('../middlewares/checkAuth');

router.post('/create-gestun', auth, upload.single('file'), createGestun);
router.get('/get-gestuns', getGestuns);
router.get('/get-gestun/:id', getGestunById);
router.get('/get-gestun/tanggal/:tanggalId', getGestunByTanggal);

module.exports = router;
