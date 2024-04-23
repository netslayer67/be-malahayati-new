const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        tanggalId: {
            type: String,
        },
        tanggal: {
            type: String,
            required: true,
        },
        namaNasabah: {
            type: String,
            required: true,
        },
        namaTimProject: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        namaMarket: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        cabangPengerjaan: {
            type: Schema.Types.ObjectId,
            ref: 'Cabang',
        },
        reports: [
            {
                aplikasi: {
                    type: Schema.Types.ObjectId,
                    ref: 'Aplikasi',
                },
                pencairan: {
                    type: Number,
                    required: true,
                },
            },
        ],
        jumlahPencairan: {
            type: Number,
            required: true,
        },
        jumlahTransfer: {
            type: Number,
            required: true,
        },
        keterangan: {
            type: String,
        },
        buktiTransfer: {
            public_id: String,
            url: String,
        },
    },
    { timestamps: true }
);
module.exports = model('InputPencairan', schema);
