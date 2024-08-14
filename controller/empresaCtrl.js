const Empresa = require("../models/empresaModel");
const Trilha = require("../models/trilhas/trilhaEmpresaModel");
const asyncHandler = require("express-async-handler");

const criarEmpresa = asyncHandler(async (req, res) => {
  const cnpj = req.body.cnpj;
  const {_id} = req.funcionario;
  const buscarEmpresa = await Empresa.findOne({ cnpj });
  if(!buscarEmpresa) {
    const novaEmpresa = await Empresa.create(req.body);
    await Trilha.create({coduserinclusao: _id,empresa: novaEmpresa.razaosocial, datahorainclusao: novaEmpresa.createdAt})
    res.json(novaEmpresa);
  } else {
    throw new Error("Empresa já existe!")
  }
});

module.exports = {criarEmpresa};
