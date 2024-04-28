const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

const generateAccessToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '7d' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '30d' });
};

const decodeToken = (token) => {
    return jwt.verify(token, secretKey);
};

const decodeRefreshToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    generateToken,
    decodeToken,
    generateAccessToken,
    generateRefreshToken,
    decodeRefreshToken,
};
