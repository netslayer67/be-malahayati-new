// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');

// Fungsi untuk mendaftarkan (register) admin baru
exports.registerMany = async (req, res) => {
    try {
        const accounts = req.body; // Array of objects containing nama and password

        // Lakukan validasi apakah request body berisi array
        if (!Array.isArray(accounts)) {
            return res
                .status(400)
                .json({ message: 'Request body harus berupa array' });
        }

        // Lakukan pendaftaran untuk setiap akun dalam array
        const createdAccounts = [];
        const errors = [];
        for (const account of accounts) {
            try {
                // Cek apakah nama pengguna sudah ada dalam database
                const existingUser = await Admin.findOne({
                    nama: account.nama,
                });
                if (existingUser) {
                    // Jika sudah ada, lanjutkan ke akun berikutnya
                    console.log(
                        `Pengguna dengan nama ${account.nama} sudah ada dalam database. Lewati...`
                    );
                    continue;
                }

                // Hash password
                const hashedPassword = bcrypt.hashPassword(account.password);

                // Buat akun baru
                const newAccount = new Admin({
                    nama: account.nama,
                    password: hashedPassword,
                });
                await newAccount.save();
                createdAccounts.push(newAccount);
            } catch (error) {
                // Tangani kesalahan saat membuat akun
                errors.push({ nama: account.nama, message: error.message });
            }
        }

        if (createdAccounts.length === 0 && errors.length > 0) {
            // Jika tidak ada akun yang berhasil dibuat dan terdapat kesalahan, kirimkan respons dengan pesan kesalahan
            return res.status(400).json({
                message: 'Tidak ada akun yang berhasil dibuat',
                errors,
            });
        }

        res.status(201).json({
            message: 'Akun berhasil dibuat',
            accounts: createdAccounts,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat membuat akun',
            error: error.message,
        });
    }
};

// Fungsi untuk melakukan login admin
exports.login = async (req, res) => {
    try {
        const { nama, password } = req.body;

        // Cari pengguna dalam database
        const existingUser = await Admin.findOne({ nama });
        if (!existingUser) {
            return res
                .status(404)
                .json({ message: 'Pengguna tidak ditemukan' });
        }

        // Periksa apakah password cocok
        const isPasswordCorrect = bcrypt.comparePassword(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Kombinasi nama pengguna dan password salah',
            });
        }

        // Buat token JWT
        const payload = { id: existingUser._id, nama: existingUser.nama };
        const accessToken = jwt.generateAccessToken(payload);

        res.status(200).json({
            token: accessToken,
            id: existingUser._id,
            message: 'LOGIN SUCCESS',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat login',
            error: error.message,
        });
    }
};

