const mongoose = require("mongoose");
const { cnpjValidator } = require("../../utils");

const providerSchema = new mongoose.Schema({
  cnpj: {
    type: String,
    required: [true, "O campo CNPJ não foi informado."],
    unique: true,
    match: [/^\d{14}$/, "O valor informado para o CNPJ deve ter 14 digitos."],
    validate: {
      validator: cnpjValidator,
      message: "O valor informado para o CNPJ é inválido.",
    },
  },
  nome: {
    type: String,
    required: [true, "O campo Nome não foi informado."],
    maxLength: [300, "O campo Nome deve ter no máximo 300 caracteres."],
    match: [
      /^[a-zA-Zà-úÀ-Ú0-9& .\/]*$/,
      "O campo Nome aceita apenas caracteres alfanuméricos, espaços, '.', '/' e '&'.",
    ],
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  ultimaAlteracao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Provider", providerSchema);
