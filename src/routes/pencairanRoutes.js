const express = require('express');
const router = express.Router();
const {
    createPencairan,
    getPencairans,
    getPencairanById,
    updatePencairan,
    deletePencairan
} = require('../controllers/pencairanController');

// Routes
router.post('/', createPencairan);
router.get('/', getPencairans);
router.get('/:id', getPencairanById);
router.patch('/:id', updatePencairan);
router.delete('/:id', deletePencairan);

module.exports = router;