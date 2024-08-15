const express = require("express");
const {
  criarFuncionario,
  loginUserCtrl,
  handleRefreshToken,
  logout,
  updateFuncionario,
  deletarFuncionario,
  buscarFuncionarios,
  buscarFuncionario,
  associarProjeto,
  buscarProjetos,
  desassociarProjeto,
} = require("../controller/funcionarioCtrl");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/registrar", authMiddleware, criarFuncionario);
router.post("/login", loginUserCtrl);
router.post(
  "/associar-projeto/:funcionarioId",
  authMiddleware,
  associarProjeto
);

router.get("/", authMiddleware, buscarFuncionarios);
router.get("/todos-projetos", authMiddleware, isAdmin, buscarProjetos);
router.get("/:id", buscarFuncionario);
router.get("/refresh", handleRefreshToken);
router.get("/logout", authMiddleware, logout);

router.put("/edit-funcionario/:id", authMiddleware, updateFuncionario);

router.delete("/delete-associacao", authMiddleware, desassociarProjeto)
router.delete("/delete-funcionario/:id", authMiddleware, deletarFuncionario);

module.exports = router;
