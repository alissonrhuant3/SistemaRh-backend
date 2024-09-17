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
        const funcionario = await Funcionario.findById(decoded?.id.id);
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

const isAdmin = asyncHandler(async (req, res, next) => {
  const { cpf } = req.funcionario;
  const adminUser = await Funcionario.findOne({ cpf });
  if (adminUser.perfil !== "admin") {
    throw new Error("Você não é admin!");
  } else {
    next();
  }
});

const isGestor = asyncHandler(async (req, res, next) => {
  const { cpf } = req.funcionario;
  const user = await Funcionario.findOne({ cpf });
  if (user.perfil === "gestor" || user.perfil === "admin") {
    next();
  } else if  (user.perfil !== "gestor" || user.perfil !== "admin") {
    throw new Error("Você não é Gestor!");
  }
});

const isEmpresa = asyncHandler(async (req, res, next) => {
  const { cpf } = req.funcionario;
  const user = await Funcionario.findOne({ cpf });
  if (user.perfil === "empresa/rh" || user.perfil === "admin") {
    next();
  } else if  (user.perfil !== "empresa/rh" || user.perfil !== "admin") {
    throw new Error("Você não é empresa/rh!");
  }
});

const isEmpresaANDGestor = asyncHandler(async (req, res, next) => {
  const { cpf } = req.funcionario;
  const user = await Funcionario.findOne({ cpf });
  if (user.perfil === "empresa/rh" || user.perfil === "admin" || user.perfil === "gestor") {
    next();
  } else if  (user.perfil !== "empresa/rh" || user.perfil !== "admin" || user.perfil !== "gestor") {
    throw new Error("Você não tem permissão!");
  }
});

module.exports = { authMiddleware, isAdmin, isGestor, isEmpresa, isEmpresaANDGestor };
