const mongoose = require("mongoose");

var trilhaProjetoSchema = new mongoose.Schema({
  coduserinclusao: {
    type: mongoose.Schema.Types.ObjectId, ref: "Funcionario" ,
  },
  datahorainclusao: {
    type: Date,
  },
  coduseralteracao: {
    type: mongoose.Schema.Types.ObjectId, ref: "Funcionario",
  },
  datahoraalteracao: {
    type: Date,
  },
  coduserexclusao: {
     type: mongoose.Schema.Types.ObjectId, ref: "Funcionario",
  },
  datehoraexclusao: {
    type: Date,
  },
  projeto: { type: String, required: true },
});

module.exports = mongoose.model("Trilhaprojeto", trilhaProjetoSchema);
