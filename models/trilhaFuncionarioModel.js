const mongoose = require("mongoose");

var trilhaFuncionarioSchema = new mongoose.Schema({
  coduserinclusao: {
    type: String,
  },
  datahorainclusao: {
    type: Date,
  },
  coduseralteracao: {
    type: String,
  },
  datahoraalteracao: {
    type: Date,
  },
  coduserexclusao: {
    type: String,
  },
  datehoraexclusao: {
    type: Date,
  },
  funcionario: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
});

module.exports = mongoose.model("Trilhafuncionario", trilhaFuncionarioSchema);
