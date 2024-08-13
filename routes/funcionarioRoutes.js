const express = require("express");
const {
  criarFuncionario,
  loginUserCtrl,
  handleRefreshToken,
  logout,
  updateFuncionario,
  deletarFuncionario,
} = require("../controller/funcionarioCtrl");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/registrar", criarFuncionario);
router.post("/login", loginUserCtrl);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

router.put("/edit-funcionario/:id", authMiddleware, updateFuncionario);

router.delete("/delete-funcionario/:id", authMiddleware, deletarFuncionario);

module.exports = router;
