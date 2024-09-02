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
  apontarHorarioInicialAM,
  apontarHorarioFinalAM,
  apontarHorarioInicialPM,
  apontarHorarioFinalPM,
  buscarApontamentosFuncionario,
  aprovacaoGestor,
  buscarApontamentoDataFuncionario,
  buscarFuncionariosEmpresa
} = require("../controller/funcionarioCtrl");
const router = express.Router();
const { authMiddleware, isAdmin, isGestor } = require("../middlewares/authMiddleware");

router.post("/registrar", authMiddleware, criarFuncionario);
router.post("/login", loginUserCtrl);
router.post(
  "/associar-projeto/",
  authMiddleware,
  associarProjeto
);
router.post("/horainicialam",authMiddleware, apontarHorarioInicialAM)

router.get("/", authMiddleware, isAdmin, buscarFuncionarios);
router.get("/funcemp", authMiddleware, isGestor, buscarFuncionariosEmpresa);
router.get("/apontamentos/:funcionarioId", authMiddleware, buscarApontamentosFuncionario);
router.get("/apontamento", authMiddleware, buscarApontamentoDataFuncionario);
router.get("/todos-projetos/:funcionarioId", authMiddleware, isAdmin, buscarProjetos);
router.get("/:id", buscarFuncionario);
router.get("/refresh", handleRefreshToken);
router.get("/logout", authMiddleware, logout);

router.put("/horafinalam", authMiddleware, apontarHorarioFinalAM)
router.put("/horainicialpm", authMiddleware, apontarHorarioInicialPM)
router.put("/horafinalpm", authMiddleware, apontarHorarioFinalPM)
router.put("/gestoraprova", authMiddleware, aprovacaoGestor)
router.put("/edit-funcionario/:id", authMiddleware, updateFuncionario);

router.delete("/delete-associacao", authMiddleware, desassociarProjeto)
router.delete("/delete-funcionario/:id", authMiddleware, deletarFuncionario);

module.exports = router;
