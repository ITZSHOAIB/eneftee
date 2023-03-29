const express = require("express");
const router = express.Router();
const ERC20Controller = require("../controllers/ERC20Controller.controller");

router.post("/mint-token", ERC20Controller.mintToken);
router.post("/my-balance", ERC20Controller.myBalance);

module.exports = router;
