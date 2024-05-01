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
        aplikasi: {
            type: String,
            required: true,
        },
        jumlahGestun: {
            type: Number,
            required: true,
        },
        feeToko: {
            type: Number,
            required: true,
        },
        potonganDp: {
            type: Number,
        },
        potonganLainnya: {
            type: Number,
        },
        jumlahTransfer: {
            type: Number,
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
module.exports = model('InputGestun', schema);
