const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nasabah: {
            type: Schema.Types.ObjectId,
            ref: 'Nasabah',
        },
        totalHutang: Number,
        totalPencairan: Number,
        namaAplikasi: String,
        bagiHasil: Number,
        joki: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        biayaBackupInclude: {
            type: String,
            enum: ['1', '0'],
        },
        gestun: [
            {
                namaAplikasi: String,
                nominal: Number,
                namaToko: String,
                buktiTransfer: {
                    url: String,
                    public_id: String,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = model('Laporan', schema);
