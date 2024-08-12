const Empresa = require("../models/empresaModel");
const Trilha = require("../models/trilhaEmpresaModel");
const asyncHandler = require("express-async-handler");

const criarEmpresa = asyncHandler(async (req, res) => {
  const cnpj = req.body.cnpj;
  const idUsu = req.body.idusuario;
  const buscarEmpresa = await Empresa.findOne({ cnpj });
  if(!buscarEmpresa) {
    const novaEmpresa = await Empresa.create(req.body);
    await Trilha.create({coduserinclusao: idUsu,empresa: novaEmpresa._id, datahorainclusao: novaEmpresa.createdAt})
    res.json(novaEmpresa);
  } else {
    throw new Error("Empresa já existe!")
  }
});

module.exports = {criarEmpresa};
