const Nasabah = require('../models/Nasabah');

// Controller untuk membuat (create) nasabah baru
exports.createNasabah = async (req, res) => {
    try {
        const { nama } = req.body;
        const nasabah = await Nasabah.create({ nama });
        res.status(201).json({ success: true, data: nasabah });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk mendapatkan semua nasabah
exports.getAllNasabah = async (req, res) => {
    try {
        const nasabah = await Nasabah.find();
        res.status(200).json({ success: true, data: nasabah });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk mendapatkan nasabah berdasarkan ID
exports.getNasabahById = async (req, res) => {
    try {
        const nasabah = await Nasabah.findById(req.params.id);
        if (!nasabah) {
            return res.status(404).json({ success: false, message: 'Nasabah not found' });
        }
        res.status(200).json({ success: true, data: nasabah });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk mengupdate nasabah berdasarkan ID
exports.updateNasabah = async (req, res) => {
    try {
        const { nama } = req.body;
        let nasabah = await Nasabah.findById(req.params.id);
        if (!nasabah) {
            return res.status(404).json({ success: false, message: 'Nasabah not found' });
        }
        nasabah.nama = nama;
        nasabah = await nasabah.save();
        res.status(200).json({ success: true, data: nasabah });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk menghapus nasabah berdasarkan ID
exports.deleteNasabah = async (req, res) => {
    try {
        const nasabah = await Nasabah.findById(req.params.id);
        if (!nasabah) {
            return res.status(404).json({ success: false, message: 'Nasabah not found' });
        }
        await Nasabah.deleteOne({ _id: req.params.id }); // Menggunakan deleteOne untuk menghapus dokumen
        res.status(200).json({ success: true, message: 'Nasabah deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

