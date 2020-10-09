
const sendJwtToClient = (user, res) => {
    //Generate token from user
    const token = user.genereateJwtToken();
    const { NODE_ENV, JWT_COOKIE } = process.env;
    
    //response
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

module.exports = sendJwtToClient;
