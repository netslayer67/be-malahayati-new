const Nasabah = require('../models/Nasabah');

const generateSerialNo = async () => {
    try {
        let userCount = await Nasabah.countDocuments();

        if (userCount == 0) userCount = 1;

        let running = true;

        let serialNo;

        while (running) {
            serialNo = userCount.toString().padStart(5, '0');
            let findone = await Nasabah.findOne({ serialNo }).lean();
            if (!findone) {
                running = false;
                break;
            }

            userCount++;
        }

        return serialNo;
    } catch (error) {
        throw new Error('Error Generate Serial No : ' + error);
    }
};

module.exports = generateSerialNo;
