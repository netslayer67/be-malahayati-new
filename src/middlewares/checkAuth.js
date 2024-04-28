const { decodeToken } = require('../utils/jwt');
const { responseOnly, responseAccessDenied } = require('../utils/httpResponse');

const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return responseOnly(res, 401, 'Unauthorized.');
        }

        const [bearer, token] = authHeader.split(' ');

        if (!token || bearer !== 'Bearer' || token == 'null') {
            return responseOnly(res, 401, 'Invalid authorization token.');
        }

        const decoded = decodeToken(token, process.env.JWT_SECRET);

        if (!decoded) {
            console.log('Error when decoding a token.');
            return responseOnly(res, 500);
        }

        req.auth = { ...decoded };

        return next();
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            return responseOnly(
                res,
                401,
                'Session expired. Silahkan Login Ulang.'
            );
        }

        return responseOnly(res, 500);
    }
};

module.exports = checkAuth;
