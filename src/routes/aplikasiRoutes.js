const express = require('express');
const router = express.Router();
const {
    createAplikasi,
    getAllAplikasi,
    getAplikasiById,
    deleteAplikasi
} = require('../controllers/aplikasiController');

// Routes
router.post('/', createAplikasi);
router.get('/', getAllAplikasi);
router.get('/:id', getAplikasiById);
router.delete('/:id', deleteAplikasi);

module.exports = router;
