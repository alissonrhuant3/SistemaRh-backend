const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  criarProjeto,
  updateProjeto,
  deletarProjeto,
  buscarProjetos,
  buscarProjeto,
} = require("../controller/projetoCtrl");

router.get("/", buscarProjetos);
router.get("/:id", buscarProjeto);

router.post("/registrar", authMiddleware, criarProjeto);

router.put("/editar-projeto/:id", authMiddleware, updateProjeto);

router.delete("/delete-projeto/:id", authMiddleware, deletarProjeto);

module.exports = router;
