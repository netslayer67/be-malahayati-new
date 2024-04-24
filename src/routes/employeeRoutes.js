const express = require('express');
const router = express.Router();
const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');

// Routes
router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
