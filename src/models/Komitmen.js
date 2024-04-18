const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nasabah: {
            type: Schema.Types.ObjectId,
            ref: 'Nasabah',
        },
        dp: Boolean,
        buktiTfKomitmen: String,
        jumlahBayar: Number,
        tglBayar: Date,
    },
    { timestamps: true }
);

module.exports = model('Komitmen', schema);
