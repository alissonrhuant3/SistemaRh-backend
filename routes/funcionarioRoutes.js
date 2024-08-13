const express = require("express");
const { criarFuncionario, loginUserCtrl } = require("../controller/funcionarioCtrl");
const router = express.Router();

router.post("/", criarFuncionario);
router.post("/login", loginUserCtrl);

module.exports = router;
