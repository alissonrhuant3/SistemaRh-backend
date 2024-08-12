const mongoose = require("mongoose");

var trilhaEmpresaSchema = new mongoose.Schema({
  coduserinclusao: {
    type: Number,
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
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa" },
});

module.exports = mongoose.model("Trilhaempresa", trilhaEmpresaSchema);
