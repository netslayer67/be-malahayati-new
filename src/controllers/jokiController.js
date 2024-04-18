const {
    responseOnly,
    responseAccessDenied,
    responseValidationError,
    responseData,
} = require('../utils/httpResponse');
const {
    validateRequest,
    validationFailed,
    setErrorField,
} = require('../utils/validator');
const path = require('path');
const { uploadImage } = require('../utils/cloudinary');
const { DFLT_FINDBY_VAL, EMP_FLD_NAME } = require('../utils/constants');
const Laporan = require('../models/Laporan');
const Nasabah = require('../models/Nasabah');
const pagination = require('../utils/pagination');

const getDataNasabah = async (req, res) => {
    const { lanjutGarap, id } = req.query;
    let filter = {};

    if (lanjutGarap && lanjutGarap === 'true') {
        filter.status = { $in: ['DISETUJUI', 'DALAM PENGGARAPAN'] };
        filter._id = id;
    } else {
        filter.status = 'DISETUJUI';
        filter.joki = { $in: [req.auth.id] };
    }

    const populate = [
        { path: 'joki', select: 'name' },
        { path: 'reviewer', select: 'name' },
    ];

    return await pagination(req, res, 'Nasabah', populate, filter);
};

const mulaiGarap = async (req, res) => {
    try {
        const { id } = req.params;

        const findnasabah = Nasabah.findOne({
            _id: id,
            joki: { $in: [req.auth.id] },
            status: 'DISETUJUI',
        }).lean();

        if (!findnasabah) {
            return responseOnly(res, 404, 'Data not found.');
        }

        await Nasabah.findByIdAndUpdate(
            id,
            { status: 'DALAM PENGGARAPAN' },
            { new: true }
        );

        return responseOnly(res, 200, 'mulai garap');
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

const createLaporan = async (req, res) => {
    try {
        const { id } = req.params;
        // const { body, file } = req;
        const { body } = req;

        // const fileExt = path.extname(file.originalname);

        let error_fields = {};

        const findnasabah = await Nasabah.findOne({
            _id: id,
            status: 'DALAM PENGGARAPAN',
            joki: { $in: [req.auth.id] },
        }).lean();
        if (!findnasabah) {
            return responseOnly(res, 404, 'Data not found');
        }

        await validateRequest(
            error_fields,
            'totalHutang',
            body.totalHutang,
            'required'
        );
        await validateRequest(
            error_fields,
            'totalPencairan',
            body.totalPencairan,
            'required'
        );
        await validateRequest(
            error_fields,
            'namaAplikasi',
            body.namaAplikasi,
            'required'
        );
        await validateRequest(
            error_fields,
            'biayaBackupInclude',
            body.biayaBackupInclude,
            'required'
        );
        // await validateRequest(
        //     error_fields,
        //     'buktiTfBagiHasil',
        //     fileExt,
        //     'required;oneof=.jpg:.png:.jpeg',
        //     'Ekstensi photo harus salah satu dari : jpg, png, jpeg'
        // );

        if (validationFailed(error_fields)) {
            return responseValidationError(res, error_fields);
        }

        // const photo = await uploadImage(file.buffer, EMP_FLD_NAME);

        const dataLaporan = {
            ...body,
            nasabah: findnasabah._id,
            bagiHasil: parseInt(body.totalPencairan) / 2,
            joki: req.auth.id,
        };

        await Laporan.create(dataLaporan);

        return responseOnly(res, 201, 'data has been creted.');
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

const lanjutGarap = async (req, res) => {
    try {
        const { id } = req.params;

        const findnasabah = await Nasabah.findById(id).lean();
        if (!findnasabah) {
            return responseOnly(res, 404, 'Data not found.');
        }

        if (findnasabah.joki.includes(req.auth.id)) {
            return responseOnly(res, 200, 'Lanjut garap.');
        }

        const jokies = [...findnasabah.joki, req.auth.id];

        await Nasabah.findByIdAndUpdate(
            { _id: id },
            { $set: { joki: jokies, status: 'DALAM PENGGARAPAN' } }
        ).lean();

        return responseOnly(res, 200, 'lanjut garap sukses.');
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

module.exports = {
    /* NEW */
    getDataNasabah,
    mulaiGarap,
    createLaporan,
    lanjutGarap,
};
