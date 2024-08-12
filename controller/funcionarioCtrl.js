const Funcionario = require("../models/funcionarioModel");
const Trilha = require("../models/trilhaFuncionarioModel");
const asyncHandler = require("express-async-handler");

const criarFuncionario = asyncHandler(async(req,res) => {
  const cpf = req.body.cpf;
  const idUsu = req.body.idusuario;
  const buscaFuncionario = await Funcionario.findOne({ cpf });
  if(!buscaFuncionario) {
    const novoFuncionario = await Funcionario.create(req.body);
    await Trilha.create({coduserinclusao: idUsu,funcionario: novoFuncionario._id ,datahorainclusao: novoFuncionario.createdAt})
    res.json(novoFuncionario);
  } else {
    throw new Error("Funcionário já existe!")
  }
})

module.exports = {criarFuncionario};