const express = require("express");
const { criarFuncionario, loginUserCtrl, handleRefreshToken } = require("../controller/funcionarioCtrl");
const router = express.Router();

router.post("/", criarFuncionario);

router.post("/login", loginUserCtrl);

router.get("/refresh", handleRefreshToken)

module.exports = router;
