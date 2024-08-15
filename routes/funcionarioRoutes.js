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
} = require("../controller/funcionarioCtrl");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/registrar",authMiddleware, criarFuncionario);
router.post("/login", loginUserCtrl);

router.get("/",authMiddleware, buscarFuncionarios)
router.get("/:id", buscarFuncionario)
router.get("/refresh", handleRefreshToken);
router.get("/logout",authMiddleware, logout);

router.put("/edit-funcionario/:id", authMiddleware, updateFuncionario);

router.delete("/delete-funcionario/:id", authMiddleware, deletarFuncionario);

module.exports = router;
