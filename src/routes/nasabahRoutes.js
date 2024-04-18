const express = require('express');
const router = express.Router();
const {
    createNasabah,
    getAllNasabah,
    getNasabahById,
    updateNasabah,
    deleteNasabah
} = require('../controllers/nasabahController');

// Routes
router.post('/', createNasabah);
router.get('/', getAllNasabah);
router.get('/:id', getNasabahById);
router.patch('/:id', updateNasabah);
router.delete('/:id', deleteNasabah);

module.exports = router;
