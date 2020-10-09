const chalk = require("chalk");
const customErrorHandler = (err, req, res, next) => {
    console.log(chalk.red("Bir hata meydana geldi : " + chalk.green(err.name) + " : " + chalk.blue(err.message)));
    let dataSum, status;
    if (err.name == "ValidationError" || err.name == SyntaxError) {
        dataSum = err.message
        status = 400;
    }
    if(err.code == 11000){
        //Duplicate Key
        dataSum = "Daha önce kullanılmış bir değere rastlandı."
        status = 400;
    }

    res.status(status || 500).json({
        status: false,
        message: dataSum || "Internal Server Error",
    });
};

module.exports = customErrorHandler;
