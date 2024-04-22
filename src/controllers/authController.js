const Employee = require('../models/Employee');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { comparePassword } = require('../utils/bcrypt');
const {
    responseAuth,
    responseOnly,
    responseValidationError,
} = require('../utils/httpResponse');
const { generateToken } = require('../utils/jwt');
const {
    validateRequest,
    validationFailed,
    setErrorField,
} = require('../utils/validator');

const authenticateCredentials = async (req, res) => {
    try {
        const { email, password } = req.body;

        let error_fields = {};

        await validateRequest(error_fields, 'email', email, `required`);
        await validateRequest(error_fields, 'password', password, 'required');

        const findEmp = await Admin.findOne({ email }).lean();

        if (!findEmp) {
            setErrorField(error_fields, 'email', 'Email salah.');
        } else {
            if (!comparePassword(password, findEmp.password)) {
                setErrorField(error_fields, 'password', 'Password salah.');
            } else {
                const payload = {
                    id: findEmp._id,
                    email: findEmp.email,
                };
                const token = generateToken(payload);
                return responseAuth(res, token);
            }
        }

        if (validationFailed(error_fields)) {
            return responseValidationError(res, error_fields);
        }
    } catch (error) {
        console.log(error);
        return responseOnly(res, 500);
    }
};

module.exports = {
    authenticateCredentials,
};
