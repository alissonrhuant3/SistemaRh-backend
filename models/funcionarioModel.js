const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

var funcionarioSchema = new mongoose.Schema({
  cod_empresa: {type: mongoose.Schema.Types.ObjectId, ref: "Empresa"},
  perfil: {
    type: String,
    default: "funcionario",
    enum: ["funcionario","admin","gestor","empresa/rh"]
  },
  cod_gestor: {type: String},
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: Number,
    required: true,
  },
  rg: {
    type: Number,
    required: true,
  },
  data_nascimento: {
    type: Date,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  complemento: {
    type: String
  },
  bairro: {
    type: String,
    required: true,
  },
  cep: {
    type: Number,
    required: true,
  },
  cidade: {
    type: String,
    required: true,

  },
  uf: {
    type: String,
    required:true,
  },
  telefone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }, 
  data_admissao: {
    type: Date,
    required: true
  },
  valor_remuneracao: {
    type: Number,
    required: true,
  },
  valor_horaextra: {
    type: Number,
  },
  horaextra: {
    type: Boolean,
    default: false
  },
  nome_banco: {
    type: String,
  },
  numero_banco: {
    type: Number,

  },
  agencia: {
    type: Number,
  },
  conta: {
    type: Number,
  },
  tipo_conta: {
    type: String,
  },
  pix: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  horario1: {
    type: String,
  },
  horario2: {
    type: String,
  },
  observacoes: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
},{
  timestamps: true
});

funcionarioSchema.pre("save", async function (next) {
  if(!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
funcionarioSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}
funcionarioSchema.methods.createPasswordResetToken = async function () {
  
};

module.exports = mongoose.model("Funcionario", funcionarioSchema);