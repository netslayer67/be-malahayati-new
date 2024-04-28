const Employee = require('../models/Employee');
const Cabang = require('../models/Cabang');
const InputPencairan = require('../models/InputPencairan');
const InputGestun = require('../models/InputGestun');

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const { nama, cabangId } = req.body;

        // Periksa apakah cabang dengan ID yang diberikan ada dalam database
        const cabang = await Cabang.findById(cabangId);
        if (!cabang) {
            return res
                .status(404)
                .json({ success: false, message: 'Cabang not found' });
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
        const { nama, cabang } = req.query;

        let filters = {};
        if (nama) filters.nama = { $regex: new RegExp(nama, 'i') };
        if (cabang) filters.cabang = cabang;

        const employees = await Employee.find(filters)
            .populate({ path: 'cabang', select: 'nama' })
            .lean();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id)
            .populate({ path: 'cabang', select: 'nama' })
            .lean();
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: 'Employee not found' });
        }

        const pencairanByProject = await InputPencairan.find({
            namaTimProject: id,
        }).lean();
        const pencairanByMarket = await InputPencairan.find({
            namaMarket: id,
        }).lean();
        const gestunByProject = await InputGestun.find({
            namaTimProject: id,
        }).lean();
        const gestunByMarket = await InputGestun.find({
            namaMarket: id,
        }).lean();

        const data = {
            employee,
            pencairanByMarket,
            pencairanByProject,
            gestunByMarket,
            gestunByProject,
        };

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update employee by ID
exports.updateEmployee = async (req, res) => {
    try {
        const { nama, cabang } = req.body;
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { nama, cabang },
            { new: true }
        );
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: 'Employee not found' });
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
            return res
                .status(404)
                .json({ success: false, message: 'Employee not found' });
        }
        await employee.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
