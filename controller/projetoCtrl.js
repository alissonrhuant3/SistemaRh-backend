const asyncHandler = require("express-async-handler");
const Projeto = require("../models/projetoModel");
const Trilha = require("../models/trilhas/trilhaProjetoModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const criarProjeto = asyncHandler(async (req, res) => {
  const { _id, cod_empresa } = req.funcionario;
  try {
    const novoProjeto = await Projeto.create({
      empresa: cod_empresa,
      nome: req.body.nome,
      descricao: req.body.descricao,
      horasestimadas: req.body.horasestimadas,
    });
    await Trilha.create({
      coduserinclusao: _id,
      projeto: novoProjeto.nome,
      datahorainclusao: novoProjeto.createdAt,
    });
    res.json(novoProjeto);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarProjetos = asyncHandler(async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.json(projetos);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarProjeto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const projeto = await Projeto.findById(id);
    res.json(projeto);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProjeto = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;

  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const atualizarProjeto = await Projeto.findByIdAndUpdate(
      { _id: id },
      {
        nome: req?.body?.nome,
        descricao: req?.body?.descricao,
        horasestimadas: req?.body?.horasestimadas,
      },
      {
        new: true,
      }
    );
    await Trilha.create({
      coduseralteracao: _id,
      projeto: atualizarProjeto.nome,
      datahoraalteracao: atualizarProjeto.updatedAt,
    });
    res.json(atualizarProjeto);
  } catch (error) {
    throw new Error(error);
  }
});

const deletarProjeto = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteProjeto = await Projeto.findByIdAndDelete(id);
    await Trilha.create({
      coduserexclusao: _id,
      projeto: deleteProjeto.nome,
    });
    res.json(deleteProjeto);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  criarProjeto,
  updateProjeto,
  deletarProjeto,
  buscarProjetos,
  buscarProjeto,
};
