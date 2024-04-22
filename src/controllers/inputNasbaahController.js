const InputNasabah = require('../models/InputNasabah');
const {
    responseValidationError,
    responseOnly,
    responseData,
} = require('../utils/httpResponse');
const pagination = require('../utils/pagination');
const { validateRequest, validationFailed } = require('../utils/validator');

const createInput = async (req, res) => {
    try {
        const { body } = req;

        let error_fields = {};

        // await validateRequest(error_fields, "nama", body.nama, "required");
        // await validateRequest(error_fields, "domisili", body.domisili, "required");
        // await validateRequest(
        //   error_fields,
        //   "rekomendasi",
        //   body.rekomendasi,
        //   "required"
        // );
        // await validateRequest(
        //   error_fields,
        //   "timProject",
        //   body.timProject,
        //   "required"
        // );
        // await validateRequest(error_fields, "branch", body.branch, "required");
        // if (body.branch === "Outregional") {
        //   await validateRequest(
        //     error_fields,
        //     "lokasiDaerah",
        //     body.lokasiDaerah,
        //     "required"
        //   );
        // }

        if (validationFailed(error_fields)) {
            return responseValidationError(res, error_fields);
        }

        // console.log(body);
        await InputNasabah.create({ ...body });

        return responseOnly(res, 201, 'Data has been created');
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

const getInputs = async (req, res) => {
    try {
        const { search } = req.query;
        if (search) {
            const searchNasabah = await InputNasabah.aggregate([
                {
                    $match: {
                        nama: { $regex: search, $options: 'i' },
                    },
                },
            ]);
            const resNasabah = searchNasabah.map((el) => ({
                id: el._id,
                nama: el.nama,
                domisili: el.domisili,
                rekomendasi: el.rekomendasi,
                timProject: el.timProject,
                branch: el.branch,
                lokasiDaerah: el.lokasiDaerah,
                createdAt: el.createdAt,
            }));
            res.status(200).json(resNasabah);
        } else {
            const nasabah = await InputNasabah.find().lean();
            // console.log(nasabah);
            // if (nasabah.length === 0) throw new Error("Data kosong");

            const resNasabah = nasabah.map((el) => ({
                id: el._id,
                nama: el.nama,
                domisili: el.domisili,
                rekomendasi: el.rekomendasi,
                timProject: el.timProject,
                branch: el.branch,
                lokasiDaerah: el.lokasiDaerah,
                createdAt: el.createdAt,
            }));
            res.status(200).json(resNasabah);
        }
    } catch (error) {
        console.error(error);
        res.status(406).json({
            error: error.message || 'Error kodingannya, Pak',
        });
    }
};

const getDetailInput = async (req, res) => {
    try {
        const { id } = req.params;
        const populate = [
            { path: 'timProject', select: 'name' },
            // { path: "reviewer", select: "name" },
        ];
        const nasabah = await InputNasabah.findOne({ _id: id })
            .populate(populate)
            .lean();
        if (!nasabah) {
            return res.status(404).json({ error: 'Data Not Found' });
        }
        const resNasabah = {
            id: nasabah._id,
            nama: nasabah.nama,
            domisili: nasabah.domisili,
            timProject: nasabah.timProject, // Ubah dari penggunaan map menjadi akses langsung ke properti name jika timProject tidak null
            // reviewer: nasabah.reviewer,
            rekomendasi: nasabah.rekomendasi,
            branch: nasabah.branch,
            lokasiDaerah: nasabah.lokasiDaerah,
            createdAt: nasabah.createdAt,
        };
        responseData(res, 200, resNasabah, 'Get detail nasabah success');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const searchInput = async (req, res) => {
//   try {
//     const { search } = req.params;
//     console.log(search);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
    createInput,
    getInputs,
    getDetailInput,
    // searchInput,
};
