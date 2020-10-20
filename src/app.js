const express = require("express");
const path = require("path");
const session = require("express-session");

const customErrorHandler = require("./middleware/errors/errorHandler");
//Environment variables
require("dotenv").config({
    path: path.resolve(__dirname, "./config/env/config.env"),
});

//Database Connection
require("./database/databaseConnection");

//App INIT
const {JWT_SECRET} = process.env;

const app = express();
const PORT = process.env.PORT;
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: JWT_SECRET
  }));

//Form-data Handling
app.use(express.json());

//Routes
const authRoute = require("./routes/auth/auth");

app.use("/auth", authRoute);

app.use(customErrorHandler);

app.get("/error", function (req, res, next) {
    throw new Error("Hata");
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT}'da hayatta.`);
});
