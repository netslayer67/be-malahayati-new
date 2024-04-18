const router = require('express').Router();

/* Import routes */
const Employee = require('./employeeRoutes');
const Role = require('./roleRoutes');
const Admin = require('./adminRoutes');
const Joki = require('./jokiRoutes');
const Auth = require('./authRoutes');
const Nasabah = require('./nasabahRoutes');
const InputNasabah = require('./inputRoutes');
const Cabang = require('./cabangRoutes');
const Aplikasi = require('./aplikasiRoutes');
const Pencairan = require('./pencairanRoutes');

/* Use routes */

/* Router karyawan internal */
router.use('/employee', Employee);

/* Router role */
router.use('/role', Role);

/* Router role admin */
router.use('/admin', Admin);

/* Router role joki */
router.use('/joki', Joki);

/* Routes untuk login employee, dan user */
router.use('/auth', Auth);

/* Routes untuk nasabah */
router.use('/nasabah', Nasabah);

/* Routes untuk input nasabah */
router.use('/input-nasabah', InputNasabah);

router.use('/cabang', Cabang);

router.use('/aplikasi', Aplikasi);

router.use('/pencairan', Pencairan);

module.exports = router;
