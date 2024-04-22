const Aplikasi = require('../models/Aplikasi');
const Cabang = require('../models/Cabang');
const Employee = require('../models/Employee');
const InputGestun = require('../models/InputGestun');
const {
    responseOnly,
    responseValidationError,
    responseData,
} = require('../utils/httpResponse');
const { validateRequest, validationFailed } = require('../utils/validator');
const { uploadImage } = require('../utils/cloudinary');
const { TRF_GESTUN_FLD_NAME } = require('../utils/constants');

const createGestun = async (req, res) => {
    try {
        const {
            tanggal,
            namaNasabah,
            namaTimProject,
            namaMarket,
            cabangPengerjaan,
            aplikasi,
            jumlahGestun,
            feeToko,
            potonganDp,
            keterangan,
        } = req.body;

        const { file } = req;

        let error_fields = {};

        await validateRequest(error_fields, 'tanggal', tanggal, 'required');
        await validateRequest(
            error_fields,
            'namaNasabah',
            namaNasabah,
            'required'
        );
        await validateRequest(
            error_fields,
            'jumlahGestun',
            jumlahGestun,
            'required'
        );
        await validateRequest(error_fields, 'feeToko', feeToko, 'required');
        await validateRequest(
            error_fields,
            'potonganDp',
            potonganDp,
            'required'
        );
        await validateRequest(
            error_fields,
            'keterangan',
            keterangan,
            'required'
        );

        if (validationFailed(error_fields)) {
            return responseValidationError(res, error_fields);
        }

        const [timProject, market, cabang, apps] = await Promise.all([
            Employee.findById(namaTimProject).lean(),
            Employee.findById(namaMarket).lean(),
            Cabang.findById(cabangPengerjaan).lean(),
            Aplikasi.findById(aplikasi).lean(),
        ]);

        if (!timProject || !market || !cabang || !apps) {
            return res.status(404).json({
                success: false,
                message: 'One or more resources not found',
            });
        }

        const photo = await uploadImage(file.buffer, TRF_GESTUN_FLD_NAME);

        const buktiTransfer = {
            public_id: photo.public_id,
            url: photo.secure_url,
        };

        await InputGestun.create({
            tanggal,
            namaNasabah,
            namaTimProject,
            namaMarket,
            cabangPengerjaan,
            aplikasi,
            jumlahGestun,
            feeToko,
            potonganDp,
            keterangan,
            buktiTransfer,
        });

        return responseOnly(res, 201, 'Data has been saved.');
    } catch (error) {
        return responseOnly(res, 500);
    }
};

const getGestuns = async (req, res) => {
    try {
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
                path: 'aplikasi',
                select: 'nama',
            },
        ];
        const dataGentun = await InputGestun.find().populate(populate).lean();

        return responseData(res, 200, dataGentun, 'Data has been fetched.');
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

module.exports = {
    createGestun,
    getGestuns,
};
