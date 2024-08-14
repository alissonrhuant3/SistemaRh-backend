const mongoose = require("mongoose");

var trilhaFuncionarioSchema = new mongoose.Schema({
  coduserinclusao: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
  },
  datahorainclusao: {
    type: Date,
  },
  coduseralteracao: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
  },
  datahoraalteracao: {
    type: Date,
  },
  coduserexclusao: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
  },
  datehoraexclusao: {
    type: Date,
  },
  funcionario: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
});

module.exports = mongoose.model("Trilhafuncionario", trilhaFuncionarioSchema);
