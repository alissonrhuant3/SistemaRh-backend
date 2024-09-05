const Funcionario = require("../models/funcionarioModel");
const Associacao = require("../models/funcionarioXprojetoModel");
const Projeto = require("../models/projetoModel");
const Apontamento = require("../models/apontamentosModel");
const { generateRefreshToken } = require("../config/refreshToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Trilha = require("../models/trilhas/trilhaFuncionarioModel");
const TrilhaAssoc = require("../models/trilhas/trilhaAssociacaoModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");

const criarFuncionario = asyncHandler(async (req, res) => {
  const cpf = req.body.cpf;
  const { _id, cod_empresa } = req.funcionario;
  const buscaFuncionario = await Funcionario.findOne({ cpf });
  
  if (!buscaFuncionario) {
    const novoFuncionario = await Funcionario.create({
      cod_empresa: cod_empresa,
      nome: req.body.nome,
      cpf: req.body.cpf,
      rg: req.body.rg,
      data_nascimento: req.body.data_nascimento,
      data_admissao: req.body.data_admissao,
      endereco: req.body.endereco,
      complemento: req.body.complemento,
      bairro: req.body.bairro,
      cep: req.body.cep,
      cidade: req.body.cidade,
      uf: req.body.uf,
      telefone: req.body.telefone,
      email: req.body.email,
      valor_remuneracao: req.body.valor_remuneracao,
      valor_horaextra: req.body.valor_horaextra,
      nome_banco: req.body.nome_banco,
      numero_banco: req.body.numero_banco,
      agencia: req.body.agencia,
      conta: req.body.conta,
      tipo_conta: req.body.tipo_conta,
      pix: req.body.pix,
      horario1: req.body.horario1,
      horario2: req.body.horario2,
      horaextra: req.body.horaextra,
      password: req.body.password,
      observacoes: req.body.observacoes
    });
    await Trilha.create({
      coduserinclusao: _id,
      funcionario: novoFuncionario.nome,
      datahorainclusao: novoFuncionario.createdAt,
    });
    res.json(novoFuncionario);
  } else {
    throw new Error("Funcionário já existe!");
  }
});

const updateFuncionario = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;

  const { id } = req.params;
  validateMongoDbId(id);
  try {
    
    const updateFuncionario = await Funcionario.findByIdAndUpdate(
      { _id: id },
      {
        perfil: req?.body?.perfil,
        cod_gestor: req?.body?.cod_gestor,
        nome: req?.body?.nome,
        cpf: req?.body?.cpf,
        rg: req?.body?.rg,
        data_nascimento: req?.body?.data_nascimento,
        endereco: req?.body?.endereco,
        complemento: req?.body?.complemento,
        bairro: req?.body?.bairro,
        cep: req?.body?.cep,
        cidade: req?.body?.cidade,
        uf: req?.body?.uf,
        telefone: req?.body?.telefone,
        email: req?.body?.email,
        valor_remuneracao: req?.body?.valor_remuneracao,
        valor_horaextra: req?.body?.valor_horaextra,
        horaextra: req?.body?.horaextra,
        nome_banco: req?.body?.nome_banco,
        numero_banco: req?.body?.numero_banco,
        agencia: req?.body?.agencia,
        conta: req?.body?.conta,
        tipo_conta: req?.body?.tipo_conta,
        pix: req?.body?.pix,
        horario1: req?.body?.horario1,
        horario2: req?.body?.horario2,
        observacoes: req?.body?.observacoes,
      },
      {
        new: true,
      }
    );
    await Trilha.create({
      coduseralteracao: _id,
      funcionario: id,
      datahoraalteracao: updateFuncionario.updatedAt,
    });
    res.json(updateFuncionario);
  } catch (error) {
    throw new Error(error);
  }
});

const deletarFuncionario = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;
  const { id } = req.params;

  validateMongoDbId(id);
  try {
    const deleteFuncionario = await Funcionario.findByIdAndDelete(id);
    await Trilha.create({
      coduserexclusao: _id,
      funcionario: deleteFuncionario.nome,
    });
    res.json(deleteFuncionario);
  } catch (error) {
    throw new Error(error);
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
      expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
    });
    res.json({
      _id: findUser?._id,
      nome: findUser?.nome,
      email: findUser?.email,
      role: findUser?.perfil,
      token: generateToken(findUser?._id),
      telefone: findUser?.telefone,
    });
  } else {
    throw new Error("Credenciais inválidas!");
  }
});

const buscarFuncionarios = asyncHandler(async (req, res) => {
  try {
    const funcionarios = await Funcionario.find().populate("cod_empresa");
    res.json(funcionarios);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarFuncionariosEmpresa = asyncHandler(async (req, res) => {
  const {cod_empresa, _id} = req.funcionario;
  validateMongoDbId(_id);
  validateMongoDbId(cod_empresa);
  try {
    const funcionarios = await Funcionario.find({cod_empresa: cod_empresa}).populate("cod_empresa");
    res.json(funcionarios);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarFuncionario = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const funcionario = await Funcionario.findById(id).populate("cod_empresa");
    res.json(funcionario);
  } catch (error) {
    throw new Error(error);
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("Não Possui Refresh Token nos Cookies");
  const refreshToken = cookie.refreshToken;
  const funcionario = await Funcionario.findOne({ refreshToken });
  if (!funcionario)
    throw new Error("Não possui Refresh Token no DB, ou não encontramos");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || funcionario.id !== decoded.id) {
      throw new Error("Há algo errado com o Token de Atualização");
    }
    const acessToken = generateToken(funcionario?._id);
    res.json({ acessToken });
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("Não há Atualização de token nos cookies");
  const refreshToken = cookie.refreshToken;
  const funcionario = await Funcionario.findOne({ refreshToken });
  if (!funcionario) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // bloqueado
  }
  await Funcionario.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.clearCookie("auth")
  return res.sendStatus(204); // bloqueado
});

const buscarProjetos = asyncHandler(async (req, res) => {
  const { funcionarioId } = req.params;
  validateMongoDbId(funcionarioId);
  try {
    const todosProjetosFuncionario = await Associacao.find({
      funcionario: funcionarioId,
    });
    res.json(todosProjetosFuncionario);
  } catch (error) {
    throw new Error(error);
  }
});

const associarProjeto = asyncHandler(async (req, res) => {
  const { projetoId, funcionarioId } = req.body;
  const { _id, cod_empresa } = req.funcionario;
  validateMongoDbId(projetoId);
  validateMongoDbId(funcionarioId);
  validateMongoDbId(_id)
  try {
    const verificacaoPro = await Funcionario.find({projetosvinculados: projetoId});
    if (verificacaoPro.length !== 0) throw new Error("Este projeto ja está vinculado ao funcionário!")
    const verificacaoEmp = await Projeto.findById(projetoId)
    
    if (verificacaoEmp.empresa.equals(cod_empresa) == false) throw new Error("Este projeto não pertence a sua empresa!")
    const associacao = await Funcionario.findByIdAndUpdate({_id:funcionarioId},
      {$push: {projetosvinculados: projetoId}}, {new: true}
  ).populate("projetosvinculados");
    await TrilhaAssoc.create({
      funcionario: funcionarioId,
      projeto: projetoId,
      coduserinclusao: _id,
    });
    res.json(associacao);
  } catch (error) {
    throw new Error(error);
  }
});

const desassociarProjeto = asyncHandler(async (req, res) => {
  const { projetoId, funcionarioId } = req.body;
  const { _id, cod_empresa } = req.funcionario;
  validateMongoDbId(projetoId);
  validateMongoDbId(funcionarioId)
  validateMongoDbId(_id)
  try {
    const verificacaoFunc = await Funcionario.findById(_id);    
    const verificacaoFunc2 = await Funcionario.findById(funcionarioId);
    if (verificacaoFunc.cod_empresa.equals(verificacaoFunc2.cod_empresa) == false) throw new Error("Você não pode alterar dados de outra empresa!")
    const verificacaoProjeto = await Projeto.findById(projetoId);
    const verificacaoProjetoFuncionario = verificacaoFunc2.projetosvinculados.some((projetoId) =>
      projetoId.equals(verificacaoProjeto._id) // Compara cada ObjectId do array com o ID do projeto
    );
    if (!verificacaoProjetoFuncionario) throw new Error("O projeto não está vinculado ao funcionário!")
    const desassociacao = await Funcionario.findByIdAndUpdate({_id: funcionarioId},
      {$pull: {projetosvinculados: projetoId}}, {new: true}
    );
    await TrilhaAssoc.create({
      funcionario: funcionarioId,
      projeto: projetoId,
      coduserexclusao: _id,
    });
    res.json(desassociacao);
  } catch (error) {
    throw new Error(error);
  }
});

const apontarHorarioInicialAM = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;
  const { projetoId, tarefa } = req.body;
  validateMongoDbId(projetoId);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR");
  const formattedTime = currentDate.toLocaleTimeString("pt-BR");
  
  const am1 = new Date();
  const am2 = new Date();
  const interval = new Date();
  const pm1 = new Date();
  const pm2 = new Date();
  am1.setHours(9,30,0);
  am2.setHours(12,10,0);
  pm1.setHours(14,10,0);
  pm2.setHours(18,0,0);
  const timeInitAm = am1.toLocaleTimeString("pt-BR");
  const timeFinalAm = am2.toLocaleTimeString("pt-BR");
  const timeInitPm = pm1.toLocaleTimeString("pt-BR");
  const timeFinalPm = pm2.toLocaleTimeString("pt-BR");
  console.log(formattedTime);
  
 

  
  try {
    
    if (formattedTime < timeInitAm) {
        await Apontamento.create({
          funcionario: _id,
          projeto: projetoId,
          data: formattedDate,
          horainicio: formattedTime,
          tarefa: tarefa,
        });
        console.log("1");
        
    } else if (formattedTime > timeInitAm && formattedTime < timeFinalAm) {
      const verify = await Apontamento.findOne({funcionario: _id, data: formattedDate})
      if (verify) {
        await Apontamento.findByIdAndUpdate(verify._id, {
          horainicio2: formattedTime
        })
        console.log("2");
      } else {
        await Apontamento.create({
          funcionario: _id,
          projeto: projetoId,
          data: formattedDate,
          horainicio2: formattedTime,
          tarefa: tarefa,
        })
        console.log("3");
      }
    } else if (formattedTime > timeFinalAm && formattedTime < timeInitPm) {
      const verify = await Apontamento.findOne({funcionario: _id, data: formattedDate})
      if (verify) {
        await Apontamento.findByIdAndUpdate(verify._id, {
          horafim: formattedTime
        })
        console.log("4");
      } else {
        await Apontamento.create({
          funcionario: _id,
          projeto: projetoId,
          data: formattedDate,
          horafim: formattedTime,
          tarefa: tarefa,
        })
        console.log("5");
      }
    } else if (formattedTime > timeInitPm && formattedTime < timeFinalPm) {
      const verify = await Apontamento.findOne({funcionario: _id, data: formattedDate})
      const verifyExist = await Apontamento.findOne({funcionario: _id, data: formattedDate, horafim2: {$ne: null}})
      if (verifyExist) throw new Error("Você já bateu o ponto de saída!")
      if (verify) {
        await Apontamento.findByIdAndUpdate(verify._id, {
          horafim2: formattedTime
        })
        console.log("6");
      } else {
        await Apontamento.create({
          funcionario: _id,
          projeto: projetoId,
          data: formattedDate,
          horafim2: formattedTime,
          tarefa: tarefa,
        })
        console.log("7");
      }
    } else throw new Error("Você não pode bater ponto fora do horário")
    
    res.json("Registrado com sucesso!");
  } catch (error) {
    throw new Error(error);
  }
});

const apontarHorarioFinalAM = asyncHandler(async (req, res) => {
  const { hora, apontamentoId } = req.body;
  validateMongoDbId(apontamentoId);
  try {
    const verificarApont = await Apontamento.findOne({ _id: apontamentoId });
    if (verificarApont === null) throw new Error("Este apontamento não existe");
    const horaFim = await Apontamento.findByIdAndUpdate(
      { _id: apontamentoId },
      { horafim: hora }
    );
    res.json(horaFim);
  } catch (error) {
    throw new Error(error);
  }
});

const apontarHorarioInicialPM = asyncHandler(async (req, res) => {
  const { hora, apontamentoId } = req.body;
  validateMongoDbId(apontamentoId);
  try {
    const verificarApont = await Apontamento.findOne({ _id: apontamentoId });
    if (verificarApont === null) throw new Error("Este apontamento não existe");
    const horaInicio = await Apontamento.findByIdAndUpdate(
      { _id: apontamentoId },
      { horainicio2: hora }
    );
    res.json(horaInicio);
  } catch (error) {
    throw new Error(error);
  }
});

const apontarHorarioFinalPM = asyncHandler(async (req, res) => {
  const { hora, apontamentoId } = req.body;
  validateMongoDbId(apontamentoId);
  try {
    const verificarApont = await Apontamento.findOne({ _id: apontamentoId });
    if (verificarApont === null) throw new Error("Este apontamento não existe");
    const horaFim = await Apontamento.findByIdAndUpdate(
      { _id: apontamentoId },
      { horafim2: hora },
      { new: true }
    );
    res.json(horaFim);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarApontamentosFuncionario = asyncHandler(async (req, res) => {
  const { funcionarioId } = req.params;
  validateMongoDbId(funcionarioId);
  try {
    const apontamentos = await Apontamento.find({ funcionario: funcionarioId });
    res.json(apontamentos);
  } catch (error) {
    throw new Error(error);
  }
});

const buscarApontamentoDataFuncionario = asyncHandler(async (req, res) => {
  const { _id } = req.funcionario;
  const { data } = req.body;
  if (data === undefined) throw new Error("Insira a data")
  
  validateMongoDbId(_id);
  try {
    const apontamentos = await Apontamento.find({ funcionario: _id, data: data });
    res.json(apontamentos);
  } catch (error) {
    throw new Error(error);
  }
});

const aprovacaoGestor = asyncHandler(async (req, res) => {
  const {_id} = req.funcionario;
  const { apontamentoId, funcionarioId } = req.body;
  validateMongoDbId(apontamentoId);
  try {
    const verificarGestor = await Funcionario.findOne({funcionario: funcionarioId, cod_gestor: _id});
    if(verificarGestor === null) throw new Error("Você não é gestor do funcionário")
    const aprovacao = await Apontamento.findByIdAndUpdate({_id: apontamentoId},{gestoraprova: true},{new: true});
    res.json(aprovacao);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  criarFuncionario,
  updateFuncionario,
  loginUserCtrl,
  handleRefreshToken,
  logout,
  deletarFuncionario,
  buscarFuncionarios,
  buscarFuncionario,
  associarProjeto,
  buscarProjetos,
  desassociarProjeto,
  apontarHorarioInicialAM,
  apontarHorarioFinalAM,
  apontarHorarioInicialPM,
  apontarHorarioFinalPM,
  buscarApontamentosFuncionario,
  buscarApontamentoDataFuncionario,
  aprovacaoGestor,
  buscarFuncionariosEmpresa,
};
