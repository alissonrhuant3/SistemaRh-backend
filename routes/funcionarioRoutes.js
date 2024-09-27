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
  buscarFuncionariosEmpresa,
  buscarFuncionariosEmpresaGestor,
  downloadPdf,
  updatePassword,
  
} = require("../controller/funcionarioCtrl");
const router = express.Router();
const { authMiddleware, isAdmin, isGestor, isEmpresa, isEmpresaANDGestor } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post("/registrar", upload.single("contratoPdf"), criarFuncionario);
router.post("/login", loginUserCtrl);
router.post(
  "/associar-projeto/",
  authMiddleware,
  isEmpresa,
  associarProjeto
);
router.post("/horainicialam",authMiddleware, apontarHorarioInicialAM)

router.get("/", authMiddleware, isAdmin, buscarFuncionarios);
router.get("/funcemp", authMiddleware, isEmpresa, buscarFuncionariosEmpresa);
router.get("/download/:funcionarioId", authMiddleware, isEmpresa, downloadPdf)
router.get("/funcempg", authMiddleware, isGestor, buscarFuncionariosEmpresaGestor);
router.get("/apontamentos/:funcionarioId", authMiddleware, isEmpresaANDGestor, buscarApontamentosFuncionario);
router.get("/apontamento", authMiddleware, isEmpresa, buscarApontamentoDataFuncionario);
router.get("/todos-projetos", authMiddleware, buscarProjetos);
router.get("/:id",authMiddleware, isEmpresaANDGestor, buscarFuncionario);
router.get("/refresh", handleRefreshToken);
router.get("/logout", authMiddleware, logout);

router.put("/horafinalam", authMiddleware, apontarHorarioFinalAM)
router.put("/password", authMiddleware, updatePassword)
router.put("/horainicialpm", authMiddleware, apontarHorarioInicialPM)
router.put("/horafinalpm", authMiddleware, apontarHorarioFinalPM)
router.put("/gestoraprova", authMiddleware, aprovacaoGestor)
router.put("/delete-associacao", authMiddleware,isEmpresa, desassociarProjeto)
router.put("/edit-funcionario/:id", authMiddleware, isEmpresa, updateFuncionario);

router.delete("/delete-funcionario/:id", authMiddleware, isEmpresa, deletarFuncionario);

module.exports = router;
