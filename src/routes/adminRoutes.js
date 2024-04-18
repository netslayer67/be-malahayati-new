const router = require('express').Router();
const Admin = require('../controllers/adminController');

/* middleware */
const checkAuth = require('../middlewares/checkAuth');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/upload');

router.patch(
    '/:id/nasabah-approval',
    checkAuth,
    checkRole('Admin'),
    Admin.dataNasabahApproval
);
router.get(
    '/get-data-nasabah',
    checkAuth,
    checkRole('Admin'),
    Admin.getDataNasabah
);

router.get('/search-joki', checkAuth, checkRole('Admin'), Admin.searchJoki);

module.exports = router;
