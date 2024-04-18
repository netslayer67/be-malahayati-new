const Employee = require('../models/Employee');
const Cabang = require('../models/Cabang');

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const { nama, cabangId } = req.body;

        // Periksa apakah cabang dengan ID yang diberikan ada dalam database
        const cabang = await Cabang.findById(cabangId);
        if (!cabang) {
            return res.status(404).json({ success: false, message: 'Cabang not found' });
        }

        // Buat objek karyawan dengan ID cabang yang telah diberikan
        const employee = await Employee.create({ nama, cabang: cabangId });
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update employee by ID
exports.updateEmployee = async (req, res) => {
    try {
        const { nama, cabang } = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, { nama, cabang }, { new: true });
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        await employee.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
