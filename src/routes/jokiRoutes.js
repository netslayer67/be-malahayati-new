const router = require('express').Router();
const Joki = require('../controllers/jokiController');
const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/upload');

router.get(
    '/get-data-nasabah',
    checkAuth,
    checkRole('Joki'),
    Joki.getDataNasabah
);

router.patch('/:id/mulai-garap', checkAuth, checkRole('Joki'), Joki.mulaiGarap);
router.post(
    '/:id/create-laporan',
    checkAuth,
    checkRole('Joki'),
    Joki.createLaporan
);
router.patch(
    '/:id/lanjut-garap',
    checkAuth,
    checkRole('Joki'),
    Joki.lanjutGarap
);

module.exports = router;
