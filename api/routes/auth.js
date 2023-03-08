const { register, login, google, Logout } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", Logout);

router.post("/google", google);

module.exports = router;
