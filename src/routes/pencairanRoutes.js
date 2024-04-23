const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Import middleware upload
const {
    createPencairan,
    getPencairans,
    getPencairanById,
    getPencairanByTanggal,
    updatePencairan,
    deletePencairan
} = require('../controllers/pencairanController');

// Routes
router.post('/', upload.single('file'), createPencairan); // Gunakan middleware multer
router.get('/', getPencairans);
router.get('/:id', getPencairanById);
router.get('/tanggal/:tanggal', getPencairanByTanggal); // Endpoint untuk mendapatkan pencairan berdasarkan tanggal
router.patch('/:id', updatePencairan);
router.delete('/:id', deletePencairan);

module.exports = router;
