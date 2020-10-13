const userModel = require("../database/models/user");
const asyncErrorWrapper = require("express-async-handler");

//Helpers
const sendJwtToClient = require("../helpers/auth/sendJwtToClient");

const registerUserController = asyncErrorWrapper(async (req, res, next) => {
    //Getting post data
    const { username, password, email } = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    };

    //Creating new user from post data
    const newUser = new userModel({
        username,
        password,
        email,
    });
    const savedUser = await newUser.save();
    sendJwtToClient(savedUser, res);
});

const test = async (req, res, next) => {
    res.send({
        test: req.headers,
    });
};
module.exports = { registerUserController, test };
