const Funcionario = require("../models/funcionarioModel");
const { generateRefreshToken } = require("../config/refreshToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Trilha = require("../models/trilhaFuncionarioModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const criarFuncionario = asyncHandler(async (req, res) => {
  const cpf = req.body.cpf;
  const idUsu = req.body.idusuario;
  const buscaFuncionario = await Funcionario.findOne({ cpf });
  if (!buscaFuncionario) {
    const novoFuncionario = await Funcionario.create(req.body);
    await Trilha.create({
      coduserinclusao: idUsu,
      funcionario: novoFuncionario._id,
      datahorainclusao: novoFuncionario.createdAt,
    });
    res.json(novoFuncionario);
  } else {
    throw new Error("Funcionário já existe!");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { cpf, password } = req.body;
  const findUser = await Funcionario.findOne({ cpf });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await Funcionario.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24*60*60*1000,
    });
    res.json({
      _id: findUser?._id,
      nome: findUser?.nome,
      email: findUser?.email,
      telefone: findUser?.telefone,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Credenciais inválidas!")
  }
});

module.exports = { criarFuncionario, loginUserCtrl };
