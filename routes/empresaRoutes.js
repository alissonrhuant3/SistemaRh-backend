const express = require("express");
const { criarEmpresa, updateEmpresa, deletarEmpresa, buscarEmpresas, buscarEmpresa } = require("../controller/empresaCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, buscarEmpresas)
router.get("/:id", authMiddleware, buscarEmpresa)

router.post("/registrar",authMiddleware, criarEmpresa);

router.put("/editar-empresa/:id",authMiddleware, updateEmpresa);

router.delete("/delete-empresa/:id",authMiddleware, deletarEmpresa)

module.exports = router;