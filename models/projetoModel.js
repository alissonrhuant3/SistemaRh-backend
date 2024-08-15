const mongoose = require("mongoose");

var projetoSchema = new mongoose.Schema({
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  horasestimadas: {
    type: Number,
    required: true,
  }
},{
  timestamps: true,
});

module.exports = mongoose.model("Projeto", projetoSchema);