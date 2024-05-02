const Pencairan = require('../models/InputPencairan');
const Employee = require('../models/Employee');
const Cabang = require('../models/Cabang');
const Aplikasi = require('../models/Aplikasi');
const { uploadImage } = require('../utils/cloudinary');
const { TRF_PNCRN_FLD_NAME } = require('../utils/constants');
const { default: mongoose } = require('mongoose');

// Create a new pencairan
exports.createPencairan = async (req, res) => {
    try {
        const { body, file } = req;
        const {
            tanggal,
            namaNsb: namaNasabah,
            namaTimProject,
            namaMarket,
            namaMitra,
            cabangPengerjaan,
            reports,
            jumlah: jumlahPencairan,
            transfer: jumlahTransfer,
            desc,
        } = body;

        const [timProject, market, cabang] = await Promise.all([
            Employee.findById(new mongoose.Types.ObjectId(namaTimProject)),
            Employee.findById(new mongoose.Types.ObjectId(namaMarket)),
            Cabang.findById(new mongoose.Types.ObjectId(cabangPengerjaan)),
        ]);

        if (!timProject || !market || !cabang) {
            return res.status(404).json({
                success: false,
                message: 'Tim project, Market, or Cabang not found',
            });
        }

        // const processedReports = await Promise.all(
        //     reports.map(async (report) => {
        //         const { aplikasi, pencairan } = report;
        //         return { aplikasi, pencairan };
        //     })
        // );
        // console.log(body);
        const folder = TRF_PNCRN_FLD_NAME + '/' + cabang.nama;
        const photo = await uploadImage(file.buffer, folder);
        const buktiTransfer = {
            public_id: photo.public_id,
            url: photo.secure_url,
        };

        const tanggalId = new Date(tanggal).getTime().toString();

        const pencairanData = new Pencairan({
            tanggal,
            tanggalId,
            namaNasabah,
            namaTimProject: timProject._id.toString(),
            namaMarket: market._id.toString(),
            namaMitra,
            cabangPengerjaan: cabang._id.toString(),
            reports,
            jumlahPencairan,
            jumlahTransfer,
            desc,
            buktiTransfer,
        });

        const savedPencairan = await pencairanData.save();
        // console.log(savedPencairan);

        res.status(201).json({
            success: true,
            data: { ...savedPencairan.toObject(), tanggalId },
        });
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
            // { path: 'reports.aplikasi', select: 'nama' },
        ];

        const pencairans = await Pencairan.find(filters)
            .populate(populate)
            .lean();
        res.status(200).json({
            success: true,
            data: pencairans.map((pencairan) => ({
                ...pencairan,
                tanggalId: new Date(pencairan.tanggal).getTime().toString(),
            })),
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get pencairan by ID
exports.getPencairanById = async (req, res) => {
    try {
        const { id } = req.params;
        const pencairan = await Pencairan.findById(id).populate([
            { path: 'namaTimProject', select: 'nama' },
            { path: 'namaMarket', select: 'nama' },
            { path: 'cabangPengerjaan', select: 'nama' },
            // { path: 'reports.aplikasi', select: 'nama' },
        ]);

        if (!pencairan) {
            return res
                .status(404)
                .json({ success: false, message: 'Pencairan not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                ...pencairan.toObject(),
                tanggalId: new Date(pencairan.tanggal).getTime().toString(),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get pencairan by tanggalId
exports.getPencairanByTanggal = async (req, res) => {
    try {
        const { tanggalId } = req.params;
        const { nama, nasabah, employee } = req.query;
        const filters = {};
        if (nama) filters.nama = { $regex: new RegExp(nama, 'i') };
        if (nasabah) filters.nasabah = { $regex: new RegExp(nasabah, 'i') };
        if (employee) filters.employee = employee;

        const populate = [
            { path: 'namaTimProject', select: 'nama' },
            { path: 'namaMarket', select: 'nama' },
            { path: 'cabangPengerjaan', select: 'nama' },
            // { path: 'reports.aplikasi', select: 'nama' },
        ];

        const pencairanByTanggal = await Pencairan.find({
            tanggalId: tanggalId.toString(),
            ...filters,
        })
            .populate(populate)
            .lean();

        if (!pencairanByTanggal || pencairanByTanggal.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Pencairan not found for the specified tanggalId',
            });
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

        const pencairan = await Pencairan.findByIdAndUpdate(
            id,
            updatedFields,
            options
        );
        if (!pencairan) {
            return res
                .status(404)
                .json({ success: false, message: 'Pencairan not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                ...pencairan.toObject(),
                tanggalId: new Date(pencairan.tanggal).getTime().toString(),
            },
        });
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
            tanggalId: new Date(pencairan.tanggal).getTime().toString(),
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
