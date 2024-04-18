const Aplikasi = require('../models/Aplikasi')

// Controller untuk membuat (create) aplikasi baru
exports.createAplikasi = async (req, res) => {
    try {
        const { nama } = req.body;
        const aplikasi = await Aplikasi.create({ nama });
        res.status(201).json({ success: true, data: aplikasi });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk mendapatkan semua aplikasi
exports.getAllAplikasi = async (req, res) => {
    try {
        const aplikasi = await Aplikasi.find();
        res.status(200).json({ success: true, data: aplikasi });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk mendapatkan aplikasi berdasarkan ID
exports.getAplikasiById = async (req, res) => {
    try {
        const aplikasi = await Aplikasi.findById(req.params.id);
        if (!aplikasi) {
            return res.status(404).json({ success: false, message: 'Aplikasi not found' });
        }
        res.status(200).json({ success: true, data: aplikasi });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk menghapus aplikasi berdasarkan ID
exports.deleteAplikasi = async (req, res) => {
    try {
        const aplikasi = await Aplikasi.findById(req.params.id);
        if (!aplikasi) {
            return res.status(404).json({ success: false, message: 'Aplikasi not found' });
        }
        await Aplikasi.deleteOne({ _id: req.params.id }); // Menggunakan deleteOne untuk menghapus dokumen
        res.status(200).json({ success: true, message: 'Aplikasi deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};