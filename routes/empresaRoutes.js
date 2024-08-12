const express = require("express");
const { criarEmpresa } = require("../controller/empresaCtrl");
const router = express.Router();

router.post("/", criarEmpresa);

module.exports = router;