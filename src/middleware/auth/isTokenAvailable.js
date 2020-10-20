const jwt = require("jsonwebtoken");
const {
    isThereToken,
    getTokenFromHeader,
} = require("../../helpers/tokenHelper/tokenHelper");
const { JWT_SECRET } = process.env;

const getAccessToRoute = async (req, res, next) => {
    if (!isThereToken(req)) {
        return next("You are not authorized to this route");
    }
    const rawToken = getTokenFromHeader(req);
    jwt.verify(rawToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            next(err);
        }
        next();
    });
};

module.exports = getAccessToRoute;
