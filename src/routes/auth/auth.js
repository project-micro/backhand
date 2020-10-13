const express = require("express");
const router = express.Router();
const tokenAv = require("../../middleware/auth/isTokenAvailable");
//Controllers
const { registerUserController, test } = require("../../controllers/auth");

router.post("/register", registerUserController);
router.get("/test", tokenAv, test);

module.exports = router;
