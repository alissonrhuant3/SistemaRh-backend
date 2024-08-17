const mongoose = require("mongoose");

var apontamentoSchema = new mongoose.Schema({
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true,
  },
  projeto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projeto",
    required: true,
  },
  data: {
    type: String,
    required: true,
    unique: true,
  },
  tarefa: {
    type: String,
    required: true,
  },
  horainicio: {
    type: Date,
    required: true,
  },
  horafim: {
    type: Date,
  },
  horainicio2: {
    type: Date,
  },
  horafim2: {
    type: Date,
  },
  heinicio: {
    type: Date,
  },
  hefim: {
    type: Date,
  },
  gestoraprova: {
    type: Boolean,
    default: false,
  },
  observacao: {
    type: String,
  },
});

module.exports = mongoose.model("Apontamento", apontamentoSchema);
