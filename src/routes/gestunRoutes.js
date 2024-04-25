const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createGestun,
    getGestunById,
    getGestunByTanggal,
    getGestuns } = require('../controllers/inputGestunController');

router.post('/create-gestun', upload.single('file'), createGestun);
router.get('/get-gestuns', getGestuns);
router.get('/get-gestun/:id', getGestunById);
router.get('/get-gestun/tanggal/:tanggalId', getGestunByTanggal);

module.exports = router;
