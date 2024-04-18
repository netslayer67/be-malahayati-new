const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        nama: String,
        cabang: {
            type: Schema.Types.ObjectId,
            ref: 'Cabang',
        },
    },
    { timestamps: true }
);

module.exports = model('Employee', schema);
