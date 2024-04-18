const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nama: String,
    },
    { timestamps: true }
);

module.exports = model('Aplikasi', schema);