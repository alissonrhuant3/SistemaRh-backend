const mongoose = require("mongoose");

var trilhaFuncionarioSchema = new mongoose.Schema({
  coduserinclusao: {
    type: String,
    required: true,
  },
  datahorainclusao: {
    type: Date,
    required: true,
  },
  coduseralteracao: {
    type: Number,
  },
  datahoraalteracao: {
    type: Date,
  },
  coduserexclusao: {
    type: Number,
  },
  coduserexclusao: {
    type: Number,
  },
  datehoraexclusao: {
    type: Date,
  },
  funcionario: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
});

module.exports = mongoose.model("Trilhafuncionario", trilhaFuncionarioSchema);
