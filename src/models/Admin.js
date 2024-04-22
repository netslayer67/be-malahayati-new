const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model('Admin', schema);
