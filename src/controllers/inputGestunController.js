const Gestun = require('../models/InputGestun');
const Employee = require('../models/Employee');
const Cabang = require('../models/Cabang');
const Aplikasi = require('../models/Aplikasi');
const { uploadImage } = require('../utils/cloudinary');
const {
    TRF_PNCRN_FLD_NAME,
    TRF_GESTUN_FLD_NAME,
} = require('../utils/constants');
const { default: mongoose } = require('mongoose');

exports.createGestun = async (req, res) => {
    try {
        const { body, file } = req;
        const {
            tanggal,
            namaNsb: namaNasabah,
            namaTimProject,
            namaMarket,
            namaMitra,
            cabangPengerjaan,
            aplikasi,
            jumlahGestun,
            feeToko,
            potonganDp,
            potonganLainnya,
            jumlahTransfer,
            keterangan,
        } = body;

        const [timProject, market, cabang] = await Promise.all([
            Employee.findById(new mongoose.Types.ObjectId(namaTimProject)),
            Employee.findById(new mongoose.Types.ObjectId(namaMarket)),
            Cabang.findById(new mongoose.Types.ObjectId(cabangPengerjaan)),
            // Aplikasi.findById(new mongoose.Types.ObjectId(aplikasi)),
        ]);

        if (!timProject || !market || !cabang) {
            return res.status(404).json({
                success: false,
                message: 'Tim project, Market, or Cabang not found',
            });
        }
        const folder = TRF_GESTUN_FLD_NAME + '/' + cabang.nama;
        const photo = await uploadImage(file.buffer, folder);
        const buktiTransfer = {
            public_id: photo.public_id,
            url: photo.secure_url,
        };

        const tanggalId = new Date(tanggal).getTime().toString();

        const gestunData = new Gestun({
            tanggal,
            tanggalId,
            namaNasabah,
            namaTimProject: timProject._id.toString(),
            namaMarket: market._id.toString(),
            namaMitra,
            cabangPengerjaan: cabang._id.toString(),
            aplikasi,
            jumlahGestun,
            feeToko,
            potonganDp, // Masukkan nilai potongan DP ke dalam objek
            potonganLainnya,
            jumlahTransfer,
            keterangan,
            buktiTransfer,
        });

        const savedGestun = await gestunData.save();

        res.status(201).json({
            success: true,
            data: { ...savedGestun.toObject(), tanggalId },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getGestuns = async (req, res) => {
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
            // { path: 'aplikasi', select: 'nama' },
        ];
        const gestuns = await Gestun.find(filters).populate(populate).lean();
        res.status(200).json({
            success: true,
            data: gestuns.map((gestun) => ({
                ...gestun,
                tanggalId: new Date(gestun.tanggal).getTime().toString(),
            })),
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getGestunById = async (req, res) => {
    try {
        const { id } = req.params;
        const gestun = await Gestun.findById(id).populate([
            { path: 'namaTimProject', select: 'nama' },
            { path: 'namaMarket', select: 'nama' },
            { path: 'cabangPengerjaan', select: 'nama' },
            // { path: 'aplikasi', select: 'nama' },
        ]);

        if (!gestun) {
            return res
                .status(404)
                .json({ success: false, message: 'Gestun not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                ...gestun.toObject(),
                tanggalId: new Date(gestun.tanggal).getTime().toString(),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getGestunByTanggal = async (req, res) => {
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
            // { path: 'aplikasi', select: 'nama' },
        ];

        const gestunByTanggal = await Gestun.find({
            tanggalId: tanggalId.toString(),
            ...filters,
        })
            .populate(populate)
            .lean();

        if (!gestunByTanggal || gestunByTanggal.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Gestun not found for the specified tanggalId',
            });
        }

        res.status(200).json({ success: true, data: gestunByTanggal });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
