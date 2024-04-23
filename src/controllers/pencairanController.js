const Pencairan = require('../models/InputPencairan');
const Employee = require('../models/Employee');
const Cabang = require('../models/Cabang');
const Aplikasi = require('../models/Aplikasi');
const { uploadImage } = require('../utils/cloudinary');
const { TRF_PNCRN_FLD_NAME } = require('../utils/constants');

// Create a new pencairan
exports.createPencairan = async (req, res) => {
    try {
        const { body, file } = req;
        const { tanggal, namaNasabah, namaTimProject, namaMarket, cabangPengerjaan, reports, jumlahPencairan, jumlahTransfer, keterangan } = body;

        const [timProject, market, cabang] = await Promise.all([
            Employee.findById(namaTimProject),
            Employee.findById(namaMarket),
            Cabang.findById(cabangPengerjaan)
        ]);

        if (!timProject || !market || !cabang) {
            return res.status(404).json({
                success: false,
                message: 'Tim project, Market, or Cabang not found'
            });
        }

        const processedReports = await Promise.all(reports.map(async (report) => {
            const { aplikasi, pencairan } = report;
            const aplikasiData = await Aplikasi.findById(aplikasi).lean();
            if (!aplikasiData) {
                throw new Error('Aplikasi not found');
            }
            return { aplikasi: aplikasiData._id.toString(), pencairan };
        }));

        const photo = await uploadImage(file.buffer, TRF_PNCRN_FLD_NAME);
        const buktiTransfer = {
            public_id: photo.public_id,
            url: photo.secure_url,
        };

        // Mendapatkan timestamp dari tanggal
        const tanggalId = new Date(tanggal).getTime();

        const pencairanData = new Pencairan({
            tanggal,
            tanggalId, // Menambahkan tanggal ID ke data pencairan
            namaNasabah,
            namaTimProject: timProject._id.toString(),
            namaMarket: market._id.toString(),
            cabangPengerjaan: cabang._id.toString(),
            reports: processedReports,
            jumlahPencairan,
            jumlahTransfer,
            keterangan,
            buktiTransfer,
        });

        const savedPencairan = await pencairanData.save();
        res.status(201).json({ success: true, data: savedPencairan });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all Pencairan
exports.getPencairans = async (req, res) => {
    try {
        const { nama, nasabah, employee } = req.query;

        const filters = {};
        if (nama) filters.nama = { $regex: new RegExp(nama, 'i') };
        if (nasabah) filters.nasabah = { $regex: new RegExp(nasabah, 'i') };
        if (employee) filters.employee = employee;

        const populate = [
            { path: 'namaTimProject', select: 'nama' },
            { path: 'namaMarket', select: 'nama' },
            { path: 'cabangPengerjaan', select: 'nama' },
            { path: 'reports.aplikasi', select: 'nama' },
        ];

        const pencairans = await Pencairan.find(filters).populate(populate).lean();
        res.status(200).json({ success: true, data: pencairans });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get pencairan by ID
exports.getPencairanById = async (req, res) => {
    try {
        const { id } = req.params;
        const pencairan = await Pencairan.findById(id)
            .populate([
                { path: 'namaTimProject', select: 'nama' },
                { path: 'namaMarket', select: 'nama' },
                { path: 'cabangPengerjaan', select: 'nama' },
                { path: 'reports.aplikasi', select: 'nama' }
            ]);

        if (!pencairan) {
            return res.status(404).json({ success: false, message: 'Pencairan not found' });
        }

        res.status(200).json({ success: true, data: pencairan });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Get pencairan by tanggal
exports.getPencairanByTanggal = async (req, res) => {
    try {
        const { tanggal } = req.params;
        const pencairanByTanggal = await Pencairan.find({ tanggal });

        if (!pencairanByTanggal || pencairanByTanggal.length === 0) {
            return res.status(404).json({ success: false, message: 'Pencairan not found for the specified tanggal' });
        }

        res.status(200).json({ success: true, data: pencairanByTanggal });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// Update pencairan
exports.updatePencairan = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const options = { new: true };

        const pencairan = await Pencairan.findByIdAndUpdate(id, updatedFields, options);
        if (!pencairan) {
            return res.status(404).json({ success: false, message: 'Pencairan not found' });
        }
        res.status(200).json({ success: true, data: pencairan });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete pencairan
exports.deletePencairan = async (req, res) => {
    try {
        const { id } = req.params;
        const pencairan = await Pencairan.findByIdAndDelete(id);
        if (!pencairan) {
            return res.status(404).json({ success: false, message: 'Pencairan not found' });
        }
        res.status(200).json({ success: true, message: 'Pencairan deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};