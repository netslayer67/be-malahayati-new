const Employee = require('../models/Employee');
const {
    responseOnly,
    responseValidationError,
    responseData,
} = require('../utils/httpResponse');
const {
    validateRequest,
    validationFailed,
    setErrorField,
} = require('../utils/validator');
const Nasabah = require('../models/Nasabah');
const Role = require('../models/Role');
const pagination = require('../utils/pagination');

/* service untuk melakukan approval data nasabah dan pemilihan joki */
const dataNasabahApproval = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, joki, tempatCabang, deskripsiOutRegional } = req.body;

        let error_fields = {};

        await validateRequest(
            error_fields,
            'status',
            status,
            'required;oneof=DISETUJUI:DITOLAK'
        );
        await validateRequest(error_fields, 'joki', joki, 'required');

        if (status === 'DISETUJUI') {
            await validateRequest(
                error_fields,
                'tempatCabang',
                tempatCabang,
                'required'
            );

            if (tempatCabang === 'Outregional') {
                await validateRequest(
                    error_fields,
                    'deskripsiOutRegional',
                    'required'
                );
            }
        }

        const findjoki = await Employee.findById(joki).lean();
        if (!findjoki) {
            setErrorField(error_fields, 'joki', 'Joki tidak ditemukan');
        }

        if (validationFailed(error_fields)) {
            return responseValidationError(res, error_fields);
        }

        const finddata = Nasabah.findOne({
            _id: id,
            status: 'MENUNGGU VALIDASI',
        }).lean();

        if (!finddata) {
            return responseOnly(res, 404, 'Data not found');
        }

        const jokies = finddata.joki
            ? [...finddata.joki, findjoki._id]
            : [findjoki._id];

        await Nasabah.findByIdAndUpdate(
            id,
            {
                status,
                joki: jokies,
                reviewer: req.auth.id,
                tempatCabang,
                deskripsiOutRegional,
            },
            { new: true }
        );

        return responseOnly(res, 200, 'Data berhasil diubah');
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

/* Service untuk melihat semua data nasabah yang pending */
const getDataNasabah = async (req, res) => {
    const populate = [
        { path: 'joki', select: 'name' },
        { path: 'reviewer', select: 'name' },
    ];
    let filter = {};
    if (req.query.status) {
        filter.status = req.query.status;
    }
    return await pagination(req, res, 'Nasabah', populate, filter);
};

/* Service untuk search joki */
const searchJoki = async (req, res) => {
    try {
        const { nama } = req.query;

        let query = {};

        if (nama) {
            query.name = { $regex: new RegExp(nama, 'i') };
        }

        const roleJoki = await Role.findOne({ name: 'Joki' }).lean();

        query.role = roleJoki._id;

        const findjoki = await Employee.find(query).lean();

        return responseData(res, 200, findjoki, 'search joki success');
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

module.exports = {
    dataNasabahApproval,
    getDataNasabah,
    searchJoki,
};
