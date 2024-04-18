const Cabang = require('../models/Cabang')

// Controller untuk membuat (create) cabang baru
exports.createCabang = async (req, res) => {
    try {
        const { nama } = req.body;
        const cabang = await Cabang.create({ nama });
        res.status(201).json({ success: true, data: cabang });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk mendapatkan semua cabang
exports.getAllCabang = async (req, res) => {
    try {
        const cabang = await Cabang.find();
        res.status(200).json({ success: true, data: cabang });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Controller untuk mendapatkan cabang berdasarkan ID
exports.getCabangById = async (req, res) => {
    try {
        const cabang = await Cabang.findById(req.params.id);
        if (!cabang) {
            return res.status(404).json({ success: false, message: 'Cabang not found' });
        }
        res.status(200).json({ success: true, data: cabang });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk mengupdate cabang berdasarkan ID
exports.updateCabang = async (req, res) => {
    try {
        const { nama } = req.body;
        let cabang = await Cabang.findById(req.params.id);
        if (!cabang) {
            return res.status(404).json({ success: false, message: 'Cabang not found' });
        }
        cabang.nama = nama;
        cabang = await cabang.save();
        res.status(200).json({ success: true, data: cabang });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller untuk menghapus cabang berdasarkan ID
exports.deleteCabang = async (req, res) => {
    try {
        const cabang = await Cabang.findById(req.params.id);
        if (!cabang) {
            return res.status(404).json({ success: false, message: 'Cabang not found' });
        }
        await Cabang.deleteOne({ _id: req.params.id }); // Menggunakan deleteOne untuk menghapus dokumen
        res.status(200).json({ success: true, message: 'Cabang deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
