const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Import middleware upload
const {
    createPencairan,
    getPencairans,
    getPencairanById,
    getPencairanByTanggal,
    updatePencairan,
    deletePencairan,
} = require('../controllers/pencairanController');
const auth = require('../middlewares/checkAuth');

// Routes
router.post('/', auth, upload.single('file'), createPencairan); // Gunakan middleware multer
router.get('/', getPencairans);
router.get('/:id', getPencairanById);
router.get('/tanggal/:tanggalId', getPencairanByTanggal); // Endpoint untuk mendapatkan pencairan berdasarkan tanggal
router.patch('/:id', auth, updatePencairan);
router.delete('/:id', auth, deletePencairan);

module.exports = router;
