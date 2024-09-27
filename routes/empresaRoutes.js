const express = require("express");
const {
  criarEmpresa,
  updateEmpresa,
  deletarEmpresa,
  buscarEmpresas,
  buscarEmpresa,
  buscarProjetos,
} = require("../controller/empresaCtrl");
const {
  authMiddleware,
  isAdmin,
  isEmpresa,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/projetos", authMiddleware, isEmpresa, buscarProjetos);
router.get("/", authMiddleware, isAdmin, buscarEmpresas);
router.get("/:id", authMiddleware, isAdmin, buscarEmpresa);

router.post("/registrar", criarEmpresa);

router.put("/editar-empresa/:id", authMiddleware, isAdmin, updateEmpresa);

router.delete("/delete-empresa/:id", authMiddleware, isAdmin, deletarEmpresa);

module.exports = router;
