const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nama: String,
        domisili: String,
        rekomendasi: String,
        timProject: String,
        branch: String,
        lokasiDaerah: String,
    },
    { timestamps: true }
);

module.exports = model('InputNasabah', schema);
