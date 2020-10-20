const sendJwtToClient = (user, res) => {
    //Generate token from user
    const token = user.genereateJwtToken();
    const { NODE_ENV, JWT_COOKIE } = process.env;

    //response
    res.session.user = token;
    res.status(200)
        .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
            secure: NODE_ENV == "dev" ? false : true,
        })
        .json({
            success: true,
            access_token: token,
            data: {
                username: user.username,
                email: user.email,
            },
        });
};

const isThereToken = (req) => {
    return (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    );
};

const getTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
};

module.exports = { sendJwtToClient, isThereToken, getTokenFromHeader };
