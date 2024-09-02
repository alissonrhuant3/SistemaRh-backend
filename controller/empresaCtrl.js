const Empresa = require("../models/empresaModel");
const Projeto = require("../models/projetoModel");
const Trilha = require("../models/trilhas/trilhaEmpresaModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const criarEmpresa = asyncHandler(async (req, res) => {
  const cnpj = req.body.cnpj;
  const { _id } = req.funcionario;
  const buscarEmpresa = await Empresa.findOne({ cnpj });
  if (!buscarEmpresa) {
    const novaEmpresa = await Empresa.create(req.body);
    await Trilha.create({
      coduserinclusao: _id,
      empresa: novaEmpresa.razaosocial,
      datahorainclusao: novaEmpresa.createdAt,
    });
    res.json(novaEmpresa);
  } else {
    throw new Error("Empresa já existe!");
  }
});

const updateEmpresa = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;

  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateEmpresa = await Empresa.findByIdAndUpdate(
      { _id: id },
      {
        cnpj: req?.body?.cnpj,
        razaosocial: req?.body?.razaosocial,
        endereco: req?.body?.endereco,
        complemento: req?.body?.complemento,
        bairro: req?.body?.bairro,
        uf: req?.body?.uf,
        cep: req?.body?.cep,
        cidade: req?.body?.cidade,
        telefone: req?.body?.telefone,
        nomeresponsavel: req?.body?.nomeresponsavel,
        emailresponsavel: req?.body?.emailresponsavel,
        telefoneresponsavel: req?.body?.telefoneresponsavel,
      },
      {
        new: true,
      }
    );
    await Trilha.create({
      coduseralteracao: _id,
      empresa: updateEmpresa.razaosocial,
      datahoraalteracao: updateEmpresa.updatedAt,
    });
    res.json(updateEmpresa);
  } catch (error) {
    throw new Error(error);
  }
});

const deletarEmpresa = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteEmpresa = await Empresa.findByIdAndDelete(id);
    await Trilha.create({
      coduserexclusao: _id,
      empresa: deleteEmpresa.razaosocial,
    });
    res.json(deleteEmpresa);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarEmpresas = asyncHandler(async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.json(empresas);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarEmpresa = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const empresa = await Empresa.findById(id);
    res.json(empresa);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarProjetos = asyncHandler(async (req, res) => {
  const {cod_empresa} = req.funcionario;
  validateMongoDbId(cod_empresa)
  try {
    const projetos = await Projeto.find({empresa: cod_empresa});
    res.json(projetos);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  criarEmpresa,
  updateEmpresa,
  deletarEmpresa,
  buscarEmpresas,
  buscarEmpresa,
  buscarProjetos,
};
