const express = require("express");
const { criarEmpresa } = require("../controller/empresaCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware, criarEmpresa);

module.exports = router;