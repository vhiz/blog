const { getUser } = require("../controllers/users");

const router = require("express").Router();

router.get("/find/:id", getUser);

module.exports = router;
