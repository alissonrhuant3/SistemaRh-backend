const mongoose = require("mongoose");

var funcionarioXprojetoSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

module.exports = mongoose.model("Associacao", funcionarioXprojetoSchema);
