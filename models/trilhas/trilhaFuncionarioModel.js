const mongoose = require("mongoose");

var trilhaFuncionarioSchema = new mongoose.Schema({
  coduserinclusao: {
    type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" ,
  },
  datahorainclusao: {
    type: Date,
  },
  coduseralteracao: {
    type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" ,
  },
  datahoraalteracao: {
    type: Date,
  },
  coduserexclusao: {
    type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" ,
  },
  datehoraexclusao: {
    type: Date,
  },
  funcionario: { type: String, required: true},
});

module.exports = mongoose.model("Trilhafuncionario", trilhaFuncionarioSchema);
