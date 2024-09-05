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
    type: Date,

  },
  tarefa: {
    type: String,
    required: true,
  },
  horainicio: {
    type: String,
  },
  horafim: {
    type: String,
  },
  horainicio2: {
    type: String,
  },
  horafim2: {
    type: String,
  },
  heinicio: {
    type: String,
  },
  hefim: {
    type: String,
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
