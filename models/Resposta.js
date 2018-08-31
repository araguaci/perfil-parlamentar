const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RespostaSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  partido: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true
  },
  respostas: {
    type: Map,
    required: true
  }
});

module.exports = Resposta = mongoose.model("resposta", RespostaSchema);