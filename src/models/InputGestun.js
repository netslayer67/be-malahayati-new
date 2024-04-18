const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        tanggal: {
            type: String,
            required: true
        },
        namaNasabah: {
            type: Schema.Types.ObjectId,
            ref: 'Nasabah',
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
            type: Schema.Types.ObjectId,
            ref: 'Aplikasi',
        },
        jumlahGestun: {
            type: Number,
            required: true
        },
        FeeToko: {
            type: Number,
            required: true
        },
        PotonganDp: {
            type: Number
        },
        PotonganLainnya: {
            type: Number
        },
        keterangan: {
            type: String
        },
        buktiTransfer: {
            type: String // Menyimpan path foto di server atau URL foto jika tersedia
        }
    },
    { timestamps: true }
);
module.exports = model('InputGestun', schema);
