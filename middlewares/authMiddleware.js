const Funcionario = require("../models/funcionarioModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const funcionario = await Funcionario.findById(decoded?.id);
        req.funcionario = funcionario;
        next();
      }
    } catch (error) {
      throw new Error(
        "Não autorizado token expirado, por favor faça login novamente"
      );
    }
  } else {
    // Bearer nelbalwbdlkawbdjhwadjlabhdwaçdlwbja;5f3e35
    throw new Error(" Seu token não está incluido no cabeçario");
  }
});

// const isAdmin = asyncHandler(async (req, res, next) => {
//   const { email } = req.user;
//   const adminUser = await User.findOne({ email });
//   if(adminUser.role !== "admin") {
//     throw new Error("Você não é admin!")
//   } else {
//     next();
//   }
// });

module.exports = { authMiddleware };
