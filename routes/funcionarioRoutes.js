const express = require("express");
const { criarFuncionario } = require("../controller/funcionarioCtrl");
const router = express.Router();

router.post("/", criarFuncionario);

module.exports = router;
