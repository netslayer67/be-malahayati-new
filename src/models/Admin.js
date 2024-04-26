const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model('Admin', schema);
