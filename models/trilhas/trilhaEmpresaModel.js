const mongoose = require("mongoose");

var trilhaEmpresaSchema = new mongoose.Schema({
  coduserinclusao: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" },
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
  empresa: { 
    type: String 
  },
});

module.exports = mongoose.model("Trilhaempresa", trilhaEmpresaSchema);
