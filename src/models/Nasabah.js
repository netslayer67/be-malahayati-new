const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nama: String,
    },
    { timestamps: true }
);

module.exports = model('NewNasabah', schema);
