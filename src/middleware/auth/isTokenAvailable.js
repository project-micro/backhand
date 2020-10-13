const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const isTokenVerified = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.send("Herhangi bir token bulunamadı.");
    } else {
        const cleanToken = req.headers.authorization;
        let rawToken = "";
        if (cleanToken.startsWith("Bearer")) {
            rawToken = cleanToken.split(" ")[1];
        }
        jwt.verify(rawToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                next(err);
            }
            next();
        });
    }
};

module.exports = isTokenVerified;
