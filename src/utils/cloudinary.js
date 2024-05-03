const sharp = require('sharp');

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imageBuffer, folder) => {
    const commpressedImageBuffer = await sharp(imageBuffer)
        .resize({ width: 1000 })
        .jpeg({ quality: 80 })
        .toBuffer();
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    resource_type: 'image',
                    allowed_formats: ['jpg', 'png'],
                    folder,
                },
                (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve({
                            public_id: result.public_id,
                            secure_url: result.secure_url,
                        });
                    }
                }
            )
            .end(commpressedImageBuffer);
    });
};

module.exports = {
    uploadImage,
};
