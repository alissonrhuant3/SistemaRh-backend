const mongoose = require("mongoose");

var empresaSchema = new mongoose.Schema({
  cnpj: {
    type: Number,
    required: true,
  },
  razaosocial: {
    type: String,
    required: true,
  },
  inscricaoestadual: {
    type: Number,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  complemento: {
    type: String,
    required: true,
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
    required: true,
  },
  telefone: {
    type: Number,
    required: true,
  },
  nomeresponsavel: {
    type: String,
    required: true,
  },
  emailresponsavel: {
    type: String,
    required: true,
  },
  telefoneresponsavel: {
    type: String,
    required: true,
  },
  
}, {
  timestamps: true,
})

module.exports = mongoose.model("Empresa", empresaSchema);