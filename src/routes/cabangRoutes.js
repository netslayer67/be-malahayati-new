const express = require('express');
const router = express.Router();
const {
    createCabang,
    getAllCabang,
    getCabangById,
    updateCabang,
    deleteCabang
} = require('../controllers/cabangController');

// Routes
router.post('/', createCabang);
router.get('/', getAllCabang);
router.get('/:id', getCabangById);
router.patch('/:id', updateCabang);
router.delete('/:id', deleteCabang);

module.exports = router;
