const Pencairan = require('../models/InputPencairan');
const Employee = require('../models/Employee');
const Cabang = require('../models/Cabang');
const Aplikasi = require('../models/Aplikasi');
const { uploadImage } = require('../utils/cloudinary');
const { TRF_PNCRN_FLD_NAME } = require('../utils/constants');

// Create a new pencairan
exports.createPencairan = async (req, res) => {
    try {
        const {
            tanggal,
            namaNasabah,
            namaTimProject,
            namaMarket,
            cabangPengerjaan,
            reports,
            jumlahPencairan,
            jumlahTransfer,
            keterangan,
        } = req.body;

        const { file } = req;

        // Cari data nasabah, tim project, market, dan cabang secara paralel
        const [timProject, market, cabang] = await Promise.all([
            Employee.findById(namaTimProject).lean(),
            Employee.findById(namaMarket).lean(),
            Cabang.findById(cabangPengerjaan).lean(),
        ]);

        if (!timProject || !market || !cabang) {
            return res.status(404).json({
                success: false,
                message: 'One or more resources not found',
            });
        }

        // Proses masing-masing report secara paralel
        const processedReports = await Promise.all(
            reports.map(async (report) => {
                const { aplikasi, pencairan } = report;

                // Cari data aplikasi
                const aplikasiData = await Aplikasi.findById(aplikasi).lean();
                if (!aplikasiData) {
                    throw new Error('Aplikasi not found');
                }

                return { aplikasi: aplikasiData._id, pencairan };
            })
        );

        const photo = await uploadImage(file.buffer, TRF_PNCRN_FLD_NAME);
        const buktiTransfer = {
            public_id: photo.public_id,
            url: photo.secure_url,
        };

        // Buat objek pencairan dengan data yang diberikan
        const pencairanData = new Pencairan({
            tanggal,
            namaNasabah,
            namaTimProject: timProject._id,
            namaMarket: market._id,
            cabangPengerjaan: cabang._id,
            reports: processedReports,
            jumlahPencairan,
            jumlahTransfer,
            keterangan,
            buktiTransfer,
        });

        // Simpan objek pencairan ke dalam database
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

        let filters = {};

        if (nama) filters.namaa = { $regex: new RegExp(nama, 'i') };
        if (nasabah) filters.nasabah = { $regex: new RegExp(nasabah, 'i') };
        if (employee) filters.employee = employee;

        const populate = [
            {
                path: 'namaTimProject',
                select: 'nama',
            },
            {
                path: 'namaMarket',
                select: 'nama',
            },
            {
                path: 'cabangPengerjaan',
                select: 'nama',
            },
            {
                path: 'reports.aplikasi',
                select: 'nama',
            },
        ];
        const pencairans = await Pencairan.find(filters)
            .populate(populate)
            .lean();
        res.status(200).json({ success: true, data: pencairans });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get pencairan by ID
exports.getPencairanById = async (req, res) => {
    try {
        const { id } = req.params;
        const pencairan = await Pencairan.findById(id);
        if (!pencairan) {
            return res
                .status(404)
                .json({ success: false, message: 'Pencairan not found' });
        }
        res.status(200).json({ success: true, data: pencairan });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update pencairan
exports.updatePencairan = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            tanggal,
            namaNasabah,
            namaTimProject,
            namaMarket,
            cabangPengerjaan,
            reports,
            jumlahPencairan,
            jumlahTransfer,
            keterangan,
            buktiTransfer,
        } = req.body;

        const pencairan = await Pencairan.findByIdAndUpdate(
            id,
            {
                tanggal,
                namaNasabah,
                namaTimProject,
                namaMarket,
                cabangPengerjaan,
                reports,
                jumlahPencairan,
                jumlahTransfer,
                keterangan,
                buktiTransfer,
            },
            { new: true }
        );

        if (!pencairan) {
            return res
                .status(404)
                .json({ success: false, message: 'Pencairan not found' });
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
            return res
                .status(404)
                .json({ success: false, message: 'Pencairan not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Pencairan deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
